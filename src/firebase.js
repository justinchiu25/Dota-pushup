import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebasekey = require("./firebaseKey.json")

//MUST CHANGE THIS TO PROCESS.ENV
const firebaseConfig = {
    apiKey: firebasekey.firebase_apiKey,
    authDomain: firebasekey.firebase_authDomain,
    projectId: firebasekey.firebase_projectId,
    storageBucket: firebasekey.firebase_storageBucket,
    messagingSenderId: firebasekey.firebase_messagingSenderId,
    appId: firebasekey.firebase_appId,
}
    
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export default app;