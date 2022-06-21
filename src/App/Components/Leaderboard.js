import react, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLeaderboard } from "../Redux/Leaderboard";

export default function Leaderboard() {
    const dispatch = useDispatch();
    const leaderboards = useSelector((state) => state.leaderboard);
    const [ variable, setVariable] = useState("pushUp");

    useEffect( () => {
        dispatch(setLeaderboard(variable));
    },[dispatch])
    return (
        leaderboards.map((element) => {
            return <div> {element.gameName} with {element.pushUp} push ups </div>
        })
    )
}