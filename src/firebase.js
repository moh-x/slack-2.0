import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBD9nNBRIVyOZLGvocp_reFJYPFOMMo3ts",
  authDomain: "slack-02.firebaseapp.com",
  projectId: "slack-02",
  storageBucket: "slack-02.appspot.com",
  messagingSenderId: "2728812905",
  appId: "1:2728812905:web:0cd41f05d34cd997f71df8",
};

const firebaseApp = firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
