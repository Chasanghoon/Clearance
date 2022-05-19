import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, FormControl, InputGroup, ModalFooter, Pagination, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
import UpdateProduct from './UpdateProduct';
import NavBar from '../../../common/NavBar';
import NavStore from '../../../../store/NavStore';
import BackButton from '../../../BackButton';
import Swal from 'sweetalert2'

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


    console.log(localStorage.getItem("id"));
    console.error(checkWord);
    useEffect(() => {
        setNavHeader("상품 관리");
        console.log("실행샐행!!!!!!!!!!!!!!")
        // ! axios get
        console.log("axios get")
        axios
            .get(`https://k6e203.p.ssafy.io:8443/api/product/info?page=${page}&size=${size}&storeId=${localStorage.getItem("id")}&word=${word}`)
            .then((result) => {
                console.log(result.data);

                setProduct(result.data.content);
                setTotalPage(result.data.totalPages);
                // setTotalPage(24);
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
                Swal.fire({
                    icon: 'success',
                    title: '상품삭제 완료!',
                    // icon: 'error',
                    // title: 'error!',
                    showConfirmButton: false,
                    timer: 1500
                  })
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
                        // aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton className='pmModalHeader'>
                            <Modal.Title className='pmModalTitle'>상품 상세 정보</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='pmModalBody'>
                            <Table>
                                <tbody>
                                    <tr style={{borderBottom:"hidden"}}>
                                        <td colSpan={2}><img className='img' src={modalProduct.productImagefront} alt=''></img></td>
                                    </tr>
                                    <tr>
                                        <td className='nameTd'>상품 명</td>
                                        <td>{modalProduct.productName}</td>
                                    </tr>
                                    <tr>
                                        <td className='nameTd'>원가</td>
                                        <td>{modalProduct.productPrice}</td>
                                    </tr>
                                    <tr>
                                        <td className='nameTd'>할인 율</td>
                                        <td>{modalProduct.productDiscount * 100}%</td>
                                    </tr>
                                    <tr>
                                        <td className='nameTd'>할인가</td>
                                        <td>{modalProduct.productDiscountprice}원</td>
                                    </tr>
                                    <tr>
                                        <td className='nameTd'>재고</td>
                                        <td>{modalProduct.productStock}</td>
                                    </tr>
                                    <tr>
                                        <td className='nameTd'>유통기한</td>
                                        <td>{modalProduct.productExpdate}</td>
                                    </tr>
                                    <tr>
                                        <td className='nameTd'>카테고리</td>
                                        <td>{changeCategory(modalProduct.categoryId)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <div className='pmModalBtnGroup'>
                                <Link to="../updateProduct" state={{ data: modalProduct }}><Button className='pmModalUpdateBtn'> 수정 </Button></Link>
                                <Button className='pmModalDeleteBtn' onClick={deleteProduct}> 삭제 </Button>
                            </div>
                        </Modal.Body>
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
                <Row className='row'>
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
                    <Button variant="outline-secondary" onClick={() => setCheckWord(!checkWord)}>
                        검색
                    </Button>
                </InputGroup >
                <BackButton></BackButton>
            </div>
        </div>
    );
}

function changeCategory(data) {
    let reCategory = ""
    switch (data) {
        case 0:
            reCategory = "과일";
            break;
        case 1:
            reCategory = "채소";
            break;
        case 2:
            reCategory = "쌀/잡곡/견과";
            break;
        case 3:
            reCategory = "정육/계란류";
            break;
        case 4:
            reCategory = "수산물/건해산";
            break;
        case 5:
            reCategory = "우유/유제품/유아식";
            break;
        case 6:
            reCategory = "냉장/냉동/간편식";
            break;
        case 7:
            reCategory = "밀키트/김치/반찬";
            break;
        case 8:
            reCategory = "생수/음료/주류";
            break;
        case 9:
            reCategory = "커피/원두/차";
            break;
        case 10:
            reCategory = "라면/면류/즉석식품/통조림";
            break;
        case 11:
            reCategory = "장류/양념/가루/오일";
            break;
        case 12:
            reCategory = "과자/시리얼/빙과/떡";
            break;
        case 13:
            reCategory = "베이커리/잼/샐러드";
            break;
        case 14:
            reCategory = "건강식품";
            break;
        default:
            break;
    }
    return reCategory;
}

export default AllProductManagement;