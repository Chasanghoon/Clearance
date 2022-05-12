import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { Button, Container, Table, ModalFooter, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
import { addDays, subDays } from 'date-fns';
import { Tab } from 'bootstrap';

function ProductManagement(props) {
    const [highlight, setHighlight] = useState();
    const [selectDate, setSelectDate] = useState(new Date());
    const [searchDay, setSearchDay] = useState(splitDate(selectDate));

    const [product, setProduct] = useState();
    const [modalProduct, setModalProduct] = useState();
    const [deleteCheck, setDelectCheck] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);


    console.log(selectDate);


    useEffect(() => {
        // ! axios get
        console.log("axios get")
        axios
            .get(`http://localhost:8080/api/product/distinctdate?storeuserId=${sessionStorage.getItem("id")}`)
            // .get(`http://localhost:8080/api/product/distinctdate?storeuserId=in1`)
            .then((result) => {
                setHighlight(result.data);
            })
            .catch((e) => {
                console.error("axios get 실패");
                console.error(e)
            });
    }, [deleteCheck])
    useEffect(() => {
        // ! axios get
        console.log("axios get")
        console.log("searchDay = " + searchDay);
        axios
            .get(`http://localhost:8080/api/product/date?userId=${sessionStorage.getItem("id")}&date=${searchDay}`)
            // .get(`http://localhost:8080/api/product/date?userId=in1&date=${searchDay}`)
            .then((result) => {
                console.log(result.data);

                setProduct(result.data);
            })
            .catch((e) => {
                console.error("axios get 실패");
                console.error(e)
            });
    }, [selectDate, deleteCheck])

    function deleteProduct() {
        console.log(modalProduct.productId);
        // ! axios delete
        console.log("axios delete")
        axios
            .delete("http://localhost:8080/api/product/remove",
                {
                    data: {
                        productId: modalProduct.productId
                    }
                }
            )
            .then(() => {
                alert("상품 삭제 완료");
                setModalShow(false);
                setDelectCheck(!deleteCheck);
            })
            .catch((e) => {
                // console.error("axios get 실패");
                console.error(e)
            });
    }

    function modalControl(data) {
        setModalShow(true);
        setModalProduct(data);
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
                            <Modal.Title>{modalProduct.productName}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {/* {modalProduct.productName} */}
                            sd
                        </Modal.Body>
                        <ModalFooter>
                            <div style={{ textAlign: "center" }}>
                                <Link to="../updateProduct" state={{ data: modalProduct }}><Button variant="success"> 수정 </Button></Link>
                                <Button variant="danger" onClick={deleteProduct}> 삭제 </Button>
                            </div>
                        </ModalFooter>
                    </Modal>
                    : null}
            </>

        );
    }

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
    return (
        <div>
            <Container>
                productManagement

                <DatePicker
                    locale={ko}
                    selected={selectDate}
                    onChange={(date) => setDate(date)}
                    highlightDates={highlightArray}
                    inline />
                <div style={{ backgroundImage: "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)", margin: "10px 5% 10px 5%" }}>
                    {product !== undefined && product.length > 0 ?
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
                        :
                        null}

                </div>
                <Link to={"/allProductManagement"}><Button variant='warning'>전체 상품 관리</Button></Link>
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
export default ProductManagement;