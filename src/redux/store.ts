import { configureStore, compose, combineReducers } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import { useDispatch } from 'react-redux'
import loginReducer from "./features/login/loginSlice";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import sessionStorage from "redux-persist/es/storage/session";
import pokemonReducer from "./features/pokemon/pokemonSlice";
import cartReducer from "./features/cart/cartSlice";


const persistConfig = {
  key: 'root',
  storage: sessionStorage,
}

const rootReducer = combineReducers({
  login: loginReducer,
  pokemon: pokemonReducer,
  cart: cartReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(thunk)
})

export const persistor = persistStore(store)



declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()