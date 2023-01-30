import * as React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import PokeCard from "../components/pokemon/PokeCard";
import {
  IPokemon,
  selectAllPokemons,
} from "../redux/features/pokemon/pokemonSlice";

interface IMainPageProps {}

const MainPage: React.FunctionComponent<IMainPageProps> = (props) => {
  const [page, setPage] = React.useState(1);
  const pokemons = useSelector(selectAllPokemons()).slice(
    (page - 1) * 8,
    page * 8
  );

  return (
    <div style={{ display: "flex" }}>
      <FaChevronLeft
        style={{
          color: "rgba(221, 202, 202, 0.87)",
          marginLeft: "20px",
          marginRight: "-100px",
          marginTop: "250px",
          fontSize: "200px",
          zIndex: "2",
        }}
        onPointerEnter={(e) => (e.currentTarget.style.color = "white")}
        onPointerLeave={(e) =>
          (e.currentTarget.style.color = "rgba(221, 202, 202, 0.87)")
        }
        onClick={() => {
          page !== 1 ? setPage(page - 1) : "";
        }}
      />
      <div className="cards">
        {pokemons.map((item: IPokemon, index: number) => (
          <div key={index as React.Key}>
            <PokeCard pokemon={item} />
          </div>
        ))}
      </div>
      <div style={{ marginLeft: "-140px", zIndex: "1"}}>
        <p style={{color: "white", borderBottomLeftRadius: "50px", borderTopLeftRadius: "50px"}}> {page} / 13</p>
        <FaChevronRight
          style={{
            color: "rgba(221, 202, 202, 0.87)",
            marginTop: "250px",
            fontSize: "200px",
          }}
          onPointerEnter={(e) => (e.currentTarget.style.color = "white")}
          onPointerLeave={(e) =>
            (e.currentTarget.style.color = "rgba(221, 202, 202, 0.87)")
          }
          onClick={() => {
            page !== 13 ? setPage(page + 1) : "";
          }}
        />
      </div>
    </div>
  );
};

export default MainPage;
