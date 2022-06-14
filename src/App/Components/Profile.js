import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../Redux/User";
import useSWR from "swr";
import axios from "axios";
import { setDota } from "../Redux/Dota";

const fetcher = url => axios.get(url).then(res => res.data)


export default function Profile() {
    const user = useSelector((state) => state.user);
    const dotaStats = useSelector((state) => state.dota);
    const [name,setName] = useState(user.gameName);
    const [pushUp, setPushUp] = useState(user.pushUp);
    const dispatch = useDispatch();
    const { data, error} = useSWR("https://api.opendota.com/api/players/80476528/recentMatches", fetcher);
    

    useEffect( () => {
        dispatch(fetchUser(80476528)) //current page id
    },[])
    
    useEffect( () => {
        console.log(user);
        if(Object.keys(user).length > 0) {
            dispatch(setDota(user, data))
        }
    },[data])

    //console.log (data);
    return (
        <div> {user.gameName} has to do {user.pushUp} push ups.</div>
    )
}