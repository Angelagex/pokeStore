import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchStatus, fetchErrorMessage, errorType } from "../../storeData";
import { RootState } from "../../store";


export interface IUser {
    uid?: string
    userImage?: string
    userName?: string
    userEmail: string
}


interface LoginState {
    actualUser: IUser | null
    status: fetchStatus
    error: errorType
    isLogged: boolean
}

const initialState: LoginState = {
    actualUser: null,
    isLogged: false,
    error: null,
    status: fetchStatus.IDLE
}

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        getUser: (state: LoginState, action: PayloadAction<IUser>) => (
            {...state, actualUser: action.payload}
        ),
        getLogged: (state: LoginState, action: PayloadAction<boolean>)  => (
             {...state, isLogged: action.payload} 
        ),
        logOut: (state: LoginState, action: PayloadAction<void>) => (
            {...initialState}
        )
    }
})

export const selectActualUser = () => (state: RootState) => state.login.actualUser
export const selectLoginError = () => (state: RootState) => state.login.error
export const selectLoginStatus = () => (state: RootState) => state.login.status
export const { getLogged, logOut, getUser } = loginSlice.actions
export default loginSlice.reducer