const functions = require("firebase-functions");
const admin = require("firebase-admin");
const pdfParse = require("pdf-parse");
const {Storage} = require("@google-cloud/storage");
const {GoogleGenerativeAI} = require("@google/generative-ai");
const axios = require("axios");

// Initialize Firebase Admin SDK
admin.initializeApp();
const apiKey = "AIzaSyAmMYqC_PQ_7O1tXf5im8zOia2PUa91WfY";
const genAI = new GoogleGenerativeAI(apiKey);
// Create an instance of Google Cloud Storage
const storage = new Storage();
const bucket = storage.bucket("gs://thrifty2.appspot.com");

const BATCH_SIZE = 100;

exports.initiateFlutterwavePayment =
    functions.https.onCall(async (data, context) => {
      const {email, amount, transactionId} = data;
      const flutterwaveSecretKey =
    functions.config().flutterwave.secret_test_key;
      console.log(flutterwaveSecretKey);
      try {
      // Create a Flutterwave payment request
        const response = await axios.post(
            "https://api.flutterwave.com/v3/payments",
            {
              tx_ref: transactionId,
              amount: amount,
              currency: "NGN",
              redirect_url: "https://uniplug.ng/verify-payment",
              payment_options: "card, mobilemoneyghana, ussd",
              customer: {
                email: email,
              },
            },
            {
              headers: {
                "Authorization": `Bearer ${flutterwaveSecretKey}`,
                "Content-Type": "application/json",
              },
            },
        );

        // Return the payment link to the client
        return {link: response.data.data.link};
      } catch (error) {
        console.error("Error initiating Flutterwave payment:", error);
        throw new functions.https.HttpsError(
            "internal",
            "Failed to initiate payment",
        );
      }
    });

// Schedule the function to run every day at 8 AM Lagos, Nigeria time (UTC+1)
exports.dailyPushNotification = functions.pubsub
    .schedule("0 8 * * *") // 8 AM UTC
    .timeZone("Africa/Lagos") // Set the time zone to Lagos, Nigeria (UTC+1)
    .onRun(async (context) => {
      try {
      // Fetch all users with push tokens from the "Users" collection
        const usersSnapshot = await admin.firestore().collection("Users").get();

        if (usersSnapshot.empty) {
          console.log("No users found to send notifications to.");
          return;
        }

        const notifications = [];

        usersSnapshot.forEach((doc) => {
          const user = doc.data();
          const pushToken = user.pushToken;

          if (pushToken) {
          // Create notification message
            const message = {
              to: pushToken,
              sound: "default",
              title: "Good Morning Odogwu",
              body: "Click to read our random facts for today!!",
              data: {someData: "anyDataYouNeed"},
            };

            // Add each message to the notifications array
            notifications.push(message);
          }
        });

        console.log(`Preparing to send ${notifications.length} notifications`);

        // Send notifications in batches to prevent rate limiting
        for (let i = 0; i < notifications.length; i += BATCH_SIZE) {
          const batch = notifications.slice(i, i + BATCH_SIZE);

          const sendBatch = batch.map((message) =>
            axios.post("https://exp.host/--/api/v2/push/send", message, {
              headers: {
                "Accept": "application/json",
                "Accept-Encoding": "gzip, deflate",
                "Content-Type": "application/json",
              },
            }),
          );

          await Promise.all(sendBatch);

          console.log(`Batch ${i / BATCH_SIZE + 1} 
          of notifications sent successfully`);
        }

        console.log("All daily notifications sent successfully.");
      } catch (error) {
        console.error("Error sending daily notifications:", error);
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
        batch.update(productDoc, {topProduct: false});
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
        const prompt = `
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

exports.generateExamQuestionsFlashCardFromText = functions.firestore
    .document("textUploads/{docId}")
    .onCreate(async (snap, context) => {
      const data = snap.data();
      const text = data.text; // The text field from the document
      const numOfQuestions = data.numOfQuestions;
      const textId = data.textId;
      if (!text) {
        console.log("No text found in the document.");
        return null;
      }
      try {
        // Set up the Gemini API model
        const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});
        // Generate summary
        const prompt = `
        Generate ${numOfQuestions} exam questions based on this topic: ${text}
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
        const productsRef = db.collection("textUploads");
        // Query for the document with the matching fileName
        const querySnapshot = await productsRef
            .where("textId", "==", textId) // Ensure the field name matches
            .get();
        querySnapshot.forEach(async (doc) => {
          await doc.ref.update({
            flashcard: summary,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            loadingFlashcard: false,
          });
        });
        console.log("Text extracted and document updated successfully");
      } catch (error) {
        console.error("Error generating exam questions: ", error);
      }
      return null;
    });

