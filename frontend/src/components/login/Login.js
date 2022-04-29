import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Spinner } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Login(props) {

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const [userIdError, setUserIdError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const onChangeUserId = (e) => {
        const userIdRegex = /^[a-zA-z0-9]{4,12}$/;
        if ((!e.target.value || (userIdRegex.test(e.target.value)))) setUserIdError(false);
        else setUserIdError(true);
        setUserId(e.target.value);
    };
    const onChangePassword = (e) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if ((!e.target.value || (passwordRegex.test(e.target.value)))) setPasswordError(false);
        else setPasswordError(true);

        setPassword(e.target.value);
    };

    const validation = () => {
        if (!userId) setUserIdError(true);
        if (!password) setPasswordError(true);

        if (userIdError || passwordError) return true;
        else return false;
    };

    const onSubmit = (e) => {

        if (validation()) return;

        // ! axios POST
        console.log("axios post")
        const storeSignUpRequest = {
            user_id: userId,
            user_password: password,
        }
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
            })
            .catch((e) => {
                console.error("axios post 실패");
                console.error(e);
            });
    };

    return (
        <div>
            <Container className='mt-5'>
                <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Col sm>
                            <Form.Control maxLength={20} placeholder="아이디" value={userId} onChange={onChangeUserId} />
                            {userIdError && <div className="invalid-input">ID는 영문 대소문자와 숫자 4~12자리로 입력해야합니다.</div>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col sm>
                            <Form.Control maxLength={20} type="password" placeholder="비밀번호" value={password} onChange={onChangePassword} />
                            {passwordError && <div className="invalid-input">암호는 8자 이상이어야 하며 문자와 숫자를 하나 이상 포함해야 합니다. </div>}
                        </Col>
                    </Form.Group>
                   
                    <div className="d-grid gap-1 mb-3">
                        <Button variant="secondary" onClick={onSubmit}>Sign Up</Button>
                    </div>
                </Form>
                {/* <br />
                <span className="text">Have an account? <Link to="/login" className="link">Sign In</Link></span> */}
            </Container>
        </div>
    );
}

export default Login;