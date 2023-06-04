import  React, {createContext , useEffect, useReducer} from 'react';

// initial state
const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('user')) || null
}

export const AuthContext = createContext(INITIAL_STATE)

// reducer

const AuthReducer = (state, action) => {
    switch(action.type){
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
            }
        default: return state
    }
}

//provider

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user))
    },[state.user])
    
    return (
        <AuthContext.Provider value={{user: state.user, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}