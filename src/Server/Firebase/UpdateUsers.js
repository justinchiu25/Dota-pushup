const axios = require('axios');
const firebase = require('firebase/compat/app');
require('firebase/compat/auth');
require('firebase/compat/firestore');
const { getFirestore, updateDoc, collection, getDocs } = require("firebase/firestore");
require("dotenv").config();

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACTAPP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGESENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID
}
    
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();



async function updateUsers() {
    try {
        const db = getFirestore();
        const userRef = collection(db, "users");
        const userSnapshot = await getDocs(userRef);
        userSnapshot.forEach( async (doc) => {
            const { data } = await axios.get(`https://api.opendota.com/api/players/${doc.data().id}/recentMatches`)
            const newMatches = data.filter( element => element.match_id > doc.data().recentMatch);
            let newDeaths = doc.data().pushUp;
            newMatches.forEach(element => {
                newDeaths += element.deaths;
            })
            const updatedValues = {
                pushUp: newDeaths,
                recentMatch: data[0].match_id
            }
            await updateDoc(doc.ref, updatedValues)
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = updateUsers;