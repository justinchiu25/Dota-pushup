import react, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../Contexts/AuthContext";
import { addUser } from "../Redux/Auth";

export default function UserProfile() {
    const steamId = useRef();
    const dispatch = useDispatch();
    const { currentUser } = useAuth();

    function handleSubmit(evt) {
        evt.preventDefault();

        console.log(steamId.current.value, currentUser.uid);
        dispatch(addUser(currentUser.uid,steamId.current.value));
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" ref={steamId} />
            <button type="submit"> Submit </button>
        </form>
    )
}