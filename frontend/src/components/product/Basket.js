// 장바구니 관리 파일 (예상 url : /basket/{user})
import React, { useEffect, useState } from "react";
import axios from "axios";
import {  Button, Table } from "react-bootstrap";
import "./Basket.css"
import ReservationStore from "../../store/ReservationStore";
import { useNavigate } from "react-router-dom";
import { ca } from "date-fns/locale";
import NavBar from '../common/NavBar';

const Basket = () => {

    const setStoreId = ReservationStore(state => state.setStoreId)
    const expdate = ReservationStore(state => state.expdate)
    const setExpdate = ReservationStore(state => state.setExpdate)
    

    const [seller, setSeller] = useState([]);
    const [product, setProduct] = useState([]);
    const [basket, setBasket] = useState();

    let minExpdate = 99999999
    let basketCount = 0;
    let amountprice = 0;
    let amountDiscount = 0;
    let amountDiscountedPrice = 0;

    function addBasketCount(basketCnt) {
      return basketCount += basketCnt 
    }

    function addSeller(newProduct) {
        setSeller((prev) => {
            
                return [...prev,newProduct];
            })
    }

    // function addProduct(newProduct) {
    //     setProduct((prev) => {
    //         return [...prev, newProduct];
    //     })
    // }
    
    const CallBasket = async () => {
            console.log("callbasket 시작")
                try {
                    const response = await axios.get(`https://k6e203.p.ssafy.io:5001/data/basket/${sessionStorage.getItem('id')}`)
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
                    console.error(error)
            }
    }

    async function cancelStore(storeId) {
        console.log(storeId)
        try {
            const response = await axios.delete(`https://k6e203.p.ssafy.io:5001/data/basket-rem`,
                {
                    data: { "basket_id": storeId, },
                })
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    // 장바구니 취소에 대해 얘기를 해봐야함...
    async function cancelStoreAll(userId,storeId) {
        try {
            const response = await axios.delete(`https://k6e203.p.ssafy.io:5001/data/basket-rem/all`, {
                
                data: {
                    "user_id": userId,
                    "store_user_id": storeId
                }
            })
            console.log(response)
            window.location.reload();
        } catch (error) {
            console.error(error)
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
    if (basket !== undefined && basket.length > 0) {
        console.log(basket)
        console.log(basket.data)
        console.log(basket.data[0])
        console.log(Object.values(basket.data[0]))
    }
    return (
        <div className="Basket" style={{
            backgroundColor: "white",
            margin: "10px 10px 10px 10px",
            boxShadow:"3px 3px 3px #b4b3b3"
        }}>
            <NavBar></NavBar>
            <h1>장바구니</h1>

            {(basket !== undefined && basket.data.length > 0) ? basket.data.map((value,idx) => (
                basketCount = 0,
                amountprice = 0,
                amountDiscount = 0,
                amountDiscountedPrice=0,
                            
                <div key={idx}>
                    {console.log(Object.values(value)[0])}
                    <div className="store">
                        {Object.keys(value)}
                    </div>
                    <Table>
                        <colgroup>
                            <col width="25%" />
                            <col width="35%" />
                            <col width="15%" />
                            <col width="20%" />
                            <col width="5%" />
                        </colgroup>
                        <thead>
                            <tr style={{ borderTop: "hidden" }}>
                                <th>상품</th>
                                <th>상품명</th>
                                <th>수량</th>
                                <th>가격</th>
                                <th></th>
                            </tr>
                        </thead>

                    
                    {Object.values(value)[0].map((p, index) => {
                        return (
                            basketCount += p.basket_count,
                            amountprice += (p.product_price*p.basket_count),
                            amountDiscount += ( (p.product_price*p.basket_count) - (p.product_discountprice*p.basket_count)),
                            amountDiscountedPrice += (p.product_discountprice*p.basket_count),
                            <tbody key={index} style={{ borderBottomWidth: "2px", borderColor: "#F5F5F5" }}>
                                <tr>
                                    <td style={{ textAlign: "center", verticalAlign: "middle" }} ><img alt="" src={p.product_imagefront}/></td>
                                    <td style={{ textAlign: "center", verticalAlign: "middle" }} >{p.product_name}</td>
                                    <td style={{ textAlign: "center", verticalAlign: "middle" }} >{p.basket_count}</td>
                                    
                                    <td style={{ textAlign: "center", verticalAlign: "middle" }} >{(p.product_discountprice*p.basket_count).toLocaleString()}</td>
                                    <td style={{ textAlign: "center", verticalAlign: "middle" }}><button style={{
                                        borderRadius: "30px",
                                        border: "none",
                                        backgroundColor: "red",
                                        color: "white"
                                    }} onClick={() => {
                                        cancelStore(p.basket_id)
                                        window.location.reload();
                                    }
                                    }>취소</button></td>
                                </tr>
                            </tbody>
                        )
                    })}
                        </Table>
                    {/* {Object.values(value)[0].map((p,index) => (
                        <div>
                            <div className="product" align="left">
                                <img alt="" src={p.product_imagefront} className="productImage"></img>
                                
                                <span style={{
                                    width: ""
                                }}> {p.product_name} </span>
                                <span > {p.product_stock} </span>
                                <span style={{paddingRight:"5%"}}>{ (p.product_discountprice * p.basket_count).toLocaleString }원</span>
                                <Button variant="danger" onClick={() => {
                                    console.log(p.basket_id)
                                    cancelStore(p.basket_id)
                                    window.location.reload();
                                }}>취소</Button>
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
                    ))} */}
{/* 예약 상품 수 총합, 금액 총합, 할인가 총합, 할인된 가격 총합 구해줘야 함! */}
                    <Table style={{
                        margin: "0px auto",
                        marginBottom: "30px",
                        width: "80%"
                    }}>
                        <colgroup>
                            <col width="50%" />
                            <col width="50%" />
                        </colgroup>
                        <tbody>
                            <tr>
                                <td>예약 상품 수</td>
                                <td>{basketCount.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>상품 금액</td>
                                    <td>{ amountprice.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>할인 금액</td>
                                    <td>{amountDiscount.toLocaleString()}<span style={{
                                        color: "red",
                                        fontSize: "80%",
                                        verticalAlign:'10%'
                                    }}>({-(amountDiscount/amountprice).toFixed(3) * 100}%)</span></td>
                            </tr>
                            <tr>
                                <td>총 예약 금액</td>
                                    <td>{ amountDiscountedPrice.toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <div style={{
                        margin: "10px auto",
                        marginBottom: "30px",
                    }}>
                        <Button variant="warning" onClick={() => {
                            for (let i = 0; i < Object.values(value)[0].length; i++) {
                                const element = splitDate2(splitDate(Object.values(value)[0][i].product_expdate));
                                console.log("element : ",element);
                                console.log("expdate : ",minExpdate);
                                if (minExpdate > element) {
                                    console.log(element,"가 ",minExpdate,"보다 빠름")
                                    minExpdate = element
                                    console.log(expdate)
                                }
                                else if(minExpdate <= element){
                                    console.log(minExpdate,"가 ",element,"보다 빠름")
                                    console.log(minExpdate)
                                }
                            }

                            console.log(value)
                            console.log(Object.keys(value)[0])
                            console.log(Object.values(value)[0])
                            console.log(expdate)
                            setStoreId(Object.values(value)[0][0].store_user_id)
                            setExpdate(minExpdate)
                            navigate("/reservation")
                        }}>예약</Button>
                        <Button variant="secondary" style={{
                            marginLeft: "5px"
                        }} onClick={() => {
                            cancelStoreAll(sessionStorage.getItem("id"), Object.values(value)[0][0].store_user_id)
                            // console.log(Object.values(value)[0][0].store_user_id)
                            
                                }}>해당 점포의 목록 제거</Button>
                    </div>
                </div>
            )) :
                <div>
                    <div>
                            장바구니에 남은 자료가 없습니다.
                    </div>
                    <div>
                        
                    </div>
                    </div>
            }
            <hr width="90%" style={{
                marginTop: "10px",
                margin: "0px auto",
            }}/>
            <Button style={{
                margin: "15px 15px 15px 15px"
            }} variant="danger" onClick={() => {
                            navigate("/main")
                        }}>돌아가기</Button>
        </div>
    )
}

export default Basket;