import { getFirestore, collection, query, orderBy, limit, getDocs } from "firebase/firestore";

const initialState = [];

const SET_LEADERBOARD = "SET_LEADERBOARD";

const setLeaderboard_ = (leaderboard) => {
    return {
        type: SET_LEADERBOARD,
        leaderboard
    }
}

export const setLeaderboard = (type) => {
    return async (dispatch) => {
        const db = getFirestore();
        const userRef = collection(db, "users");
        const userIDQuery = query(userRef, orderBy("pushUp","desc"), limit(25));
        const userSnapshot = await getDocs(userIDQuery);
        const sortedLeaderboard = [];
        userSnapshot.forEach((docs) => {
            sortedLeaderboard.push(docs.data());
        })
        dispatch(setLeaderboard_(sortedLeaderboard));
    }
}

export default function leaderboardReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LEADERBOARD:
            return action.leaderboard;
        default:
            return state;
    }
}