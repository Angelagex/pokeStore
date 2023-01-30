export const ENDPOINT = "https://api.pokemontcg.io/v2/cards?q=supertype:Pokémon&pageSize=104"
export const ANIMATED_ENDPOINT = "https://pokeapi.co/api/v2/pokemon"

export const fetchErrorMessage = (content: string) => {
    return `Something went wrong while fetching: ${content}`
}

export enum fetchStatus {
    IDLE = "IDLE",
    REJECTED = "REJECTED",
    PENDING = 'PENDING',
    FULFILL = 'FULFILL'
}

export type errorType = null | string