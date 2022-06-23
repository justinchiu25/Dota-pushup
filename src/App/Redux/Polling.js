import axios from "axios";
import { getFirestore, updateDoc, collection, query, where, getDocs } from "firebase/firestore";

const inititialState = {
    isPolling: false
}

const SET_POLLING = "SET_POLLING";

const pollingAction_ = (isPolling) => {
    return {
        type: SET_POLLING,
        isPolling
    }
}

export const pollingAction = () => {
    return async (dispatch) => {
        dispatch(pollingAction_("true"));
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
        //const userIDQuery = query(userRef);
        console.log("All the stuff");
        dispatch(pollingAction_("false"));

    }
}

export default function pollingReducer(state = inititialState, action) {
    switch (action.type) {
        case SET_POLLING:
            return {...state, isPolling: action.isPolling};
        default:
            return state;
    }
}