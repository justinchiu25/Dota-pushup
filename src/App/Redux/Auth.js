import axios from "axios";
import { getFirestore, doc, setDoc, getDoc, getDocs, where, collection, query} from "firebase/firestore";

const initialState = {};

const ADD_USER = "ADD_USER";
const SET_AUTH = "SET_AUTH";

const addUser_ = (user) => {
    return {
        type: ADD_USER,
        user
    }
}

const setAuth_ = (user) => {
    return {
        type: SET_AUTH,
        user
    }
}

//Adds to database
export const addUser = (userId, steamId) => {
    return async (dispatch) => {
        const db = getFirestore();
        try {
            const userRef = collection(db, "users");
            const userIDQuery = query(userRef, where("id", "==", +steamId));
            const userSnapshot = await getDocs(userIDQuery);
            if (userSnapshot.docs.length !== 0) {
                throw "User already exists"
            }
        } catch (err) {
            return (err);
        }

        const { data } = await axios.get(`https://api.opendota.com/api/players/${steamId}`)
        const recentGame = await axios.get(`https://api.opendota.com/api/players/${steamId}/recentMatches`);
        const userInfo = {
            gameName: data.profile.personaname,
            id: +steamId,
            pushUp: 0,
            completed: 0,
            recentMatch: recentGame.data[0].match_id,
            profileImage: data.profile.avatarfull
        }
        try {            
            const userRef = doc(db, "users", userId.toString());
            await setDoc(userRef, userInfo);
        } catch (err) {
            console.log(err);
        }

        dispatch(addUser_(userInfo));
    }
}

export const setAuth = (currentUser) => {
    return async (dispatch) => {
        const db = getFirestore();
        const userRef = doc(db,"users", currentUser.uid.toString());
        const userSnap = await getDoc(userRef);
        dispatch(setAuth_(userSnap.data()));
    }
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_USER:       
            return {...action.user};
        case SET_AUTH:
            return {...action.user};
        default:
            return state;
    }
}