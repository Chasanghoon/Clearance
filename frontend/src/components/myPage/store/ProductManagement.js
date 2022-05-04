import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from "date-fns/esm/locale";
import { Button, Container } from 'react-bootstrap';
import axios from 'axios';

function ProductManagement(props) {
    const [selectDate, setSelectDate] = useState();
    console.log(selectDate);
    

    // ! axios get
    // console.log("axios get")
    // axios
    // .get("http://localhost:5001/data/reservation-progress/18")
    // .then((result) => {
    //     console.log("result.data[0] = " + result.data[0]);
    //     // setUserName(result.data[0].user_name);
    //     // setUserImage(result.data[0].user_name);
    //     // setUserPhone(result.data[0].user_name);
    //     // setUserAddress(result.data[0].user_name);
    //     const storeData = result.data[0];
    //     setStoreInfo(storeData);
    //     console.log("storeInfo = " + JSON.stringify(storeInfo));
    // })
    // .catch((e) => {
    //     console.error("axios get 실패");
    //     console.error(e)
    // });  

    return (
        <div>
            <Container>
                productManagement

                <DatePicker
                    locale={ko}
                    selected={selectDate}
                    onChange={(date) => setSelectDate(date)}
                    inline />
                <Button variant='warning'>전체 상품 관리</Button>

            </Container>


        </div>
    );
}

export default ProductManagement;