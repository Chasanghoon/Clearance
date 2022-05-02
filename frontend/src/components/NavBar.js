import React from "react";
import {Link} from 'react-router-dom';
import Button from "react-bootstrap/Button";

const NavBar = () => {

    return (
        <div>
            <span>clearance</span>
            <span style={{
                marginLeft:'50%'
            }}>
            <Link to="../login"><Button> log in </Button></Link>
            <Link to="../register"><Button> sign up </Button></Link>
            </span>
        </div>
    )
}

export default NavBar;