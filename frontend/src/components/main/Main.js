import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import NavBar from '../common/NavBar';
import Map from "./Map";
import BasketModal from '../product/BasketModal';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Product from '../product/Product';
import useMainStore from '../../store/MainStore';
import axios from 'axios';
import ProductItem from './ProductItem';
import './ProductItem.css'


function Main(props) {

  const pos = useMainStore(state => state.position)
  

  const nearStore = useMainStore(state => state.nearStore)
  const getNearStore = useMainStore(state => state.setNearStore)

  const nearProduct = useMainStore(state => state.nearProduct)
  const getNearProduct = useMainStore(state => state.setNearProduct)



    const [show, setShow] = useState(false);  

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log("id : " + sessionStorage.getItem("id"));
    console.log("token : " + sessionStorage.getItem("access_token"));

    //데이터 받아오기! (geolocation으로 현재 위치를 받아옴 -> axios로 주변 매점 정보 가져옴 -> store에 해당 매점 데이터 저장
    // store에 저장된 데이터를 이용해서 map에 마커를 띄움. 그리고 그 marker를 클릭하면 main에서 등록한 상품들을 출력)
  
    return (
        <div>
            <NavBar></NavBar>
            <h1>메인페이지</h1>
            
            <div style={{ backgroundImage: "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)", margin: "10px 5% 10px 5%" }}>
              <Map></Map>
            </div>
            <div>
          <input style={{ backgroundColor: 'beige' }}></input>
        </div>
        <div>{pos.lat}, {pos.lng}</div>
        {nearProduct.map((value) => (
          <div id="ProductItem">
            <img alt="" src = {value.productImagefront}></img>
            {value.productName}
          </div>
        ))}
        </div>
    );
}

export default Main;