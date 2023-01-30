import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import {  allinCart, resetCart } from "../../redux/features/cart/cartSlice";
import { useAppDispatch } from "../../redux/store";

type Props = {};

const Buy: React.FC<Props> = (props) => {
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const cartPokemons = useSelector(allinCart());

  const handleClose = () => {
    dispatch(resetCart())
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Buy Now!
      </Button>

      <Modal show={show} onHide={handleClose} style={{color: "#040712"}}>
        {cartPokemons.length == 0 ? <Modal.Body>Please select some items first!</Modal.Body> : <Modal.Body>Thanks for your purchase!</Modal.Body>}
      </Modal>
    </>
  );
};

export default Buy;
