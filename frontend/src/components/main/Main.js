import React, { useEffect } from 'react';
import NavBar from '../common/NavBar';
import Map from "./Map";

import useMainStore from '../../store/MainStore';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import marketStore from '../../store/marketStore';
import NavStore from '../../store/NavStore';
import { Table } from 'react-bootstrap';
import '../../App.css'
import Topbutton from '../Topbutton';



function Main() {


  const setNavHeader = NavStore(state => state.setNavHeader);
  setNavHeader('\u00A0');

  const pos = useMainStore(state => state.position)
  const bs = marketStore(state => state.bookSet)

  
  console.log(bs)

  
  const nearStore = useMainStore(state => state.nearStore);
  const nearProduct = useMainStore(state => state.nearProduct)





//--------------------------- top 버튼
  const scrollToTop = () => {
    console.log(document.getElementById('rootmains'))
    document.getElementById('root').scrollTo(0, 0);
  };
  
  // 왜 안됨?
  const moveToTop = () => {
    window.scrollTo(0,1000)
  }
    return ( 
        <div id='rootmains' className='main'>
            <NavBar></NavBar>
            <h1>메인페이지</h1>
            
            <div style={{ backgroundImage: "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)", margin: "10px 5% 10px 5%" }}>
              <Map></Map>
            </div>

        {/* <div>{pos.lat}, {pos.lng}</div> */}
        {nearProduct.length > 0 ? nearStore.map((val,idx) => (
          <div key={idx}>

            <div style={{
              color: "white",
              fontSize:"150%",
              backgroundColor:"#22cc88",
              borderRadius: "30px",
              margin:"6% 3% 1% 3%"
            }}>{val.user_name}</div>
            {nearProduct.filter(value => value.storeUserId === val.user_id).map((value,index) => (
              <div key={index} className="ProductItem" onClick={() => { console.log("이거", value) }}>
                <div style={{
                  textAlign:"left"
                }}>
                  <span>유통기한 : </span>
                  <span style={{
                    color: "red",
                    
                  }}>~{value.productExpdate}</span>
                  <span style={{
                    borderRadius: "0px",
                    float:"right"
                  }}>{value.productStock }개 남음</span>
                </div>
                <img style={{
                  margin: "5px 5px 5px 5px",
                  width:"50%",
                  height:"50%",
                }}
                  alt="" src={value.productImagefront}></img>
                <div style={{fontSize:"150%"}}>{value.productName}</div>
                
                <Table>
                  <tbody>
                    <tr>
                      <td style={{
                        color: "red",
                        fontSize:"150%"
                      }}>-{value.productDiscount*100}%</td>
                      <td style={{
                        textDecoration: "line-through",
                        verticalAlign:"middle",
                      }}>{(value.productPrice).toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td style={{
                        fontSize: "150%"
                      }}>할인가</td>
                      <td style={{
                        fontSize: "150%"
                      }}>{(value.productDiscountprice).toLocaleString()}</td>
                    </tr>
                  </tbody>
                </Table>
              
                <div><Link to="/product"><Button style={{fontSize:"130%"}} variant='success' onClick={() => {
              localStorage.setItem("product_id", value.productId)
              localStorage.setItem("category_id", value.categoryId)
              localStorage.setItem("product_discount",value.productDiscount)
              localStorage.setItem("product_discount_price", value.productDiscountprice)
              localStorage.setItem("product_expdate", value.productExpdate)
              localStorage.setItem("product_image_back", value.productImageback)
              localStorage.setItem("product_image_front", value.productImagefront)
              localStorage.setItem("product_name", value.productName)
              localStorage.setItem("product_price", value.productPrice)
              localStorage.setItem("product_stock", value.productStock)
              localStorage.setItem("store_user_id", value.storeUserId)
            }}>상세 보기</Button></Link></div>
            
          </div>
              
          ))}
          </div>
          
        )) : <div>Loading...</div>} 
        
          {/* <img className='TOPImg' alt='' src='img/top_arrow.png'></img> */}
      
        <button onClick={() => {
        }}>위로가기</button>
        <Topbutton></Topbutton>
      </div>
    );
}

export default Main;