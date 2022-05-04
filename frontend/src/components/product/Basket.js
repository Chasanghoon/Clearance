// 장바구니 관리 파일 (예상 url : /basket/{user})
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import "./Basket.css"

const Basket = () => {

    const [seller, setSeller] = useState([]);
    const [product, setProduct] = useState([]);
    
    function addSeller() {
        setSeller((prev) => {
            const newbasket = <div className="s">추가</div>
            
                return [...prev,newbasket];
            })
    }

    function addProduct() {
        setProduct((prev) => {
            const newProduct = <div className="asdf">또 추가</div>

            return [...prev, newProduct];
        })
    }
    


    
        // Api 통신 테스트 완료
    useEffect(() => {
        axios
            .get("http://localhost:3001/seller")
            // .get(`http://localhost:5001/data/basket/${sessionStorage.getItem("id")}`)
            // .get(`http://localhost:5001/data/basket/user1`)
            .then((e) => {
                console.log(e);
                setSeller([]);

                for (let i = 0; i < e.data.length; i++) {
                    addSeller();
                    console.log("seller : ",seller)
                }

                //1. 유저가 예약한 상품이 있는 점포 이름을 가지는 리스트가 필요.
                //2. 
                
                console.log("seller : ",seller)
            })
            .catch((e) => { 
                console.error(e.message)
            })
        axios
            .get("http://localhost:3001/product")
            // .get(`http://localhost:5001/data/basket/${sessionStorage.getItem("id")}`)
            // .get(`http://localhost:5001/data/basket/user1`)
            .then((e) => {
                console.log(e);
                setProduct([]);

                

                for (let i = 0; i < e.data.length; i++) {
                    // console.log(e)
                    addProduct();

                }
                // setProduct(e.data[1])
                //1. 유저가 예약한 상품이 있는 점포 이름을 가지는 리스트가 필요.
                
                
                
                console.log('product: ',product)
            })
            .catch((e) => { 
                console.error(e.message)
            })

    }, [])
    console.log(seller)
    console.log(product)
    return (
        <div>
            <h1>장바구니</h1>
            <div>
                {seller}{product}
            </div>
        </div>
    )
}

export default Basket;