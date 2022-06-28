import React from "react";
import { Link } from "react-router-dom";
export default function LeaderboardUser( { user, index}) {
    return (
        <tr>
            <th scope="row"> {index+1} </th>
            <td>
                <Link to={`/user/${user.id}`} className="text-white" style={{textDecoration: "none"}}>
                <img src={user.profileImage} style={{maxHeight: "50px", maxWidth: "50px"}} alt="profile"></img>
                <> </>
                {user.gameName} </Link>
            </td>
            <td> {user.pushUp} </td>
            <td> {user.completed} </td>
        </tr>
    )
}