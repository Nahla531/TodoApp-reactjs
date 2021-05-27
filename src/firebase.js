import firebase from "firebase";
const firebaseapp = firebase.initializeApp({});

const db = firebaseapp.firestore();

export default db;
