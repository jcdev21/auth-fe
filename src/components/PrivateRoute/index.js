import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../../features/contexts/AuthContext';

const PrivateRoute = ({children, ...rest}) => {
    const { state } = useAuthContext();
    console.log(state);
    return <Route {...rest}>
        { (state.token !== '') ? children : <Redirect to="/login" /> }
    </Route>
};

export default PrivateRoute;
