import React, { useEffect, useState } from 'react';
import { ko } from "date-fns/esm/locale";
import { Button, Container, Table, ModalFooter, FormControl, Modal } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from '../../common/NavBar';
import DatePicker from 'react-datepicker';
import NavStore from '../../../store/NavStore';
import Fade from "react-reveal/Fade";
import BackButton from '../../BackButton';



function BookingHistory(props) {

    const setNavHeader = NavStore(state => state.setNavHeader);
    useEffect(()=>{
        setNavHeader('예약 내역');
      },[])

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

    // 유저 예약 날짜 가져오기
    useEffect(() => {
        // ! axios get
        axios
            .get(`https://k6e203.p.ssafy.io:5001/data/calender-detail/${localStorage.getItem("id")}`)
            .then((result) => {
                setHighlight(result.data.result);
            })
            .catch((e) => {
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
        setSelectDate(date)
        setSearchDay(splitDate(date));
    }

    // 전체 내역 가져오기
    useEffect(() => {
        if (!checkAll) return
        // ! axios get
        axios
            .get(`https://k6e203.p.ssafy.io:5001/data/calender-detail/all/${localStorage.getItem("id")}/${searchDay}`)
            .then((result) => {
                setProduct(result.data.info);
            })
            .catch((e) => {
                console.error(e)
            });
    }, [selectDate, checkAll]);
    // 진행 내역 가져오기
    useEffect(() => {
        if (!checkProgress) return
        // ! axios get
        axios
            .get(`https://k6e203.p.ssafy.io:5001/data/calender-detail/progress/${localStorage.getItem("id")}/${searchDay}`)
            .then((result) => {
                setProduct(result.data.info);
            })
            .catch((e) => {
                console.error(e)
            });
    }, [selectDate, checkProgress]);
    // 완료 내역 가져오기
    useEffect(() => {
        if (!checkComplete) return
        // ! axios get
        axios
            .get(`https://k6e203.p.ssafy.io:5001/data/calender-detail/complete/${localStorage.getItem("id")}/${searchDay}`)
            .then((result) => {
                setProduct(result.data.info);
            })
            .catch((e) => {
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
        return (
            <>
                {modalProduct !== undefined ?
                    <Modal
                        {...props}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton>
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
        return (
            <>
                {modalQrData !== undefined ?
                    <Modal
                        {...props}
                        centered
                    >
                        <Modal.Header closeButton className='qrCodeHeader' >
                        </Modal.Header>
                        <Modal.Body className='qrCodeBody'>
                            <img className='img' src={modalQrData} alt=''></img><br />
                        </Modal.Body>
                    </Modal>
                    : null}
            </>
        );
    }
    function createQrCode(data) {
        // ! axios get
        axios
            .get(`https://k6e203.p.ssafy.io:8443/api/book/qrcode?bookSet=${data}`)
            .then((result) => {
                modalQrControl(result.data);
            })
            .catch((e) => {
                console.error(e)
            });
    }
    return (
        <div className='bookingHistory'>
            <NavBar></NavBar>
            <Container>
                <Fade>
                    <DatePicker
                        locale={ko}
                        selected={selectDate}
                        onChange={(date) => setDate(date)}
                        highlightDates={highlightArray}
                        inline />
                </Fade>

                <div className='btnDiv' style={{marginBottom:"20px"}}>
                    <Button onClick={changeAll} variant={checkAll === true ? 'warning' : 'light'} style={{ margin: "0 5px 0 5px" }}>전체</Button>
                    <Button onClick={changeProgress} variant={checkProgress === true ? 'warning' : 'light'} style={{ margin: "0 5px 0 5px" }}>거래 진행 중</Button>
                    <Button onClick={changeComplete} variant={checkComplete === true ? 'warning' : 'light'} style={{ margin: "0 5px 0 5px" }}>거래 완료</Button>
                </div>
                <Table className='bookTable'>
                    <Fade>
                        {product !== undefined && product.length > 0 ?
                            product.map((data, index) => {
                                return (
                                    <>
                                        <div className='bookDiv'>
                                            <colgroup>
                                                <col width="25%" />
                                                <col width="35%" />
                                                <col width="15%" />
                                                <col width="35%" />
                                            </colgroup>
                                            <thead>
                                                {index % 2 === 0 ?
                                                    <tr className='trHead'>
                                                        <th colSpan={"4"}><div className='thName'>- {data[0].user_name} -</div></th>
                                                    </tr>
                                                    :
                                                    <tr className='trHead2'>
                                                        <th colSpan={"4"}><div className='thName'>- {data[0].user_name} -</div></th>
                                                    </tr>}

                                                <tr>
                                                    <th className='thDate' colSpan={"4"}><div >{changeDate(data[0].book_date)} {changeTime(data[0].book_hour)}</div></th>
                                                </tr>
                                                <tr>
                                                    <th className='bookTh'>상품</th>
                                                    <th className='bookTh'>상품명</th>
                                                    <th className='bookTh'>수량</th>
                                                    <th className='bookTh'>가격</th>
                                                </tr>
                                            </thead>
                                            {data.map((d, i) => {
                                                return (
                                                    <>
                                                        <tbody key={i} className='bookTbody'>
                                                            <tr>
                                                                <td className='bookTd'>
                                                                    <span className='bookImageDiv'>
                                                                        <img className='bookImgFile' src={d.product_imagefront} alt="userImage" />
                                                                    </span>
                                                                </td>
                                                                <td className='bookTd' >{d.product_name}</td>
                                                                <td className='bookTd'>{d.basket_count}</td>
                                                                <td className='bookTd'>{d.product_discountprice}원</td>
                                                            </tr>
                                                        </tbody>
                                                    </>
                                                )
                                            })}

                                            <tr>
                                                <td className='bookQrTd' colSpan={"4"}>
                                                    {data[0].book_status === 0 ?
                                                        <Button className='QrBtn' onClick={() => createQrCode(data[0].book_set)}>Qr코드</Button>
                                                        : null}
                                                </td>
                                            </tr>
                                        </div>
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
                    </Fade>
                </Table>
                <ModalQr
                    show={modalQrShow}
                    onHide={() => setModalQrShow(false)}
                />
            </Container>
            <BackButton></BackButton>
        </div>
    );
}
function splitDate(date) {

    let year = '';
    let month = '';
    let day = '';


    let str = date + '';
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
    let year = '';
    let month = '';
    let day = '';
    let split = date.split('-');
    year = split[0];
    month = split[1];
    day = split[2];
    let reDate = year + '년 ' + month + '월 ' + day + '일'
    return reDate;
}
function changeTime(date) {
    let str = date + '';
    let split = str.substring(0, 5);

    return split;
}


export default BookingHistory;