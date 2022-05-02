import React from 'react';
import {Link} from 'react-router-dom';
import Button from "react-bootstrap/Button";
import NavBar from '../NavBar';
import Map from "./Map";


function Main() {

    return (
        <div>
            <NavBar></NavBar>
            <Map></Map>
        </div>
    )
}

export default Main;