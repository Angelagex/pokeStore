import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { fetchErrorMessage, fetchStatus } from "../../storeData";
import { getAllPokemonsThunk } from "./pokemonActions";

export interface IPokemon {
  abilities: string[];
  base_experience: number;
  height: number;
  id: number;
  isFavorite: boolean;
  name: string;
  sprite: string;
  sprite2: string;
  types: string[];
}

export interface IFirstPokemon {
  name: string;
  url: string;
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
      base_experience: 30,
      height: 4,
      id: 21,
      isFavorite: false,
      name: "PokeTest",
      sprite: "None",
      sprite2: "None",
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
export const { addActualPokemon, updateActualPokemon, updateAllPokemons } = pokemonSlice.actions;
