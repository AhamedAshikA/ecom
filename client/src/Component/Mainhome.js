import React, { useState } from "react";
import axios from "axios";
import Carousel from 'react-elastic-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import link from "../assets/image1667911886912car.png";


const Mainhome = (props) => {
    const [detailedData, setDetailedData] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
        { width: 850, itemsToShow: 3 },
    ]
    // console.log(process.env)
    // const link = "../assets/"
    // console.log("url", link);
    const handleShow = (e) => {
        setDetailedData(e);
        setShow(true);
    }
    const addCartHandler = () => {

        axios.post(process.env.REACT_APP_API_URL + "addcart", {
            userId: props.userId,
            productId: detailedData.pid
        }).then((response) => {
            console.log(response);
        })
            .catch((err) => {
                console.log("err", err)
            })
        handleClose();
    }

    return (
        <div>
            {props.categoryData && (props.categoryData).map((users) => (
                <div className="carde">
                    <p className="category-text">{users.Category}</p>
                    <Carousel breakPoints={breakPoints}>
                        {props.data && props.data
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
                            onClick={addCartHandler}
                        >
                            Add to Fav
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
        </div>
    )
}
export default Mainhome;