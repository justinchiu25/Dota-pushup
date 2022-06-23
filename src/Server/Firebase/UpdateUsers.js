const firebase = require('firebase/compat/app');
require('firebase/compat/auth');
require('firebase/compat/firestore');
const firebasekey = require("../../firebaseKey.json");
const { getFirestore, updateDoc, collection, getDocs } = require("firebase/firestore");

const firebaseConfig = {
    apiKey: firebasekey.firebase_apiKey,
    authDomain: firebasekey.firebase_authDomain,
    projectId: firebasekey.firebase_projectId,
    storageBucket: firebasekey.firebase_storageBucket,
    messagingSenderId: firebasekey.firebase_messagingSenderId,
    appId: firebasekey.firebase_appId,
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