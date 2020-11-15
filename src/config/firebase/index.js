import firebase from 'firebase'
import 'firebase/auth';
// import 'firebase/firestore';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAzIv54X-_hZCqul6wpViWLE5v0aI_7WSE",
  authDomain: "react-note-firebase-927c7.firebaseapp.com",
  databaseURL: "https://react-note-firebase-927c7.firebaseio.com",
  projectId: "react-note-firebase-927c7",
  storageBucket: "react-note-firebase-927c7.appspot.com",
  messagingSenderId: "255974923901",
  appId: "1:255974923901:web:8bf3e52b7a2bf6e725db14",
  measurementId: "G-D8QMNLNRK5",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const database = firebase.database();
export default firebase;