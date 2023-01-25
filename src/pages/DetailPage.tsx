import * as React from "react";
import {
  FaRegStar,
  FaStar,
  FaChevronLeft,
  FaCartPlus,
  FaCheck,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPokemonToCart, allinCart } from "../redux/features/cart/cartSlice";
import pokemonSlice, {
  IPokemon,
  selectActualPokemon,
  updateActualPokemon,
  updateAllPokemons,
} from "../redux/features/pokemon/pokemonSlice";
import { useAppDispatch } from "../redux/store";

interface IDetailPageProps {}

const DetailPage: React.FunctionComponent<IDetailPageProps> = (props) => {
  const pokemon = useSelector(selectActualPokemon()) as IPokemon;
  const cartPokemons = useSelector(allinCart());
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleUpdate = (isFavorite: boolean) => {
    dispatch(
      updateAllPokemons({ ...pokemon, isFavorite: isFavorite } as IPokemon)
    );
    dispatch(
      updateActualPokemon({ ...pokemon, isFavorite: isFavorite } as IPokemon)
    );
  };

  const handleAddToCart = () => {
    dispatch(
      addPokemonToCart({
        price: pokemon.base_experience,
        id: pokemon.id,
        name: pokemon.name,
        sprite: pokemon.sprite2,
        amount: 1,
      })
    );
  };

  return (
    <div className="cardContainer" style={{ marginTop: "0px" }}>
      <FaChevronLeft
        className="icons"
        style={{
          color: "rgba(221, 202, 202, 0.87)",
          marginRight: "30px",
          marginTop: "0px",
        }}
        onPointerEnter={(e) => (e.currentTarget.style.color = "white")}
        onPointerLeave={(e) =>
          (e.currentTarget.style.color = "rgba(221, 202, 202, 0.87)")
        }
        onClick={() => {
          navigate("/main");
        }}
      />
      <div className="card eevee animated">
        <div className="content">
          <div className="cardHeader">
            <h2>{pokemon.name}</h2>{" "}
          </div>
          <img className="cardImg" src={pokemon.sprite} alt="" />
        </div>
        <h5 className="stats">Price: {pokemon.base_experience} dabloons </h5>
        <h5 className="stats">Height: {pokemon.height}0 cm</h5>
        <h5 className="stats">Abilities:</h5>
        {pokemon.abilities.map((ability: string) => (
          <h5>-{ability}</h5>
        ))}
        <h5 className="stats">Types:</h5>
        {pokemon.types.map((type: string) => (
          <h5>-{type}</h5>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {pokemon.isFavorite ? (
          <FaStar
            className="icons"
            style={{ color: "gold" }}
            onPointerEnter={(e) =>
              (e.currentTarget.style.color = "rgba(221, 202, 202, 0.87)")
            }
            onPointerLeave={(e) => (e.currentTarget.style.color = "gold")}
            onClick={() => {
              handleUpdate(false);
            }}
          />
        ) : (
          <FaRegStar
            className="icons"
            style={{ color: "rgba(221, 202, 202, 0.87)" }}
            onPointerEnter={(e) => (e.currentTarget.style.color = "gold")}
            onPointerLeave={(e) =>
              (e.currentTarget.style.color = "rgba(221, 202, 202, 0.87)")
            }
            onClick={() => {
              handleUpdate(true);
            }}
          />
        )}
        {!cartPokemons.find((item) => item.name == pokemon.name) ? (
          <FaCartPlus
            className="icons"
            style={{ color: "rgba(221, 202, 202, 0.87)" }}
            onPointerEnter={(e) => (e.currentTarget.style.color = "white")}
            onPointerLeave={(e) =>
              (e.currentTarget.style.color = "rgba(221, 202, 202, 0.87)")
            }
            onClick={handleAddToCart}
          />
        ) : (
          <FaCheck
            className="icons"
            style={{ color: "rgba(54, 209, 43, 0.87)" }}
          />
        )}
      </div>
    </div>
  );
};

export default DetailPage;
