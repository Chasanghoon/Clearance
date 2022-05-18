import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { Col, Container, Row } from 'react-bootstrap';

function Start() {
    const [modalShow, setModalShow] = React.useState(false);
    const [buttonShow, setButtonShow] = React.useState(false);
    console.log("id : " + sessionStorage.getItem("id"));
    console.log("token : " + sessionStorage.getItem("access_token"));
    return (
        <div className='Start'>
            <div className='title'>
                {/* <h1>Clearance</h1> */}
                <img className='loseImg' src='img/imlose.png' alt='' />
            </div>
            <div className='title2'>you can become A smart <br /> Consumer</div>

            <Container fluid className='startBtnGroup' >
                <Row>
                    <Col><Link to="login"><Button className='loginBtn'> 로그인 </Button></Link></Col>
                </Row>
                {!buttonShow ?
                    <Row>
                        <Col><Button className='registerBtn' onClick={() => setButtonShow(true)}>
                            회원가입
                        </Button></Col>
                    </Row>
                    :
                    <div>
                        <Row>
                            <Col>
                            <Link to="../signupUser"><Button className='registerUserBtn'> 일반 회원가입 </Button></Link>
                            </Col>
                            <Col>
                            <Link to="../signupStore"><Button className='registerStoreBtn'> 매장 회원가입 </Button></Link>
                            </Col>
                        </Row>
                        {/* <Row>
                            <Col><Button className='registerBtn' onClick={() => setButtonShow(false)}>
                                매장 회원가입
                            </Button></Col>
                        </Row> */}
                    </div>
                }


            </Container>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />

        </div>
    );
}
function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body className='startModalBody'>
                <div style={{ textAlign: "center" }}>
                    <Link to="../signupUser"><Button className='startRegisterUserBtn'> 일반 회원가입 </Button></Link>
                    <Link to="../signupStore"><Button className='startRegisterStoreBtn'> 매장 회원가입 </Button></Link>
                </div>

            </Modal.Body>
        </Modal>
    );
}
export default Start;