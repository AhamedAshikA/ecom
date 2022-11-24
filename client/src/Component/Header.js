import React from "react";
import './Header.css'
import { useNavigate } from "react-router-dom";

const Header=(props)=>{
const navigate=useNavigate();

const logoutHandler=()=>{
    navigate('/')
}
    return(
        <div  className="categories-text">
            <h1>{props.head}</h1>
            <div className="header-buttons">
            <button className="button" onClick={logoutHandler}>{props.logout}</button>
            </div>
        </div>
    )
}
export default Header;