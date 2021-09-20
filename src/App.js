import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// pages
import Login from './pages/Login';
import Home from './pages/Home';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/home">
                    <Home />
                </Route>
                <Route path="/">
                    <Login />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
