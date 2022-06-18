import { getFirestore, updateDoc, getDoc, doc, collection, query, where, getDocs } from "firebase/firestore";

const initialState = {};

//Actions
const SET_USER = "SET_USER";
const UPDATE_DEATHS = "UPDATE_DEATHS";

const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}

const updateDeaths_ = (user) => {
    return {
        type: UPDATE_DEATHS,
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
        console.log(data);
        dispatch(setUser(data));
    }
}
//Sets amount of deaths
export const updateDeaths = (user, matches) => {
    return async (dispatch) => {
        console.log(matches, user);
        
        const newMatches = matches.filter( element => element.match_id > user.recentMatch);
        let newDeaths = user.pushUp;
        newMatches.forEach(element => {
            newDeaths += element.deaths;
        })
        console.log("pushUp", newDeaths);
        const updatedValues = {
            pushUp: newDeaths,
            recentMatch: matches[0].match_id
        }
        try {
            const db = getFirestore();
            const userRef = doc(db, "users", user.id.toString());
            await updateDoc(userRef, updatedValues )
        } catch (err) {
            console.log(err)
        }
        dispatch(updateDeaths_(updatedValues));
    }
}


export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {...action.user};
        case UPDATE_DEATHS:
            return {...state, pushUp: action.user.pushUp, recentMatch: action.user.recentMatch }
        default:
            return state;
    }

}