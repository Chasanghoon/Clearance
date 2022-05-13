// 장바구니 관리 파일 (예상 url : /basket/{user})
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs,Tab, Button } from "react-bootstrap";
import "./Basket.css"
import ReservationStore from "../../store/ReservationStore";
import { useNavigate } from "react-router-dom";

const Basket = () => {

    const storeId = ReservationStore(state => state.StoreId)
    const setStoreId = ReservationStore(state => state.setStoreId)
    const expdate = ReservationStore(state => state.expdate)
    const setExpdate = ReservationStore(state => state.setExpdate)
    

    const [seller, setSeller] = useState([]);
    const [product, setProduct] = useState([]);
    const [basket, setBasket] = useState();

    function addSeller(newProduct) {
        setSeller((prev) => {
            
                return [...prev,newProduct];
            })
    }

    function addProduct(newProduct) {
        setProduct((prev) => {
            return [...prev, newProduct];
        })
    }
    
        const CallBasket = async () => {
                try {
                    const response = await axios.get(`http://localhost:5001/data/basket/${sessionStorage.getItem('id')}`)
                    setBasket(response)
                    console.log(response.data)
                    for (let i = 0; i < response.data.length; i++) {
                        let keys = Object.keys(response.data[i])
                        console.log(Object.values(response)[0])
                        
                        console.log(keys[0])
                        addSeller(keys[0])
                        for (let j = 0; j < Object.values(response)[0].length; j++) {
                            let values = Object.values(response.data[i][keys])
                            console.log("value : ",values[j])
                        }
                    }
                } catch (error) {
                    console.log(error)
            }
        }

//Mon, 30 May 2022 00:00:00 GMT -> 2022/05/30 Mon 00:00:00
function splitDate(date) {

    let year = '';
    let month = '';
    let day = '';


    let str = date + '';
    console.log(str);
    let split = str.split(' ');

    switch (split[2]) {
        case "Jan":
            month = '01';
            break;
        case "Feb":
            month = '02';
            break;
        case "Mar":
            month = '03';
            break;
        case "Apr":
            month = '04';
            break;
        case "May":
            month = '05';
            break;
        case "Jun":
            month = '06';
            break;
        case "Jul":
            month = '07';
            break;
        case "Aug":
            month = '08';
            break;
        case "Sep":
            month = '09';
            break;
        case "Oct":
            month = '10';
            break;
        case "Nov":
            month = '11';
            break;
        case "Dec":
            month = '12';
            break;
        default:
            break;
    }

    year = split[3];
    day = split[1];

    let reDate = year + "-"  + month + "-" + day
    return reDate;
    }
    
    function splitDate2(data) {
        let renewdata = data.split("-")
        return renewdata[0] + renewdata[1] + renewdata[2];
    }
        
    const navigate = new useNavigate();
        // Api 통신 테스트 완료
    useEffect(() => {
        setExpdate(99999999)
        CallBasket();
    },[])
    
    if (seller.length > 0) {
        console.log(seller)
    }
    if (product.length > 0) {
        console.log(product)
    }
    if (basket !== undefined) {
        console.log(basket)
        console.log(basket.data)
        console.log(basket.data[0])
        console.log(Object.values(basket.data[0]))
    }
    return (
        <div style={{
            paddingTop:'10px'
        }}>
            <h1>장바구니</h1>
            {/* {console.log(seller)} */}
            {/* {seller.length > 1 ? console.log("아무것도 없어요")
            :seller.map((value) => (
                { value }
             ))} */}
            {basket !== undefined ? basket.data.map((value) => (
                
                <div>
                    {console.log(Object.values(value)[0])}
                    <div className="store">
                        {Object.keys(value)}
                    </div>
                    <div align="left">
                        <span className="content" style={{
                            paddingRight: "15%",
                            paddingLeft: "10%",
                        }}>상품</span>
                        <span className="content">상품명</span>
                        <span className="content">수량</span>
                        <span className="content">가격</span>
                    </div>
                    {Object.values(value)[0].map((p) => (
                        <div>
                            <div className="product" align="left">
                                <img alt="" src={p.product_imagefront} className="productImage"></img>
                                
                                <span style={{
                                    width: ""
                                }}> {p.product_name} </span>
                                <span > {p.product_stock} </span>
                                <span style={{paddingRight:"5%"}}>{ (p.product_discountprice * p.basket_count).toLocaleString }원</span>
                                <Button>취소</Button>
                            </div>
                            <div className="summary">
                                <div>상품명 : {p.product_name}</div>
                                <div>개당 가격 : {p.product_price.toLocaleString()}원</div>
                                <div>구매 수량 : {p.basket_count}개</div>
                                <div>구매 원가 : {(p.product_price * p.basket_count).toLocaleString()}원</div>
                                <div>유통기한 : {splitDate(p.product_expdate)}</div>
                                
                                <div>상품 할인 : {(p.product_price * (1-p.product_discount) * p.basket_count).toLocaleString()}원</div>
                                <div>총 할인 가격 : {(p.product_discountprice*p.basket_count).toLocaleString()}원</div>
                            </div>
                        </div>
                    ))}
                    <Button onClick={() => {
                        for (let i = 0; i < Object.values(value)[0].length; i++) {
                            const element = splitDate2(splitDate(Object.values(value)[0][i].product_expdate));
                            console.log(element);
                            console.log(expdate);
                            if (expdate > element) {
                                console.log("이거")
                                setExpdate(element)
                                console.log(expdate)
                            }
                            else {
                                console.log("요거")
                                setExpdate(expdate)
                                console.log(expdate)
                            }
                        }

                        console.log(value)
                        console.log(Object.keys(value)[0])
<<<<<<< HEAD
=======
                        console.log(Object.values(value)[0])
                        console.log(expdate)
>>>>>>> de70c822c2c8e45e4a39c7db8aa14a98ca1fa8c6
                        setStoreId(Object.values(value)[0][0].store_user_id)
                        navigate("/reservation")
                    }}>예약 진행</Button>
                </div>
                
            )) : console.log("basket이 없어요")}
        </div>
    )
}

export default Basket;