import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom'

function UserRegister() {

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    

    const [userIdError, setUserIdError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [userNameError, setUserNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);

    const onChangeUserId = (e) => {
        const userIdRegex = /^[A-Za-z0-9+]{5,}$/;
        if ((!e.target.value || (userIdRegex.test(e.target.value)))) setUserIdError(false);
        else setUserIdError(true);
        setUserId(e.target.value);
    };
    const onChangePassword = (e) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if ((!e.target.value || (passwordRegex.test(e.target.value)))) setPasswordError(false);
        else setPasswordError(true);

        if (!confirmPassword || e.target.value === confirmPassword) setConfirmPasswordError(false);
        else setConfirmPasswordError(true);
        setPassword(e.target.value);
    };
    const onChangeConfirmPassword = (e) => {
        if (password === e.target.value) setConfirmPasswordError(false);
        else setConfirmPasswordError(true);
        setConfirmPassword(e.target.value);
    };
    const onChangeUserName = (e) => {
        setUserNameError(false);
        setUserName(e.target.value)
    };
    const onChangeEmail = (e) => {
        const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (!e.target.value || emailRegex.test(e.target.value)) setEmailError(false);
        else setEmailError(true);
        setEmail(e.target.value);
    };
    const onChangePhone = (e) => {
        const phoneRegex = /^[0-9]{0,}$/;
        if ((!e.target.value || (phoneRegex.test(e.target.value)))) setPhoneError(false);
        else setPhoneError(true);
        setPhone(e.target.value)
    };

    const validation = () => {
        if (!userId) setUserIdError(true);
        if (!password) setPasswordError(true);
        if (!confirmPassword) setConfirmPasswordError(true);
        if (!userName) setUserNameError(true);
        if (!email) setEmailError(true);
        if (!phone) setPhoneError(true);

        if (userId && password && confirmPassword && userName && email && phone) return true;
        else return false;
    }

    const onSubmit = (e) => {
        if (validation()) return;

        // API Call


    }

    return (
        <div>
            <Container className='mt-5'>
                <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Col sm>
                            <Form.Control maxLength={20} placeholder="아이디" value={userId} onChange={onChangeUserId} />
                            {userIdError && <div class="invalid-input">ID는 5자 이상이어야 하며 문자 또는 숫자를 포함해야 합니다.</div>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col sm>
                            <Form.Control maxLength={20} type="password" placeholder="비밀번호" value={password} onChange={onChangePassword} />
                            {passwordError && <div class="invalid-input">암호는 8자 이상이어야 하며 문자와 숫자를 하나 이상 포함해야 합니다. </div>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col sm>
                            <Form.Control maxLength={20} type="password" placeholder="비밀번호 재확인" value={confirmPassword} onChange={onChangeConfirmPassword} />
                            {confirmPasswordError && <div class="invalid-input">암호가 일치하지 않습니다.</div>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col sm>
                            <Form.Control maxLength={20} placeholder="이름" value={userName} onChange={onChangeUserName} />
                            {userNameError && <div class="invalid-input">입력되지 않았습니다.</div>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col sm>
                            <Form.Control maxLength={50} type="input" placeholder="이메일" value={email} onChange={onChangeEmail} />
                            {emailError && <div class="invalid-input">올바른 이메일 형식을 입력하세요.</div>}
                        </Col>
                    </Form.Group>


                    {/* 
                    // ! ******************************************
                    // ? phone, address, Detailed Address 넣어야함
                    // ! ******************************************
                    */}

                    <Form.Group as={Row} className="mb-3">
                        <Col sm>
                            <Form.Control maxLength={20} placeholder="연락처" value={phone} onChange={onChangePhone} />
                            {phoneError && <div class="invalid-input">숫자로만 입력해주세요.</div>}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Col sm>
                            <Form.Control maxLength={20} placeholder="주소" value={userName} onChange={onChangeUserName} />
                            {userNameError && <div class="invalid-input">Required.</div>}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Col sm>
                            <Form.Control maxLength={20} placeholder="상세 주소" value={userName} onChange={onChangeUserName} />
                            {userNameError && <div class="invalid-input">Required.</div>}
                        </Col>
                    </Form.Group>


                    <br />
                    <div className="d-grid gap-1">
                        <Button variant="secondary" onClick={onSubmit}>
                            Sign Up
                        </Button>
                    </div>
                </Form>
                <br />
                <span className="text">Have an account? <Link to="/login" className="link">Sign In</Link></span>
            </Container>
        </div>
    );
}

export default UserRegister;