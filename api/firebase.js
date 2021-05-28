import firebase from 'firebase/app';
import database from '@react-native-firebase/database';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAW5E4TNBtX9z-O_1aRwdPcof_Wy2MkF7I",
    authDomain: "p-ng-b2da6.firebaseapp.com",
    projectId: "p-ng-b2da6",
    storageBucket: "p-ng-b2da6.appspot.com",
    messagingSenderId: "508328321815",
    appId: "1:508328321815:web:c1f203165a4e2b837a8d52",
    measurementId: "G-T120TKPM7G"
};

firebase.initializeApp(firebaseConfig);
firebase.auth();

const infodb = firebase.firestore();
// export const firebaseTimestamp = firebase.firestore.FieldValue.serverTimestamp;

const chatdb = database().ref('??????');

export const usersCollection = db.collection('users');
export const badgesCollection = db.collection('badges');
export const tagsCollection = db.collection('tags');
// export const messagesCollection = db.collection('messages');
export const roomsCollection = db.collection('rooms');


export default firebase;