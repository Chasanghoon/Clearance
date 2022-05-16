import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavBar from '../../common/NavBar';

function UserMyPage(props) {
    return (
        <div>
            <NavBar></NavBar>
            <h1>UserMyPage</h1>
            <Link to="../userProfile"><Button variant="success"> 프로필 </Button></Link>
            <Link to="../bookingHistory"><Button variant="success"> 예약 내역 </Button></Link>
            <Link to="../userCarbon"><Button variant="success"> 탄소 발자국 </Button></Link>
        </div>
    );
}

export default UserMyPage;