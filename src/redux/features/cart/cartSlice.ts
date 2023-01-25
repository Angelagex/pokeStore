import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { fetchErrorMessage, fetchStatus } from "../../storeData";

export interface IPokemonInStore {
  price: number;
  id: number;
  name: string;
  sprite: string;
  amount: number;
}

interface PokemonState {
  allPokesInStore: IPokemonInStore[];
}

const initialState: PokemonState = {
  allPokesInStore: [],
};

const pokemonSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPokemonToCart(
      state: PokemonState,
      action: PayloadAction<IPokemonInStore>
    ) {
      state.allPokesInStore.push(action.payload);
    },
    updateCartPokemon(
      state: PokemonState,
      action: PayloadAction<IPokemonInStore>
    ) {
      state.allPokesInStore = state.allPokesInStore.map( item => item.name != action.payload.name ? item : action.payload)
    },
    resetCart(
      state: PokemonState
    ) {
      state.allPokesInStore = [];
    },
    deleteCartPokemon(
      state: PokemonState,
      action: PayloadAction<IPokemonInStore>
    ) {
      state.allPokesInStore = state.allPokesInStore.filter((pokemon) =>
        pokemon.name != action.payload.name
      )
    }
  },
});

export default pokemonSlice.reducer;
export const allinCart = () => (state: RootState) => state.cart.allPokesInStore;
export const { addPokemonToCart, updateCartPokemon, resetCart, deleteCartPokemon } =
  pokemonSlice.actions;
