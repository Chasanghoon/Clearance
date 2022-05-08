import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import './Login.css';
import userStore from '../../store/userStore';

function Login(props) {

    const setUserId = userStore(state => state.setUserId);
    const setUserRole = userStore(state => state.setUserRole);
    const setUserName = userStore(state => state.setUserName);
    const setUserEmail = userStore(state => state.setUserEmail);
    const setUserPhone = userStore(state => state.setUserPhone);
    const setUserAddress = userStore(state => state.setUserAddress);
    const setUserLicenseNum = userStore(state => state.setUserLicenseNum);
    const setUserImage = userStore(state => state.setUserImage);

    const [inputUserId, setInputUserId] = useState("");
    const [inputPassword, setInputPassword] = useState("");

    const onChangeId = (e) => {
        setInputUserId(e.target.value);
    }
    const onChangePassword = (e) => {
        setInputPassword(e.target.value);
    }

    const onSubmit = (e) => {
        // console.log("id : " + inputUserId);
        // console.log("pw : " + inputPassword);
        // ! axios POST
        console.log("axios post")
        axios
            .post("http://localhost:8080/api/auth/login",
                {
                    user_id: inputUserId,
                    user_password: inputPassword,
                },
            )
            .then((e) => {
                console.log("axios post 성공")
                alert("로그인 완료!");
                // console.log(e)
                // console.log(e.data[0]);
                // console.log(e.data[1]);
                sessionStorage.setItem("id", e.data[1]);
                sessionStorage.setItem("access_token", e.data[0]);
                userData();
            })
            .catch((e) => {
                console.error("axios post 실패");
                console.error(e.message);
                alert("아이디와 비밀번호를 확인해주세요.");
            });
    };
    function userData() {
        // ! axios get
        axios
            .get(`http://localhost:8080/api/member?userId=${sessionStorage.getItem("id")}`)
            .then((result) => {
                setUserId(result.data.userId);
                setUserRole(result.data.userRole);
                setUserName(result.data.userName);
                setUserEmail(result.data.userEmail);
                setUserPhone(result.data.userPhone);
                setUserAddress(result.data.userAddress);
                setUserLicenseNum(result.data.userLicensenum);
                setUserImage(result.data.userImage);
                navigate("/main");

            })
            .catch((e) => {
                console.error("axios get 실패");
                console.error(e)
            });
    }
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
                            <Form.Control maxLength={20} placeholder="아이디" value={inputUserId} onChange={onChangeId} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col sm>
                            <Form.Control maxLength={20} type="password" placeholder="비밀번호" value={inputPassword} onChange={onChangePassword} />
                        </Col>
                    </Form.Group>

                    <div className="d-grid gap-1 mb-3">
                        <Button className='button' onClick={onSubmit}>Login</Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
}

export default Login;
//userContext