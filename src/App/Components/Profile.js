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
        <div className="bg-dark" style={{height: "100vh", width: "100vw"}}>
            <section>
                <div className="bg-dark" style={{position: "relative"}}>
                    <h1 className="text-white" style={{textAlign: "center"}}> {user.gameName} </h1>
                    <div className="row"> 
                        <div className="col">
                            <div style={{textAlign: "center"}}>
                                <img src={user.profileImage} alt="profile" style={{maxHeight: "150px", maxWidth: "150px", justifyContent: "center"}} />
                            </div>
                        </div>
                        <div className="col-6 d-flex align-items-center">
                            <div>
                                <div className="text-white"> {user.gameName} has to do {user.pushUp} push ups.</div> 
                                <div className="text-white"> Has completed a total of {user.completed} push ups.</div>
                            </div>
                        </div>
                        <button className="col-sm" style={{maxHeight: "75px", maxWidth: "100px", marginRight: "50px"}} onClick={updateInfo}> Refresh stats </button>
                        {auth.id === +userId && <ProfileInput user={user}/> }           
                    </div>
                </div>
            </section>
        </div>
    )
}