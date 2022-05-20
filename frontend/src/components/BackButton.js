import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const BackButton = () => {
    let navigate = useNavigate();

    

    return (
        <div className="back">
            <img style={{
                opacity:"60%"
            }} width="60px" alt="" src="img/back.png" onClick={() => {
                navigate(-1)
            }}/>
        </div>
    )
}

export default BackButton;