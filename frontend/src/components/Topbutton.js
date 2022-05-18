import React, { useState, useEffect } from "react";
import "../App.css"

const Topbutton = () => {
//     const [ScrollY, setScrollY] = useState(0);
//     const [BtnStatus, setBtnStatus] = useState(false); // 버튼 상태

//     const handleFollow = () => {
//         setScrollY(window.pageYOffset);
//         if(ScrollY > 100) {
//             // 100 이상이면 버튼이 보이게
//             setBtnStatus(true);
//         } else {
//             // 100 이하면 버튼이 사라지게
//             setBtnStatus(false);
//         }
//     }

//     const handleTop = () => {  // 클릭하면 스크롤이 위로 올라가는 함수
//         console.log(window.scrollY)
//         console.log(window.scrollX)
//         window.scrollTo({
//             top: 0,
//             behavior: "smooth"
//         });
//         setScrollY(0);  // ScrollY 의 값을 초기화
//         setBtnStatus(false); // BtnStatus의 값을 false로 바꿈 => 버튼 숨김
//     }

//     useEffect(() => {
//         console.log("ScrollY is ", ScrollY); // ScrollY가 변화할때마다 값을 콘솔에 출력
//     },[ScrollY])
// // 왜 안됨....?
//     useEffect(() => {
//         const watch = () => {
//             window.addEventListener('scroll', handleFollow)
//             }
//         watch();
        
//         return () => {
//             window.removeEventListener('scroll', handleFollow)
//             }
//     },)
    
    const [baclToTopButton, setBackToTopButton] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setBackToTopButton(true)
            } else {
                setBackToTopButton(false)
            }
        })
    }, [])
    
    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior:"smooth"
        })
    }


    return (
        <div >
            <div className="TOPDiv">
                {baclToTopButton && (
                    <img
                    className="TOPImg"
                    onClick={scrollUp}  // 버튼 클릭시 함수 호출
                    alt="" src="img/top_arrow.png"></img>)}
            </div>
        </div>
    );
}

export default Topbutton;