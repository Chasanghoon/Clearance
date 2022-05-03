import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'
import NavBar from '../common/NavBar';
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import "./Reservation.css";



function ReservationResult(props) {
    const [image, setImage] = useState("img/default_image.png");
    const [isOpen, setIsOpen] = useState(true);
    const [lat, setLat] = useState(35.078669);
    const [lon, setLon] = useState(128.964982);

    // setLat(35.078669);
    // setLon(128.964982);
    console.log(lat);
    console.log(lon);

    const centerPosition = {
        lat: lat + 0.006,
        lng: lon,
    }
    const markerPosition = {
        lat: lat,
        lng: lon,
    }
    return (
        <div>
            {/* <NavBar /> */}
            <h1>예약 완료</h1>
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
                                    <div>여기 매장 정보 넣기</div>
                                </div>
                            </div>
                        </CustomOverlayMap>
                    )}
                </Map>
            </div>


            <div style={{ backgroundColor: "#F5F5F5", margin: "10px 5% 0px 5%" }}>
                <Container>
                    <Row>
                        <Col> 홈플러스 장림점 </Col>
                    </Row>
                    <Row>
                        <Col> 2022년 04월 24일 (목) 15:00 </Col>
                    </Row>
                </Container>
            </div>
            {/* <div style={{ backgroundColor: "#F0F8FF", margin: "10px 5% 10px 5%" }}> */}
            <div style={{ backgroundImage: "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)", margin: "10px 5% 10px 5%" }}>
                <Table style={{ width: "100%", tableLayout: "fixed", fontSize: "15px", wordBreak: "break-all" }}>
                    <colgroup>
                        <col width="35%" />
                        <col width="35%" />
                        <col width="15%" />
                        <col width="25%" />
                    </colgroup>
                    <thead style={{ borderBottomWidth: "2px", borderColor: "#F5F5F5" }}>
                        <tr style={{ borderTop: "hidden" }}>
                            <th>상품</th>
                            <th>상품명</th>
                            <th>수량</th>
                            <th>가격</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className='imageDiv2'>
                                    <img className='imgFile' src={image} alt="userImage" />)
                                </div>
                            </td>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}>꼬부기의 달콤파삭 꼬부기 빵</td>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}>2</td>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}>11,000원</td>
                        </tr>
                    </tbody>
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