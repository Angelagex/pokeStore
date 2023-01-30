import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { fetchErrorMessage, fetchStatus } from "../../storeData";
import { getAllPokemonsThunk } from "./pokemonActions";

export interface IPokemon {
  abilities: string[];
  rarity: string;
  hp: string;
  id: number;
  isFavorite: boolean;
  name: string;
  image: string;
  animated: string;
  types: string[];
}

export interface Card {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp?: string;
  types?: string[];
  evolesFrom?: string;
  evolvesTo?: string[];
  rules?: string[];
  ancientTrait?: any;
  abilities?: any[];
  attacks?: any[];
  weaknesses?: any[];
  resistances?: any[];
  retreatCost?: string[];
  convertedRetreatCost?: number;
  set: any;
  number: string;
  artist?: string;
  rarity: string;
  flavorText?: string;
  nationalPokedexNumbers?: number[];
  legalities: any;
  images: any;
  tcgplayer?: any;
  cardmarket?: any;
}

interface PokemonState {
  actualPokemon: IPokemon | null;
  allPokemons: IPokemon[];
  status: string | null;
  error: string | null;
}

const initialState: PokemonState = {
  actualPokemon: null,
  allPokemons: [
    {
      abilities: ["ability1", "ability2"],
      rarity: "common",
      hp: "40",
      id: 21,
      isFavorite: false,
      name: "PokeTest",
      image: "None",
      animated: "None",
      types: ["grass"],
    },
  ],
  status: fetchStatus.IDLE,
  error: null,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    addActualPokemon(state: PokemonState, action: PayloadAction<IPokemon>) {
      state.actualPokemon = action.payload;
    },
    updateActualPokemon(state: PokemonState, action: PayloadAction<IPokemon>) {
        state.actualPokemon = action.payload
    },
    updateAllPokemons(state: PokemonState, action: PayloadAction<IPokemon>){
        state.allPokemons = [...state.allPokemons.map( (pokemon:IPokemon) => pokemon.id !== action.payload.id ? pokemon : action.payload)]
    },
    resetStore(state : PokemonState){
        state = initialState
    }
  },
  extraReducers: (builder) => {
    //GET
    builder.addCase(getAllPokemonsThunk.pending, (state) => {
      state.status = fetchStatus.PENDING;
    });
    builder.addCase(getAllPokemonsThunk.rejected, (state, action) => {
      const message = action.error.message;
      state.status = fetchStatus.REJECTED;
      if (message) {
        state.error = fetchErrorMessage(message);
      }
    });
    builder.addCase(getAllPokemonsThunk.fulfilled, (state, action) => {
      state.allPokemons = action.payload;
      state.status = fetchStatus.FULFILL;
    });
  },
});

export default pokemonSlice.reducer;
export const selectAllPokemons = () => (state: RootState) =>
  state.pokemon.allPokemons;
export const selectActualPokemon = () => (state: RootState) =>
  state.pokemon.actualPokemon;
export const { addActualPokemon, updateActualPokemon, updateAllPokemons, resetStore } = pokemonSlice.actions;
