import axios from "axios";
import React, { useState } from "react";
import { Col, Container, NavLink, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import "./NavBar.css";
import userStore from "../../store/userStore";

const NavBar = () => {

    const userId = userStore(state => state.userId);
    const userImage = userStore(state => state.userImage);

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
    return (
        <div className="test">
            <Container>
                <Row className="navRow">
                    <Col>
                        <Link to="/main" style={{ color: 'black', textDecoration: 'none' }}>Clearance</Link>
                    </Col>
                    <Col xs={6}></Col>
                    <Col><Button onClick={toggleMenu}>네브바</Button></Col>
                </Row>
            </Container>

            <div className={isOpen ? "show-menu" : "hide-menu"}>
                <div className="navPosition ">
                    <Nav className="flex-column">
                        <div className='imageDiv'>
                            <img className='imgFile' src={userImage} alt="userImage" />)
                        </div>
                        <span>{userId}</span>
                        <br />
                        <Link to="/storeMyPage" style={{ color: 'black', textDecoration: 'none' }}>매장 마이페이지</Link>
                        <Link to="/userMyPage" style={{ color: 'black', textDecoration: 'none' }}>유저 마이페이지</Link>
                        <Link to="/basket" style={{ color: 'black', textDecoration: 'none' }}>장바구니</Link>
                        <Link onClick={Logout} to="/" style={{ color: 'black', textDecoration: 'none' }}>로그아웃</Link>
                    </Nav>
                </div>
            </div>
        </div>
    )
}

export default NavBar;