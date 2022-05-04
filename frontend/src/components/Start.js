import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import './Start.css';

function Start() {
    const [modalShow, setModalShow] = React.useState(false);

    let lat = 33.450701;
    let lon = 126.570667;

    // 임시 지정. Zustand 만들 때 전역변수로  값을 가져와줘야 함!
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
        });
    }

    return (
        <>
            <div className='title'>
                <h1>Clearance</h1>
            </div>
            <div style={{
                textAlign: 'left',
                // position: 'relative',
                left: '30px'
            }
            }>you can become A smart <br /> Consumer</div>
            
            <Link to="login"><Button> 로그인 </Button></Link>
            <br />

            <Button variant="primary" onClick={() => setModalShow(true)}>
                회원가입
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />

        </>
    );
}
function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            // size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div style={{textAlign : "center" }}>
                    <Link to="../signupUser"><Button variant="success"> 일반 회원가입 </Button></Link>
                    <Link to="../signupStore"><Button variant="danger"> 매장 회원가입 </Button></Link>
                </div>

            </Modal.Body>
        </Modal>
    );
}
export default Start;