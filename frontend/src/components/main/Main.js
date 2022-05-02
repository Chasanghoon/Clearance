import React from 'react';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";

function Main() {

    console.log("id : " + sessionStorage.getItem("id"));
    console.log("token : " + sessionStorage.getItem("access_token"));

    alert("id : " + sessionStorage.getItem("id"));
    alert("token : " + sessionStorage.getItem("access_token"));

    const Logout = (e) => {
        sessionStorage.clear();
        console.log("id : " + sessionStorage.getItem("id"));
        console.log("token : " + sessionStorage.getItem("access_token"));

        alert("id : " + sessionStorage.getItem("id"));
        alert("token : " + sessionStorage.getItem("access_token"));
    };

    return (
        <>
            <h1>메인페이지</h1>
            <Link to="login"><Button variant="primary"> 로그인 </Button></Link>
            <Link to="signupUser"><Button variant="success"> 일반 회원가입 </Button></Link>
            <Link to="signupStore"><Button variant="danger"> 매장 회원가입 </Button></Link>
            <Button onClick={Logout}>로그아웃</Button>
        </>
    );
}

export default Main;