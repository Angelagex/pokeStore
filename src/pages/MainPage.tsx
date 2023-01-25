import * as React from "react";
import { useSelector } from "react-redux";
import PokeCard from "../components/pokemon/PokeCard";
import {
  IPokemon,
  selectAllPokemons,
} from "../redux/features/pokemon/pokemonSlice";

interface IMainPageProps {}

const MainPage: React.FunctionComponent<IMainPageProps> = (props) => {
  const pokemons = useSelector(selectAllPokemons());

  return (
    <div className="cardContainer">
      {pokemons.map((item: IPokemon, index: number) => (
        <div key={index as React.Key}>
          <PokeCard pokemon={item} />
        </div>
      ))}
    </div>
  );
};

export default MainPage;
