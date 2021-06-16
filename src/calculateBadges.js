// this module is for ascertaining whether a user has attained
// a certain badge tier for any given topic.

// EXPORTED FUNCTIONS

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
// let minCount = 0, if badgecode === 1/2 then minCount = 15/5
// return upvotesCount >= minCount &&

// 3.
// awardBadge(topic, badgecode 0S/1G/2T):
// run hasBadge() with the same 2 params. if true, do nothing.
// if false, update user.badges['topic'] with new badgecode AND createNotif() with same 2 params.

// helper functions:

// tallyIndivUpvotes(topic): return integer

// percentileFinder(topic):
// totalUsers = usersCollection.count() or sth
// let rank = 1
// loop through all i users and calculate tallyIndivUpvotes(topic) for all of them
    // for

// createNotif(topic, tag): 
// each user should have a notifications object, where each element has timestamp and message and type
// within awardSage/awardGuru/awardThinker, 