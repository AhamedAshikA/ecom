import React, { useEffect, useState } from "react";
import '../Component/ProductList.css'
import axios from "axios";
import Carousel from 'react-elastic-carousel';
import Header from "./Header";
import SellerHome from "./SellerHome";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate, useLocation } from "react-router-dom";

const ProductsList = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [addProduct, setAddProduct] = useState(false);
    const [category, setCategory] = useState();
    const [detailedData, setDetailedData] = useState();
    const [show, setShow] = useState(false);
    const [data, setData] = useState();
    const [sId, setSId] = useState();
    const handleClose = () => setShow(false);
    useEffect(() => {
        setSId(location.state)
    }, []);
    useEffect(() => {
        showHandler();
    }, [sId])
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
        { width: 850, itemsToShow: 3 },
    ]
    const handleShow = (e) => {
        setDetailedData(e);
        setShow(true);
    }
    const addProductHandler = () => {
        setAddProduct(true);
        // <SellerHome sId={sId}/>
    }
    const addProductFunction = () => {
        setAddProduct(false);
        // <SellerHome sId={sId}/>
    }
    const showHandler = () => {
        sId && axios.get(process.env.REACT_APP_API_URL + "sellercategorylist/" + (sId), {
        }).then((response) => {
            console.log(response);
            setCategory(response.data)
        })
            .catch((err) => {
                console.log("err", err)
            })
        sId && axios.get(process.env.REACT_APP_API_URL + "productlist/" + (sId), {
        }).then((response) => {
            console.log(response);
            setData(response.data)
        })
            .catch((err) => {
                console.log("err", err)
            })
    }
    const deleteProductHandler = () => {
        console.log("ashik", location.state);
        console.log(detailedData.pid)
        axios.post(process.env.REACT_APP_API_URL + "deleteproduct", {
            // sellerId: location.state,
            productId: detailedData.pid
        }).then((response) => {
            console.log(response);
            showHandler();
        })
            .catch((err) => {
                console.log("err", err)
            })
        handleClose();
    }
    // if (addProduct) {
    //     return (
            // <>
               
            //     {navigate('/selhom', { state: sId })}
            // </>
        // )
    // }
    return (
        <div className="clicked-home-contain">
            <Header logout="logout" head="Seller Home" />
            <div className="cart-button">
                <button className="button" onClick={addProductHandler}>add product</button></div>
            {/* {category && data && <Mainhome categoryData={category} data={data} />} */}

            <div>
                {category && category.map((users) => (
                    <div className="carde">
                        <p className="category-text">{users.Category}</p>
                        <Carousel breakPoints={breakPoints}>
                            {data && data
                                .filter((user) => {
                                    return ((users.Category) && user.Category.startsWith(users.Category))
                                })
                                .map((user) => {
                                    return (
                                        <div className="content" onClick={() => handleShow(user)}>
                                            <img src={require(`../assets/${user.Image}`)} />
                                            <p>Brand:{user.Brand}</p>
                                            <p>Name:{user.Name}</p>
                                        </div>
                                    )
                                })
                            }
                        </Carousel>
                    </div>
                )
                )}
            </div>
            {/* {category && <p>hi</p>} */}
            {detailedData &&
                <Modal show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>{detailedData.Brand} {detailedData.Name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        {/* <img className="modal_image" src={require(`${link}${detailedData.Image}`)} /> */}
                        <img className="modal_image" src={require(`../assets/${detailedData.Image}`)} />
                        <p>Id:{detailedData.pid}</p>
                        <p>Category:{detailedData.Category}</p>
                        <p>Brand:{detailedData.Brand}</p>
                        <p>Name:{detailedData.Name}</p>
                        <p>Year:{detailedData.Year}</p>
                        <p>Color:{detailedData.color}</p>
                        <p>KMDriven:{detailedData.KMDriven}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary"
                            onClick={deleteProductHandler}
                        >
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
 {addProduct &&  <SellerHome sId={sId} func={addProductFunction} />}
        </div>
    )
}
export default ProductsList;