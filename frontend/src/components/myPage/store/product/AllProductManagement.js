import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputGroup, ModalFooter, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
import UpdateProduct from './UpdateProduct';

function AllProductManagement(props) {
    const [product, setProduct] = useState();
    const [modalProduct, setModalProduct] = useState();
    const [deleteCheck, setDelectCheck] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);

    console.log(sessionStorage.getItem("id"));

    useEffect(() => {
        // ! axios get
        console.log("axios get")
        axios
            .get(`http://localhost:8080/api/product/info/?storeId=${sessionStorage.getItem("id")}`)
            .then((result) => {
                console.log(result.data.content);
                setProduct(result.data.content);
            })
            .catch((e) => {
                // console.error("axios get 실패");
                console.error(e)
            });
    }, [deleteCheck]);

    function deleteProduct(){
        console.log(modalProduct.productId);
        // ! axios delete
        console.log("axios delete")
        axios
            .delete("http://localhost:8080/api/product/remove",
            {
                data: {
                    productId : modalProduct.productId
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
                                <Link to="../updateProduct" state={{data: modalProduct}}><Button variant="success"> 수정 </Button></Link>
                                <Button variant="danger" onClick={deleteProduct}> 삭제 </Button>
                            </div>
                        </ModalFooter>
                    </Modal>
                    : null}
            </>

        );
    }
    return (
        <div>
            전체 상품 관리
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
        </div>
    );
}



export default AllProductManagement;