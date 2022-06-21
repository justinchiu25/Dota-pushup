import react from "react";

export default function LeaderboardUser( { user, index } ) {

    return (
        <tr>
            <th scope="row"> {index+1} </th>
            <td> {user.gameName} </td>
            <td> {user.pushUp} </td>
            <td> {user.completed} </td>
        </tr>
    )
}