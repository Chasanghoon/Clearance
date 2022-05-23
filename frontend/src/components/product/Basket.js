// 장바구니 관리 파일 (예상 url : /basket/{user})
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import "./Basket.css"
import ReservationStore from "../../store/ReservationStore";
import { useNavigate } from "react-router-dom";
import { ca } from "date-fns/locale";
import NavBar from '../common/NavBar';
import NavStore from "../../store/NavStore";
import BackButton from "../BackButton";

const Basket = () => {

    const setNavHeader = NavStore(state => state.setNavHeader);
    useEffect(()=>{
        setNavHeader('장바구니');
      },[])

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
            return [...prev, newProduct];
        })
    }
    const CallBasket = async () => {
        try {
            const response = await axios.get(`https://k6e203.p.ssafy.io:5001/data/basket/${localStorage.getItem('id')}`)
            setBasket(response)
            for (let i = 0; i < response.data.length; i++) {
                let keys = Object.keys(response.data[i])
                addSeller(keys[0])
                for (let j = 0; j < Object.values(response)[0].length; j++) {
                    let values = Object.values(response.data[i][keys])
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    async function cancelStore(storeId) {
        try {
            const response = await axios.delete(`https://k6e203.p.ssafy.io:5001/data/basket-rem`,
                {
                    data: { "basket_id": storeId, },
                })
        } catch (error) {
            console.error(error)
        }
    }

    async function cancelStoreAll(userId, storeId) {
        try {
            const response = await axios.delete(`https://k6e203.p.ssafy.io:5001/data/basket-rem/all`, {
                data: {
                    "user_id": userId,
                    "store_user_id": storeId
                }
            })
            window.location.reload();
        } catch (error) {
            console.error(error)
        }
    }
    function splitDate(date) {

        let year = '';
        let month = '';
        let day = '';

        let str = date + '';
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

        let reDate = year + "-" + month + "-" + day
        return reDate;
    }

    function splitDate2(data) {
        let renewdata = data.split("-")
        return renewdata[0] + renewdata[1] + renewdata[2];
    }

    const navigate = new useNavigate();
    useEffect(() => {
        setExpdate(99999999)
        CallBasket();
    }, [])

    return (
        <div style={{
            marginTop: "20%"
        }}>
            <NavBar></NavBar>
            {(basket !== undefined && basket.data.length > 0) ? basket.data.map((value, idx) => (
                basketCount = 0,
                amountprice = 0,
                amountDiscount = 0,
                amountDiscountedPrice = 0,
                <div key={idx} className="Basket">
                    <div className="store" style={{padding: "12px 0 12px 0"}}>
                        {Object.keys(value)}
                    </div>
                    <Table>
                        <colgroup>
                            <col width="25%" />
                            <col width="30%" />
                            <col width="15%" />
                            <col width="25%" />
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
                                amountprice += (p.product_price * p.basket_count),
                                amountDiscount += ((p.product_price * p.basket_count) - (p.product_discountprice * p.basket_count)),
                                amountDiscountedPrice += (p.product_discountprice * p.basket_count),
                                <tbody key={index} style={{ borderBottomWidth: "2px", borderColor: "#F5F5F5" }}>
                                    <tr>
                                        <td style={{ textAlign: "center", verticalAlign: "middle", }} ><img style={{borderRadius:"20px"}} width="100%" alt="" src={p.product_imagefront} /></td>
                                        <td style={{ textAlign: "center", verticalAlign: "middle" }} >{p.product_name}</td>
                                        <td style={{ textAlign: "center", verticalAlign: "middle" }} >{p.basket_count}</td>
                                        <td style={{ textAlign: "center", verticalAlign: "middle" }} >{(p.product_discountprice * p.basket_count).toLocaleString()}원</td>
                                        <td style={{ textAlign: "center", verticalAlign: "middle", padding:"0px 0px 0px 0px" }}>
                                            <button  type="button"
                                            style={{border:"hidden", backgroundColor:"#fff"}}
                                        onClick={() => {
                                            cancelStore(p.basket_id);
                                            window.location.reload();
                                        }
                                        }><img src="img/cancel_button.png" width={"20px"} alt=""/></button></td>
                                    </tr>
                                </tbody>
                            )
                        })}
                    </Table>
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
                                <td>상품 원가</td>
                                <td>{amountprice.toLocaleString()}원</td>
                            </tr>
                            <tr>
                                <td>할인 금액</td>
                                <td>{amountDiscount.toLocaleString()}원<span style={{
                                    color: "red",
                                    fontSize: "80%",
                                    verticalAlign: '10%'
                                }}>({-(amountDiscount / amountprice).toFixed(1) * 100}%)</span></td>
                            </tr>
                            <tr>
                                <td>총 예약 금액</td>
                                <td>{amountDiscountedPrice.toLocaleString()}원</td>
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
                                if (minExpdate > element) {
                                    minExpdate = element
                                }
                                else if (minExpdate <= element) {
                                }
                            }

                            setStoreId(Object.values(value)[0][0].store_user_id)
                            setExpdate(minExpdate)
                            navigate("/reservation")
                        }}>예약</Button>
                        <Button variant="secondary" style={{
                            marginLeft: "5px"
                        }} onClick={() => {
                            cancelStoreAll(localStorage.getItem("id"), Object.values(value)[0][0].store_user_id)
                        }}>해당 점포의 목록 제거</Button>
                    </div>
                </div>
            )) :
                <div>
                    <div>
                        장바구니에 남은 자료가 없습니다.
                    </div>
                </div>
            }
            <hr width="90%" style={{
                marginTop: "10px",
                margin: "0px auto",
            }} />
            <BackButton></BackButton>
        </div>
    )
}

export default Basket;