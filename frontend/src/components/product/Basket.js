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
        
        
    const navigate = new useNavigate();
        // Api 통신 테스트 완료
    useEffect(() => {
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
                                <span style={{paddingRight:"5%"}}>{ p.product_discountprice * p.product_stock }원</span>
                                <Button>취소</Button>
                            </div>
                            <div className="summary">
                                <div>상품명 : {p.product_name}</div>
                                <div>상품 금액 : {p.product_price * p.product_stock}원</div>
                                <div>상품 할인 : {p.product_price * (1-p.product_discount) * p.product_stock}원</div>
                                <div>상품명 : {p.product_discountprice*p.product_stock}원</div>
                            </div>
                        </div>
                    ))}
                    <Button onClick={() => {
                        console.log(Object.keys(value)[0])
                        setStoreId(Object.keys(value)[0])
                        navigate("/reservation")
                    }}>예약 진행</Button>
                </div>
                
            )) : console.log("basket이 없어요")}
        </div>
    )
}

export default Basket;