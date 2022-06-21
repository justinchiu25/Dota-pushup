import react, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLeaderboard } from "../../Redux/Leaderboard";
import LeaderboardUser from "./LeaderboardUser";

export default function Leaderboard() {
    const dispatch = useDispatch();
    const leaderboards = useSelector((state) => state.leaderboard);
    const [ variable, setVariable] = useState("pushUp");

    useEffect( () => {
        dispatch(setLeaderboard(variable));
    },[dispatch,variable])
    return (
        <>
        <table className="table table-dark table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Push Ups</th>
                    <th scope="col">Completed</th>
                </tr>
            </thead>
            <tbody>
                {leaderboards.map((element,index) => {
                    return <LeaderboardUser key={index} user={element} index={index} />
                })}
            </tbody>
        </table>
        <button onClick={() => setVariable("pushUp")}> Push Up </button>
        <button onClick={() => setVariable("completed")}> Completed </button>
        </>
    )
}