import * as React from "react";
import {
  addActualPokemon,
  IPokemon,
} from "../../redux/features/pokemon/pokemonSlice";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useAppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import DetailPage from "../../pages/DetailPage";
import {
  css
} from "@emotion/react";
import styled from "@emotion/styled";


const defaultLinkStyles = {
  "&:hover": {
    color: "blue",
    "&:active": {
      color: "red"
    }
  }
};

const buttonStyles = css({
  ...defaultLinkStyles,
  fontSize: "2rem",
  padding: 16
});

const Button = styled("button")(buttonStyles);

interface IPokeCardProps {
  pokemon: IPokemon;
}

const PokeCard: React.FunctionComponent<IPokeCardProps> = ({ pokemon }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [beforestyle, setBeforestyle] = React.useState("");
  const [afterstyle, setAfterstyle] = React.useState("");
  const THRESHOLD = 35;

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
      grad_pos: `${lp}% ${tp}%;`,
      sprk_pos: ` ${px_spark}% ${py_spark}%;`,
      opc: `opacity: ${p_opc / 100};`,
      tf: `transform: rotateX(${ty}deg) rotateY(${tx}deg)`,
    };
  };

  const handleHover = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    var $card = e.currentTarget;
    // math for mouse position
    const { width, height, left, top } =
      e.currentTarget.getBoundingClientRect();
      const { grad_pos, sprk_pos, opc, tf } = calculateGradient(width, height, left, top);
    // need to use a <style> tag for psuedo elements
    var style = `
    .card:hover:before { ${grad_pos} };  
    .card:hover:after { ${sprk_pos} ${opc} }   
    // `;
    // set / apply css class and style
    e.currentTarget.classList.remove("active");
    e.currentTarget.classList.remove("animated");
    $card.style.transform = tf;
    setBeforestyle(grad_pos);
    setAfterstyle(`${sprk_pos}; ${opc}`);

    if (e.type === "touchmove") {
      return false;
    }

    const { clientX, clientY, currentTarget,  } = e;
    const { clientWidth, clientHeight, offsetLeft, offsetHeight, offsetWidth } = currentTarget;
    
    const py = Math.abs(Math.floor(100 / clientHeight * (clientY / 2)) - 100);
    const tp = 50 + (py - 50) / 1.5;
    const ty = (tp - 50) / 2 * -1;
  
    const horizontal = (clientX - offsetLeft) / clientWidth;
    const rotateX = (THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2);

    e.currentTarget.style.transform = `perspective(${clientWidth}px) rotateX(${ty}deg) rotateY(${rotateX}deg) scale3d(1, 1, 1)`;
  };

  const resetStyles = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.currentTarget.style.transform = `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
  };

  const handleCardDetail = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    dispatch(addActualPokemon(pokemon));
    navigate("/detail");
  };

  return (
    <div
      className="card eevee animated"
      onPointerMove={(e) => handleHover(e)}
      onMouseLeave={(e) => resetStyles(e)}
      onClick={(e) => handleCardDetail(e)}
    >
      <div className="content">
        <div className="cardHeader">
          <h2>{pokemon.name}</h2>{" "}
          {pokemon.isFavorite ? (
            <FaStar style={{ fontSize: "35px", color: "gold" }} />
          ) : (
            <FaRegStar style={{ fontSize: "35px" }} />
          )}
        </div>
        <img className="cardImg" src={pokemon.sprite} alt="" />
      </div>
    </div>
  );
};

export default PokeCard;
