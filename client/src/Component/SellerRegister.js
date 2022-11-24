import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import '../Component/Register.css';
import '../Component/SellerRegister.css'

const Register = () => {

    const navigate = useNavigate();
    const [fullNameReg, setFullNameReg] = useState('');
    const [nameError, setNameError] = useState('');
    const [userNameReg, setUserNameReg] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [passwordReg, setPasswordReg] = useState();
    const [passwordError, setPasswordError] = useState('');
    const [mobileNum, setMobileNum] = useState();
    const [numError, setNumError] = useState('');
    const [mailId, setMailId] = useState('');
    const [mailError, setMailError] = useState('');
    const [isRegistrationSuccess, setIsRegistrationsuccess] = useState(false)

    const post = () => {
        console.log(process.env.REACT_APP_API_URL);
        axios.post(process.env.REACT_APP_API_URL + "selregister", {
            fullName: fullNameReg,
            userName: userNameReg,
            password: passwordReg,
            mobileNumber: mobileNum,
            emailId: mailId
        }).then((response) => {
            console.log(response);
        })
            .catch((err) => {
                console.log("err", err)
            })
    }
    const register = () => {
        setNameError('');
        setUserNameError('');
        setPasswordError('');
        setNumError('');
        setMailError('');
        if (!fullNameReg) {
            setNameError("Please enter Fullname");
        }
        else if (!userNameReg) {
            setUserNameError("Please enter Username");
        }
        else if (!passwordReg) {
            setPasswordError("Please enter password");
        }
        else if (!mobileNum) {
            setNumError("Please enter Mobile number")
        }
        else if (!(/^[0-9]{10}$/).test(mobileNum)) {
            setNumError("please enter the proper mobile number");
        }
        else if (!mailId) {
            setMailError("Please enter mail id");
        }
        else if (!(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(mailId))) {
            setMailError("please enter the proper email id");
        }
        else {
            post();
            setIsRegistrationsuccess(true);
        }
    };
    const Login = () => {
        navigate("/sel")
    }
    if (isRegistrationSuccess) {
        return (
            <div className="register-container">
                <div className="register-body">
                    <div className="register-body-content">
                        <h1 className="success-content">Register Successfully</h1>
                        <button className="main-button" onClick={Login}>Login</button>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="register-container">
            <div className="register-body">
                <div className="register-body-content">
                    <h1 className="signin">Register</h1>
                    <label>Full Name</label>
                    <input type="text" className="input-text" onChange={(e) => { setFullNameReg(e.target.value) }} />
                    <p className="error-text">{nameError}</p>
                    <label>Username</label>
                    <input type="text" className="input-text" onChange={(e) => { setUserNameReg(e.target.value) }} />
                    <p className="error-text">{userNameError}</p>
                    <label>Password</label>
                    <input type="text" className="input-text" onChange={(e) => { setPasswordReg(e.target.value) }} />
                    <p className="error-text">{passwordError}</p>
                    <label>Mobile Number</label>
                    <input type="text" className="input-text" onChange={(e) => { setMobileNum(e.target.value) }} />
                    <p className="error-text">{numError}</p>
                    <label>Email Address</label>
                    <input type="text" className="input-text" onChange={(e) => { setMailId(e.target.value) }} />
                    <p className="error-text">{mailError}</p>
                    <button className="main-button" onClick={register}>Register</button>
                    <p className="new-user">Already have an Account?<span><Link to="/sel">Login</Link></span></p>
                </div>
            </div>
        </div>
    )
}
export default Register;