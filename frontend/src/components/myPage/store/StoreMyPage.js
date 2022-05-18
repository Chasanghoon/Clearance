import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavBar from '../../common/NavBar';
import NavStore from '../../../store/NavStore';

function StoreMyPage(props) {
    const setNavHeader = NavStore(state => state.setNavHeader);
    setNavHeader("마이페이지");

    return (
        <div className='storeMyPage'>
            <NavBar />

            <Row>
                <Col className='rowBtn1'>
                    <Link to="../storeProfile">
                        <Button className='storeMyPageBtn2'>
                            <img src="img/store_profile.png" height="60" width="60" />
                            <div className='storeBtnTitle2'>프로필</div>
                            <div className='storeBtnBody2'>매장 정보 조회/변경</div>

                        </Button>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col className='rowBtn2'>
                    <Link to="../productManagement">
                        <Button className='storeMyPageBtn'>
                            <img src="img/store_notepad.png" height="60" width="60" />
                            <div className='storeBtnTitle'>상품관리</div>
                            <div className='storeBtnBody'>상품 등록 및 관리</div>
                        </Button>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col className='rowBtn2'>
                    <Link to="../QrCheck">
                        <Button className='storeMyPageBtn2'>
                            <img src="img/store_qr_code.png" height="60" width="60" />
                            <div className='storeBtnTitle2'>예약 확인</div>
                            <div className='storeBtnBody2'>예약 상품 확인</div>
                        </Button>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col className='rowBtn2' >
                    <Link to="../storeCarbon">
                        <Button className='storeMyPageBtn'>
                            <img src="img/store_foot.png" height="60" width="60" />
                            <div className='storeBtnTitle'>탄소 발자국</div>
                            <div className='storeBtnBody'>환경을 위한 한걸음</div>
                        </Button>
                    </Link>
                </Col>
            </Row>
        </div>
    );
}

export default StoreMyPage;