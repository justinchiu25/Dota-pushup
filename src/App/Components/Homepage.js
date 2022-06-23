import React from "react";
import { useDispatch } from "react-redux";
import { pollingAction } from "../Redux/Polling";

export default function Homepage() {
    const dispatch = useDispatch();

    function handleClick(evt) {
        evt.preventDefault();
        dispatch(pollingAction());
    }

    return (
        <button type="button" onClick={handleClick}> button </button>
    )
}