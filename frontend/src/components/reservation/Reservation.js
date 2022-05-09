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
import userStore from '../../store/userStore';

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
        // ! 스토어 아이디 저스텐드에 저장해서 써야함.
    axios
    .get("http://localhost:5001/data/reservation-progress/Srkdrhkddms")
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
        
    


const submit = ()=> {
    console.log(startDate);
    console.log(startTime);
};

    return (
        <div>
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