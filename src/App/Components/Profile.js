import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, updateDeaths } from "../Redux/User";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import axios from "axios";

const fetcher = url => axios.get(url).then(res => res.data)


export default function Profile() {
    const user = useSelector((state) => state.user);
    const { userId } = useParams()
    const dispatch = useDispatch();
    const { data, error} = useSWR(`https://api.opendota.com/api/players/${userId}/recentMatches`, fetcher);

    useEffect( () => {
        dispatch(fetchUser(userId)) //current page id
    },[userId])
    
    function updateInfo() {
        console.log("updating"); 
        if(Object.keys(user).length > 0) {
            dispatch(updateDeaths(user, data))
        }
    }

    return (
        <>
            <img src={user.profileImage} />
            <div> {user.gameName} has to do {user.pushUp} push ups.</div>
            <button onClick={updateInfo}> Refresh stats </button>
        </>
    )
}