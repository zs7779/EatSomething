import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, Link, Redirect
} from "react-router-dom";

import LoginView from './components/LoginView';
import RegisterView from './components/RegisterView';
import SearchPanel from './components/SearchPanel';
import SearchView from './components/SearchView';
import PlaceView from './components/PlaceView';
import OrderView from './components/OrderView';
import ManageView from './components/ManageView';
import loginService from './services/loginService';
import LogoutView from './components/LogoutView';
import './css/App.css';


function App() {
  const [ loginToken, setLoginToken ] = useState<string|null>(loginService.getToken());

  useEffect(() => {
    if (loginToken) {
      loginService.checkToken()
        .catch(err => {
          if (err.response?.status === 401) { // bad token
            loginService.logout();
            setLoginToken(null);
          }
        });
    }
  }, [loginToken]);

  return (
    <div id="app">
      <Router>
      <header className="app-header d-flex justify-content-between">
        <ul className="nav">
          <li className="nav-item">
            <Link to="/" className="mx-1">Home</Link>
          </li>
          {loginToken && <li className="nav-item">
            <Link to="/order" className="mx-1">My Orders</Link>
          </li>}
        </ul>
        {loginToken ? <ul className="nav">
          <li className="nav-item">
            <Link to="/manage" className="mx-1">My Restaurants</Link>
          </li>
          <li className="nav-item">
            <Link to="/logout" className="mx-1">Logout</Link>
          </li>
        </ul> : 
        <ul className="nav">
          <li className="nav-item">
            <Link to="/login" className="mx-1">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="mx-1">Register</Link>
          </li>
        </ul>}

      </header>
        <Switch>
          <Route exact path="/">
            <SearchPanel />
          </Route>
          <Route path="/search">
            <SearchView />
          </Route>
          <Route path="/place/:placeID">
            <PlaceView />
          </Route>
          <Route path="/register">
            <RegisterView />
          </Route>
          <Route path="/login">
            {loginToken ? <Redirect to="/"/> : <LoginView setLoginToken={setLoginToken}/>}
          </Route>
          <Route path="/order/:orderID?">
          {loginToken ? <OrderView /> : <Redirect to="/login"/>}
          </Route>
          <Route path="/manage/:placeID?">
            {loginToken ? <ManageView /> : <Redirect to="/login"/>}
          </Route>
          <Route path="/logout">
            {loginToken ? <LogoutView  setLoginToken={setLoginToken}/> : <Redirect to="/"/>}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
