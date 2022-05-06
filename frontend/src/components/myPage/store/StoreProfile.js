import React, { useEffect, useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Spinner } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function StoreProfile(props) {

    
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [licenseNum, setLicenseNum] = useState("");
    const [image, setImage] = useState({
        image_file: "",
        preview_URL: "img/default_image.png",
        
    });

    const [userIdError, setUserIdError] = useState(false);
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

    const validation = () => {
        if (!userId) setUserIdError(true);
        if (!userName) setUserNameError(true);
        if (!email) setEmailError(true);
        if (!phone) setPhoneError(true);
        if (!address) setAddressError(true);

        if (userIdError || userNameError || emailError || phoneError || addressError ) return true;
        else return false;
    };

    useEffect(() => {
        // ! axios GET
        console.log("axios get")
        axios
            .get(`http://localhost:8080/api/member/?userId=${sessionStorage.getItem("id")}`)
            .then((result) => {
                alert("유저 정보 가져 오기");
                // console.log("result = " + JSON.stringify(result));
                // console.log("result = " + result.data.userId);
                // console.log("image = " + JSON.stringify(image));
                setUserId(result.data.userId);
                setUserName(result.data.userName);
                setEmail(result.data.userEmail);
                setPhone(result.data.userPhone);
                setAddress(result.data.userAddress);
                setLicenseNum(result.data.userLicensenum);
                setImage({
                    image_file: "",
                    preview_URL: result.data.userImage,
                });
            })
        .catch((e) => {
            console.error("axios get 실패");
            console.error(e)
        });
      }, []);

    const onSubmit = (e) => {
        if (validation()) return;

        // ! axios POST
        console.log("axios post")
        const storeSignUpRequest = {
            user_address: address,
            user_email: email,
            user_id: userId,
            user_name: userName,
            user_phone: phone,
        }
        // TODO : 백 리퀘스트바디 수정, 이미지 파일로 받아야함, storeSignUpRequest이거 써도 되나..?
        // const formData = new FormData();
        // formData.append('storeSignUpRequest', new Blob([JSON.stringify(storeSignUpRequest)], { type: "application/json" }));
        // formData.append('file', image.image_file);

        // axios
        //     .put("http://localhost:8080/api/member",
        //         formData
        //         ,
        //         {
        //             headers: { 'Content-Type': 'application/json' }
        //         },
        //     )
        //     .then(() => {
        //         console.log("axios post 성공")
        //         alert("회원가입 완료!");
        //         navigate("/login");

        //     })
        //     .catch((e) => {
        //         console.error("axios post 실패");
        //         console.error(e);
        //     });
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
                <Form.Group as={Row} className="mb-3" controlId="formFile" style={{ "textAlign": "center" }}>
                        <div className='imageDiv'>
                            {loaded === false || loaded === true ?
                                (<img className='imgFile' src={image.preview_URL} alt="userImage" />) :
                                (<Spinner animation="border" variant="warning" />)}
                        </div>
                        <div>
                            <Button className='imageButton'><Form.Label>프로필 이미지 선택</Form.Label></Button>
                            <Button className='imageButton' onClick={deleteImage}>프로필 이미지 삭제</Button>
                            <Form.Control type="file" accept="image/*" onChange={saveImage} style={{ display: "none" }} />
                        </div>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col sm>
                            <Form.Control maxLength={20} placeholder="아이디" value={userId} onChange={onChangeUserId} disabled readOnly />
                            {userIdError && <div className="invalid-input">ID는 영문 대소문자와 숫자 4~12자리로 입력해야합니다.</div>}
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
                                <Form.Control maxLength={20} placeholder="사업자 등록 번호" value={licenseNum} disabled readOnly />
                            </InputGroup>
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

export default StoreProfile;