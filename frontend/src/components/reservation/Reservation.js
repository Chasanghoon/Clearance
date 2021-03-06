import React, { forwardRef, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DatePicker from 'react-datepicker';
import { ko } from "date-fns/esm/locale";
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import NavBar from '../common/NavBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReservationStore from '../../store/ReservationStore';
import NavStore from '../../store/NavStore';
import Swal from 'sweetalert2';
import BackButton from '../BackButton';

function Reservation(props) {

    const setNavHeader = NavStore(state => state.setNavHeader);
    useEffect(()=>{
        setNavHeader('예약진행');
      },[])

    const [startDate, setStartDate] = useState();
    const [startTime, setStartTime] = useState();
    const [saveData, setSaveData] = useState();
    const [saveTime, setSaveTime] = useState();
    const [userName, setUserName] = useState();
    const [userImage, setUserImage] = useState();
    const [userPhone, setUserPhone] = useState();
    const [userAddress, setUserAddress] = useState();
    const storeId = ReservationStore(state => state.storeId);
    const setBookSet = ReservationStore(state => state.setBookSet);

    const [saveDataError, setSaveDataError] = useState(false);
    const [saveTimeError, setSaveTimeError] = useState(false);

    const expdate = ReservationStore(state => state.expdate)

    const onChangeSaveData = (e) => {
        setSaveDataError(false);
        setSaveData(e)
    };
    const onChangeSaveTime = (e) => {
        setSaveTimeError(false);
        setSaveTime(e)
    };

    const validation = () => {
        if (!saveData) setSaveDataError(true);
        if (!saveTime) setSaveTimeError(true);
        if (saveData === undefined || saveTime === undefined) return true;
        if (saveDataError || saveTimeError) return true;
        else return false;
    };

    useEffect(() => {
        splitDate2(expdate);
        // ! axios get
        axios
            .get(`https://k6e203.p.ssafy.io:5001/data/reservation-progress/${storeId}`)
            .then((result) => {
                setUserName(result.data[0].user_name);
                setUserImage(result.data[0].user_image);
                setUserPhone(result.data[0].user_phone);
                setUserAddress(result.data[0].user_address);
            })
            .catch((e) => {
                console.error("axios get 실패");
                console.error(e)
            });
    }, []);

    const submit = () => {
        
        if (validation()) return;
        // ! axios POST
        axios
            .post(`https://k6e203.p.ssafy.io:5001/data/reservation-add`,
                {
                    user_id: localStorage.getItem("id"),
                    store_user_id: storeId,
                    book_date: saveData,
                    book_hour: saveTime
                },
            )
            .then((e) => {
                setBookSet(e.data.book_set);
                Swal.fire({
                    icon: 'success',
                    title: '예약 완료!',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate("/reservationResult");
            })
            .catch((e) => {
                console.error(e.message);
            });
    };

    const dateData = (date) => {
        setStartDate(date);
        onChangeSaveData(splitDate(date));
    }
    const timeData = (time) => {
        setStartTime(time);
        onChangeSaveTime(splitTime(time));
    }
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <Form.Control style={{ backgroundColor: "white" }} maxLength={50} placeholder="예약 날짜" value={value} onClick={onClick} onChange={onChangeSaveData} readOnly />
    ));
    const ExampleCustomInput2 = forwardRef(({ value, onClick }, ref) => (
        <Form.Control style={{ backgroundColor: "white" }} maxLength={50} placeholder="예약 시간" value={value} onClick={onClick} onChange={onChangeSaveTime} readOnly />
    ));
    let navigate = useNavigate();
    return (
        <div className='reservation'>
            <NavBar></NavBar>
            <div style={{ margin: "20px 20px 20px 20px" }}>
                <Card>
                    <Card.Img variant="top" src={userImage} />
                    <Card.Body>
                        <Card.Title> {userName} </Card.Title>
                        <Card.Body>
                            <Row>
                                <Col xs={3}>전화번호</Col>
                                <Col>{userPhone}</Col>
                            </Row>
                            <Row>
                                <Col xs={3}>주소</Col>
                                <Col>{userAddress}</Col>
                            </Row>
                        </Card.Body>
                    </Card.Body>
                </Card>
                <div style={{ margin: "20px 20px 20px 20px" }}>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Col xs={2}><Form.Label column >날짜</Form.Label></Col>
                            <Col>
                                <DatePicker
                                    className='react-datepicker2'
                                    selected={startDate}
                                    dateFormat="yyyy년 MM월 dd일 (eee)"
                                    customInput={<ExampleCustomInput />}
                                    locale={ko}
                                    showPopperArrow={false}
                                    popperPlacement="auto"
                                    minDate={new Date()}
                                    maxDate={new Date(splitDate2(expdate))}
                                    onChange={date => dateData(date)} />

                                {saveDataError && <div className="invalid-input">예약 날짜를 선택하세요.</div>}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col xs={2}><Form.Label column >시간</Form.Label></Col>
                            <Col><DatePicker
                                selected={startTime}
                                dateFormat="h시 mm 분 aa"
                                customInput={<ExampleCustomInput2 />}
                                locale={ko}
                                showTimeSelect
                                showTimeSelectOnly
                                showPopperArrow={false}
                                popperPlacement="auto"
                                timeIntervals={30}
                                minTime={setHours(setMinutes(new Date(), 0), 9)}
                                maxTime={setHours(setMinutes(new Date(), 0), 22)}
                                timeCaption="시간"
                                onChange={(time) => timeData(time)} />
                                {saveTimeError && <div className="invalid-input">예약 시간을 선택하세요.</div>}
                            </Col>
                        </Form.Group>
                    </Form>
                    <Button className='rvBtn' onClick={submit}>예약하기</Button>
                </div>
            </div>
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
        case "Jan": month = '01'; break;
        case "Feb": month = '02'; break;
        case "Mar": month = '03'; break;
        case "Apr": month = '04'; break;
        case "May": month = '05'; break;
        case "Jun": month = '06'; break;
        case "Jul": month = '07'; break;
        case "Aug": month = '08'; break;
        case "Sep": month = '09'; break;
        case "Oct": month = '10'; break;
        case "Nov": month = '11'; break;
        case "Dec": month = '12'; break;
        default: break;
    }

    year = split[3];
    day = split[2];

    let reDate = year + '-' + month + '-' + day

    return reDate;
}
function splitTime(time) {

    let str = time + '';
    let split = str.split(' ');

    let reTime = split[4];

    return reTime;
}
function splitDate2(date) {

    let year = '';
    let month = '';
    let day = '';
    let str = date + '';

    year = str.substring(0, 4);
    month = str.substring(4, 6);
    day = str.substring(6, 8);


    let reDate = year + "-" + month + "-" + day
    return reDate;
}

export default Reservation;