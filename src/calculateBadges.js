import { fillUserState } from '../src/usersSlice';
// import { useDispatch } from 'react-redux';
import firebase, { interestsCollection, usersCollection, channelsCollection } from './../api/firebase';
import store from "../src/store";

// const uid = store.getState().user.user.uid;
// const dispatch = useDispatch();

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
// to be used when ??? rendering notif screen (return void)?????
// return boolean
// HOW: 
// run hasBadge() with the same 2 params. if true, return true. 
// ELSE if hasBadge() returns false check the criteria.
// const upvotesCount = tallyIndivUpvotes(topic)
// if badgecode === 1/2
    // let minCount = 0
    // minCount = 15/5 (ARBITRARY: 15 5)
    // return upvotesCount >= minCount && upvotesCount >= 10pctGuru/30pctThinker
// else (badgecode 0 so sage) return false
const checkIfBadge = async (topic, badgecode) => {
    if (hasBadge(topic, badgecode)) {
        console.log('already has badge ' + topic + badgecode)
        return true;
    } else if (badgecode >= 1) {
        // const upvotesCount = await tallyIndivUpvotes(topic);
        // console.log('upvotesCount: ' + upvotesCount)
        // const response = await interestsCollection.doc('profile').get();
        // const topicalTenPctGuru = response.data().TenPctGuru[topic]
        // console.log('topicalTenPctGuru score: ' + topicalTenPctGuru)
        // const topicalThirtyPctThinker = response.data().ThirtyPctThinker[topic]
        // console.log('topicalThirtyPctThinker score: ' + topicalThirtyPctThinker)
        // if (badgecode === 1) {
        //     return upvotesCount >= /*15*/ 1 && upvotesCount >= topicalTenPctGuru;
        // } else if (badgecode === 2) {
        //     return upvotesCount >= /*5*/ 1 && upvotesCount >= topicalThirtyPctThinker;
        // }

        
        tallyIndivUpvotes(topic).then((upvotesCount) => {
            console.log('upvotesCount: ' + upvotesCount)
        })
    } else {
        console.log('returning false for checkIf')
        return false;
    }
}

// 3.
// awardBadge(topic, badgecode 0S/1G/2T):
// update user.badges['topic'] with new badgecode AND createNotif() with same 2 params.
// dispatch(fillUserState(uid))
const awardBadge = async (topic, badgecode) => {
    usersCollection.doc(store.getState().user.user.uid).set({
        'badges': {
            topic: badgecode
        }
    }, {merge:true})
    .then(() => {
        const originalTier = store.getState().user.user.badges[topic];
        // create notif if the user attained a new tier of badge
        if (originalTier != badgecode) {
            createNotif(topic, badgecode);
        }
        console.log('awarded badge! ' + topic + badgecode)
        // dispatch(fillUserState(store.getState().user.user.uid));
    })
}

// 4.
// tallyIndivUpvotes(topic): return integer
const tallyIndivUpvotes = async (topic) => {
    let topicCount = 0;
    // filter all channels with this user related to this topic
    channelsCollection.where('users', 'array-contains', store.getState().user.user.uid)
    // .where('topics', 'array-contains', topic)
    .get().then(channels => {
        channels.forEach(channelDoc => {
            // look into channels
            const channelTopicsArray = channelDoc.data().topics;
            if (channelTopicsArray[0] === topic || channelTopicsArray[1] === topic) {
                console.log(channelDoc.id);
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
                                topicCount += commentData.likedby.length
                                console.log(topicCount);
                            })
                        }).then(() => {
                            // take postDoc.data() and count the likedby
                            const postData = postDoc.data();
                            topicCount += postData.likedby.length
                            console.log(topicCount);
                            console.log('topicCount from tally fn of ' + topic + ': ' + topicCount)
                            return topicCount;
                        })
                    })
                })
                console.log(channelDoc.data().roomname); // channel name
            }   
        })
        // console.log('topicCount from tally fn: ' + topicCount)
        // return topicCount;
    })
    // .then(() => {
        
    // })
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
        // works fine
        handleTopicBadge(topic);
    }
}