import { createAsyncThunk } from "@reduxjs/toolkit";
import { findPokemonMainName } from "../../../helpers/getPokeName";
import { ANIMATED_ENDPOINT, ENDPOINT } from "../../storeData";
import { IPokemon, Card } from "./pokemonSlice";

export const getAllPokemonsThunk = createAsyncThunk(
  "get/pokemons",
  async () => {
    const firstPokemons = await (
      await fetch(`${ENDPOINT}`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "X-Api-Key": "760fa40d-3873-4463-b6f2-edfed3165e0c"
        }
      })
    ).json();
    const pokemons = firstPokemons.data.map(async (item: Card) => {
      const auxPoke = {
        abilities: item.abilities,
        rarity: item.rarity,
        hp: item.hp,
        id: item.id,
        isFavorite: false,
        name: item.name,
        image: item.images.large,
        animated:  item.images.small,
        types: item.types,
      };

      return auxPoke;
    });
    
    return (await Promise.all(pokemons)) as IPokemon[];
  }
);
