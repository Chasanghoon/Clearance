import axios from 'axios';
import React, { useEffect, useState } from 'react';

function CheckReservation() {

    // const [data, setData] = useState()
    const [books,setBooks] = useState()
    
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
        CallResvationInfo();
    },[])
    
    // console.log(bookData)
    console.log(books)
    return (
        <div>
            
            {books !== undefined ? books.map((value) => (
                <div className='product'>
                    <img alt='' src={value.productImagefront}></img>
                    <div>상품명 : {value.productName}</div>
                    <div>수량 : {value.basketCount}</div>
                    <div>가격 : {value.productDiscountprice * value.productDiscountprice}</div>
                </div>
                
            )) : <div> Loading....</div>}
        </div>
    );
}

export default CheckReservation;