const functions = require("firebase-functions");
const admin = require("firebase-admin");
const pdfParse = require("pdf-parse");
const {Storage} = require("@google-cloud/storage");
const {GoogleGenerativeAI} = require("@google/generative-ai");

// Initialize Firebase Admin SDK
admin.initializeApp();
const apiKey = "AIzaSyAmMYqC_PQ_7O1tXf5im8zOia2PUa91WfY";
const genAI = new GoogleGenerativeAI(apiKey);
// Create an instance of Google Cloud Storage
const storage = new Storage();
const bucket = storage.bucket("gs://thrifty2.appspot.com");

// Function to update 'hasgottencredit' to false for all users
exports.updateCredits = functions.pubsub
    .schedule("0 0 * * *") // Schedule to run at midnight every day
    .timeZone("Africa/Lagos") // Set Nigerian timezone
    .onRun(async (context) => {
      const db = admin.firestore();
      const usersRef = db.collection("Users");

      try {
        const usersSnapshot = await usersRef.get();
        const batch = db.batch();

        usersSnapshot.forEach((userDoc) => {
          batch.update(userDoc.ref, {hasgottencredit: false});
        });

        await batch.commit();
        return null;
      } catch (error) {
        return null;
      }
    });

exports.checkSubscriptionStatus = functions.pubsub
    .schedule("0 0 * * *") // Schedule to run daily at midnight
    .timeZone("Africa/Lagos") // Set your desired timezone
    .onRun(async (context) => {
      const db = admin.firestore();

      // Query the "Users" collection for users with expired subscriptions
      const now = new Date();
      const productsRef = db.collection("Products");
      const expiredUsers = await productsRef
          .where("subscriptionEndDate", "<", now)
          .get();

      const batch = db.batch();

      expiredUsers.forEach((userDoc) => {
        const userId = userDoc.id;
        const productDoc = productsRef.doc(userId);

        // Update the "notTop" field to true
        batch.update(productDoc, {notTop: true});
      });
      // Commit the batch update
      await batch.commit();
      return null;
    });

exports.checkServiceSubscriptionStatus = functions.pubsub
    .schedule("0 0 * * *") // Schedule to run daily at midnight
    .timeZone("Africa/Lagos") // Set your desired timezone
    .onRun(async (context) => {
      const db = admin.firestore();

      // Query the "Services" collection for users with expired subscriptions
      const now = new Date();
      const serviceRef = db.collection("Services");
      const expiredUsers = await serviceRef.where("expiryDate", "<", now).get();

      const batch = db.batch();

      expiredUsers.forEach((userDoc) => {
        const userId = userDoc.id;
        const serviceDoc = serviceRef.doc(userId);

        // Delete the document
        batch.delete(serviceDoc);
      });

      // Commit the batch delete
      await batch.commit();
      return null;
    });
exports.extractTextFromPDF = functions.storage
    .object()
    .onFinalize(async (object) => {
      const filePath = object.name;
      const contentType = object.contentType;
      const fileName = filePath.split("/").pop();
      // Ensure the file is a PDF
      if (!contentType.startsWith("application/pdf")) {
        console.log("Not a PDF file.");
        return null;
      }
      try {
        // Reference the file in the bucket
        const file = bucket.file(filePath);
        const [fileBuffer] = await file.download();
        // Extract text from the PDF
        const pdfData = await pdfParse(fileBuffer);
        const text = pdfData.text;
        // Set up the Gemini API model
        const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});
        // Generate summary
        const prompt =`
        ${text}\n\n
        Generate 20 possible exam questions and answers from this text. 
        Format the response as follows:
        [
        {"question": "Question Text",
        "answer": "Answer Text"},
        {"question": "Question Text",
        "answer": "Answer Text"},
        {"question": "Question Text",
        "answer": "Answer Text"},
        {"question": "Question Text",
        "answer": "Answer Text"},
        ...]`;
        const result = await model.generateContent(prompt);
        const summary = result.response.text();
        // Store extracted text in Firestore
        const db = admin.firestore();
        const productsRef = db.collection("pdfUploads");
        // Query for the document with the matching fileName
        const querySnapshot = await productsRef
            .where("filename", "==", fileName) // Ensure the field name matches
            .get();
        querySnapshot.forEach(async (doc) => {
          await doc.ref.update({
            text: text,
            flashcard: summary,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            loadingFlashcard: false,
          });
        });
        console.log("Text extracted and document updated successfully");
      } catch (error) {
        console.error("Error extracting text from PDF:", error);
        const db = admin.firestore();
        const productsRef = db.collection("pdfUploads");
        // Query for the document with the matching fileName
        const querySnapshot = await productsRef
            .where("filename", "==", fileName) // Ensure the field name matches
            .get();
        querySnapshot.forEach(async (doc) => {
          await doc.ref.update({
            loadingFlashcard: false,
            error: error,
          });
        });
      }
      return null;
    });
