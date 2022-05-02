import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DatePicker from 'react-datepicker';
import { ko } from "date-fns/esm/locale";
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';

import "react-datepicker/dist/react-datepicker.css";


function Reservation(props) {
    const [startDate, setStartDate] = useState();
    const [startTime, setStartTime] = useState(
        // setHours(setMinutes(new Date(), 0), 0)
    );
const test = ()=> {
    console.log(startDate);
    console.log(startTime);
};

    return (
        <div>
            <div style={{ margin: "20px 20px 20px 20px" }}>
                <Card>
                    <Card.Img variant="top" src="img/default_image.png" />
                    <Card.Body>
                        <Card.Title> 홈플러스 장림점 </Card.Title>
                        <Card.Body>
                            <Row>
                                <Col xs={3}>전화번호</Col>
                                <Col>000-000-0000</Col>
                            </Row>
                            <Row>
                                <Col xs={3}>주소</Col>
                                <Col>부산광역시 사하구 다대로 225</Col>
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
                    <Button onClick={test}>예약하기</Button>
                </div>

            </div>

        </div>
    );
}

export default Reservation;