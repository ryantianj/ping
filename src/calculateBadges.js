// this module is for determining all the badge tiers for a user. 
// run findAllBadges() everytime login / profile screen is rendered

// Cloud function is supposed to maintain a certain threshold score for the 10th and 30th
// percentiles of guru and thinker as fields in each interest doc in interestsCollection
// call them 10pctGuru and 30pctThinker

// HELPER FUNCTIONS

// 1.
// hasBadge(topic, badgecode 0S/1G/2T): 
// to be used in profile screen (returning boolean)
// just check global state, return user.badges['topic'] <= badgecode

// 2.
// checkIfBadge(topic, badgecode 0S/1G/2T):
// to be used when ??? rendering notif screen (return void)?????
// return boolean

// run hasBadge() with the same 2 params. if true, return true. 
// ELSE if hasBadge() returns false check the criteria.
// const upvotesCount = tallyIndivUpvotes(topic)
// if badgecode === 1/2
    // let minCount = 0
    // minCount = 15/5 (ARBITRARY: 15 5)
    // return upvotesCount >= minCount && upvotesCount >= 10pctGuru/30pctThinker
// else (badgecode 0 so sage) return false

// 3.
// awardBadge(topic, badgecode 0S/1G/2T):
// update user.badges['topic'] with new badgecode AND createNotif() with same 2 params.
// dispatch(fillUserState(uid))

// 4.
// tallyIndivUpvotes(topic): return integer

// 5.
// createNotif(topic, tag): 
// each user should have a notifications array, where each object/element has 
// timestamp and message and type.
// So just push a notif object to this array

// 6. 
// handleTopicBadge(topic) return integer (trit)
// let resultBadgeCode = -1;
// for (let i = 0; i < 3; i++) {
    // if checkIfBadge(i), resultBadgeCode = i;
    // awardBadge(topic, i);
    // createNotif(topic, i);
    // return;
// }

// 7. 
// Looper. for profileScreen?
// findAllBadges()
// for (let i = 0; i < interestsCollection.count(); i++) {
    //    handleTopicBadge(interestsCollection.doc(???))
// }