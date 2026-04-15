import { createSlice } from '@reduxjs/toolkit'

const loadUserFromLocalStorage=()=>{
    try {
        //* user -> user namay localStorage data aca ki na check
        const checkLocalStorage = localStorage.getItem('user')
        if(checkLocalStorage === null){
            return {user:null}
        }
        //* JSON.parse -> user data ta json pavo tai aka JSON.parse korta hova 
        return {user:JSON.parse(checkLocalStorage)}
    } catch (error) {
       return {user:null,error} 
    }
}

const initialState = loadUserFromLocalStorage()

const authSlice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload.user
            //? localStorage data set kola
            //* 'user' -> jy name data save hova 
            //* JSON.stringify -> json data ka string pata
            localStorage.setItem('user', JSON.stringify(state.user))
        },
        //! logout method
        logout:()=>{
            state.user = null 
            //? localStorage thaka data delete
            localStorage.removeItem('user')
        } 
    }
})

export const {setUser,logout} = authSlice.actions
export default authSlice.reducer