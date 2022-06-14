import axios from "axios";

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
export const setDota = (matches,recentMatch) => {
    return async (dispatch) => {
        console.log(matches, recentMatch);
        
        const newMatches = matches.filter( element => element.match_id > recentMatch);
        let newDeaths = 0;
        newMatches.forEach(element => {
            newDeaths += element.deaths;
        })
        try {
            const { data } = await axios.put('/api/dota', newDeaths)
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