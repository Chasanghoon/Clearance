import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Start() {
    const [modalShow, setModalShow] = React.useState(false);
    const [buttonShow, setButtonShow] = React.useState(false);
    let navigate = useNavigate();
    console.log("id : " + localStorage.getItem("id"));
    console.log("token : " + localStorage.getItem("access_token"));
    console.log("localStorage.getItem('userRole') == ", localStorage.getItem("userRole"))

    useEffect(() => {
        if (localStorage.getItem("userRole") == 2) {
            navigate("/storeMyPage");
        } else if (localStorage.getItem("userRole") == 3) {
            navigate("/main");
        }
    }, [])
    return (
        <div className='Start'>
            <div className='title'>
                <img className='loseImg' src='img/logoClearance.png' alt='' />
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