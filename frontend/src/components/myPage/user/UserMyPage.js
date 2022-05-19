import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavBar from '../../common/NavBar';
import NavStore from '../../../store/NavStore';
import BackButton from '../../BackButton';

function UserMyPage(props) {

    const setNavHeader = NavStore(state => state.setNavHeader);
    setNavHeader("마이페이지");

    return (
        <div className='userMyPage'>
            <NavBar></NavBar>
            <Row>
                <Col className='rowBtn1'>
                    <Link to="../userProfile">
                        <Button className='userMyPageBtn2'>
                            <img src="img/user_profile.png" height="60" width="60" />
                            <div className='userBtnTitle2'>프로필</div>
                            <div className='userBtnBody2'>매장 정보 조회/변경</div>

                        </Button>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col className='rowBtn2'>
                    <Link to="../bookingHistory">
                        <Button className='userMyPageBtn'>
                            <img src="img/user_calendar.png" height="60" width="60" />
                            <div className='userBtnTitle'>예약 내역</div>
                            <div className='userBtnBody'>상품 등록 및 관리</div>
                        </Button>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col className='rowBtn2' >
                    <Link to="../userCarbon">
                        <Button className='userMyPageBtn2'>
                            <img src="img/user_foot.png" height="60" width="60" />
                            <div className='userBtnTitle2'>탄소 발자국</div>
                            <div className='userBtnBody2'>환경을 위한 한걸음</div>
                        </Button>
                    </Link>
                </Col>
            </Row>
            <BackButton></BackButton>
        </div>
    );
}

export default UserMyPage;