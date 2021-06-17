/* eslint-disable */

const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

//New Post notification
exports.postNoti = functions.firestore
    .document('GlobalNoti/{NotiIds}')
    .onCreate((snap, context) => {
        const notiData = snap.data();
        const users = notiData.users;
        //Update noti collection in users
        users.forEach(userID => {
            admin.firestore().collection('Users').doc(userID)
                .collection('noti').add(snap.data())
        })


        // //Get doc ID from path
        // const docFullPath = snap.ref.path
        // const docPathSplit = docFullPath.split('/')
        // const notiId = docPathSplit[1];
        // let channelUsers;
        //
        // admin.firestore().collection('Channel').doc(notiId).get()
        //     .then((doc) => {
        //         const docData = doc.data()
        //         // Array of channel users
        //         channelUsers = docData.users
        //     }).then(() => {
        //         //Update noti array of each user
        //     channelUsers.forEach(userId => {
        //         admin.firestore().collection('Users').doc(userId)
        //             .collection("noti").add(snap.data())
        //
        //     })
        // })

    });


// WORKS
// exports.helloWorld = functions.https.onRequest((req, res) => {
//   res.send("Hello from Firebase!");
// });

// WORKS TOO
// exports.scheduledUpdateUpvotes = functions.pubsub.schedule("every 2 minutes").onRun(async context => {
//     console.log('This will be run every 30 minutes. Updating Upvotes');
//     const data = await admin.firestore().collection('Interests').doc('profile').get()
//     // console.log(data.data())
//     return null;
// });
