import React from "react";
import { Outlet } from "react-router-dom";


export default function Navbar() {

    return (
        <>
            <div> Navbar </div>

            <Outlet /> {/*Outlet important to render children*/} 
        </>
    )
}