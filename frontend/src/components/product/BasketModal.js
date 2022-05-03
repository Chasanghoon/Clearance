// 장바구니 담기 버튼을 클릭 후, 장바구니에 성공적으로 물건이 담겼을 때 나올 모달
import React from "react";
import { Link } from "react-router-dom";

const BasketModal = () => {
    return (
        <div>
            <Link to="../main">계속 쇼핑하기</Link>
            <Link to="../main">장바구니로 이동</Link>
        </div>
    )
}

export default BasketModal;