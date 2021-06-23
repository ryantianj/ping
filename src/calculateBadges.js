import { fillUserState } from '../src/usersSlice';
import firebase, { interestsCollection, usersCollection, channelsCollection } from './../api/firebase';
import store from "../src/store";

// this module is for determining all the badge tiers for a user. 
// run findAllBadges() everytime login / profile screen is rendered

// Cloud function is supposed to maintain a certain threshold score for the 10th and 30th
// percentiles of guru and thinker as fields in each interest doc in interestsCollection
// call them TenPctGuru and ThirtyPctThinker

// HELPER FUNCTIONS

// 1.
// hasBadge(topic, badgecode 0S/1G/2T): 
// to be used in profile screen (returning boolean)
// just check global state, return user.badges['topic'] <= badgecode
const hasBadge = (topic, badgecode) => {
    const badges = store.getState().user.user.badges;
    if (badges[topic]) {
        return badges[topic] <= badgecode;
    } else {
        return false;
    }
}

// 2.
// checkIfBadge(topic, badgecode 0S/1G/2T):
// return boolean
// HOW: 
// run hasBadge() with the same 2 params. if true, return true. 
// ELSE if hasBadge() returns false check the criteria.
// else (badgecode 0 so sage) return false
const checkIfBadge = async (topic, badgecode) => {
    if (hasBadge(topic, badgecode)) {
        console.log('already has badge ' + topic + badgecode)
        return true;
    } else if (badgecode >= 1) {
        const upvotesCount = await tallyIndivUpvotes(topic);
        console.log('upvotesCount: ' + upvotesCount)
        const response = await interestsCollection.doc('profile').get();
        const topicalTenPctGuru = response.data().TenPctGuru[topic]
        console.log('topicalTenPctGuru score: ' + topicalTenPctGuru)
        const topicalThirtyPctThinker = response.data().ThirtyPctThinker[topic]
        console.log('topicalThirtyPctThinker score: ' + topicalThirtyPctThinker)
        if (badgecode === 1) {
            return upvotesCount >= 15 && upvotesCount >= topicalTenPctGuru;
        } else if (badgecode === 2) {
            return upvotesCount >= 5 && upvotesCount >= topicalThirtyPctThinker;
        }
    } else {
        console.log('returning false for checkIf')
        return false;
    }
}

// 3.
// awardBadge(topic, badgecode 0S/1G/2T):
// update user.badges['topic'] with new badgecode AND createNotif() with same 2 params.
// dispatch(fillUserState(uid)) done in Settings Screen
const awardBadge = async (topic, badgecode) => {
    const uid = store.getState().user.user.uid;
    const badges = {};
    badges[topic] = badgecode;
    usersCollection.doc(uid).set({
        badges
    }, {merge:true})
    .then(() => {
        const originalTier = store.getState().user.user.badges[topic];
        // create notif if the user attained a new tier of badge
        if (originalTier != badgecode) {
            createNotif(topic, badgecode);
        }
        console.log('awarded badge! ' + topic + ' ' + badgecode)
    })
}

// 4.
// tallyIndivUpvotes(topic): return integer
const tallyIndivUpvotes = (topic) => {
    let topicCount = 0;
    // filter all channels with this user related to this topic
    return channelsCollection.where('users', 'array-contains', store.getState().user.user.uid)
    .get().then(async channels => {

        for (const channel in channels.docs) {
            const channelDoc = channels.docs[channel]
            const channelTopicsArray = channelDoc.data().topics;
            if (channelTopicsArray[0] === topic || channelTopicsArray[1] === topic) {
                console.log(channelDoc.id);
                console.log(channelDoc.data().roomname); // channel name
                const posts =  await channelsCollection.doc(channelDoc.id).collection('Posts')
                    .get()

                for (const postDocs in posts.docs) {
                    const postDoc = posts.docs[postDocs]
                    console.log(postDoc.id);
                
                    const comments = await channelsCollection.doc(channelDoc.id).collection('Posts').doc(postDoc.id)
                        .collection('Comments').get()

                    for (const commentDocs in comments.docs) {
                        const commentDoc = comments.docs[commentDocs]
                        console.log(commentDoc.id);
                        const commentData = commentDoc.data();
                        topicCount += commentData.likedby.length
                        console.log(topicCount);
                    }
                        const postData = postDoc.data();
                        topicCount += postData.likedby.length
                        console.log(topicCount);
                }
            }
        }
        console.log('topicCount from tally fn: ' + topic + ' ' + topicCount)
        return topicCount;
    })
}

// 5.
// createNotif(topic, tag): 
// each user should have a notifications array, where each object/element has 
// timestamp and message and type.
// So just push a notif object to this array
const createNotif = (topic, badgecode) => {

}

// 6. 
// handleTopicBadge(topic) return integer (trit)
const handleTopicBadge = async (topic) => {
    for (let i = 0; i < 3; i++) {
        const boolean = await checkIfBadge(topic, i)
        console.log(boolean)
        if (boolean) {
            awardBadge(topic, i);
            return;
        }
    }
}

// 7. 
// Looper. for profileScreen?
export const findAllBadges = async () => {
    const response = await interestsCollection.doc('profile').get()
    const data = response.data();
    for (let i = 0; i < 105; i++) {
        const topic = data.fields[i];
        handleTopicBadge(topic);
    }
}