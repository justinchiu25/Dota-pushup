import { getFirestore, updateDoc, collection, query, where, getDocs } from "firebase/firestore";

const initialState = {};

//Actions
const SET_USER = "SET_USER";
const UPDATE_USER = "UPDATE_USER";

const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}

const updateUser_ = (user) => {
    return {
        type: UPDATE_USER,
        user
    }
}


//Retrieves userId and returns an object
export const fetchUser = (userId) => {
    return async (dispatch) => {
        let data = {};
        const db = getFirestore();
        const userRef = collection(db, "users");
        const userIDQuery = query(userRef, where("id", "==", +userId));
        const userSnapshot = await getDocs(userIDQuery);
        userSnapshot.forEach((doc) => {
            data = doc.data();
        })
        dispatch(setUser(data));
    }
}
//Updates user documents
export const updateUser = (user, matches) => {
    return async (dispatch) => {
        
        const newMatches = matches.filter( element => element.match_id > user.recentMatch);
        let newDeaths = user.pushUp;
        newMatches.forEach(element => {
            newDeaths += element.deaths;
        })
        const updatedValues = {
            pushUp: newDeaths,
            recentMatch: matches[0].match_id
        }
        try {
            const db = getFirestore();
            const userRef = collection(db, "users");
            const userIDQuery = query(userRef, where("id", "==", +user.id));
            const userSnapshot = await getDocs(userIDQuery);
            await updateDoc(userSnapshot.docs[0].ref, updatedValues);
        } catch (err) {
            console.log(err)
        }
        dispatch(updateUser_(updatedValues));
    }
}


export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {...action.user};
        case UPDATE_USER:
            return {...state, pushUp: action.user.pushUp, recentMatch: action.user.recentMatch }
        default:
            return state;
    }

}