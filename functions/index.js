/* eslint-disable */

const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// New Post notification
exports.postNoti = functions.firestore
    .document('GlobalNoti/{NotiIds}')
    .onCreate((snap, context) => {
        const notiData = snap.data();
        const users = notiData.users;
        //Update noti collection in users
        users.forEach(userID => {
            const updateNotiId = () => {
                let org = snap.data()
                org['notiId'] = snap.ref.id
                return org
            }
            admin.firestore().collection('Users').doc(userID)
                .collection('noti').add(updateNotiId())

        })

    });

// Edit Post notification on deletion (comments, posts etc)
exports.updatePostNoti = functions.firestore
    .document('GlobalNoti/{NotiIds}')
    .onDelete((snap, context) => {
        const notiData = snap.data();
        const users = notiData.users;
        //Update noti collection in users
        users.forEach(userID => {
            admin.firestore().collection('Users').doc(userID)
                .collection('noti').where("notiId", "==" , snap.ref.id)
                .get().then((snap) => {
                    snap.forEach(doc => {
                        admin.firestore().collection('Users').doc(userID)
                            .collection('noti').doc(doc.ref.id).delete()
                    })
            })
        })

    });


// WORKS
// exports.helloWorld = functions.https.onRequest((req, res) => {
//   res.send("Hello from Firebase!");
// });

const interestsCollection = admin.firestore().collection('Interests');
const channelsCollection = admin.firestore().collection('Channel');

exports.scheduledUpdateUpvotes = functions.pubsub.schedule("every 5 minutes").onRun(async context => {
    console.log('This will be run every 5 minutes. Updating Upvotes');

    // let userCount = 0;
    // await usersCollection.get().then(snapshot => {
        // userCount = snapshot.size // will return the collection size
    // });

    const response = await interestsCollection.doc('profile').get();
    const topicArray = response.data().fields;

    const TenPctGuru = {};
    const ThirtyPctThinker = {};

    for (let i = 0; i < 105; i++) {
        const topic = topicArray[i];

        // Get the upvotes scores for users in a map(key = uid, value = upvote count)
        let upvotesArray = [];

        // filter all channels related to this topic
        await channelsCollection.where('topics', 'array-contains', topic).get()
        .then(channels => {
            let topicalUpvotes = {};
            channels.forEach( channelDoc => {
                    channelsCollection.doc(channelDoc.id).collection('Posts')
                .get().then(posts => {
                    posts.forEach( postDoc => {
                            channelsCollection.doc(channelDoc.id).collection('Posts').doc(postDoc.id)
                        .collection('Comments').get().then(comments => {
                            comments.forEach( commentDoc => {

                                // take commentDoc.data() and count the likedby
                                const commentData = commentDoc.data();
                                if (!topicalUpvotes[commentData.user._id]) {
                                    topicalUpvotes[commentData.user._id] = 0;
                                }
                                topicalUpvotes[commentData.user._id] = topicalUpvotes[commentData.user._id] + commentData.likedby.length
                                console.log('current topicalUpvotes for ' + topic + ': ')
                                console.log(topicalUpvotes);
                            })
                        }).then(() => {
                                // take postDoc.data() and count the likedby
                                const postData = postDoc.data();
                                if (!topicalUpvotes[postData.user._id]) {
                                    topicalUpvotes[postData.user._id] = 0;
                                }
                                topicalUpvotes[postData.user._id] = topicalUpvotes[postData.user._id] + postData.likedby.length
                                console.log('current topicalUpvotes for '+topic+': ')
                                console.log(topicalUpvotes);
                                return topicalUpvotes
                        }).then((t) => {
                            // Take all values from the map and put into an array
                            console.log("upvotesArray" + topic)
                            upvotesArray = [];
                            for (const uid in t) {
                                upvotesArray.push(t[uid]);
                                console.log("pushing: " + topic)
                            }
                            return upvotesArray
                        }).then((x) => {
                            console.log(x);

                            // Find 10th pct and 30th pct and retrieve these values as minGuru and minThinker
                            x.sort((a, b) => b - a);

                            const length = x.length;
                            const tenth = Math.ceil(length / 10);
                            const thirtieth = Math.ceil(3 * length / 10);
                            const minGuru = x[tenth - 1];
                            const minThinker = x[thirtieth - 1];

                            // add minGuru to TenPctGuru(key = topic, value = minGuru)
                            // add minGuru to ThirtyPctThinker(key = topic, value = minThinker)
                            TenPctGuru[topic] = minGuru;
                            ThirtyPctThinker[topic] = minThinker;
                        })
                    })
                })
            })
        })
    }
    
    await interestsCollection.doc('profile').set({
        TenPctGuru : TenPctGuru,
        ThirtyPctThinker: ThirtyPctThinker
    }, {merge:true})

    return null;
});
