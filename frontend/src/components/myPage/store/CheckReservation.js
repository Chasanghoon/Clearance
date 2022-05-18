import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./CheckReservation.css"
import { Button,Table } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import NavBar from '../../common/NavBar';
import NavStore from "../../../store/NavStore";


function CheckReservation() {

    const setNavHeader = NavStore(state => state.setNavHeader);
    

    // const [data, setData] = useState()
    const [books, setBooks] = useState()

    // let navigate = new Navigate();

    let navigate = useNavigate();
    
    async function complete(bookSet) {
        console.log(bookSet)
        try {
            const response = await axios.put(`https://k6e203.p.ssafy.io:8443/api/book/modifybookset`,
            {
                 "book_set":  bookSet,
                })
            alert("거래가 완료되었습니다!")
            console.log(response)
        
            navigate("/bookingHistory")
            
        } catch (error) {
            console.error(error)
        }
    }
    
    const CallResvationInfo = async () => {
        try {
            const response = await axios.get(`https://k6e203.p.ssafy.io:8443/api/book/qrcode/list?bookSet=${localStorage.getItem("bookSet")}`)
            console.log(response)
            setBooks(response.data)
            console.log(books)
            
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        setNavHeader("예약 확인");
        CallResvationInfo();
    },[])
    
    // console.log(bookData)
    console.log(books)
    return (
        <div className='checkReservation'>
            
            <NavBar></NavBar>
            {books !== undefined ?
                <div className='checkReservation'>
                    <Table style={{
                        backgroundColor: "white",
                        boxShadow: "2px 2px 2px #bbbbbb",
                    }}>
                        <colgroup>
                            <col width="25%" />
                            <col width="35%" />
                            <col width="15%" />
                            <col width="25%" />
                        </colgroup>
                        <thead>
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
                                <td className='option'><img alt='' src={value.productImagefront}></img></td>
                                <td className='option'>{value.productName}</td>
                                <td className='option'>{value.basketCount}</td>
                                <td className='option'>{(value.productDiscountprice * value.basketCount).toLocaleString()}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    
                    <Button style={{
                        position:'fixed',
                        bottom: "10%",
                        left: "20%",
                        right:"20%"
                    }}
                        onClick={() => {
                            complete(localStorage.getItem("bookSet"));
                            // window.location.reload();
                    }}
                    >거래 완료</Button>
                    </div>
                    : <div> Loading....</div>}
                
            </div>
    );
}

export default CheckReservation;