import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from "date-fns/esm/locale";
import { Button, Container, Modal, ModalFooter } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BookingHistory(props) {
    const [product, setProduct] = useState();
    const [modalProduct, setModalProduct] = useState();
    const [modalShow, setModalShow] = React.useState(false);

    const [selectDate, setSelectDate] = useState();
    console.log(selectDate)
    console.log(sessionStorage.getItem("id"));

    useEffect(() => {
        // ! axios get
        console.log("axios get")
        axios
            // .get(`http://localhost:5001/data/calender/all/?storeId=${sessionStorage.getItem("id")}`)
            .get(`http://localhost:5001/data/calender/all/${sessionStorage.getItem("id")}`)
            .then((result) => {
                console.log(result.data.info);
                // setProduct(result.data.content);
            })
            .catch((e) => {
                // console.error("axios get 실패");
                console.error(e)
            });
    }, []);

    function modalControl(data) {
        setModalShow(true);
        setModalProduct(data);
    }

    function MyVerticallyCenteredModal(props) {
        // console.log("모달 : " + JSON.stringify(modalProduct));
        // return (
        //     <>
        //         {modalProduct !== undefined ?
        //             <Modal
        //                 {...props}
        //                 // size="lg"
        //                 aria-labelledby="contained-modal-title-vcenter"
        //                 centered
        //             >
        //                 <Modal.Header closeButton>
        //                     <Modal.Title>{modalProduct.productName}</Modal.Title>
        //                 </Modal.Header>
        //                 <Modal.Body>
        //                     {/* {modalProduct.productName} */}
        //                     sd
        //                 </Modal.Body>
        //                 <ModalFooter>
        //                     <div style={{ textAlign: "center" }}>
        //                         <Link to="../updateProduct" state={{ data: modalProduct }}><Button variant="success"> 수정 </Button></Link>
        //                         <Button variant="danger" onClick={deleteProduct}> 삭제 </Button>
        //                     </div>
        //                 </ModalFooter>
        //             </Modal>
        //             : null}
        //     </>

        // );
    }

    return (
        <div>
            <h1>BookingHistory</h1>

            <Container>
                productManagement

                <DatePicker
                    locale={ko}
                    selected={selectDate}
                    onChange={(date) => setSelectDate(date)}
                    inline />
                <Button variant='warning'>전체</Button>
                <Button variant='warning'>거래 진행 중</Button>
                <Button variant='warning'>거래 완료</Button>



{/* 
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
                        {product !== undefined ?
                            product.map((data, index) => {
                                return (
                                    <tbody key={index} style={{ borderBottomWidth: "2px", borderColor: "#F5F5F5" }}>
                                        <tr onClick={() => modalControl(data)}>
                                            <td>
                                                <div className='imageDiv2'>
                                                    <img className='imgFile' src={data.productImagefront} alt="userImage" />)
                                                </div>
                                            </td>
                                            <td style={{ textAlign: "center", verticalAlign: "middle" }} >{data.productName}</td>
                                            <td style={{ textAlign: "center", verticalAlign: "middle" }} >{data.bookStock}</td>
                                            <td style={{ textAlign: "center", verticalAlign: "middle" }} >{data.productDiscountprice}원</td>
                                        </tr>
                                    </tbody>
                                )
                            })
                            : null}
                        <MyVerticallyCenteredModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />

                    </Table>
                </div>
                <div>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                        <Button variant="outline-secondary" id="button-addon2">
                            Button
                        </Button>
                    </InputGroup>
                    <Link to={"/registrationProduct"}><Button variant='warning'>등록</Button></Link>
                </div>



*/}

            </Container> 

        </div>
    );
}

export default BookingHistory;