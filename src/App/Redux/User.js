import axios from "axios";
import { getFirestore, collection, getDoc, doc } from "firebase/firestore";

const initialState = {};

//Actions
const SET_USER = "SET_USER";

const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}

//Retrieves userId and returns an object
export const fetchUser = (userId) => {
    return async (dispatch) => {
        const db = getFirestore();
        const userRef = doc(db,"users", userId.toString());
        const userSnap = await getDoc(userRef);
        dispatch(setUser(userSnap.data()));
    }
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            console.log(action);
            return {...action.user};
        default:
            return state;
    }

}