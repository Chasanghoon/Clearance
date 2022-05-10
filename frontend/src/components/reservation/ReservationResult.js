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


//     // useEffect(() => {
//     //     let time = setTimeout(() => {
//     //         setLoading(false)
//     //     }, 2000);
//     // }, []);

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

    const [sellerName, setSellerName] = useState();
    const [sellerImage, setSellerImage] = useState();
    const [sellerAddress, setSellerAddress] = useState();
    const [sellerPhone, setSellerPhone] = useState();
    const [sellerLat, setSellerLat] = useState();
    const [sellerLng, setSellerLng] = useState();
    const [reservationDate, setReservationData] = useState();
    const [reservationTime, setReservationTime] = useState();

    const [isOpen, setIsOpen] = useState(false);

    const [state, setState] = useState({
        center: {
            lat: 33.450701,
            lng: 126.570667,
        },
        errMsg: null,
        isLoading: true,
        isPanto: false,
    })
    const [marker, setMarker] = useState({
        center: {
            lat: 33.450701,
            lng: 126.570667,
        },
        errMsg: null,
        isLoading: true,
    })

    useEffect(() => {
        if (navigator.geolocation) {
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setState((prev) => ({
                        ...prev,
                        center: {
                            lat: position.coords.latitude + 0.006, // 위도
                            lng: position.coords.longitude, // 경도
                        },
                        isLoading: false,
                    }))
                    setMarker((prev) => ({
                        ...prev,
                        center: {
                            lat: position.coords.latitude, // 위도
                            lng: position.coords.longitude, // 경도
                        },
                        isLoading: false,
                    }))
                },
                (err) => {
                    setState((prev) => ({
                        ...prev,
                        errMsg: err.message,
                        isLoading: false,
                    }))
                }
            )
        } else {
            // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
            setState((prev) => ({
                ...prev,
                errMsg: "geolocation을 사용할수 없어요..",
                isLoading: false,
            }))
        }
        // ! axios get
        // ! 스토어 아이디 저스텐드에 저장해서 써야함.
        axios
            .get("http://127.0.0.1:5001/data/reservation-complete/2")
            .then((result) => {
                console.log(result.data.seller[0]);
                setSellerName(result.data.seller[0].user_name);
                setSellerImage(result.data.seller[0].user_image);
                setSellerAddress(result.data.seller[0].user_address);
                setSellerPhone(result.data.seller[0].user_phone);
                setSellerLat(result.data.seller[0].location_ypoint);
                setSellerLng(result.data.seller[0].location_xpoint);
                setReservationData(result.data.seller[0].book_date);
                setReservationTime(result.data.seller[0].book_hour);
            })
            .catch((e) => {
                console.error("axios get 실패");
                console.error(e)
            });
    }, []);


    console.log("렛 = " + sellerLat);
    console.log("네임 = " + sellerName);



    function test() {
        setState({
            center: { lat: 33.45058, lng: 126.574942 },
            isPanto: true,
        });
        setMarker({
            center: { lat: 33.45058, lng: 126.574942 },
        });

    }
    const [points, setPoints] = useState([
        { lat: 33.452278, lng: 126.567803 },
        { lat: 33.452671, lng: 126.574792 },
        { lat: 33.451744, lng: 126.572441 },
        state.center
    ])
    const bounds = useMemo(() => {
        const bounds = new kakao.maps.LatLngBounds();

        points.forEach(point => {
            bounds.extend(new kakao.maps.LatLng(point.lat, point.lng))
        });
        return bounds;
    }, [points])
    const [map, setMap] = useState()
    return (
        <div>
            <NavBar />
            <button onClick={test}>지도 중심좌표 부드럽게 이동시키기</button>
            <button onClick={() => { if (map) map.setBounds(bounds) }}
            >
                지도 범위 재설정 하기
            </button>
            <h1>예약 완료</h1>
            <div>
                <div style={{ backgroundColor: "#F5F5F5", margin: "10px 5% 0px 5%" }}>
                    <Map // 지도를 표시할 Container
                        id={`map`}
                        // center={centerPosition}// 지도의 중심좌표
                        center={
                            // 지도의 중심좌표
                            state.center
                        }// 지도의 중심좌표
                        isPanto={state.isPanto}
                        style={{ width: "100%", height: "300px", }}
                        level={6} // 지도의 확대 레벨
                        onCreate={setMap}

                    >
                        {points.map(point => <MapMarker key={`${point.lat}-${point.lng}`} position={point} />)}
                        {/* <MapMarker position={markerPosition} onClick={() => setIsOpen(true)} /> */}
                        <MapMarker position={marker.center} onClick={() => setIsOpen(true)} />
                        {isOpen && (
                            // <CustomOverlayMap position={markerPosition}>
                            <CustomOverlayMap position={marker.center}>
                                <div className="wrap">
                                    <div className="info">
                                        <div className="close" onClick={() => setIsOpen(false)} title="닫기"></div>
                                        <div>
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
                        {/* {reservationData.product.map((data, index) => {
                            return (
                                <tbody style={{ borderBottomWidth: "2px", borderColor: "#F5F5F5" }} key={index}>
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
                        })} */}

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
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}>2 개</td>
                        </tr>
                        <tr style={{ borderTop: "hidden" }}>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}>상품 금액</td>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}></td>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}>12,000원</td>
                        </tr>
                        <tr style={{ borderTop: "hidden" }}>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}>상품 할인</td>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}></td>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}>2,000원</td>
                        </tr>
                        <tr style={{ borderTop: "solid", borderTopWidth: "2px", borderColor: "#F5F5F5" }}>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}>총 예약 금액</td>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}></td>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}>10,000원</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <Button>확인 버튼</Button>
        </div>

    );
}


export default ReservationResult;



