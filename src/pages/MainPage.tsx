import * as React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import PokeCard from "../components/pokemon/PokeCard";
import {
  IPokemon,
  selectAllPokemons,
} from "../redux/features/pokemon/pokemonSlice";

interface IMainPageProps { }

const MainPage: React.FunctionComponent<IMainPageProps> = (props) => {
  const [page, setPage] = React.useState(1);
  const pokemons = useSelector(selectAllPokemons()).slice(
    (page - 1) * 12,
    page * 12
  );

  return (
    <>
      <p style={{ color: "white", borderBottomLeftRadius: "50px", borderTopLeftRadius: "50px", position: "absolute", right: 0, width:"200px" }}> {page} / 13</p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ zIndex: "1" }}>
          <FaChevronLeft
            style={{
              color: "rgba(221, 202, 202, 0.87)",
              marginLeft: "20px",
              marginRight: "-120px",
              fontSize: "200px",
              zIndex: "20",
            }}
            onPointerEnter={(e) => (e.currentTarget.style.color = "white")}
            onPointerLeave={(e) =>
              (e.currentTarget.style.color = "rgba(221, 202, 202, 0.87)")
            }
            onClick={() => {
              page !== 1 ? setPage(page - 1) : "";
            }}
          />
        </div>
        <div className="cards" style={{ display: "flex", flexWrap: "wrap" }}>
          {pokemons.map((item: IPokemon, index: number) => (
            <div key={index as React.Key}>
              <PokeCard pokemon={item} />
            </div>
          ))}
        </div>
        <div style={{ marginLeft: "-140px", height: "100%", zIndex: "1", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <FaChevronRight
            style={{
              color: "rgba(221, 202, 202, 0.87)",
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
    </>
  );
};

export default MainPage;
