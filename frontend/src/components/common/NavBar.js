import axios from "axios";
import React, { useState } from "react";
import { Col, Container, NavLink, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [userId, setUserId] = useState("");
    const [image, setImage] = useState("img/default_image.png");

    const toggleMenu = () => {
        console.log(isOpen);
        setIsOpen(isOpen => !isOpen); // on,off 개념 boolean
    }
    // ! axios get
    // console.log("axios get")
    axios
        .get(`http://localhost:8080/api/member?userId=${sessionStorage.getItem("id")}`)
        .then((result) => {
            // console.log(result);
            setUserId(result.data.userId);
            setImage(result.data.userImage);
        })
        .catch((e) => {
            console.error("axios get 실패");
            console.error(e)
        });

        const Logout = (e) => {
            sessionStorage.clear();
            console.log("id : " + sessionStorage.getItem("id"));
            console.log("token : " + sessionStorage.getItem("access_token"));
        };
    return (
        <div className="test">
            <Container>
                <Row className="navRow">
                    <Col>
                    <Link to="/main" style={{ color: 'black', textDecoration: 'none'}}>Clearance</Link>                    
                    </Col>
                    <Col xs={6}></Col>
                    <Col><Button onClick={toggleMenu}>네브바</Button></Col>
                </Row>
            </Container>

            <div className={isOpen ? "show-menu" : "hide-menu"}>
                <div className="navPosition ">
                    <Nav className="flex-column">
                        <div className='imageDiv'>
                            <img className='imgFile' src={image} alt="userImage" />)
                        </div>
                        <span>{userId}</span>
                        <br />
                        <Link to="/storeMyPage" style={{ color: 'black', textDecoration: 'none'}}>매장 마이페이지</Link>
                        <Link to="/userMyPage" style={{ color: 'black', textDecoration: 'none'}}>유저 마이페이지</Link>
                        <Link to="/" style={{ color: 'black', textDecoration: 'none'}}>장바구니</Link>
                        <Link onClick={Logout} to="/" style={{ color: 'black', textDecoration: 'none'}}>로그아웃</Link>
                    </Nav>
                </div>
            </div>
        </div>
    )
}

export default NavBar;