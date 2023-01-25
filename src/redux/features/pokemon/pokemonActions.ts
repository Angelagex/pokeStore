import { createAsyncThunk } from "@reduxjs/toolkit"
import { ENDPOINT } from "../../storeData"
import { IPokemon, IFirstPokemon } from "./pokemonSlice"

export const getAllPokemonsThunk = createAsyncThunk("get/pokemons", async (indicator:number) => {
    const firstPokemons= await (await fetch(`${ENDPOINT}/?offset=${indicator}&limit=${indicator+50}`)).json()
    
    const pokemons = firstPokemons.results.map( async (item: IFirstPokemon) => {
        const aux = await (await fetch(item.url)).json()
        
       const auxPoke = {
            abilities: aux.abilities.map( (item: any) => item.ability.name ),
            base_experience: aux.base_experience,
            height: aux.height,
            id: aux.id,
            isFavorite: false,
            name: item.name,
            sprite: aux.sprites.other.home.front_default,
            sprite2: aux.sprites.versions["generation-v"]["black-white"].animated.front_default,
            types: aux.types.map( (item:any) => item.type.name)
        }
        return auxPoke
    })
    
    return await Promise.all(pokemons) as IPokemon[]
})

