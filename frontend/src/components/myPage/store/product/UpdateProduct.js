import React, { useState, forwardRef, useEffect } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Spinner } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import userStore from '../../../../store/userStore';
import DatePicker from 'react-datepicker';
import { ko } from "date-fns/esm/locale";
import { useLocation } from 'react-router-dom';
import NavBar from '../../../common/NavBar';
import NavStore from '../../../../store/NavStore';
import Swal from 'sweetalert2'

function UpdateProduct(props) {
    const setNavHeader = NavStore(state => state.setNavHeader);

    const location = useLocation();
    const data = location.state.data;

    const userId = userStore(state => state.userId);

    const [productName, setProductName] = useState(data.productName);
    const [productPrice, setProductPrice] = useState(data.productPrice);
    const [productDiscount, setProductDiscount] = useState(data.productDiscount * 100);
    const [productStock, setProductStock] = useState(data.productStock);
    const [productExpDate, setProductExpDate] = useState(data.productExpdate);
    const [checkProductChange, setCheckProductChange] = useState(false);
    const [categoryId, setCategoryId] = useState(data.categoryId);

    const [productNameError, setProductNameErrorr] = useState(false);
    const [productPriceError, setProductPriceError] = useState(false);
    const [productDiscountError, setProductDiscountError] = useState(false);
    const [productStockeError, setProductStockeError] = useState(false);
    const [productExpDateError, setProductExpDateError] = useState(false);
    const [categoryIdError, setCategoryIdError] = useState(false);

    const [startDate, setStartDate] = useState();

    const onChangeProductName = (e) => {
        setProductNameErrorr(false);
        setProductName(e.target.value)
    };
    const onChangeProductPrice = (e) => {
        const productPriceRegex = /^[0-9]+$/;
        if ((!e.target.value || (productPriceRegex.test(e.target.value)))) setProductPriceError(false);
        else setProductPriceError(true);
        setProductPrice(e.target.value)
    };
    const onChangeProductDiscount = (e) => {
        const productDiscountRegex = /^[0-9]+$/;
        if ((!e.target.value || (productDiscountRegex.test(e.target.value)))) setProductDiscountError(false);
        else setProductDiscountError(true);
        setProductDiscount(e.target.value)
    };
    const onChangeProductStock = (e) => {
        const productStocktRegex = /^[0-9]+$/;
        if ((!e.target.value || (productStocktRegex.test(e.target.value)))) setProductStockeError(false);
        else setProductStockeError(true);
        setProductStock(e.target.value)
    };
    const onChangeProductExpDate = (e) => {
        setProductExpDateError(false);
        setCheckProductChange(true);
        setProductExpDate(e)
    };
    const onChangeCategoryId = (e) => {
        setCategoryIdError(false);
        setCategoryId(e.target.value)
    };

    const validation = () => {
        if (!productName) setProductNameErrorr(true);
        if (!productPrice) setProductPriceError(true);
        if (!productDiscount) setProductDiscountError(true);
        if (!productStock) setProductStockeError(true);
        if (!productExpDate) setProductExpDateError(true);
        if (!categoryId) setCategoryIdError(true);

        if (productName.length === 0 || productPrice.length === 0 || productDiscount.length === 0 || productStock.length === 0 || productExpDate.length === 0 || categoryId.length === 0 ||
            productNameError || productPriceError || productDiscountError || productStockeError || productExpDateError || categoryIdError) return true;
        else return false;
    };

    useEffect(() => {
        setNavHeader("상품 수정");
    }, []);

    const onSubmit = (e) => {
        if (validation()) return;
        if (!checkProductChange) {
            setProductExpDate(notChangeDate(productExpDate));
        }

        // ! axios PUT      
        axios
            .put("https://k6e203.p.ssafy.io:8443/api/product/modify",
                {
                    category_id: categoryId,
                    product_discount: productDiscount / 100,
                    product_expDate: productExpDate,
                    product_id: data.productId,
                    product_name: productName,
                    product_price: productPrice,
                    product_stock: productStock,
                    store_user_id: userId
                }
                ,
                {
                    headers: { 'Content-Type': 'application/json' }
                },
            )
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: '상품수정 완료!',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate(-1);

            })
            .catch((e) => {
                console.error(e);
            });
    };

    const [frontImage, setFrontImage] = useState({
        front_image_file: "",
        front_preview_URL: data.productImagefront,
    });

    const [backImage, setBackImage] = useState({
        back_image_file: "",
        back_preview_URL: data.productImageback,
    });

    let navigate = useNavigate();

    const dateData = (date) => {
        setStartDate(date);
        onChangeProductExpDate(splitDate(date));
    }

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <Form.Control style={{ backgroundColor: "white", }} maxLength={50} placeholder={updateDate(data.productExpdate)} value={value} onClick={onClick} onChange={onChangeProductExpDate} readOnly />

    ));

    function changeDate() {
        updateDate(data.productExpdate);
    }


    return (
        <div className='updateProduct'>
            <NavBar></NavBar>
            <Container className='mt-5'>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formFile1" style={{ "textAlign": "center" }}>
                        <div className='updateProductImageDiv'>
                            <img className='updateProductImgFile' src={frontImage.front_preview_URL} alt="userImage" />
                        </div>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formFile2" style={{ "textAlign": "center" }}>
                        <div className='updateProductImageDiv'>
                            <img className='updateProductImgFile' src={backImage.back_preview_URL} alt="userImage" />
                        </div>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col >
                            <Row sm className='label'>상품명</Row>
                        </Col>
                        <Col sm>
                            <Form.Control maxLength={20} placeholder="상품명" value={productName} onChange={onChangeProductName} />
                            {productNameError && <div className="invalid-input">상품명을 입력해주세요.</div>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col >
                            <Row sm className='label'>상품가격</Row>
                        </Col>
                        <Col sm>
                            <Form.Control maxLength={20} placeholder="상품가격" value={productPrice} onChange={onChangeProductPrice} />
                            {productPriceError && <div className="invalid-input">숫자로만 입력해주세요.</div>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col >
                            <Row sm className='label'>할인율</Row>
                        </Col>
                        <Col sm>
                            <Form.Control maxLength={20} placeholder="할인율" value={productDiscount} onChange={onChangeProductDiscount} />
                            {productDiscountError && <div className="invalid-input">할인율을 숫자로만 입력해주세요. ( ex. 30% → 30 )</div>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col >
                            <Row sm className='label'>재고</Row>
                        </Col>
                        <Col sm>
                            <Form.Control maxLength={20} placeholder="재고" value={productStock} onChange={onChangeProductStock} />
                            {productStockeError && <div className="invalid-input">재고 수량을 숫자로만 입력해주세요.</div>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Col >
                            <Row sm className='label'>유통기한</Row>
                        </Col>
                        <Col sm>
                            <DatePicker
                                selected={startDate}
                                dateFormat="yyyy년 MM월 dd일 (eee)"
                                customInput={<ExampleCustomInput />}
                                locale={ko}
                                showPopperArrow={false}
                                popperPlacement="auto"
                                minDate={new Date()}
                                onChange={date => dateData(date)} />

                            {productExpDateError && <div className="invalid-input">유통기한을 입력하세요.</div>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col >
                            <Row sm className='label'>카테고리</Row>
                        </Col>
                        <Col sm>
                            <Form.Select className='mb-3' value={categoryId} onChange={onChangeCategoryId}>
                                <option>카테고리</option>
                                <option value="0">과일</option>
                                <option value="1">채소</option>
                                <option value="2">쌀/잡곡/견과</option>
                                <option value="3">정육/계란류</option>
                                <option value="4">수산물/건해산</option>
                                <option value="5">우유/유제품/유아식</option>
                                <option value="6">냉장/냉동/간편식</option>
                                <option value="7">밀키트/김치/반찬</option>
                                <option value="8">생수/음료/주류</option>
                                <option value="9">커피/원두/차</option>
                                <option value="10">라면/면류/즉석식품/통조림</option>
                                <option value="11">장류/양념/가루/오일</option>
                                <option value="12">과자/시리얼/빙과/떡</option>
                                <option value="13">베이커리/잼/샐러드</option>
                                <option value="14">건강식품</option>
                            </Form.Select>
                            {categoryIdError && <div className="invalid-input">카테고리를 선택해 주세요.</div>}
                        </Col>
                    </Form.Group>
                    <div className="d-grid gap-1 mb-3">
                        <Button style={{ backgroundColor: "#176a49", border: "hidden", marginBottom: "3%" }} onClick={onSubmit}>상품 수정</Button>
                        <Button variant="secondary" onClick={() => navigate(-1)}>돌아가기</Button>
                    </div>
                </Form>
            </Container>
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

    let reDate = year + month + day
    return reDate;
}
function updateDate(date) {
    let week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');
    let today = new Date(date).getDay();

    let year = '';
    let month = '';
    let day = '';
    let dotw = week[today];

    let str = date + '';
    let str2 = dotw + '';

    let split = str.split('-');
    let split2 = str2.substring(0, 1);
    const reDate = split[0] + '년 ' + split[1] + '월 ' + split[2] + '일 (' + split2 + ')';

    return reDate;
}
function notChangeDate(date) {
    console.error(date);
    let year = '';
    let month = '';
    let day = '';

    let split = date.split('-');
    year = split[0];
    month = split[1];
    day = split[2];


    let reDate = year + month + day
    return reDate;
}
export default UpdateProduct;