import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { FaShoppingCart, FaUndo } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  allinCart,
  IPokemonInStore,
  resetCart,
} from "../../redux/features/cart/cartSlice";
import { useAppDispatch } from "../../redux/store";
import Buy from "../pokemon/Buy";
import CartItem from "./CartItem";

type Props = {};

const Cart = (props: Props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  function handleShow() {
    setShow(true);
  }
  const cartPokemons = useSelector(allinCart());
  const dispatch = useAppDispatch();
  const totalPrice = cartPokemons.reduce(
    (accumulator, currentValue) => accumulator + (currentValue.price * currentValue.amount), 0)

    const handleReset = () => {
      dispatch(resetCart())
    }
  return (
    <>
      <div
        style={{ marginLeft: "40px", fontSize: "40px", color: "#ffd000", cursor: "pointer" }}
        onClick={handleShow}
      >
        <FaShoppingCart />
      </div>

      <Offcanvas
        style={{ backgroundColor: "none" }}
        show={show}
        onHide={handleClose}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>PokeCart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div
            style={{
              background: "#3a37322d",
              width: "367px",
              height: "700px",
              borderRadius: "6px",
              padding: "10px"
            }}
          >
            {cartPokemons.length == 0 ? <div className="cartEmpty">Cart is Empty</div> : cartPokemons.map((item: IPokemonInStore, idx: number) => (
              <div key={idx}>
                <CartItem pokemon={item} />
              </div>
            ))}
          </div>
          <div>Total: {totalPrice} dabloons</div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "20px",
            }}
          >
            <Buy />
            <Button variant="danger" onClick={handleReset}>
              {"Reset Cart" + "   "}
              <FaUndo />
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Cart;
