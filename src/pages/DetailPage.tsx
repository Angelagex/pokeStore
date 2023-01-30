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
import { gePokemonPrice } from "../helpers/getPokePrice";
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
  const THRESHOLD = 35;
  const styleRef = React.useRef<HTMLStyleElement>(null);
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
        price: gePokemonPrice(pokemon.rarity) as number,
        id: pokemon.id,
        name: pokemon.name,
        sprite: pokemon.animated,
        amount: 1,
      })
    );
  };

  const calculateGradient = (w: number, h: number, l: number, t: number) => {
    const px = Math.abs(Math.floor((100 / w) * l) - 100);
    const py = Math.abs(Math.floor((100 / h) * t) - 100);
    const pa = 50 - px + (50 - py);
    const lp = 50 + (px - 50) / 1.5;
    const tp = 50 + (py - 50) / 1.5;
    const px_spark = 50 + (px - 50) / 7;
    const py_spark = 50 + (py - 50) / 7;
    const p_opc = 20 + Math.abs(pa) * 1.5;
    const ty = ((tp - 50) / 2) * -1;
    const tx = ((lp - 50) / 1.5) * 0.5;
    return {
      grad_pos: `background-position: ${lp}% ${tp}%;`,
      sprk_pos: `background-position: ${px_spark}% ${py_spark}%;`,
      opc: `opacity: ${p_opc / 100};`,
      tf: `transform: rotateX(${ty}deg) rotateY(${tx}deg)`,
    };
  };

  const handleHover = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    var $card = e.currentTarget;
    // math for mouse position
    const { grad_pos, sprk_pos, opc, tf } = calculateGradient(
      $card.offsetWidth,
      $card.offsetHeight,
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );

    // need to use a <style> tag for psuedo elements

    var style = `
    .card:hover::before { ${grad_pos} };  
    .card:hover::after { ${sprk_pos} ${opc} };   
    // `;
    // set / apply css class and style
    $card.classList.remove("active");
    $card.classList.remove("animated");
    $card.style.transform = tf;

    $card!.nextSibling!.textContent = `.card:hover:before { ${grad_pos} }
    .card:hover:after { ${sprk_pos} ${opc} }`;

    if (e.type === "touchmove") {
      return false;
    }

    const { clientX, clientY, currentTarget } = e;
    const { clientWidth, clientHeight, offsetLeft } = currentTarget;

    const py = Math.abs(Math.floor((100 / clientHeight) * (clientY / 2)) - 100);
    const tp = 50 + (py - 50) / 1.5;
    const ty = ((tp - 50) / 2) * -1;

    const horizontal = (clientX - offsetLeft) / clientWidth;
    const rotateX = (THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2);

    $card.style.transform = `perspective(${clientWidth}px) rotateX(${ty}deg) rotateY(${rotateX}deg) scale3d(1, 1, 1)`;
  };

  const resetStyles = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.currentTarget.style.transform = `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
    e.currentTarget.nextSibling!.textContent = ``;
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
      <div>
        <div
          className="card eevee animated"
          onPointerMove={(e) => handleHover(e)}
          onMouseLeave={(e) => resetStyles(e)}
          style={{ backgroundImage: `url(${pokemon.image})` }}
        ></div>
        <style ref={styleRef}></style>
        <h5 className="stats">
          Price: {gePokemonPrice(pokemon.rarity)} dabloons{" "}
        </h5>
        <h5 className="stats">Hp: {pokemon.hp}</h5>
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
