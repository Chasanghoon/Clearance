import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import './Login.css';

function Login(props) {

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const onChangeId = (e)=> {
        setUserId(e.target.value);
    }
    const onChangePassword = (e)=> {
        setPassword(e.target.value);
    }

    const onSubmit = (e) => {

        console.log("id : " + userId);
        console.log("pw : " + password);

        // ! axios POST
        console.log("axios post")

        axios
            .post("http://localhost:8080/api/auth/login",
                {
                    user_id: userId,
                    user_password: password,
                }
                ,
                {
                    headers: { 'Content-Type': 'application/json' }
                },
            )
            .then((e) => {
                console.log("axios post 성공")
                alert("로그인 완료!");
                console.log(e)
                console.log(e.data[0]);
                console.log(e.data[1]);
                sessionStorage.setItem("id", e.data[1]);
                sessionStorage.setItem("access_token", e.data[0]);
                navigate("/main");
                
            })
            .catch((e) => {
                console.error("axios post 실패");
                console.error(e.message);
                alert("아이디와 비밀번호를 확인해주세요.");
            });
    };
    let navigate = useNavigate();

    return (
        <div>
            <div className='title'>
                <h1>Clearance</h1>
            </div>
            <Container className='mt-5'>
                <Form className='form'>
                    <Form.Group as={Row} className="mb-3">
                        <Col sm>
                            <Form.Control maxLength={20} placeholder="아이디" value={userId} onChange={onChangeId}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col sm>
                            <Form.Control maxLength={20} type="password" placeholder="비밀번호" value={password} onChange={onChangePassword}/>
                        </Col>
                    </Form.Group>

                    <div className="d-grid gap-1 mb-3">
                        <Button className='button' onClick={onSubmit}>Login</Button>
                    </div>
                </Form>
                {/* <br />
                <span className="text">Have an account? <Link to="/login" className="link">Sign In</Link></span> */}
            </Container>
        </div>
    );
}

export default Login;
//userContext