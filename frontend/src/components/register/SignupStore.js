import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Spinner } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function SignupStore() {

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [licenseNum, setLicenseNum] = useState("");

    const [userIdError, setUserIdError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [userNameError, setUserNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [licenseNumError, setLicenseNumError] = useState(false);
    const [licenseNumCheck, setLicenseNumCheck] = useState(true);

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
        const emailRegex = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
        if (!e.target.value || emailRegex.test(e.target.value)) setEmailError(false);
        else setEmailError(true);
        setEmail(e.target.value);
    };
    const onChangePhone = (e) => {
        const phoneRegex = /^[0-9]{3}[-]{1}[0-9]{3,4}[-]{1}[0-9]{4}$/;
        if ((!e.target.value || (phoneRegex.test(e.target.value)))) setPhoneError(false);
        else setPhoneError(true);
        setPhone(e.target.value)
    };
    const onChangeAddress = (e) => {
        setAddressError(false);
        setAddress(e.target.value)
    };
    const onChangeLicenseNum = (e) => {
        const licenseNumErrorRegex = /^[0-9]{10}$/;
        if ((!e.target.value || (licenseNumErrorRegex.test(e.target.value)))) setLicenseNumError(false);
        else setLicenseNumError(true);
        setLicenseNum(e.target.value)
    };

    const validation = () => {
        if (!userId) setUserIdError(true);
        if (!password) setPasswordError(true);
        if (!confirmPassword) setConfirmPasswordError(true);
        if (!userName) setUserNameError(true);
        if (!email) setEmailError(true);
        if (!phone) setPhoneError(true);
        if (!address) setAddressError(true);
        if (!licenseNum) setLicenseNumError(true);

        if (userIdError || passwordError || confirmPasswordError || userNameError || emailError || phoneError || addressError || licenseNumError || licenseNumCheck) return true;
        else return false;
    };

    const checkLicenseNum = () => {
        alert("사업자 등록번호 확인 : " + licenseNum);

        axios
            .post("https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=2LlEyKxqr1YfX0CBc7emYGAsWH2IYBHaW3%2FaUCe68sdkVkrNRiRCjvdwbGZ3Z4MqvbUQTa%2BgMx0sxGXW%2F4fsrA%3D%3D",
            {
                "b_no": [
                    `${licenseNum}`
                ]
            })
            .then((e)=>{
                console.log("사업자 등록번호 확인 성공");
                console.log(e);
                console.log(e.data.data[0].b_no);
                console.log(e.data.data[0].tax_type);
                const checkTaxType = "국세청에 등록되지 않은 사업자등록번호입니다.";
                if(e.data.data[0].tax_type !== checkTaxType){
                    console.log("정상 처리.");
                    setLicenseNumCheck(false);
                }else{
                    console.log("오류 처리");
                    setLicenseNumError(false);
                    setLicenseNumCheck(true);
                }
            })
            .catch((e)=>{
                console.log("사업자 등록번호 확인 실패");
                console.log(e);
            })

    }

    const onSubmit = (e) => {

        if (validation()) return;

        // ! axios GET
        // console.log("axios get")
        // axios
        //     .get("http://localhost:8080/api/user/?userId=테스트")
        //     .then((result) => {
        //         console.log(result);
        //         console.log(result.data.userId);
        //         alert("회원가입 완료!");
        //     })
        // .catch((e) => {
        //     console.error("axios get 실패");
        //     console.error(e)
        // });

        // ! axios POST
        console.log("axios post")
        const storeSignUpRequest = {
            user_address: address,
            user_email: email,
            user_id: userId,
            user_name: userName,
            user_password: password,
            user_phone: phone,
            user_licensenum: licenseNum,
        }

        const formData = new FormData();
        formData.append('storeSignUpRequest', new Blob([JSON.stringify(storeSignUpRequest)], { type: "application/json" }));
        formData.append('file', image.image_file);

        axios
            .post("http://localhost:8080/api/signup/store",
                formData
                ,
                {
                    headers: { 'Content-Type': 'application/json' }
                },
            )
            .then(() => {
                console.log("axios post 성공")
                alert("회원가입 완료!");
                navigate("/login");

            })
            .catch((e) => {
                console.error("axios post 실패");
                console.error(e);
            });
    };

    const [image, setImage] = useState({
        image_file: "",
        preview_URL: "img/default_image.png",
    });

    const [loaded, setLoaded] = useState(false);

    const saveImage = (e) => {
        e.preventDefault();
        const fileReader = new FileReader();

        if (e.target.files[0]) {
            setLoaded("loading")
            fileReader.readAsDataURL(e.target.files[0])
        }
        fileReader.onload = () => {
            setImage(
                {
                    image_file: e.target.files[0],
                    preview_URL: fileReader.result
                }
            )
            setLoaded(true);
        }
    }

    const deleteImage = () => {
        setImage({
            image_file: "",
            preview_URL: "img/default_image.png",
        });
        setLoaded(false);
    }

    let navigate = useNavigate();

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
                    <Form.Group as={Row} className="mb-3">
                        <Col sm>
                            <Form.Control maxLength={20} type="password" placeholder="비밀번호 재확인" value={confirmPassword} onChange={onChangeConfirmPassword} />
                            {confirmPasswordError && <div className="invalid-input">암호가 일치하지 않습니다.</div>}
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
                            <Form.Control maxLength={50} type="input" placeholder="이메일" value={email} onChange={onChangeEmail} />
                            {emailError && <div className="invalid-input">올바른 이메일 형식을 입력하세요.</div>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col sm>
                            <Form.Control maxLength={20} placeholder="연락처" value={phone} onChange={onChangePhone} />
                            {phoneError && <div className="invalid-input">올바른 전화번호를 입력하세요.</div>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col sm>
                            <Form.Control maxLength={20} placeholder="주소" value={address} onChange={onChangeAddress} />
                            {addressError && <div className="invalid-input">주소를 입력해주세요. <br /> 부산 사하구 하신중앙로 2 이런 형식으로 넣어야함...</div>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        {/* <Form.Control maxLength={20} placeholder="사업자 등록 번호" value={licenseNum} onChange={onChangeLicenseNum} />
                        {licenseNumError && <div className="invalid-input">올바른 사업자 등록 번호를 입력하세요.</div>}
                        <Button>사업자 등록 번호 확인</Button> */}
                        <Col>
                            <InputGroup>
                                <Form.Control maxLength={20} placeholder="사업자 등록 번호" value={licenseNum} onChange={onChangeLicenseNum} />
                                <Button onClick={checkLicenseNum}>사업자 등록 번호 확인</Button>
                            </InputGroup>
                            {(licenseNumError|| licenseNumCheck) && <div className="invalid-input">올바른 사업자 등록 번호 10자리를 숫자만 입력하세요.</div>}
                        </Col>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFile" style={{ "textAlign": "center" }}>
                        <div className="img-wrapper">
                            {loaded === false || loaded === true ?
                                (<img src={image.preview_URL} alt="userImage" />) :
                                (<Spinner animation="border" variant="warning" />)}
                        </div>
                        <Button><Form.Label>select image</Form.Label></Button>
                        <Button onClick={deleteImage}>Delete Image</Button>
                        <Form.Control type="file" accept="image/*" onChange={saveImage} style={{ display: "none" }} />
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

export default SignupStore;