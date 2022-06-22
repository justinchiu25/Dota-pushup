import react, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { addUser } from "../Redux/Auth";

export default function UserProfile() {
    const steamId = useRef();
    const dispatch = useDispatch();
    const [error, setError] = useState();
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(evt) {
        evt.preventDefault();
        const userExist = await dispatch(addUser(currentUser.uid,steamId.current.value)); //dispatch returns undefined if no error
        if (!userExist) {
            navigate(`/user/${steamId.current.value}`)
        }
        setError(userExist)
    }
    return (
        <div>
            {error && <div> {error} </div>}
            <form onSubmit={handleSubmit}>
                <label> Enter your steam id: </label>
                <></>
                <input type="text" ref={steamId} />
                <button type="submit"> Submit </button>
            </form>
        </div>
    )
}