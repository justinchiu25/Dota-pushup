import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserCompletedPushUp } from "../Redux/User";

export default function ProfileInput( { user } ) {
    const [error, setError] = useState();
    const pushUpRef = useRef();
    const dispatch = useDispatch();
    function handleSubmit(evt) {
        evt.preventDefault();
        const pushUpValue = Math.floor(+pushUpRef.current.value)
        setError("");
        if (!isNaN(pushUpValue) && pushUpValue > 0 && pushUpValue <= user.pushUp){
            dispatch(updateUserCompletedPushUp(user,pushUpValue))
            evt.target.reset();
        } else {
            setError("Please enter a valid number");
        }


    }

    return (
        <form onSubmit={handleSubmit} style={{textAlign: "center"}}>
            {error && <div className="alert alert-primary" role="alert"> {error} </div>}
            <label className="text-white"> Completed Push Ups:  </label>
            <> </>
            <input type="text" ref={pushUpRef} />
            <button type="submit"> Submit </button>
        </form>
    )
}