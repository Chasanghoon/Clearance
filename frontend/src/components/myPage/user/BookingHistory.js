import React, { useEffect, useState } from 'react';
import { ko } from "date-fns/esm/locale";
import { Button, Container, Table, ModalFooter, FormControl, Modal } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from '../../common/NavBar';
import DatePicker from 'react-datepicker';
import NavStore from '../../../store/NavStore';
import Flip from "react-reveal/Fade";


function BookingHistory(props) {

    const setNavHeader = NavStore(state => state.setNavHeader);
    setNavHeader("예약 내역");
    
    const [highlight, setHighlight] = useState();
    const [selectDate, setSelectDate] = useState(new Date());
    const [searchDay, setSearchDay] = useState(splitDate(selectDate));

    const [checkAll, setCheckAll] = useState(true);
    const [checkProgress, setCheckProgress] = useState(false);
    const [checkComplete, setCheckComplete] = useState(false);


    const [product, setProduct] = useState();
    const [modalProduct, setModalProduct] = useState();
    const [modalShow, setModalShow] = React.useState(false);

    const [modalQrData, setModalQrData] = useState();
    const [modalQrShow, setModalQrShow] = React.useState(false);


    console.log(selectDate)
    console.log(sessionStorage.getItem("id"));

    // 유저 예약 날짜 가져오기
    useEffect(() => {
        // ! axios get
        console.log("axios get")
        axios
            .get(`https://k6e203.p.ssafy.io:5001/data/calender-detail/${sessionStorage.getItem("id")}`)
            .then((result) => {
                console.log(result.data.result);
                setHighlight(result.data.result);
            })
            .catch((e) => {
                console.error("axios get 실패");
                console.error(e)
            });
    }, []);

    const highlightArray = [];
    if (highlight !== undefined) {
        highlight.map((data) => {
            highlightArray.push(new Date(data));
        })
    }
    function setDate(date) {
        console.log(date);
        setSelectDate(date)
        setSearchDay(splitDate(date));
    }

    // 전체 내역 가져오기
    useEffect(() => {
        if (!checkAll) return
        // ! axios get
        console.log("axios get")
        console.log("searchDay = " + searchDay);
        axios
            .get(`https://k6e203.p.ssafy.io:5001/data/calender-detail/all/${sessionStorage.getItem("id")}/${searchDay}`)
            .then((result) => {
                console.log(result.data.info);
                setProduct(result.data.info);
            })
            .catch((e) => {
                console.error("axios get 실패");
                console.error(e)
            });
    }, [selectDate, checkAll]);
    // 진행 내역 가져오기
    useEffect(() => {
        if (!checkProgress) return
        // ! axios get
        console.log("axios get")
        console.log("searchDay = " + searchDay);
        axios
            .get(`https://k6e203.p.ssafy.io:5001/data/calender-detail/progress/${sessionStorage.getItem("id")}/${searchDay}`)
            .then((result) => {
                console.log(result.data.info);
                setProduct(result.data.info);
            })
            .catch((e) => {
                console.error("axios get 실패");
                console.error(e)
            });
    }, [selectDate, checkProgress]);
    // 완료 내역 가져오기
    useEffect(() => {
        if (!checkComplete) return
        // ! axios get
        console.log("axios get")
        console.log("searchDay = " + searchDay);
        axios
            .get(`https://k6e203.p.ssafy.io:5001/data/calender-detail/complete/${sessionStorage.getItem("id")}/${searchDay}`)
            .then((result) => {
                console.log(result.data.info);
                setProduct(result.data.info);
            })
            .catch((e) => {
                console.error("axios get 실패");
                console.error(e)
            });
    }, [selectDate, checkComplete]);

    function changeAll() {
        setCheckAll(true);
        setCheckProgress(false);
        setCheckComplete(false);
    }
    function changeProgress() {
        setCheckAll(false);
        setCheckProgress(true);
        setCheckComplete(false);
    }
    function changeComplete() {
        setCheckAll(false);
        setCheckProgress(false);
        setCheckComplete(true);
    }



    function modalControl(data) {
        setModalShow(true);
        setModalProduct(data);
    }
    function modalQrControl(data) {
        setModalQrShow(true);
        setModalQrData(data);
    }

    function MyVerticallyCenteredModal(props) {
        console.log("모달 : " + JSON.stringify(modalProduct));
        return (
            <>
                {modalProduct !== undefined ?
                    <Modal
                        {...props}
                        // size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton>
                            {/* <Modal.Title>{modalProduct.product_name}</Modal.Title> */}
                        </Modal.Header>
                        <Modal.Body closeButton>
                            <img src={modalProduct.product_imagefront} alt=''></img><br />
                            {modalProduct.product_name}<br />
                            원가 : {modalProduct.product_price}<br />
                            할인가격 : {modalProduct.product_discountprice}<br />
                            {modalProduct.product_price}<br />
                        </Modal.Body>
                    </Modal>
                    : null}
            </>

        );
    }
    function ModalQr(props) {
        // console.log("모달 : " + JSON.stringify(modalProduct));
        return (
            <>
                {modalQrData !== undefined ?
                    <Modal
                        {...props}
                        // size="lg"
                        // aria-labelledby="contained-modal-title-vcenter"
                        centered
                        className='qrCodeModal'
                    >
                        <Modal.Header closeButton className='qrCodeHeader' >
                            {/* <Modal.Title>Qr코드</Modal.Title> */}
                        </Modal.Header>
                        <Modal.Body className='qrCodeBody' closeButton>
                            <img className='img' src={modalQrData} alt=''></img><br/>
                        </Modal.Body>
                    </Modal>
                    : null}
            </>

        );
    }
    function createQrCode(data) {
        console.log("큐알코드 만들기 = " + data);
        // ! axios get
        console.log("axios get")
        console.log("searchDay = " + searchDay);
        axios
            .get(`https://k6e203.p.ssafy.io:8443/api/book/qrcode?bookSet=${data}`)
            .then((result) => {
                console.log(result.data);
                modalQrControl(result.data);
            })
            .catch((e) => {
                console.error("axios get 실패");
                console.error(e)
            });
    }

    return (
        <div className='bookingHistory'>
            <NavBar></NavBar>
            <Container>
                <Flip>
                    <DatePicker
                        locale={ko}
                        // fixedHeight
                        selected={selectDate}
                        onChange={(date) => setDate(date)}
                        highlightDates={highlightArray}
                        inline />
                </Flip>

                <div className='btnDiv'>
                    <Button onClick={changeAll} variant={checkAll === true ? 'warning' : 'light'} style={{ margin: "0 5px 0 5px" }}>전체</Button>
                    <Button onClick={changeProgress} variant={checkProgress === true ? 'warning' : 'light'} style={{ margin: "0 5px 0 5px" }}>거래 진행 중</Button>
                    <Button onClick={changeComplete} variant={checkComplete === true ? 'warning' : 'light'} style={{ margin: "0 5px 0 5px" }}>거래 완료</Button>
                </div>
                <div className='under'>

                    <Table>

                        {product !== undefined && product.length > 0 ?
                            product.map((data, index) => {
                                console.log("product[" + index + "] = " + JSON.stringify(data[0].user_name));
                                // console.log("product[" + index + "] = " + product[index].product_name);
                                return (
                                    <>
                                    <Flip>
                                        <div className='div'>
                                            <colgroup>
                                                <col width="25%" />
                                                <col width="35%" />
                                                <col width="15%" />
                                                <col width="35%" />
                                            </colgroup>

                                            <thead>
                                                <tr className='tr'>
                                                    <th colSpan={"4"}><div className='thName'>{data[0].user_name}</div></th>
                                                </tr>
                                                <tr className='tr'>
                                                    <th colSpan={"4"}><div className='thDate'>{changeDate(data[0].book_date)} {changeTime(data[0].book_hour)}</div></th>
                                                </tr>
                                                <tr>
                                                    <th>상품</th>
                                                    <th>상품명</th>
                                                    <th>수량</th>
                                                    <th>가격</th>
                                                </tr>
                                            </thead>
                                            {data.map((d, i) => {
                                                console.warn(d);
                                                return (
                                                    <>
                                                        <tbody key={i} style={{ borderBottomWidth: "2px", borderColor: "#F5F5F5" }}>
                                                            {/* <tr onClick={() => modalControl(d)}> */}
                                                            <tr>
                                                                <td>
                                                                    <div className='imageDiv2'>
                                                                        <img className='imgFile' src={d.product_imagefront} alt="userImage" />
                                                                    </div>
                                                                </td>
                                                                <td style={{ textAlign: "center", verticalAlign: "middle" }} >{d.product_name}</td>
                                                                <td style={{ textAlign: "center", verticalAlign: "middle" }} >{d.basket_count}</td>
                                                                <td style={{ textAlign: "center", verticalAlign: "middle" }} >{d.product_discountprice}원</td>
                                                            </tr>
                                                        </tbody>
                                                    </>
                                                )
                                            })}

                                            <tr>
                                                <td className='tr' colSpan={"4"}>{product[index][0].book_status === 0 ?
                                                    <Button className='QrBtn' onClick={() => createQrCode(data[index].book_set)}>Qr코드</Button>
                                                    : null}</td>
                                            </tr>
                                        </div>
                                        </Flip>
                                    </>
                                )
                            })
                            :
                            <div className='NoUnder'>
                                예약 내역이 없습니다.
                            </div>}
                        <MyVerticallyCenteredModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />

                    </Table>
                </div>
                <ModalQr
                    show={modalQrShow}
                    onHide={() => setModalQrShow(false)}
                />
            </Container>

        </div>
    );
}
function splitDate(date) {

    let year = '';
    let month = '';
    let day = '';


    let str = date + '';
    // console.log(str);
    let split = str.split(' ');

    switch (split[1]) {
        case "Jan":
            month = '01';
            break;
        case "Feb":
            month = '02';
            break;
        case "Mar":
            month = '03';
            break;
        case "Apr":
            month = '04';
            break;
        case "May":
            month = '05';
            break;
        case "Jun":
            month = '06';
            break;
        case "Jul":
            month = '07';
            break;
        case "Aug":
            month = '08';
            break;
        case "Sep":
            month = '09';
            break;
        case "Oct":
            month = '10';
            break;
        case "Nov":
            month = '11';
            break;
        case "Dec":
            month = '12';
            break;
        default:
            break;
    }

    year = split[3];
    day = split[2];

    let reDate = year + "-" + month + "-" + day
    return reDate;
}
function changeDate(date) {
    console.error(date);
    let year = '';
    let month = '';
    let day = '';


    // let str = date + '';
    // console.log(str);
    let split = date.split('-');
    year = split[0];
    month = split[1];
    day = split[2];


    let reDate = year + '년 ' + month + '월 ' + day + '일'
    console.log(reDate);
    return reDate;
}
function changeTime(date) {
    let str = date + '';
    let split = str.substring(0, 5);

    return split;
}


export default BookingHistory;