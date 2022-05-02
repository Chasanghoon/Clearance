import React from 'react';
import {Link} from 'react-router-dom';
import Button from "react-bootstrap/Button";

function Login(props) {
    return (
        <div>
            <h1>로그인 페이지</h1>
            <Link to="../main"><Button> 로그인 </Button></Link>
        </div>
    );
}

export default Login;
//userContext