import React from "react";
import {Link} from 'react-router-dom';
import Button from "react-bootstrap/Button";

const NavBar = () => {

    const logout = () => {
        console.log(sessionStorage.getItem("id"));
        sessionStorage.clear();
    }
    
    return (
    
        <div style={{
            backgroundColor:"beige"
        }}>
            <span style={{
                marginLeft:'1%'
            }}>clearance</span>
            <span style={{
                marginLeft:'40%'
            }}>
            <Link to="../login"><Button style={{
                display: sessionStorage.getItem("id") === null ? "none" : "block",
            }}> mypage </Button></Link>
            <Link to = "../"><Button onClick={logout} style={{
                display: sessionStorage.getItem("id") === null ? "none" : "block",
            }}> logout </Button></Link>
            {/* <Link to="../login"><Button style={{
                display: sessionStorage.getItem("id") === null ? "block" : "none",
            }}> log in </Button></Link>
            <Link to="../register"><Button style={{
                display: sessionStorage.getItem("id") === null ? "block" : "none",
            }}> sign up </Button></Link> */}
            

            </span>
        </div>
    )
}

export default NavBar;