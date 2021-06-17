/* eslint-disable */

const functions = require("firebase-functions");

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// WORKS
// exports.helloWorld = functions.https.onRequest((req, res) => {
//   res.send("Hello from Firebase!");
// });

// WORKS TOO
exports.scheduledUpdateUpvotes = functions.pubsub.schedule("every 2 minutes").onRun(async context => {
    console.log('This will be run every 30 minutes. Updating Upvotes');
    const data = await admin.firestore().collection('Interests').doc('profile').get()
    // console.log(data.data())
    return null;
});
