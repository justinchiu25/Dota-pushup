//import axios from "axios";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const initialState = {};

const SET_DOTA = "SET_DOTA";

const setDota_ = (dota) => {
    return {
        type: SET_DOTA,
        dota
    }
}

//Sets amount of deaths
//Does not currently have a check for only WINNING games
export const setDota = (user, matches) => {
    return async (dispatch) => {
        console.log(matches, user);
        
        const newMatches = matches.filter( element => element.match_id > user.recentMatch);
        console.log(newMatches);
        let newDeaths = user.pushUp;
        newMatches.forEach(element => {
            newDeaths += element.deaths;
        })
        console.log("pushUp", newDeaths);
        try {
            const db = getFirestore();
            const userRef = doc(db, "users", user.id.toString());
            await updateDoc(userRef, {
                pushUp: newDeaths,
                recentMatch: matches[0].match_id
            })
        } catch (err) {
            console.log(err)
        }
        dispatch(setDota_(newDeaths));
    }
}

export default function dotaReducer(state = initialState, action) {
    switch (action.type) {
        case SET_DOTA:       
            return {...state, deaths: action.dota};
        default:
            return state;
    }
}