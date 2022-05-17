import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavBar from '../../common/NavBar';
import NavStore from '../../../store/NavStore';

function UserMyPage(props) {

    const setNavHeader = NavStore(state => state.setNavHeader);
    setNavHeader("마이페이지");

    return (
        <div className='userMyPage'>
            <NavBar></NavBar>
            <Row >
                <Col className='rowBtn1'><Link to="../userProfile"><Button className='userMyPageBtn'> 프로필 </Button></Link></Col>
            </Row>
            <Row >
                <Col className='rowBtn2'><Link to="../bookingHistory"><Button className='userMyPageBtn2'> 예약 내역 </Button></Link></Col>
            </Row>
            <Row >
                <Col className='rowBtn3'><Link to="../userCarbon"><Button className='userMyPageBtn'> 탄소 발자국 </Button></Link></Col>
            </Row>
        </div>
    );
}

export default UserMyPage;