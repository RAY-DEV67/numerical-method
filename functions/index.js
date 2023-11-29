const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

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

