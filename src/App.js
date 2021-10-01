import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

// pages
import Login from './pages/Login';
import Home from './pages/Home';
import AuthContextProvider from './features/contexts/AuthContext';

const App = () => {
    return (
        <AuthContextProvider>
            <Router>
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <PrivateRoute path="/">
                        <Home />
                    </PrivateRoute>
                </Switch>
            </Router>
        </AuthContextProvider>
    );
};

export default App;
