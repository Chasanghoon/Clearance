import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, NavLink, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import userStore from "../../store/userStore";
import NavStore from "../../store/NavStore";
import Fade from "react-reveal/Fade";
import KakaoCounseling from "./KakaoCounseling";

const NavBar = () => {

    const navHeader = NavStore(state => state.navHeader);

    const userId = userStore(state => state.userId);
    const userImage = userStore(state => state.userImage);
    const userRole = userStore(state => state.userRole);

    const setUserId = userStore(state => state.setUserId);
    const setUserRole = userStore(state => state.setUserRole);
    const setUserName = userStore(state => state.setUserName);
    const setUserEmail = userStore(state => state.setUserEmail);
    const setUserPhone = userStore(state => state.setUserPhone);
    const setUserAddress = userStore(state => state.setUserAddress);
    const setUserLicenseNum = userStore(state => state.setUserLicenseNum);
    const setUserImage = userStore(state => state.setUserImage);

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        console.log(isOpen);
        setIsOpen(isOpen => !isOpen); // on,off 개념 boolean
    }
    const Logout = (e) => {
        localStorage.clear();
        console.log("id : " + localStorage.getItem("id"));
        console.log("token : " + localStorage.getItem("access_token"));
        setUserId("");
        setUserRole("");
        setUserName("");
        setUserEmail("");
        setUserPhone("");
        setUserAddress("");
        setUserLicenseNum("");
        setUserImage("img/default_image.png");
    };
    // console.log("네브바에서 확인하는 세션 유저 롤 = ", localStorage.getItem("userRole"))
    return (
        <div className="NavBar">
            <div className={isOpen ? "NavBarbg" : ""} >
                <Container>
                    <Row className="navRow">
                        <Col>
                            <Link className="navLink" to="/main">
                                <div className="nvImageDiv"><img className='nvImgFile' src='img/logoClearance.png' alt='' /></div>
                                </Link>
                        </Col>
                        <Col xs={6}><div className="navHeader">{navHeader}</div></Col>
                        <Col>
                            <div className="imageDiv2">
                                <img className="imgFile" onClick={toggleMenu} src="img/menub.png" alt="" />
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Fade right when={isOpen} duration={500}>
                    <div className={isOpen ? "show-menu" : "hide-menu"}>
                        <div className="navPosition ">
                            <Nav className="flex-column">
                                <div className='imageDiv'>
                                    <img className='imgFile' src={localStorage.getItem("userImage")} alt="userImage" />
                                </div>
                                <span className="nbName">{localStorage.getItem("userName")}</span>
                                {localStorage.getItem("userRole") >= 2 ?
                                    <div>
                                        {/* 3번 : 유저 , 2번 : 매장 */}
                                        {localStorage.getItem("userRole") == 3 ? <div>고객 회원</div>: <div>매점 회원</div>}
                                </div> : <div></div>}
                                {localStorage.getItem("userRole") == 3 ?
                                    <>
                                        <Link to="/userMyPage"><Button className="nbBtn">마이페이지</Button></Link>
                                        <Link to="/basket"><Button className="nbBtn2">장바구니</Button></Link>
                                    </>
                                    :
                                    <Link to="/storeMyPage"><Button className="nbBtn">마이페이지</Button></Link>
                                }
                                <Link onClick={Logout} to="/"><Button className="nbBtn3">로그아웃</Button></Link>
                                {/* <div className="kakao">
                                    <KakaoCounseling />
                                </div> */}
                            </Nav>
                        </div>
                    </div>
                </Fade>
            </div>
        </div>
    )
}

export default NavBar;