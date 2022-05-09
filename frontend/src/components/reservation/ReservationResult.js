import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'
import NavBar from '../common/NavBar';
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import "./Reservation.css";
import axios from 'axios';



function ReservationResult(props) {
    const [image, setImage] = useState("img/default_image.png");
    const [isMapLodding, setIsMapLodding] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const [reservationLat, setReservationLat] = useState();
    const [reservationLng, setReservationLng] = useState();

    const [reservationData, setReservationData] = useState();

    const[centerPosition, setCenterPosition] = useState({
        lat : null,
        lng : null
    });
    const[markerPosition, setMarkerPosition] = useState({
        lat : null,
        lng : null
    });

    useEffect(() => {
        // ! axios get
        axios
            .get('http://127.0.0.1:5001/data/reservation-complete/1')
            .then((result) => {
                // console.log(result.data.seller[0]);
                setReservationData(result.data);
                setCenterPosition({
                    lat: reservationData.seller[0].location_ypoint + 0.006,
                    lng: reservationData.seller[0].location_xpoint
                });
                setMarkerPosition({
                    lat: reservationData.seller[0].location_ypoint,
                    lng: reservationData.seller[0].location_xpoint,
                })
                console.log("실행됨?")
                setIsMapLodding(true);

                // console.warn(JSON.stringify(result.data.product[0]));
                // console.error(JSON.stringify(result.data.product[1]));

                // console.log(result.data);
                // console.log(reservationData);
                // console.log(reservationData.product.len);
                // console.warn(reservationData.product[0]);
                // console.error(reservationData.product[1]);
                
            })
            .catch((e) => {
                console.error("axios get 실패");
                console.error(e)
            });

    }, []);
    // console.log("reservationData.seller[0].location_ypoint = " + reservationData.seller[0].location_ypoint);
    // const centerPosition = {
    //     lat: reservationData.seller[0].location_ypoint + 0.006,
    //     lng: reservationData.seller[0].location_xpoint,
    //     // lat: 35.1240392745851,
    //     // lng: 128.965600917795,
    // }
    // const markerPosition = {
    //     lat: reservationData.seller[0].location_ypoint,
    //     lng: reservationData.seller[0].location_xpoint,
    //     // lat: 35.1240392745851,
    //     // lng: 128.965600917795,
    // }
    // console.log(reservationData.seller[0].user_name);
    // console.log("배열 길이 = " + reservationData.product.length)
    // console.log("되냐?" + JSON.stringify(reservationData.product[0].product_name));

    console.log(isMapLodding);
    return (
        <div>
            <NavBar />
            <h1>예약 완료</h1>
            {
                isMapLodding ?
                    <div>
                        <div style={{ backgroundColor: "#F5F5F5", margin: "10px 5% 0px 5%" }}>
                            <Map // 지도를 표시할 Container
                                id={`map`}
                                center={centerPosition}// 지도의 중심좌표
                                style={{ width: "100%", height: "300px", }}
                                level={6} // 지도의 확대 레벨
                            >
                                <MapMarker position={markerPosition} onClick={() => setIsOpen(true)} />
                                {isOpen && (
                                    <CustomOverlayMap position={markerPosition}>
                                        <div className="wrap">
                                            <div className="info">
                                                <div className="close" onClick={() => setIsOpen(false)} title="닫기"></div>
                                                <div>
                                                    <p>{reservationData.seller[0].user_name}</p>
                                                    <p>{reservationData.seller[0].user_address}</p>
                                                    <p>{reservationData.seller[0].user_phone}</p>
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
                                    <Col>{reservationData.seller[0].user_name}</Col>
                                </Row>
                                <Row>
                                    <Col>{reservationData.seller[0].book_date} {reservationData.seller[0].book_hour}</Col>
                                </Row>
                            </Container>
                        </div></div>
                    : <div>
                        <div style={{ backgroundColor: "#F5F5F5", margin: "10px 5% 0px 5%", width: "100%", height: "358px" }}></div>
                    </div>
            }





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
                    {/* {reservationData.product.map((data) => {
                        return (
                            <tbody style={{ borderBottomWidth: "2px", borderColor: "#F5F5F5" }}>
                                <tr>
                                    <td>
                                        <div className='imageDiv2'>
                                            <img className='imgFile' src={data.product_imagefront} alt="userImage" />)
                                        </div>
                                    </td>
                                    <td style={{ textAlign: "center", verticalAlign: "middle" }}>{data.product_name}</td>
                                    <td style={{ textAlign: "center", verticalAlign: "middle" }}>{data.book_count}</td>
                                    <td style={{ textAlign: "center", verticalAlign: "middle" }}>{data.product_price}원</td>
                                </tr>
                            </tbody>
                        )
                    })} */}

                </Table>
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


