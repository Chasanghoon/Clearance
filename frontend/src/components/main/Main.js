import React from 'react';
import {Link} from 'react-router-dom';
import Button from "react-bootstrap/Button";

function Main() {
    return (
        <>
            <h1>메인페이지</h1>
            <Link to="login"><Button> 로그인 </Button></Link> 
            <Link to="register"><Button> 회원가입 </Button></Link> 
        </>
    );
}

export default Main;