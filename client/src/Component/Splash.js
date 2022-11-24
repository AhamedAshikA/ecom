import React, { useState, useEffect } from "react";
import axios from "axios";
import '../Component/Splash.css';
import loginicon from "../assets/login.png"
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye } from 'react-icons/ai'

const Splash = () => {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState();
  const [uNameError, setUNameError] = useState('');
  const [password, setPassword] = useState('')
  const [uPasswordError, setUPasswordError] = useState('');
  const [loginStatus, setLoginStatus] = useState();

  const check = () => {
    axios.post(process.env.REACT_APP_API_URL + "Login", {
      userName: userName,
      password: password
    }).then((response) => {
      console.log("mes", response.data)
      if (response.data.message == false) {
        alert("wrong username or password")
      } else {
        console.log(response.data.result[0].UserId)
        setLoginStatus(response.data.result[0].Fullname);
        setUserId(response.data.result[0].UserId);
        setClick(true)
      }
    })
      .catch((err) => {
        console.log("err", err)
      })
  }
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  if (click) {
    return (
      <>
        {navigate('/home', { state: userId })}
      </>
    )
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
  }

  return (
    <div className="contain">
      <div className="login-container">
        <div className="login-body">
          <div className="login-body-content">
            <h1 className="signin">User Login</h1>
            <label>Username</label>
            <input type="text" placeholder="Username" className="input-text" onChange={(e) => { setUserName(e.target.value) }} />
            <p className="error-text">{uNameError}</p>
            <label>Password</label>
            <div className="password-eye">
              <input type={passwordShown ? "text" : "password"} placeholder="Password" className="input-text" onChange={(e) => { setPassword(e.target.value) }} />
              <AiFillEye className="icons" onClick={togglePasswordVisiblity}/></div>
            <p className="error-text">{uPasswordError}</p>
            <button className="main-button" onClick={login}>Login</button>
            <p className="new-user">New User?
              <span><Link to="/reg">Register </Link></span></p>
          </div>
        </div>

      </div>
      <div className="other-login">
        <div className="seller-login">
          <img src={loginicon} className="icon" />
          <Link to="/sel"><h1 className="seller-text">seller</h1></Link>
        </div>
        {/* <div className="seller-login">
          <img src={loginicon} className="icon" />
          <h1 className="seller-text">admin</h1>
        </div> */}
      </div>
    </div>
  )
}
export default Splash;