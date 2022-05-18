import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, NavLink, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import userStore from "../../store/userStore";
import NavStore from "../../store/NavStore";
import Fade from "react-reveal/Fade";

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
        sessionStorage.clear();
        console.log("id : " + sessionStorage.getItem("id"));
        console.log("token : " + sessionStorage.getItem("access_token"));
        setUserId("");
        setUserRole("");
        setUserName("");
        setUserEmail("");
        setUserPhone("");
        setUserAddress("");
        setUserLicenseNum("");
        setUserImage("img/default_image.png");
    };
    console.log("네브바에서 확인하는 세션 유저 롤 = ", sessionStorage.getItem("userRole"))
    return (

        <div className="NavBar">
            <Container>
                <Row className="navRow">
                    <Col>
                        <Link className="navLink" to="/main"><div>Clearance</div></Link>
                    </Col>
                    <Col xs={6}><div className="navHeader">{navHeader}</div></Col>
                    <Col>
                        <div className="imageDiv2">
                            <img className="imgFile" onClick={toggleMenu} src="img/menub.png" alt="" />
                        </div>
                    </Col>
                </Row>
            </Container>
            <Fade right when={isOpen}>
                <div className={isOpen ? "show-menu" : "hide-menu"}>
                    <div className="navPosition ">
                        <Nav className="flex-column">
                            <div className='imageDiv'>
                                <img className='imgFile' src={sessionStorage.getItem("userImage")} alt="userImage" />
                            </div>
                            <span>{sessionStorage.getItem("userName")}</span>
                            <br />
                            {sessionStorage.getItem("userRole") == 3 ?
                                <>
                                    <Link to="/userMyPage" style={{ color: 'black', textDecoration: 'none' }}>유저 마이페이지</Link>
                                    <Link to="/basket" style={{ color: 'black', textDecoration: 'none' }}>장바구니</Link>
                                </>
                                :
                                <Link to="/storeMyPage" style={{ color: 'black', textDecoration: 'none' }}>매장 마이페이지</Link>
                            }
                            <Link onClick={Logout} to="/" style={{ color: 'black', textDecoration: 'none' }}>로그아웃</Link>
                        </Nav>
                    </div>
                </div>
            </Fade>
        </div>
    )
}

export default NavBar;