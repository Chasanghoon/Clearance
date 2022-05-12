import React, { useEffect, useMemo, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'
import NavBar from '../common/NavBar';
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import "./Reservation.css";
import axios from 'axios';
import ReservationLoading from './ReservationLoading';
import ReservationStore from '../../store/ReservationStore';


const { kakao } = window;
// function ReservationResult(props) {



//     const [image, setImage] = useState("img/default_image.png");

//     const [isMapLodding, setIsMapLodding] = useState(false);
//     const [update, setUpdate] = useState(false);
//     const [check, setCheck] = useState(false);

//     const [isOpen, setIsOpen] = useState(false);


//     const [reservationData, setReservationData] = useState({});

//     let [loading, setLoading] = useState(false);

//     const latData = ReservationStore(state => state.lat);
//     const lngData = ReservationStore(state => state.lng);
//     const setLat = ReservationStore(state => state.setLat);
//     const setLng = ReservationStore(state => state.setLng);


//     const setTestData = ReservationStore(state => state.setTestData);


// useEffect(() => {
//     let time = setTimeout(() => {
//         setLoading(false)
//     }, 2000);
// }, []);

//     useEffect(() => {
//         // ! axios get
//         async function a (){
//             const result = await axios.get('http://127.0.0.1:5001/data/reservation-complete/2');
//             setReservationData(result.data);
//             setLat(reservationData.seller[0].location_ypoint);
//             setLng(reservationData.seller[0].location_xpoint);
//         }
//         a();
//         setLocation();
//             // .get('http://127.0.0.1:5001/data/reservation-complete/2')
//             // .then((result) => {

//             //     setReservationData(result.data);
//             //     // (update) ? setIsMapLodding(true) : null
//             //     // setCheck(true);
//             //     setIsMapLodding(false);
//             //     console.log(isMapLodding)
//             //     setLocation();
//             //     // setTestData(result.data);
//             // })
//             // .catch((e) => {
//             //     console.error("axios get 실패");
//             //     console.error(e)
//             // });
//     }, [isMapLodding]);

//     const setLocation = () => {
//             setIsMapLodding(true);

//             // console.log(x);
//             // console.log(reservationData.seller[0].location_xpoint);
//             // console.log(reservationData.seller[0].location_ypoint);


//             console.log(latData);
//             console.log(lngData);

//     }

//     return (
//         <div>
//             {
//                 loading === true ? <ReservationLoading /> : null
//             }

//             <NavBar />
//             <h1>예약 완료</h1>
//             {
//                 isMapLodding  ?
//                     <div>
//                         <div style={{ backgroundColor: "#F5F5F5", margin: "10px 5% 0px 5%" }}>
//                             <Map // 지도를 표시할 Container
//                                 id={`map`}
//                                 // center={centerPosition}// 지도의 중심좌표
//                                 center={{
//                                     // 지도의 중심좌표
//                                     lat: latData,
//                                     lng: lngData,
//                                 }}// 지도의 중심좌표
//                                 style={{ width: "100%", height: "300px", }}
//                                 level={6} // 지도의 확대 레벨

//                             >

//                                 {/* <MapMarker position={markerPosition} onClick={() => setIsOpen(true)} /> */}
//                                 <MapMarker position={{
//                                     // 지도의 중심좌표
//                                     lat: latData,
//                                     lng: lngData,
//                                 }} onClick={() => setIsOpen(true)} />
//                                 {isOpen && (
//                                     // <CustomOverlayMap position={markerPosition}>
//                                     <CustomOverlayMap position={{
//                                         // 지도의 중심좌표
//                                         lat: latData,
//                                         lng: lngData,
//                                     }}>
//                                         <div className="wrap">
//                                             <div className="info">
//                                                 <div className="close" onClick={() => setIsOpen(false)} title="닫기"></div>
//                                                 <div>
//                                                     <p>{reservationData.seller[0].user_name}</p>
//                                                     <p>{reservationData.seller[0].user_address}</p>
//                                                     <p>{reservationData.seller[0].user_phone}</p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </CustomOverlayMap>
//                                 )}
//                             </Map>

//                         </div>
//                         {/* <div style={{ backgroundColor: "#F5F5F5", margin: "10px 5% 0px 5%" }}>
//                             <Container>
//                                 <Row>
//                                     <Col>{reservationData.seller[0].user_name}</Col>
//                                 </Row>
//                                 <Row>
//                                     <Col>{reservationData.seller[0].book_date} {reservationData.seller[0].book_hour}</Col>
//                                 </Row>
//                             </Container>
//                         </div> */}
//                         <div style={{ backgroundImage: "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)", margin: "10px 5% 10px 5%" }}>
//                             <Table style={{ width: "100%", tableLayout: "fixed", fontSize: "15px", wordBreak: "break-all" }}>
//                                 <colgroup>
//                                     <col width="35%" />
//                                     <col width="35%" />
//                                     <col width="15%" />
//                                     <col width="25%" />
//                                 </colgroup>
//                                 <thead>
//                                     <tr style={{ borderTop: "hidden" }}>
//                                         <th>상품</th>
//                                         <th>상품명</th>
//                                         <th>수량</th>
//                                         <th>가격</th>
//                                     </tr>
//                                 </thead>
//                                 {reservationData.product.map((data, index) => {
//                                     return (
//                                         <tbody style={{ borderBottomWidth: "2px", borderColor: "#F5F5F5" }} key={index}>
//                                             <tr >
//                                                 <td>
//                                                     <div className='imageDiv2'>
//                                                         <img className='imgFile' src={data.product_imagefront} alt="userImage" />)
//                                                     </div>
//                                                 </td>
//                                                 <td style={{ textAlign: "center", verticalAlign: "middle" }} >{data.product_name}</td>
//                                                 <td style={{ textAlign: "center", verticalAlign: "middle" }} >{data.book_count}</td>
//                                                 <td style={{ textAlign: "center", verticalAlign: "middle" }} >{data.product_price}원</td>
//                                             </tr>
//                                         </tbody>
//                                     )
//                                 })}

//                             </Table>
//                         </div>
//                     </div>
//                     : <div>
//                         <div style={{ backgroundColor: "#F5F5F5", margin: "10px 5% 0px 5%", width: "100%", height: "358px" }}></div>
//                     </div>
//             }

//             <div style={{ backgroundImage: "linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)", margin: "10px 5% 10px 5%" }}>
//                 <Table style={{ width: "100%", tableLayout: "fixed", fontSize: "15px", wordBreak: "break-all" }}>
//                     <colgroup>
//                         <col width="33%" />
//                         <col width="33%" />
//                         <col width="33%" />
//                     </colgroup>
//                     <tbody>
//                         <tr style={{ borderTop: "hidden" }}>
//                             <td style={{ textAlign: "center", verticalAlign: "middle" }}>예약 상품 수</td>
//                             <td style={{ textAlign: "center", verticalAlign: "middle" }}></td>
//                             <td style={{ textAlign: "center", verticalAlign: "middle" }}>2 개</td>
//                         </tr>
//                         <tr style={{ borderTop: "hidden" }}>
//                             <td style={{ textAlign: "center", verticalAlign: "middle" }}>상품 금액</td>
//                             <td style={{ textAlign: "center", verticalAlign: "middle" }}></td>
//                             <td style={{ textAlign: "center", verticalAlign: "middle" }}>12,000원</td>
//                         </tr>
//                         <tr style={{ borderTop: "hidden" }}>
//                             <td style={{ textAlign: "center", verticalAlign: "middle" }}>상품 할인</td>
//                             <td style={{ textAlign: "center", verticalAlign: "middle" }}></td>
//                             <td style={{ textAlign: "center", verticalAlign: "middle" }}>2,000원</td>
//                         </tr>
//                         <tr style={{ borderTop: "solid", borderTopWidth: "2px", borderColor: "#F5F5F5" }}>
//                             <td style={{ textAlign: "center", verticalAlign: "middle" }}>총 예약 금액</td>
//                             <td style={{ textAlign: "center", verticalAlign: "middle" }}></td>
//                             <td style={{ textAlign: "center", verticalAlign: "middle" }}>10,000원</td>
//                         </tr>
//                     </tbody>
//                 </Table>
//             </div>
//             <Button>확인 버튼</Button>
//         </div>

//     );
// }
function ReservationResult(props) {
    let [loading, setLoading] = useState(true);

    const [sellerName, setSellerName] = useState();
    const [sellerImage, setSellerImage] = useState();
    const [sellerAddress, setSellerAddress] = useState();
    const [sellerPhone, setSellerPhone] = useState();
    const [sellerLat, setSellerLat] = useState();
    const [sellerLng, setSellerLng] = useState();
    const [reservationDate, setReservationData] = useState();
    const [reservationTime, setReservationTime] = useState();

    const [product, setProduct] = useState();

    let totalReservation = 0;
    let totalProductPrice = 0;
    let totalProductDiscount = 0;
    let totalPrice = 0;

    const [isOpen, setIsOpen] = useState(false);

    const [state, setState] = useState({
        center: { lat: 33.450701, lng: 126.570667 },
        isLoading: true,
        isPanto: false,
    })
    const [marker, setMarker] = useState({
        center: { lat: 33.450701, lng: 126.570667 }
    })


    useEffect(() => {
        let time = setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, []);

    useEffect(() => {
        if (navigator.geolocation) {
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setState((prev) => ({
                        ...prev,
                        center: {
                            lat: position.coords.latitude, // 위도
                            lng: position.coords.longitude, // 경도
                        },
                        isLoading: false,
                        isPanto: false
                    }))
                    setMarker((prev) => ({
                        ...prev,
                        center: {
                            lat: position.coords.latitude, // 위도
                            lng: position.coords.longitude, // 경도
                        },
                    }))
                }
            )
        }
        // ! axios get
        // ! 북셋 어디서 가져오지..?
        axios
            .get("http://127.0.0.1:5001/data/reservation-complete/8")
            // .get("https://k6e203.p.ssafy.io:5000/data/reservation-complete/8")
            .then((result) => {
                setSellerName(result.data.seller[0].user_name);
                setSellerImage(result.data.seller[0].user_image);
                setSellerAddress(result.data.seller[0].user_address);
                setSellerPhone(result.data.seller[0].user_phone);
                setSellerLat(result.data.seller[0].location_ypoint);
                setSellerLng(result.data.seller[0].location_xpoint);
                setReservationData(result.data.seller[0].book_date);
                setReservationTime(result.data.seller[0].book_hour);

                setProduct(result.data.product);
                timeout();
            })
            .catch((e) => {
                console.error("axios get 실패");
                console.error(e)
            });
    }, [sellerLat]);

    function timeout() {
        let time = setTimeout(() => {
            test()
        }, 1500);
    }

    function test() {

        if (sellerLat !== undefined) {
            setState((prev) => ({
                ...prev, center: { lat: sellerLat + 0.02, lng: sellerLng },
                isLoading: false,
                isPanto: true
            }))
            setMarker((prev) => ({
                ...prev, center: { lat: sellerLat, lng: sellerLng },
            }))
        }
    }
    return (
        <div>
            {
                loading ? <ReservationLoading /> : null
            }
            <NavBar />
            <h1>예약 완료</h1>
            <div>
                <div style={{ backgroundColor: "#F5F5F5", margin: "10px 5% 0px 5%" }}>
                    <Map // 지도를 표시할 Container
                        id={`map`}
                        center={state.center}
                        isPanto={state.isPanto}
                        style={{ width: "100%", height: "300px", }}
                        level={8} // 지도의 확대 레벨
                    >
                        <MapMarker position={marker.center} onClick={() => setIsOpen(true)} />
                        {isOpen && (
                            <CustomOverlayMap position={marker.center}>
                                <div className="wrap">
                                    <div className="info">
                                        <div className="close" onClick={() => setIsOpen(false)} title="닫기"></div>
                                        <div>
                                            <img src={sellerImage} alt="img"></img>
                                            <p>{sellerName}</p>
                                            <p>{sellerAddress}</p>
                                            <p>{sellerPhone}</p>
                                        </div>
                                    </div>
                                </div>
                            </CustomOverlayMap>
                        )}
                    </Map>
                </div>
                <div style={{ backgroundColor: "#F5F5F5", margin: "10px 5% 0px 5%" }}>
                    <Container>
                        <Row>
                            <Col>{sellerName}</Col>
                        </Row>
                        <Row>
                            <Col>{reservationDate} {reservationTime}</Col>
                        </Row>
                    </Container>
                </div>
                <div style={{ backgroundImage: "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)", margin: "10px 5% 10px 5%" }}>
                    <Table style={{ width: "100%", tableLayout: "fixed", fontSize: "15px", wordBreak: "break-all" }}>
                        <colgroup>
                            <col width="35%" />
                            <col width="35%" />
                            <col width="15%" />
                            <col width="25%" />
                        </colgroup>
                        <thead>
                            <tr style={{ borderTop: "hidden" }}>
                                <th>상품</th>
                                <th>상품명</th>
                                <th>수량</th>
                                <th>가격</th>
                            </tr>
                        </thead>
                        {product !== undefined ?
                            product.map((data, index) => {
                                totalReservation = totalReservation + data.book_count;
                                totalProductPrice = totalProductPrice + data.book_count * data.product_price;
                                totalProductDiscount = totalProductDiscount + data.book_count * data.product_discountprice;
                                totalPrice = totalPrice + data.book_count * data.book_price;
                                return (
                                    <tbody key={index} style={{ borderBottomWidth: "2px", borderColor: "#F5F5F5" }}>
                                        <tr >
                                            <td>
                                                <div className='imageDiv2'>
                                                    <img className='imgFile' src={data.product_imagefront} alt="userImage" />)
                                                </div>
                                            </td>
                                            <td style={{ textAlign: "center", verticalAlign: "middle" }} >{data.product_name}</td>
                                            <td style={{ textAlign: "center", verticalAlign: "middle" }} >{data.book_count}</td>
                                            <td style={{ textAlign: "center", verticalAlign: "middle" }} >{data.product_price}원</td>
                                        </tr>
                                    </tbody>
                                )
                            })
                            : null}

                    </Table>
                </div>
            </div>
            <div style={{ backgroundImage: "linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)", margin: "10px 5% 10px 5%" }}>
                <Table style={{ width: "100%", tableLayout: "fixed", fontSize: "15px", wordBreak: "break-all" }}>
                    <colgroup>
                        <col width="33%" />
                        <col width="33%" />
                        <col width="33%" />
                    </colgroup>
                    <tbody>
                        <tr style={{ borderTop: "hidden" }}>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}>예약 상품 수</td>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}></td>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}>{totalReservation} 개</td>
                        </tr>
                        <tr style={{ borderTop: "hidden" }}>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}>상품 금액</td>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}></td>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}>{totalProductPrice} 원</td>
                        </tr>
                        <tr style={{ borderTop: "hidden" }}>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}>상품 할인</td>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}></td>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}>{totalProductDiscount} 원</td>
                        </tr>
                        <tr style={{ borderTop: "solid", borderTopWidth: "2px", borderColor: "#F5F5F5" }}>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}>총 예약 금액</td>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}></td>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}>{totalPrice} 원</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <Button>확인 버튼</Button>
        </div>

    );
}


export default ReservationResult;



