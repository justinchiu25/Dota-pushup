import react, { useRef, useState } from "react";

export default function ProfileInput( { maxPushUp } ) {
    const [error, setError] = useState();
    const pushUpRef = useRef();

    function handleSubmit(evt) {
        evt.preventDefault();
        const pushUpValue = Math.floor(+pushUpRef.current.value)
        console.log(pushUpValue);
        if (!isNaN(pushUpValue) && maxPushUp >= 0 && pushUpValue <= maxPushUp){
            console.log("A number");
        } else {
            console.log("Please enter valid");
        }


    }

    return (
        <form onSubmit={handleSubmit}>
            <label> How many push ups </label>
            <input type="text" ref={pushUpRef} />
            <button type="submit"> Submit </button>
        </form>
    )
}