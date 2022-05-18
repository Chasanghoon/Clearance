import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, FormControl, InputGroup, ModalFooter, Pagination, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
import UpdateProduct from './UpdateProduct';
import NavBar from '../../../common/NavBar';
import NavStore from '../../../../store/NavStore';

function AllProductManagement(props) {
    const setNavHeader = NavStore(state => state.setNavHeader);

    const [product, setProduct] = useState();
    const [modalProduct, setModalProduct] = useState();
    const [deleteCheck, setDelectCheck] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);

    const [word, setWord] = useState("");
    const [checkWord, setCheckWord] = useState(false);

    const [totalPage, setTotalPage] = useState();
    const [page, setPage] = useState(1);
    const [firstPage, setFirstPage] = useState(1);
    const [lastPage, setLastPage] = useState(5);
    const size = 6;
    let items = [];
    let showItems = [];


    console.log(sessionStorage.getItem("id"));
    console.error(checkWord);
    useEffect(() => {
        setNavHeader("전체 상품 관리");
        console.log("실행샐행!!!!!!!!!!!!!!")
        // ! axios get
        console.log("axios get")
        axios
            .get(`https://k6e203.p.ssafy.io:8443/api/product/info?page=${page}&size=${size}&storeId=${sessionStorage.getItem("id")}&word=${word}`)
            .then((result) => {
                console.log(result.data);

                setProduct(result.data.content);
                setTotalPage(result.data.totalPages);
            })
            .catch((e) => {
                // console.error("axios get 실패");
                console.error(e)
            });
    }, [deleteCheck, checkWord, page]);

    function deleteProduct() {
        console.log(modalProduct.productId);
        // ! axios delete
        console.log("axios delete")
        axios
            .delete("https://k6e203.p.ssafy.io:8443/api/product/remove",
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
        // console.log("모달 : " + JSON.stringify(modalProduct));
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



    function plus() {

        if ((firstPage + 5) <= totalPage) {
            setFirstPage(firstPage + 5);
            setPage(firstPage + 5)

        }
        if ((lastPage + 5) <= totalPage) setLastPage(lastPage + 5);
        else setLastPage(totalPage);
        changePagination();

    }
    function minus() {
        if ((firstPage - 5) >= 1) setFirstPage(firstPage - 5);
        if ((firstPage == 1)) setFirstPage(1);
        if ((lastPage - 5) >= 5) {
            setLastPage(lastPage - 5);
            setPage(lastPage - 5)
        }

        if (lastPage == totalPage) {
            setLastPage(firstPage - 1);
            setPage(lastPage - 1)
        }

        console.error("firstPage = " + firstPage);
        changePagination();

    }

    if (totalPage !== undefined) {
        for (let number = 1; number <= totalPage; number++) {
            items.push(
                <Pagination.Item key={number} active={number === page} onClick={(data) => test(number)}>
                    {number}
                </Pagination.Item>
            );
        }
        changePagination();
    }


    function changePagination() {
        showItems = [];
        console.log("firstPage = " + firstPage);
        console.log("lastPage = " + lastPage);
        for (let number = firstPage; number <= lastPage; number++) {
            showItems.push(
                items[number - 1]
            );
        }
        console.warn();

        // console.log("Items = " + items);
        // console.log("showItems = " + showItems);

    }

    function test(number) {
        console.log(number + " 눌렀따");
        setPage(number)
    };



    return (
        <div className='allProductManagement'>
            <NavBar></NavBar>
            <Row>
                <Col>
                <div className='apmRegister'>
                <Link to={"/registrationProduct"}><Button variant='warning'>상품 등록</Button></Link>
            </div>
                </Col>
            </Row>
            
            <div className='apmDiv'>
                <Table className='apmTable'>
                    <colgroup>
                        <col width="20%" />
                        <col width="40%" />
                        <col width="12%" />
                        <col width="28%" />
                    </colgroup>
                    <thead className='apmTableThead'>
                        <tr className='apmTableTr'>
                            <th>상품</th>
                            <th>상품명</th>
                            <th>재고</th>
                            <th>가격</th>
                        </tr>
                    </thead>
                    {product !== undefined ?
                        product.map((data, index) => {
                            return (
                                <tbody key={index} className='apmTableTbody'>
                                    <tr onClick={() => modalControl(data)}>
                                        <td>
                                            <div className='apmImageDiv'>
                                                <img className='apmImgFile' src={data.productImagefront} alt="userImage" />)
                                            </div>
                                        </td>
                                        <td className='apmTableTd' >{data.productName}</td>
                                        <td className='apmTableTd' >{data.productStock}</td>
                                        <td className='apmTableTd' >{data.productDiscountprice}원</td>
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
                <Row>
                    <Col>
                    </Col>
                    <Col style={{ textAlign: 'center' }}>
                        <Pagination>
                            <Pagination.Prev onClick={minus} />
                            {showItems}
                            <Pagination.Next onClick={plus} />
                        </Pagination>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </div>
            <div className='apmInputGroup'>
                <InputGroup>
                    <FormControl
                        placeholder=""
                        onChange={(e) => setWord(e.target.value)}
                    />
                    <Button variant="outline-secondary" id="button-addon2" onClick={() => setCheckWord(!checkWord)}>
                        Button
                    </Button>
                </InputGroup >
            </div>
        </div>
    );
}



export default AllProductManagement;