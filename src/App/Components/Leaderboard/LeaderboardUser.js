import react from "react";

export default function LeaderboardUser( { user, index } ) {

    return (
        <tr>
            <th scope="row"> {index+1} </th>
            <td>
                <img src={user.profileImage} style={{maxHeight: "50px", maxWidth: "50px"}}></img>
                <> </>
                {user.gameName} 
            </td>
            <td> {user.pushUp} </td>
            <td> {user.completed} </td>
        </tr>
    )
}