import React, { useEffect, useMemo, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'
import NavBar from '../common/NavBar';
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import axios from 'axios';
import ReservationLoading from './ReservationLoading';
import ReservationStore from '../../store/ReservationStore';
import { useNavigate } from 'react-router-dom';
import NavStore from '../../store/NavStore';


const { kakao } = window;
function ReservationResult(props) {

    const setNavHeader = NavStore(state => state.setNavHeader);
    setNavHeader("예약 완료");

    let [loading, setLoading] = useState(true);

    const bookSet = ReservationStore(state => state.bookSet);

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
            .get(`https://k6e203.p.ssafy.io:5001/data/reservation-complete/${bookSet}`)
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
                ...prev, center: { lat: sellerLat + 0.03, lng: sellerLng + 0.005 },
                isLoading: false,
                isPanto: true
            }))
            setMarker((prev) => ({
                ...prev, center: { lat: sellerLat, lng: sellerLng },
            }))
        }
    }
    function done() {
        navigate("/main");
    }
    let navigate = useNavigate();
    return (
        <div className='reservationResult'>
            {
                loading ? <ReservationLoading /> : null
            }
            <NavBar />
            <div>
                <div style={{ backgroundColor: "#F5F5F5", margin: "10px 5% 0px 5%" }}>
                    <Map // 지도를 표시할 Container
                        id={`map`}
                        center={state.center}
                        isPanto={state.isPanto}
                        style={{ width: "100%", height: "300px", borderRadius: "30px", border: "1px solid rgb(100,100,100)", boxShadow: "2px 2px 3px rgb(100,100,100)" }}
                        level={8} // 지도의 확대 레벨
                    >
                        <MapMarker
                            position={marker.center}
                            image={{
                                src: "img/shop.png", // 마커이미지의 주소입니다
                                size: {
                                    widht: 36,
                                    height: 53
                                }, // 마커이미지의 크기입니다
                            }}
                            onClick={() => setIsOpen(true)} />
                        {isOpen && (
                            <CustomOverlayMap position={marker.center}>
                                <div className="wrap">
                                    <div className="info">
                                        <div className="close" onClick={() => setIsOpen(false)} title="닫기"></div>
                                        <div>
                                            <Table className='reservationTable'>
                                                <thead className='reservationTableHeader'>
                                                    <tr>
                                                        <td>
                                                            {'\u00A0'}
                                                        </td>
                                                        <td>
                                                            {'\u00A0'}
                                                        </td>
                                                    </tr>
                                                </thead>
                                                <tbody className='reservationTableBody'>
                                                    <tr>
                                                        <td rowSpan={3}>
                                                            <div className='reservationResultImageDiv'>
                                                                <img width="90px" className='reservationResultImgFile' src={sellerImage} alt="img"></img>
                                                            </div>
                                                        </td>
                                                        <td className='reservationTableStoreName'>{sellerName}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>{sellerAddress}<br />{sellerPhone}</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                            </CustomOverlayMap>
                        )}
                    </Map>
                </div>
                <div style={{ backgroundColor: "#FFF", margin: "10px 5% 0px 5%", borderRadius: "30px", border: "1px solid rgb(100,100,100)", boxShadow: "2px 2px 2px rgb(100,100,100)" }}>
                    <Container>
                        <Row>
                            <Col>{sellerName}</Col>
                        </Row>
                        <Row>
                            <Col>{reservationDate} {reservationTime}</Col>
                        </Row>
                    </Container>
                </div>
                <div style={{ backgroundColor: "white", margin: "10px 5% 10px 5%", boxShadow: "2px 2px 2px rgb(100,100,100)", borderRadius: "30px" }}>
                    <Table style={{
                        width: "100%", tableLayout: "fixed", fontSize: "15px", wordBreak: "break-all",
                        borderBottom: "hidden"
                    }}>
                        <colgroup>
                            <col width="35%" />
                            <col width="35%" />
                            <col width="15%" />
                            <col width="25%" />
                        </colgroup>
                        <thead>
                            <tr style={{ borderTop: "hidden", }}>
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
                                                    <img width="80%" className='imgFile' src={data.product_imagefront} alt="userImage" />
                                                </div>
                                            </td>
                                            <td style={{ textAlign: "center", verticalAlign: "middle" }} >{data.product_name}</td>
                                            <td style={{ textAlign: "center", verticalAlign: "middle" }} >{data.book_count}</td>
                                            <td style={{ textAlign: "center", verticalAlign: "middle" }} >{(data.product_price).toLocaleString()}원</td>
                                        </tr>
                                    </tbody>
                                )
                            })
                            : null}

                    </Table>
                </div>
            </div>
            <div style={{ backgroundColor: "white", margin: "10px 5% 10px 5%" }}>
                <Table style={{ width: "100%", tableLayout: "fixed", fontSize: "15px", wordBreak: "break-all", boxShadow: "2px 2px 2px 1px rgb(100,100,100)" }}>
                    <colgroup>
                        <col width="33%" />
                        <col width="33%" />
                        <col width="33%" />
                    </colgroup>
                    <tbody>
                        <tr style={{ borderTop: "hidden" }}>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}>예약 상품 수</td>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}></td>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}>{(totalReservation).toLocaleString()} 개</td>
                        </tr>
                        <tr style={{ borderTop: "hidden" }}>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}>상품 금액</td>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}></td>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}>{(totalProductPrice).toLocaleString()} 원</td>
                        </tr>
                        <tr style={{ borderTop: "hidden" }}>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}>상품 할인</td>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}></td>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}>{(totalProductDiscount).toLocaleString()} 원</td>
                        </tr>
                        <tr style={{ borderTop: "solid", borderTopWidth: "2px", borderColor: "#F5F5F5" }}>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}>총 예약 금액</td>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}></td>
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}>{(totalPrice).toLocaleString()} 원</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <Button className='rvrBtn' onClick={done}>확인 버튼</Button>
        </div>

    );
}


export default ReservationResult;



