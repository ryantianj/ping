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
// const usersCollection = admin.firestore().collection('Users');

exports.scheduledUpdateUpvotes = functions.pubsub.schedule("every 2 minutes").onRun(async context => {
    console.log('This will be run every 30 minutes. Updating Upvotes');

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
        let topicalUpvotes = {};
        let upvotesArray = [];

        // filter all channels related to this topic
        channelsCollection.where('topics', 'array-contains', topic).get()
        .then(channels => {
            channels.forEach(channelDoc => {
                console.log(channelDoc.id);
                console.log(channelDoc.data().roomname); // channel name
                channelsCollection.doc(channelDoc.id).collection('Posts')
                .get().then(posts => {
                    posts.forEach(postDoc => {
                        console.log(postDoc.id);
                        channelsCollection.doc(channelDoc.id).collection('Posts').doc(postDoc.id)
                        .collection('Comments').get().then(comments => {
                            comments.forEach(commentDoc => {
                                console.log(commentDoc.id);

                                // take commentDoc.data() and count the likedby
                                const commentData = commentDoc.data();
                                if (!topicalUpvotes[commentData.user._id]) {
                                    topicalUpvotes[commentData.user._id] = 0;
                                }
                                topicalUpvotes[commentData.user._id] = topicalUpvotes[commentData.user._id] + commentData.likedby.length
                                console.log('current topicalUpvotes for ' + topic + ': ')
                                console.log(topicalUpvotes);
                            })
                        })

                        // take postDoc.data() and count the likedby
                        const postData = postDoc.data();
                        if (!topicalUpvotes[postData.user._id]) {
                            topicalUpvotes[postData.user._id] = 0;
                        }
                        topicalUpvotes[postData.user._id] = topicalUpvotes[postData.user._id] + postData.likedby.length
                        console.log('current topicalUpvotes for '+topic+': ')
                        console.log(topicalUpvotes);
                    })
                })
            })
        }).then(() => {
            // Take all values from the map and put into an array
            upvotesArray = [];
            for (const uid in topicalUpvotes) {
                upvotesArray.push(topicalUpvotes[uid]);
            }
        }).then(() => {
            console.log('upvotesArray for ' + topic + ': ' + upvotesArray);

            // Find 10th pct and 30th pct and retrieve these values as minGuru and minThinker
            upvotesArray.sort((a, b) => b - a);

            const length = upvotesArray.length;
            console.log(length)
            const tenth = Math.ceil(length / 10) > 0 ? Math.ceil(length / 10) : 1;
            const thirtieth = Math.ceil(3 * length / 10) > 0 ? Math.ceil(3 * length / 10) : 1;
            const minGuru = length >= tenth ? upvotesArray[tenth - 1] : 1;
            const minThinker = length >= thirtieth ? upvotesArray[thirtieth - 1] : 1;

            // add minGuru to TenPctGuru(key = topic, value = minGuru)
            // add minGuru to ThirtyPctThinker(key = topic, value = minThinker)
            TenPctGuru[topic] = minGuru;
            ThirtyPctThinker[topic] = minThinker;
        })
    }
    
    await interestsCollection.doc('profile').update({
        TenPctGuru : TenPctGuru,
        ThirtyPctThinker: ThirtyPctThinker
    })

    return null;
});