exports.generateExamMultipleQuestionsFromTopic = functions.firestore
    .document("multipleQuestions/{docId}")
    .onCreate(async (snap, context) => {
      const data = snap.data();
      const text = data.text; // The text field from the document
      const numOfQuestions = data.numOfQuestions;
      const multipleQuestionsId = data.multipleQuestionsId;
      if (!text) {
        console.log("No text found in the document.");
        return null;
      }
      try {
        // Set up the Gemini API model
        const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});
        // Generate summary
        const prompt = `
        Generate ${numOfQuestions} exam multiple questions 
        based on this topic: ${text}
        Format the response as follows:
        [
        {"question": "Question Text",
        "A": "Option 1",
        "B": "Option 2",
        "C": "Option 3",
        "D": "Option 4",
        "answer": "B",},
        {"question": "Question Text",
        "A": "Option 1",
        "B": "Option 2",
        "C": "Option 3",
        "D": "Option 4",
        "answer": "C",},
        {"question": "Question Text",
        "A": "Option 1",
        "B": "Option 2",
        "C": "Option 3",
        "D": "Option 4",
        "answer": "A",},
        {"question": "Question Text",
        "A": "Option 1",
        "B": "Option 2",
        "C": "Option 3",
        "D": "Option 4",
        "answer": "D",},
        ...]`;
        const result = await model.generateContent(prompt);
        const summary = result.response.text();
        // Store extracted text in Firestore
        const db = admin.firestore();
        const productsRef = db.collection("multipleQuestions");
        // Query for the document with the matching fileName
        const querySnapshot = await productsRef
            .where("multipleQuestionsId", "==", multipleQuestionsId)
            .get();
        querySnapshot.forEach(async (doc) => {
          await doc.ref.update({
            multipleQuestions: summary,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            loadingMultipleQuestions: false,
          });
        });
        console.log("Text extracted and document updated successfully");
      } catch (error) {
        console.error("Error generating exam questions: ", error);
      }
      return null;
    });

exports.sendOrderNotification = functions.firestore
    .document("Orders/{orderId}")
    .onCreate(async (snap, context) => {
      const orderData = snap.data();
      const vendorUserId = orderData.vendorUserId;

      try {
        // Fetch the user with the matching vendorUserId
        const userSnapshot = await admin
            .firestore()
            .collection("Users")
            .where("userId", "==", vendorUserId)
            .get();

        if (userSnapshot.empty) {
          console.log("No matching user found for the vendorUserId:");
          return;
        }

        // Assume only one user matches and get the pushToken
        const userDoc = userSnapshot.docs[0];
        const pushToken = userDoc.data().pushToken;

        if (!pushToken) {
          console.log("No pushToken found for the user:", userDoc.id);
          return;
        }

        // Prepare notification payload
        const message = {
          to: pushToken,
          sound: "default",
          title: "Odogwu🙌",
          body: "You Have A New Order 🤑",
          data: {orderId: "Order"},
        };

        // Send notification using Axios to Expo push notification service
        await axios.post("https://exp.host/--/api/v2/push/send", message, {
          headers: {
            "Accept": "application/json",
            "Accept-Encoding": "gzip, deflate",
            "Content-Type": "application/json",
          },
        });

        console.log("Notification sent successfully to user:", userDoc.id);
      } catch (error) {
        console.error("Error sending notification:", error);
      }
    });

