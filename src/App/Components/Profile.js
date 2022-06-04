import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../Redux/User";

export default function Profile() {
    const user = useSelector((state) => state.user); 
    const [name,setName] = useState(user.gameName);
    const [pushUp, setPushUp] = useState(user.pushUp);
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(fetchUser(80476528)) //current page id
        setName(user.gameName);
        setPushUp(user.pushUp);
    },[])
    return (
        <div> {user.gameName} has to do {user.pushUp} push ups.</div>
    )
}