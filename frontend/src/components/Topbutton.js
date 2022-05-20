import React, { useState, useEffect } from "react";
import "../App.css"

const Topbutton = () => {
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