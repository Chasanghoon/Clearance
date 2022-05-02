import React from 'react';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import NavBar from '../NavBar';
import Map from "./Map";

function Main() {

    console.log("id : " + sessionStorage.getItem("id"));
    console.log("token : " + sessionStorage.getItem("access_token"));

    const Logout = (e) => {
        sessionStorage.clear();
        console.log("id : " + sessionStorage.getItem("id"));
        console.log("token : " + sessionStorage.getItem("access_token"));

    };

    return (
        <>
            <h1>메인페이지</h1>
            <Button onClick={Logout}>로그아웃</Button>
            <Map></Map>
        </>
    );
}

export default Main;