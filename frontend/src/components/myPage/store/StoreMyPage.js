import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavBar from '../../common/NavBar';

function StoreMyPage(props) {
    return (
        <div>
            <NavBar />
            <h1>마이페이지</h1>
            <Link to="../storeProfile"><Button variant="success"> 프로필 </Button></Link>
            <Link to="../productManagement"><Button variant="success"> 상품관리 </Button></Link>
            <Link to="../checkReservation"><Button variant="success"> 예약 확인 </Button></Link>
            <Link to="../storeCarbon"><Button variant="success"> 탄소 발자국 </Button></Link>

            

            




        </div>
    );
}

export default StoreMyPage;