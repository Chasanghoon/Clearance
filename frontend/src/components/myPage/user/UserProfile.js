import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Spinner } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

import { Navigate, useNavigate } from 'react-router-dom'
import userStore from '../../../store/userStore';
import axios from 'axios';

function UserProfile(props) {


    const userId = userStore(state => state.userId);
    const userName = userStore(state => state.userName);
    const userEmail = userStore(state => state.userEmail);
    const userPhone = userStore(state => state.userPhone);
    const userAddress = userStore(state => state.userAddress);
    const userImage = userStore(state => state.userImage);

    const setUserName = userStore(state => state.setUserName);
    const setUserEmail = userStore(state => state.setUserEmail);
    const setUserPhone = userStore(state => state.setUserPhone);
    const setUserAddress = userStore(state => state.setUserAddress);
    const setUserImage = userStore(state => state.setUserImage);
    const [image, setImage] = useState("");

    const [userNameError, setUserNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [addressError, setAddressError] = useState(false);

    const onChangeUserName = (e) => {
        setUserNameError(false);
        setUserName(e.target.value)
    };
    const onChangeEmail = (e) => {
        const emailRegex = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
        if (!e.target.value || emailRegex.test(e.target.value)) setEmailError(false);
        else setEmailError(true);
        setUserEmail(e.target.value);
    };
    const onChangePhone = (e) => {
        const phoneRegex = /^[0-9]{3}[-]{1}[0-9]{3,4}[-]{1}[0-9]{4}$/;
        if ((!e.target.value || (phoneRegex.test(e.target.value)))) setPhoneError(false);
        else setPhoneError(true);
        setUserPhone(e.target.value)
    };
    const onChangeAddress = (e) => {
        setAddressError(false);
        setUserAddress(e.target.value)
    };

    const validation = () => {
        if (!userName) setUserNameError(true);
        if (!userEmail) setEmailError(true);
        if (!userPhone) setPhoneError(true);
        if (!userAddress) setAddressError(true);

        if (userNameError || emailError || phoneError || addressError) return true;
        else return false;
    };

    const onSubmit = (e) => {
        if (validation()) return;

        // ! axios POST
        console.log("axios post")
        axios
            .put("http://localhost:8080/api/member",
                {
                    user_address: userAddress,
                    user_email: userEmail,
                    user_id: userId,
                    user_name: userName,
                    user_phone: userPhone,
                }
                ,
                {
                    headers: { 'Content-Type': 'application/json' }
                },
            )
            .then(() => {
                console.log("axios post 성공")
                alert("회원가입 완료!");
                navigate(-1);

            })
            .catch((e) => {
                console.error("axios post 실패");
                console.error(e);
            });
    };



    const [loaded, setLoaded] = useState(false);
    const saveImage = (e) => {
        e.preventDefault();
        const fileReader = new FileReader();

        if (e.target.files[0]) {
            setLoaded("loading")
            fileReader.readAsDataURL(e.target.files[0])
        }
        fileReader.onload = () => {
            setImage(e.target.files[0]);
            setUserImage(fileReader.result);
            setLoaded(true);
        }
    }
    const deleteImage = () => {
        setImage("");
        setUserImage("img/default_image.png");
        setLoaded(false);
    }

    let navigate = useNavigate();

    return (
        <div>
            <Container className='mt-5'>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formFile" style={{ "textAlign": "center" }}>
                        <div className='imageDiv'>
                            {loaded === false || loaded === true ?
                                (<img className='imgFile' src={userImage} alt="userImage" />) :
                                (<Spinner animation="border" variant="warning" />)}
                        </div>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col sm>
                            <Form.Control maxLength={20} placeholder="아이디" value={userId} disabled readOnly />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col sm>
                            <Form.Control maxLength={20} placeholder="이름" value={userName} onChange={onChangeUserName} />
                            {userNameError && <div className="invalid-input">입력되지 않았습니다.</div>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col sm>
                            <Form.Control maxLength={50} type="input" placeholder="이메일" value={userEmail} onChange={onChangeEmail} />
                            {emailError && <div className="invalid-input">올바른 이메일 형식을 입력하세요.</div>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col sm>
                            <Form.Control maxLength={20} placeholder="연락처" value={userPhone} onChange={onChangePhone} />
                            {phoneError && <div className="invalid-input">올바른 전화번호를 입력하세요.</div>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col sm>
                            <Form.Control maxLength={20} placeholder="주소" value={userAddress} onChange={onChangeAddress} />
                            {addressError && <div className="invalid-input">주소를 입력해주세요. <br /> 부산 사하구 하신중앙로 2 이런 형식으로 넣어야함...</div>}
                        </Col>
                    </Form.Group>

                    <div className="d-grid gap-1 mb-3">
                        <Button variant="secondary" onClick={onSubmit}>회원 정보 수정</Button>
                    </div>
                </Form>
                {/* <br />
                <span className="text">Have an account? <Link to="/login" className="link">Sign In</Link></span> */}
            </Container>
        </div>
    );
}

export default UserProfile;