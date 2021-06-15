import React from 'react';
import {BrowserRouter as Router, Route } from "react-router-dom";
import Login from '../components/Login';
import Home from '../components/Home';
import Logout from '../components/Logout';
import Account from '../components/Account';

const createRoutes = () => (
    <Router>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/account" component={Account} />
     
    </Router>
);

export default createRoutes;