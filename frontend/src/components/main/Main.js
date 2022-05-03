import React from 'react';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import NavBar from '../common/NavBar';
import Map from "./Map";
import BasketModal from '../product/BasketModal';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';


function Main(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log("id : " + sessionStorage.getItem("id"));
    console.log("token : " + sessionStorage.getItem("access_token"));

    

    return (
        <div>
            <NavBar></NavBar>
            <h1>메인페이지</h1>
            <Link to="../login"><Button variant="primary"> 로그인 </Button></Link>
            <Link to="../signupUser"><Button variant="success"> 일반 회원가입 </Button></Link>
            <Link to="../signupStore"><Button variant="danger"> 매장 회원가입 </Button></Link>
            <Link to="../basket"><Button>장바구니 가자</Button></Link>
            <div>
                <input style={{
                    backgroundColor:'beige'
                }}></input>
            </div>
            <Map></Map>
            
            <div>
                <BasketModal></BasketModal>
            </div>
            <Button variant="primary" onClick={handleShow}>
            모달 띄우기
        </Button>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don't even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            계속 쇼핑하기
                    </Button>
                    <br/>
          <Link to="../basket"><Button variant="primary">장바구니로 이동</Button></Link>
        </Modal.Footer>
      </Modal>
        </div>
    );
}

export default Main;