exports.sendEventNotification = functions.firestore
    .document("EventTickets/{eventTicketsId}")
    .onCreate(async (snap, context) => {
      const ticketsData = snap.data();
      const hostUserId = ticketsData.hostUserId;

      try {
        // Fetch the user with the matching vendorUserId
        const userSnapshot = await admin
            .firestore()
            .collection("Users")
            .where("userId", "==", hostUserId)
            .get();

        if (userSnapshot.empty) {
          console.log("No matching user found for the hostUserId:");
          return;
        }

        // Assume only one user matches and get the pushToken
        const userDoc = userSnapshot.docs[0];
        const pushToken = userDoc.data().pushToken;

        if (!pushToken) {
          console.log("No pushToken found for the user:", userDoc.id);
          return;
        }

        // Prepare notification payload
        const message = {
          to: pushToken,
          sound: "default",
          title: "Odogwu🙌",
          body: "You Have A New Ticket Purchase 🤑",
          data: {ticketId: "Ticket"},
        };

        // Send notification using Axios to Expo push notification service
        await axios.post("https://exp.host/--/api/v2/push/send", message, {
          headers: {
            "Accept": "application/json",
            "Accept-Encoding": "gzip, deflate",
            "Content-Type": "application/json",
          },
        });

        console.log("Notification sent successfully to user:", userDoc.id);
      } catch (error) {
        console.error("Error sending notification:", error);
      }
    });

exports.sendOrderStatusNotification = functions.firestore
    .document("Orders/{orderId}")
    .onUpdate(async (change, context) => {
      const before = change.before.data(); // Data before the update
      const after = change.after.data(); // Data after the update

      // Check if the status has changed
      if (before.status === after.status) {
        return; // Exit if the status hasn't changed
      }

      const newStatus = after.status; // Get the new status
      const userId = after.userId; // Assume the order has a userId field

      try {
        // Fetch the user with the matching userId
        const userSnapshot = await admin
            .firestore()
            .collection("Users")
            .where("userId", "==", userId)
            .get();

        if (userSnapshot.empty) {
          console.log("No matching user found for the userId:", userId);
          return;
        }

        // Assume only one user matches and get the pushToken
        const userDoc = userSnapshot.docs[0];
        const pushToken = userDoc.data().pushToken;

        if (!pushToken) {
          console.log("No pushToken found for the user:", userDoc.id);
          return;
        }

        // Prepare notification payload based on the new status
        const message = {
          to: pushToken,
          sound: "default",
          data: {ticketId: "Ticket"}, // Adjust as needed
        };

        if (newStatus === "Shipped") {
          message.title = "Your Order has Shipped 🚚";
          message.body = "Your order is on the way!";
        } else if (newStatus === "Delivered") {
          message.title = "Your Order has been Delivered 🎉";
          message.body = "Your order has arrived! Please confirm delivery";
        } else if (newStatus === "Cancelled") {
          message.title = "Your Order has been Cancelled ❌";
          message.body = "Your refund is being processed.";
        } else {
          console.log("Unhandled status change:", newStatus);
          return; // Exit if the status is not handled
        }

        // Send notification using Axios to Expo push notification service
        await axios.post("https://exp.host/--/api/v2/push/send", message, {
          headers: {
            "Accept": "application/json",
            "Accept-Encoding": "gzip, deflate",
            "Content-Type": "application/json",
          },
        });

        console.log("Notification sent successfully to user:", userDoc.id);
      } catch (error) {
        console.error("Error sending notification:", error);
      }
    });

exports.autoConfirmDeliveredOrders =
    functions.pubsub.schedule("every 24 hours").onRun(async (context) => {
      const currentTime = admin.firestore.Timestamp.now();

      try {
        // Query orders where status is 'delivered'
        const ordersSnapshot = await admin.firestore()
            .collection("Orders")
            .where("status", "==", "Delivered")
            .where("timestamp", "<=", currentTime
                .toMillis() - 24 * 60 * 60 * 1000) // 24 hours ago
            .get();

        if (ordersSnapshot.empty) {
          console.log("No orders to confirm.");
          return;
        }

        // Update each order to set status to 'confirmed'
        const updates = ordersSnapshot.docs.map((doc) => {
          return doc.ref.update({status: "Confirmed",
            confirmedBy: "Automatic",
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
          });
        });

        await Promise.all(updates);
        console.log(`Updated ${updates.length} orders to 'confirmed'.`);
      } catch (error) {
        console.error("Error confirming orders:", error);
      }
    });
