// 장바구니 관리 파일 (예상 url : /basket/{user})
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs,Tab } from "react-bootstrap";
import "./Basket.css"

const Basket = () => {

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
                    const response = await axios.get(`http://localhost:5001/data/basket/user1`)
                    setBasket(response)
                    console.log(response.data[0]['판매자'])
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
            {seller.length > 1 ? seller.map((value) => (
                <div>
                {value}
                        <div>
                        {product.map((value_2) => (
                                value_2
                            ))}
                    </div>
                </div>
                
            )) : console.log(seller.length)}
            {/* {seller.length > 1 ? console.log(seller) : console.log("아무것도 없어요")} */}
        </div>
    )
}

export default Basket;