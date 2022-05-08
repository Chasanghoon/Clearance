import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function AllProductManagement(props) {
    return (
        <div>
            전체 상품 관리
            <div>
                전체 상품 리스트
            </div>
            <div>
                <span>검색 들어갈 곳</span>
                <Link to={"/registrationProduct"}><Button variant='warning'>등록</Button></Link>
            </div>
        </div>
    );
}

export default AllProductManagement;