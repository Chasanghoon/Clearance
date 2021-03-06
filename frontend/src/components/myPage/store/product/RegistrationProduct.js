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
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import NavBar from '../../../common/NavBar';
import NavStore from '../../../../store/NavStore';
import Swal from 'sweetalert2'

function RegistrationProduct(props) {
    const setNavHeader = NavStore(state => state.setNavHeader);
    const userId = userStore(state => state.userId);

    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productDiscount, setProductDiscount] = useState("");
    const [productStock, setProductStock] = useState("");
    const [productExpDate, setProductExpDate] = useState("");
    const [categoryId, setCategoryId] = useState("");

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
        // const productDiscountRegex = /^[0-9]{1}[.]{1}[0-9]$/;
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
        setNavHeader("상품 등록");
    }, []);
    const onSubmit = (e) => {

        if (validation()) return;

        // ! axios POST
        const productRegisterRequest = {
            category_id: categoryId,
            product_discount: productDiscount / 100,
            product_expDate: productExpDate,
            product_name: productName,
            product_price: productPrice,
            product_stock: productStock,
            store_user_id: userId
        }

        const formData = new FormData();
        formData.append('productRegisterRequest', new Blob([JSON.stringify(productRegisterRequest)], { type: "application/json" }));
        formData.append('backimage', backImage.back_image_file);
        formData.append('frontimage', frontImage.front_image_file);

        axios
            .post("https://k6e203.p.ssafy.io:8443/api/product/register",
                formData
                ,
                {
                    headers: { 'Content-Type': 'application/json' }
                },
            )
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: '상품등록 완료!',
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
        front_preview_URL: "img/default_image.png",
    });
    const [frontLoaded, setFrontLoaded] = useState(false);

    const saveFrontImage = (e) => {
        e.preventDefault();
        const frontFileReader = new FileReader();

        if (e.target.files[0]) {
            setFrontLoaded("loading")
            frontFileReader.readAsDataURL(e.target.files[0]);
        }
        frontFileReader.onload = () => {
            setFrontImage(
                {
                    front_image_file: e.target.files[0],
                    front_preview_URL: frontFileReader.result
                }
            )
            setFrontLoaded(true);
        }
    }
    const deleteFrontImage = () => {
        setFrontImage({
            front_image_file: "",
            front_preview_URL: "img/default_image.png",
        });
        setFrontLoaded(false);
    }

    const [backImage, setBackImage] = useState({
        back_image_file: "",
        back_preview_URL: "img/default_image.png",
    });
    const [backLoaded, setBackLoaded] = useState(false);

    const saveBackImage = (e) => {
        e.preventDefault();
        const backFileReader = new FileReader();

        if (e.target.files[0]) {
            setBackLoaded("loading")
            backFileReader.readAsDataURL(e.target.files[0]);
        }
        backFileReader.onload = () => {
            setBackImage(
                {
                    back_image_file: e.target.files[0],
                    back_preview_URL: backFileReader.result
                }
            )
            setBackLoaded(true);
        }
    }
    const deleteBackImage = () => {
        setBackImage({
            back_image_file: "",
            back_preview_URL: "img/default_image.png",
        });
        setBackLoaded(false);
    }

    let navigate = useNavigate();

    const dateData = (date) => {
        setStartDate(date);
        onChangeProductExpDate(splitDate(date));
    }

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <Form.Control style={{ backgroundColor: "white" }} maxLength={50} placeholder="유통기한" value={value} onClick={onClick} onChange={onChangeProductExpDate} readOnly />
    ));
    return (
        <div className='registrationProduct'>
            <NavBar></NavBar>
            <Container className='mt-5'>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formFile1" style={{ "textAlign": "center" }}>
                        <div className='registrationProductImageDiv'>
                            {frontLoaded === false || frontLoaded === true ?
                                (<img className='registrationProductImgFile' src={frontImage.front_preview_URL} alt="userImage" />) :
                                (<Spinner animation="border" variant="warning" />)}
                        </div>
                        <div>
                            <Button className='imageButton'><Form.Label>상품 이미지 선택</Form.Label></Button>
                            <Button variant='danger' className='imageButton' onClick={deleteFrontImage}>상품 이미지 삭제</Button>
                            <Form.Control type="file" accept="image/*" onChange={saveFrontImage} style={{ display: "none" }} />
                        </div>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formFile2" style={{ "textAlign": "center" }}>
                        <div className='registrationProductImageDiv'>
                            {backLoaded === false || backLoaded === true ?
                                (<img className='registrationProductImgFile' src={backImage.back_preview_URL} alt="userImage" />) :
                                (<Spinner animation="border" variant="warning" />)}
                        </div>
                        <div>
                            <Button className='imageButton'><Form.Label>상품 상세 이미지 선택</Form.Label></Button>
                            <Button variant='danger' className='imageButton' onClick={deleteBackImage}>상품 상세 이미지 삭제</Button>
                            <Form.Control type="file" accept="image/*" onChange={saveBackImage} style={{ display: "none" }} />
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
                            <Form.Select value={categoryId} onChange={onChangeCategoryId}>
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
                    <div className="d-grid gap-1 mb-3 submitBtn">
                        <Button style={{ backgroundColor: "#176a49", border: "hidden" }} onClick={onSubmit}>상품 등록</Button>
                        <Button style={{
                            marginTop: "3%"
                        }} variant="secondary" onClick={() => navigate(-1)}>돌아가기</Button>
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

export default RegistrationProduct;