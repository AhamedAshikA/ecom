import React, { useState } from "react";
import axios from "axios";
import '../Component/Splash.css';
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye } from 'react-icons/ai'

const SellerLogin = () => {

  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [userName, setUserName] = useState('');
  const [uNameError, setUNameError] = useState('');
  const [password, setPassword] = useState('')
  const [uPasswordError, setUPasswordError] = useState('');
  const [loginStatus, setLoginStatus] = useState();

  const check = () => {
    axios.post(process.env.REACT_APP_API_URL + "sellogin", {
      userName: userName,
      password: password
    }).then((response) => {
      console.log(response.data);
      if (response.data.message) {
        alert("wrong username or password")
        console.log(response.data.message)
      } else {
        setLoginStatus(response.data[0].Sid);
        console.log(response.data[0].Sid)
        setClick(true);
      }
    })
      .catch((err) => {
        console.log("err", err)
      })
  }
  const login = () => {
    setUNameError('');
    setUPasswordError('');
    if (!userName) {
      setUNameError("*Please enter Username");
    }
    else if (!(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(userName))) {
      setUNameError("*Please enter correct username");
    }
    else if (!password) {
      setUPasswordError("*Please enter Password")
    }
    else {
      check();
    }
  };
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  if (click) {
    return (
      <>
        {navigate('/products', { state: loginStatus })}
      </>
    )
  }
  return (
    <div className="contain">
      <div className="login-container">
        <div className="login-body">
          <div className="login-body-content">
            <h1 className="signin">Seller Login</h1>
            <label>Sellername</label>
            <input type="text" placeholder="Sellername" className="input-text" onChange={(e) => { setUserName(e.target.value) }} />
            <p className="error-text">{uNameError}</p>
            <label>Password</label>
            <div className="password-eye">
              <input type={passwordShown ? "text" : "password"} placeholder="Password" className="input-text" onChange={(e) => { setPassword(e.target.value) }} />
              <AiFillEye className="icons" onClick={togglePasswordVisiblity}/></div>
            <p className="error-text">{uPasswordError}</p>
            <button className="main-button" onClick={login}>Login</button>
            <p className="new-user">New Seller?
              <span><Link to="/selreg">Register </Link></span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerLogin;