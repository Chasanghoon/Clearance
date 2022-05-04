import React, { useEffect, useState } from 'react';
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

import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';


function Reservation(props) {
    const [startDate, setStartDate] = useState();
    const [startTime, setStartTime] = useState();
    const [userName, setUserName] = useState();
    const [userImage, setUserImage] = useState();
    const [userPhone, setUserPhone] = useState();
    const [userAddress, setUserAddress] = useState();
    const [storeInfo, setStoreInfo] = useState({
        "user_image" : "img/default_image.png",
    });
    // const storeData = [];

    useEffect(() => {
        // ! axios get
    // console.log("axios get")
    axios
    .get("http://localhost:5001/data/reservation-progress/18")
    .then((result) => {
        console.log("result.data[0] = " + result.data[0]);
        // setUserName(result.data[0].user_name);
        // setUserImage(result.data[0].user_name);
        // setUserPhone(result.data[0].user_name);
        // setUserAddress(result.data[0].user_name);
        const storeData = result.data[0];
        setStoreInfo(storeData);
        console.log("storeInfo = " + JSON.stringify(storeInfo));
    })
    .catch((e) => {
        console.error("axios get 실패");
        console.error(e)
    });  
      }, []);
        
    


const submit = ()=> {
    console.log(startDate);
    console.log(startTime);
};

    return (
        <div>
            <NavBar></NavBar>
            <div style={{ margin: "20px 20px 20px 20px" }}>
                <Card>
                    {/* <Card.Img variant="top" src="img/default_image.png" /> */}
                    <Card.Img variant="top" src={storeInfo.user_image} />
                    <Card.Body>
                        <Card.Title> {storeInfo.user_address} </Card.Title>
                        <Card.Body>
                            <Row>
                                <Col xs={3}>전화번호</Col>
                                <Col>{storeInfo.user_phone}</Col>
                            </Row>
                            <Row>
                                <Col xs={3}>주소</Col>
                                <Col>{storeInfo.user_address}</Col>
                            </Row>
                        </Card.Body>
                    </Card.Body>
                </Card>
                <div style={{ margin: "20px 20px 20px 20px" }}>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Col xs={2}><Form.Label column >날짜</Form.Label></Col>
                            {/* <Col><Form.Control plaintext readOnly placeholder="날짜를 선택해주세요." /></Col> */}
                            <Col>
                                <DatePicker
                                    dateFormat="yyyy년 MM월 dd일 (eee)"
                                    locale={ko}
                                    showPopperArrow={false}
                                    // excludeDates={[new Date(), subDays(new Date(), 1),new Date("2022/05/18")]}
                                    minDate={new Date()}
                                    maxDate={new Date("2022/05/18")}
                                    selected={startDate}
                                    onChange={date => setStartDate(date)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col xs={2}><Form.Label column >시간</Form.Label></Col>
                            <Col><DatePicker
                                selected={startTime}
                                onChange={(date) => setStartTime(date)}
                                showTimeSelect
                                showTimeSelectOnly
                                locale={ko}
                                showPopperArrow={false}
                                timeIntervals={30}
                                minTime={setHours(setMinutes(new Date(), 0),9)}
                                maxTime={setHours(setMinutes(new Date(), 0), 22)}
                                timeCaption="시간"
                                dateFormat="h시 mm 분 aa"
                            /></Col>
                        </Form.Group>
                    </Form>
                    <Button onClick={submit}>예약하기</Button>
                </div>

            </div>

        </div>
    );
}

export default Reservation;