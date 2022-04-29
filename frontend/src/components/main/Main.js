import React from 'react';
import {Link} from 'react-router-dom';
import Button from "react-bootstrap/Button";

function Main() {
    return (
        <>
            <h1>메인페이지</h1>
            <Link to="login"><Button variant="primary"> 로그인 </Button></Link> 
            <Link to="signupUser"><Button variant="success"> 일반 회원가입 </Button></Link> 
            <Link to="signupStore"><Button variant="danger"> 매장 회원가입 </Button></Link> 
        </>
    );
}

export default Main;