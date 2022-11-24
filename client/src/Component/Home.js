import React, { useEffect, useState } from "react";
import '../Component/Home.css'
import Carousel from 'react-elastic-carousel';
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Header from "./Header";
import { AiFillDelete, AiFillHeart } from "react-icons/ai"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Mainhome from "./Mainhome";


const Home = () => {
    console.log("home")
    const [cart, setCart] = useState(false);
    const [cartData, setCartData] = useState();
    const [detailedData, setDetailedData] = useState();
    const [show, setShow] = useState(false);
    const cartClose = () => setCart(false);

    const location = useLocation();

    const [data, setData] = useState();
    const [categoryData, setCategoryData] = useState();
    const handleClose = () => setShow(false);
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
        { width: 850, itemsToShow: 3 },
    ]
    const show1 = () => {
        console.log("show")
        axios.get(process.env.REACT_APP_API_URL + "showproduct")
            .then(res => {
                console.log(res.data)
                setData(res.data)
            })
            .catch((err) => { console.log(err) })
    }
    const handleShow = (e) => {
        console.log(e);
        setDetailedData(e);
        setShow(true);
    }
    const cartDeleteHandler = (e) => {
        axios.post(process.env.REACT_APP_API_URL + "cart", {
            userId: location.state,
            productId: e.Pid,
        }).then((response) => {
            console.log(response)
            onCartHandler();
        })
            .catch((err) => {
                console.log("err", err)
            })
    }
    const onCartHandler = () => {
        axios.get(process.env.REACT_APP_API_URL + "cartHandler/" + (location.state), {
        }).then((response) => {
            console.log("cartdata", response);
            setCartData(response.data);
            setCart(true);
        })
            .catch((err) => {
                console.log("err", err)
            })
    }
    const fetch = () => {
        console.log("fetch")
        axios.get(process.env.REACT_APP_API_URL + "categoryList", {
        }).then((response) => {
            console.log(response.data)
            setCategoryData(response.data)
            // console.log("cat",categoryData);
        })
            .catch((err) => {
                console.log("err", err)
            })
    }
    const addCartHandler = () => {
        axios.post(process.env.REACT_APP_API_URL + "addcart", {
            userId: location.state,
            productId: detailedData.pid
        }).then((response) => {
            console.log(response);
        })
            .catch((err) => {
                console.log("err", err)
            })
        handleClose();
    }
    useEffect(() => {
        fetch();
        show1();
    }, []);

    return (
        <div className="home-contain">
            <Header logout="logout" head="User Home" />
            <div className="cart-button">
                <button className="button" onClick={onCartHandler}>Fav <AiFillHeart /></button></div>
            {/* {categoryData && data && <Mainhome categoryData={categoryData} data={data} userId={location.state} />} */}

            <div>
                {categoryData && categoryData.map((users) => (
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
                                            <p>Count:{user.Count}</p>
                                        </div>
                                    )
                                })
                            }
                        </Carousel>
                    </div>
                )
                )}
            </div>
            {categoryData && <p>hi</p>}

            {detailedData &&
                <Modal show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>{detailedData.Brand} {detailedData.Name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img className="modal_image" src={require(`../assets/${detailedData.Image}`)} />
                        <p>Id:{detailedData.pid}</p>
                        <p>Category:{detailedData.Category}</p>
                        <p>Brand:{detailedData.Brand}</p>
                        <p>Name:{detailedData.Name}</p>
                        <p>Year:{detailedData.Year}</p>
                        <p>Color:{detailedData.color}</p>
                        {/* <p>KMDriven:{detailedData.KMDriven}</p> */}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary"
                            onClick={addCartHandler}
                        >
                            Add to Fav
                        </Button>
                    </Modal.Footer>
                </Modal>
            }

            <Modal show={cart}
                onHide={cartClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Fav</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {cartData && cartData.map((user) => {
                        return (
                            <div className="cart-content"
                            //  onClick={() => handleShow(user)}
                            >
                                <p className="cart-text">{user.Brand}</p>
                                <p className="cart-text">{user.Name}</p>

                                <AiFillDelete className="cart-text" onClick={() => cartDeleteHandler(user)} />
                            </div>
                        )
                    })}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cartClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default Home;