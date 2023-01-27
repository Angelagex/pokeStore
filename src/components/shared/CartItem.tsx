import React from "react";
import { Button } from "react-bootstrap";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  allinCart,
  deleteCartPokemon,
  IPokemonInStore,
  updateCartPokemon,
} from "../../redux/features/cart/cartSlice";
import { useAppDispatch } from "../../redux/store";

interface ICartItemProps {
  pokemon: IPokemonInStore;
}

const CartItem: React.FunctionComponent<ICartItemProps> = ({ pokemon }) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteCartPokemon(pokemon))
  };
  const handleMinus = () => {
    dispatch(updateCartPokemon({...pokemon, amount: pokemon.amount - 1}))
  }
  const handlePlus = () => {
    dispatch(updateCartPokemon({...pokemon, amount: pokemon.amount + 1}))
  }

  return (
    <div className="cartItem">
      <div>
        <img src={pokemon.sprite} alt="" style={{maxHeight: "58px"}}/>
      </div>
      {pokemon.amount <= 1 ? (
        <div onClick={handleDelete}>
          <FaTrash style={{ color: "red", fontSize: "20px" }} />
        </div>
      ) : (
        <div onClick={handleMinus}>
          <FaMinus />
        </div>
      )}
      <p className="cartItemAmount">{pokemon.amount}</p>
      <div onClick={handlePlus}>
        <FaPlus style={{ fontSize: "20px" }} />
      </div>
    </div>
  );
};

export default CartItem;
