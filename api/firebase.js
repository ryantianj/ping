import firebase from 'firebase/app';
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

const db = firebase.firestore();
// export const firebaseTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export const usersCollection = db.collection('users');

export default firebase;