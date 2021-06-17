/* eslint-disable */

const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

//New Post notification
exports.postNoti = functions.firestore
    .document('Channel/{ChannelIds}/Posts/{PostsId}')
    .onCreate((snap, context) => {
        //Get doc ID from path
        const docFullPath = snap.ref.path
        const docPathSplit = docFullPath.split('/')
        const channelId = docPathSplit[1];
        let channelUsers;

        admin.firestore().collection('Channel').doc(channelId).get()
            .then((doc) => {
                const docData = doc.data()
                // Array of channel users
                channelUsers = docData.users
            }).then(() => {
                //Update noti array of each user
            channelUsers.forEach(userId => {
                admin.firestore().collection('Users').doc(userId)
                    .update({
                        noti: admin.firestore.FieldValue.arrayUnion(snap.data())
                    })
            })
        })

      // const newValue = snap.data().title
      //
      // // to upper
      // const title = newValue.toUpperCase()
      //
      //
      // // perform desired operations ...
      // return snap.ref.set({title}, {merge: true});
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
