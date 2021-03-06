import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage'

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
firebase.storage()

const infodb = firebase.firestore();

export const usersCollection = infodb.collection('Users');
export const roomsCollection = infodb.collection('Rooms');
export const interestsCollection = infodb.collection('Interests');
export const channelsCollection = infodb.collection('Channel');
export const globalNotiCollection = infodb.collection('GlobalNoti')

export default firebase;
