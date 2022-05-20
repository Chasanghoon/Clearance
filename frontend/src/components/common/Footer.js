import React from "react";


const Footer = () => {
    return (
        <div style={{
            backgroundColor:'wheat'
        }}>
            <div style={{
                paddingTop: "0.3%",
                paddingLeft: "1%",
                textAlign: 'left',
                fontSize:'20px',
            }}>Clearance
                <br/>
            <span style={{
                fontWeight:'bold',
                textAlign: 'left',
                fontSize: '15px',
                paddingLeft: '10px'
            }}>사업자정보확인</span>
            <span style={{
                fontWeight:'bold',
                textAlign: 'left',
                fontSize: '15px',
                paddingLeft: '10px'
            }}>이용약관</span>
            <span style={{
                fontWeight:'bold',
                textAlign: 'left',
                fontSize: '15px',
                paddingLeft: '10px'
            }}>개인정보처리방침</span>
            <span style={{
                fontWeight:'bold',
                textAlign: 'left',
                fontSize: '15px',
                paddingLeft: '10px'
            }}>위치정보이용약관</span>
                <div style={{
                    fontSize: '15px',
                    paddingBottom:"0.3%"
                }}>
                    Clearance는 통신판매중개자이며 통신판매의 당사자가 아닙니다.<br/>
                    따라서 Clearance는 상품거래정보 및 거래에 대한 책임을 지지 않습니다.
            </div>
            </div>
        </div>
    )
}

export default Footer;