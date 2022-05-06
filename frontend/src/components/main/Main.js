import React from 'react';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import NavBar from '../common/NavBar';
import Map from "./Map";
import BasketModal from '../product/BasketModal';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Product from '../product/Product';


function Main(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log("id : " + sessionStorage.getItem("id"));
    console.log("token : " + sessionStorage.getItem("access_token"));

    

    return (
        <div>
            <NavBar></NavBar>
            <h1>메인페이지</h1>
            
            <div style={{ backgroundImage: "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)", margin: "10px 5% 10px 5%" }}>
              <Map></Map>
            </div>
            <div>
                <input style={{backgroundColor:'beige'}}></input>
            </div>
            
            
        </div>
    );
}

export default Main;