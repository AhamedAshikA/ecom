import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';
import '../Component/Register.css';
import '../Component/SellerRegister.css'
import Select from 'react-select'
import ProductsList from "./ProductsList";
import Header from "./Header";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const SellerHome = (props) => {

    const options = [
        { value: 'car', label: 'Car', id: '1' },
        { value: 'motorcycle', label: 'Motorcycle', id: '2' },
        { value: 'scooter', label: 'Scooter', id: '3' },
        { value: 'bicycle', label: 'Bicycle', id: '4' },
        { value: 'mobile', label: 'Mobile', id: '5' },
        { value: 'other', label: 'Other', id: '6' },
    ]
    const navigate = useNavigate();
    const location = useLocation();
    const [show, setShow] = useState(true);
    const [click, setClick] = useState(false);
    const [fileData, setFileData] = useState();
    const [cid, setCid] = useState();
    const [categoryError, setCategoryError] = useState();
    // const [sid, setSid] = useState(location.state);
    const [sid, setSid] = useState(props.sId)
    const [brandReg, setBrandReg] = useState();
    const [brandError, setBrandError] = useState();
    const [nameReg, setNameReg] = useState();
    const [nameError, setNameError] = useState();
    const [yearReg, setYearReg] = useState()
    const [yearError, setYearError] = useState();
    const [colorReg, setColorReg] = useState();
    const [colorError, setColorError] = useState();
    // const [kmReg, setKmReg] = useState(undefined)
    const [amtReg, setAmtReg] = useState();
    const [amtError, setAmtError] = useState();
    const [descriptionReg, setDescriptionReg] = useState();
    const [descriptionError, setDescriptionError] = useState();
    const [contactReg, setContactReg] = useState();
    const [contactError, setContactError] = useState();
    const [productImage, setProductImage] = useState();
    const [imageError, setImageError] = useState();

    const handleClose = () => {
        setShow(false);
        props.func();
    }
    const postHandler = () => {
console.log('test',JSON.stringify( {
    category: cid,
    seller: sid,
    brandName: brandReg,
    name: nameReg,
    year: yearReg,
    color: colorReg,
    // kmDrive: kmReg,
    amount: amtReg,
    description: descriptionReg,
    contact: contactReg,
    image: productImage
}));
        axios.post(process.env.REACT_APP_API_URL + "addproduct", {
            category: cid,
            seller: sid,
            brandName: brandReg,
            name: nameReg,
            year: yearReg,
            color: colorReg,
            // kmDrive: kmReg,
            amount: amtReg,
            description: descriptionReg,
            contact: contactReg,
            image: productImage
        }).then((response) => {
            alert(response.data.message)
            console.log(sid)
            handleClose()
            // { navigate('/products', { state: sid }) }
        })
            .catch((err) => {
                console.log("err", err)
            })
    }

    const submitHandler = (e) => {
        console.log("submit")
        e.preventDefault()
        setCategoryError();
        setBrandError()
        setNameError();
        setYearError();
        setColorError();
        setAmtError();
        setDescriptionError();
        setContactError();

        if (!cid) {
            setCategoryError("*Please select Category");
        }
        else if (!brandReg) {
            setBrandError("*Please enter Brandname");
        }
        else if (!nameReg) {
            setNameError("*Please enter Name");
        }
        // else if (!yearReg) {
        //     setYearError("*Please enter year");
        // }
        // else if (!colorReg) {
        //     setColorError("*Please enter Color");
        // }
        // else if (!amtReg) {
        //     setAmtError("*Please enter Price");
        // }
        // else if (!descriptionReg) {
        //     setDescriptionError("*Please enter Description");
        // }
        // else if (!contactReg) {
        //     setContactError("*Please enter Contact Number");
        // }
        // else if (!fileData) {
        //     setImageError("*Please Upload Image")
        // }
        // else {
        //     e.preventDefault();
        //     const data = new FormData();
        //     console.log(fileData)
        //     data.append('image', fileData);
        //     axios.post(process.env.REACT_APP_API_URL + "imageUpload", data)
        //         .then((result) => {
        //             console.log("result", result.data.filename);
        //             setProductImage(result.data.filename);
        //         })
        //         .catch((err) => {
        //             console.log(err.message);
        //         })

        // };
        else{
            postHandler();
        }
    }
    useEffect(() => {
        if (productImage)
            postHandler();
    }, [productImage]);

    const fileChangeHandler = (e) => {
        console.log("e", e);
        setFileData(e.target.files[0]);
    }
    const categorySelectHandler = (e) => {
        setCid(e.id);
    }
    // if (click) {
    //     return (
    //         <>
    //             <ProductsList sellerId={sid} />
    //         </>
    //     )
    // }
    return (
        <Modal show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Add a New Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={submitHandler}>
                    <div className="product-details">

                        <div className="product-details-each">
                            <label className="product-text">Category</label>
                            <p className="product-text">:</p>
                            <div>
                                {/* <input type="text" className="input-text-product" onChange={(e) => { setBrandReg(e.target.value) }} /> */}
                                <Select options={options} onChange={categorySelectHandler} className="input-text-product" />
                            </div>
                        </div>
                        <p className="error-text-product">{categoryError}</p>
                        <div className="product-details-each">
                            <label className="product-text">Brand</label>
                            <p className="product-text">:</p>
                            <div>
                                <input type="text" className="input-text-product" onChange={(e) => { setBrandReg(e.target.value) }} />
                            </div>
                        </div>
                        <p className="error-text-product">{brandError}</p>
                        <div className="product-details-each">
                            <label className="product-text">Name</label>
                            <p className="product-text">:</p>
                            <div>
                                <input type="text" className="input-text-product" onChange={(e) => { setNameReg(e.target.value) }} />
                            </div>
                        </div>
                        <p className="error-text-product">{nameError}</p>
                        <div className="product-details-each">
                            <label className="product-text">Model</label>
                            <p className="product-text">:</p>
                            <div>
                                <input type="text" className="input-text-product" onChange={(e) => { setYearReg(e.target.value) }} />
                            </div>
                        </div>
                        <p className="error-text-product">{yearError}</p>
                        <div className="product-details-each">
                            <label className="product-text">Color</label>
                            <p className="product-text">:</p>
                            <div>
                                <input type="text" className="input-text-product" onChange={(e) => { setColorReg(e.target.value) }} />
                            </div>
                        </div>
                        <p className="error-text-product">{colorError}</p>
                        {/* <div className="product-details-each">
                                <label className="product-text">KM driven</label>
                                <input type="text" className="input-text" onChange={(e) => { setKmReg(e.target.value) }} />
                            </div> */}
                        <div className="product-details-each">
                            <label className="product-text">Price</label>
                            <p className="product-text">:</p>
                            <div>
                                <input type="text" className="input-text-product" onChange={(e) => { setAmtReg(e.target.value) }} />
                            </div>
                        </div>
                        <p className="error-text-product">{amtError}</p>
                        <div className="product-details-each">
                            <label className="product-text">Description</label>
                            <p className="product-text">:</p>
                            <div>
                                <input type="text" className="input-text-product" onChange={(e) => { setDescriptionReg(e.target.value) }} />
                            </div>
                        </div>
                        <p className="error-text-product">{descriptionError}</p>
                        <div className="product-details-each">
                            <label className="product-text">Contact</label>
                            <p className="product-text">:</p>
                            <div>
                                <input type="text" className="input-text-product" onChange={(e) => { setContactReg(e.target.value) }} />
                            </div>
                        </div>
                        <p className="error-text-product">{contactError}</p>

                        <div className="product-details-each">
                            <label className="product-text">Image</label>
                            <p className="product-text">:</p>
                            <div>
                                <input type="file" className="input-text-product" onChange={fileChangeHandler}></input>
                            </div>
                        </div>
                        <p className="error-text-product">{imageError}</p>


                    </div>
                    <div className="one">
                        <button type="submit" className="main-button" >Submit</button></div>
                </form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>

            </Modal.Footer>
        </Modal>
        // <div className="seller-home-contain">
        //     <div className="register-body-content">
        //         <Header logout="logout" head="Add Product" />
        //         <div>
        //             <Select options={options} onChange={categorySelectHandler} className="select-style" />
        //             <p className="error-text">{categoryError}</p>
        //         </div>
        //         <>
        //             <form onSubmit={submitHandler}>
        //                 <div className="product-details">
        //                     <div className="product-details-each">
        //                         <label className="product-text">Brand</label>
        //                         <div>
        //                             <input type="text" className="input-text" onChange={(e) => { setBrandReg(e.target.value) }}/>
        //                             <p className="error-text">{brandError}</p>
        //                         </div>
        //                     </div>
        //                     <div className="product-details-each">
        //                         <label className="product-text">Name</label>
        //                         <div>
        //                             <input type="text" className="input-text" onChange={(e) => { setNameReg(e.target.value) }} />
        //                             <p className="error-text">{nameError}</p>
        //                         </div>
        //                     </div>
        //                     <div className="product-details-each">
        //                         <label className="product-text">Model</label>
        //                         <div>
        //                             <input type="text" className="input-text" onChange={(e) => { setYearReg(e.target.value) }} />
        //                             <p className="error-text">{yearError}</p>
        //                         </div>
        //                     </div>
        //                     <div className="product-details-each">
        //                         <label className="product-text">Color</label>
        //                         <div>
        //                             <input type="text" className="input-text" onChange={(e) => { setColorReg(e.target.value) }} />
        //                             <p className="error-text">{colorError}</p>
        //                         </div>
        //                     </div>
        //                     <div className="product-details-each">
        //                         <label className="product-text">KM driven</label>
        //                         <input type="text" className="input-text" onChange={(e) => { setKmReg(e.target.value) }} />
        //                     </div>
        //                     <div className="product-details-each">
        //                         <label className="product-text">Price</label>
        //                         <div>
        //                             <input type="text" className="input-text" onChange={(e) => { setAmtReg(e.target.value) }} />
        //                             <p className="error-text">{amtError}</p>
        //                         </div>
        //                     </div>
        //                     <div className="product-details-each">
        //                         <label className="product-text">Description</label>
        //                         <div>
        //                             <input type="text" className="input-text" onChange={(e) => { setDescriptionReg(e.target.value) }} />
        //                             <p className="error-text">{descriptionError}</p>
        //                         </div>
        //                     </div>
        //                     <div className="product-details-each">
        //                         <label className="product-text">Contact</label>
        //                         <div>
        //                             <input type="text" className="input-text" onChange={(e) => { setContactReg(e.target.value) }} />
        //                             <p className="error-text">{contactError}</p>
        //                         </div>
        //                     </div>
        //                     <div>
        //                         <div>
        //                             <input type="file" onChange={fileChangeHandler}></input>
        //                             <p className="error-text">{imageError}</p>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div className="one">
        //                     <button type="submit" className="main-button" >Submit</button></div>
        //             </form>
        //         </>
        //     </div>
        // </div >
    )
}
export default SellerHome;