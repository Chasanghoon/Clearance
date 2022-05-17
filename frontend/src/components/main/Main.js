import React from 'react';
import NavBar from '../common/NavBar';
import Map from "./Map";

import useMainStore from '../../store/MainStore';
import './ProductItem.css'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import marketStore from '../../store/marketStore';
import NavStore from '../../store/NavStore';
import { Table } from 'react-bootstrap';


function Main() {


  const setNavHeader = NavStore(state => state.setNavHeader);
  setNavHeader('\u00A0');

  const pos = useMainStore(state => state.position)
  const bs = marketStore(state => state.bookSet)

  
  console.log(bs)

  
  const nearStore = useMainStore(state => state.nearStore);
  const nearProduct = useMainStore(state => state.nearProduct)

    return (
        <div>
            <NavBar></NavBar>
            <h1>메인페이지</h1>
            
            <div style={{ backgroundImage: "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)", margin: "10px 5% 10px 5%" }}>
              <Map></Map>
            </div>

        {/* <div>{pos.lat}, {pos.lng}</div> */}
        {nearProduct.length > 0 ? nearStore.map((val) => (
          <div>
            {console.log(val)}
            <div style={{
              color: "white",
              fontSize:"18px",
              backgroundColor:"#FFC812",
              borderRadius:"30px",
            }}>{val.userId}</div>
            {nearProduct.filter(value => value.storeUserId === val.userId).map((value) => (
              <div className="ProductItem" onClick={() => { console.log("이거", value) }}>
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
                <div style={{fontSize:"20px"}}>{value.productName}</div>
                
                <Table>
                  <tbody>
                    <tr>
                      <td style={{
                        color: "red",
                        fontSize:"24px"
                      }}>-{value.productDiscount*100}%</td>
                      <td style={{
                        textDecoration: "line-through",
                        verticalAlign:"middle",
                      }}>{(value.productPrice).toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td style={{
                        fontSize: "24px"
                      }}>할인가</td>
                      <td style={{
                        fontSize: "24px"
                      }}>{(value.productDiscountprice).toLocaleString()}</td>
                    </tr>
                  </tbody>
                </Table>
              
                <div><Link to="/product"><Button variant='warning' onClick={() => {
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
      </div>
    );
}

export default Main;