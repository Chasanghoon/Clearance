import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./CheckReservation.css"
import { Button, Table } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import NavBar from '../../common/NavBar';
import NavStore from "../../../store/NavStore";
import Swal from 'sweetalert2'


function CheckReservation() {

    const setNavHeader = NavStore(state => state.setNavHeader);
    const [books, setBooks] = useState()
    let navigate = useNavigate();

    async function complete(bookSet) {
        try {
            const response = await axios.put(`https://k6e203.p.ssafy.io:8443/api/book/modifybookset`,
                {
                    "book_set": bookSet,
                })
            Swal.fire({
                icon: 'success',
                title: '거래 완료!',
                showConfirmButton: false,
                timer: 1500
            })
            navigate("/storeMyPage")
        } catch (error) {
            console.error(error)
        }
    }
    const CallResvationInfo = async () => {
        try {
            const response = await axios.get(`https://k6e203.p.ssafy.io:8443/api/book/qrcode/list?bookSet=${localStorage.getItem("bookSet")}`)
            setBooks(response.data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        setNavHeader("예약 확인");
        CallResvationInfo();
    }, [])
    return (
        <div>
            <NavBar></NavBar>
            {books !== undefined ?
                <div className='checkReservation'>
                    <Table style={{
                        backgroundColor: "white",
                        boxShadow: "2px 2px 2px #bbbbbb",
                        borderRadius: "30px",
                    }}>
                        <colgroup>
                            <col width="25%" />
                            <col width="35%" />
                            <col width="15%" />
                            <col width="25%" />
                        </colgroup>
                        <thead style={{ border: "0px solid black" }}>
                            <tr>
                                <th>상품</th>
                                <th>상품명</th>
                                <th>수량</th>
                                <th>금액</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((value, index) => (
                                <tr key={index}>
                                    <td className='option'><img width="90px" alt='' src={value.productImagefront}></img></td>
                                    <td className='option'>{value.productName}</td>
                                    <td className='option'>{value.basketCount}</td>
                                    <td className='option'>{(value.productDiscountprice * value.basketCount).toLocaleString()}원</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Button style={{
                        position: 'fixed',
                        bottom: "10%",
                        left: "20%",
                        right: "20%",
                        marginBottom: "5%",
                        backgroundColor: "#176a49"
                    }}
                        onClick={() => {
                            complete(localStorage.getItem("bookSet"));
                        }}
                    >거래 완료</Button>
                    <Button variant='secondary' style={{
                        position: 'fixed',
                        bottom: "5%",
                        left: "20%",
                        right: "20%"
                    }} onClick={() => {
                        navigate("/storeMyPage")
                    }}>돌아가기</Button>
                </div>
                : <div> Loading....</div>}
        </div>
    );
}

export default CheckReservation;