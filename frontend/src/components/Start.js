import React from 'react';
import {Link} from 'react-router-dom';
import Button from "react-bootstrap/Button";

function Start() {
    return (
        <>
            
            <div style={{
                textAlign: 'left',
                position: 'relative',
                left: '30px'
            }
            }>you can become A smart <br/> Consumer</div>
            <h1 style={{
                position: 'relative',
                
            }}>Clearance</h1>
            <Link to="login"><Button> 로그인 </Button></Link>
            <br/>
            <Link to="register"><Button> 회원가입 </Button></Link> 

        </>
    );
}

export default Start;