import { createContext, useContext, useReducer } from 'react';
import { authReducer } from '../reducers/AuthReducer';

const initialState = {
    token: '',
    user: {},
};

export const AuthContext = createContext(initialState);

export const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
