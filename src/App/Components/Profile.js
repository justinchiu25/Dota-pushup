import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, updateUser } from "../Redux/User";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import axios from "axios";
import ProfileInput from "./ProfileInput";

const fetcher = url => axios.get(url).then(res => res.data)


export default function Profile() {
    const user = useSelector((state) => state.user);
    const auth = useSelector((state) => state.auth);
    const lol = "lol"
    const { userId } = useParams()
    const dispatch = useDispatch();
    const { data } = useSWR(`https://api.opendota.com/api/players/${userId}/recentMatches`, fetcher);

    useEffect( () => {
        dispatch(fetchUser(userId)) //current page id
    },[userId, dispatch])
    
    function updateInfo() {
        if(Object.keys(user).length > 0) {
            dispatch(updateUser(user, data))
        }
    }

    return (
        <>
            <img src={user.profileImage} alt="profile" />
            <div> {user.gameName} has to do {user.pushUp} push ups.</div>
            <button onClick={updateInfo}> Refresh stats </button>
            <ProfileInput maxPushUp={user.pushUp} /> 
        </>
    )
}