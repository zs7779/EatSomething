import React, { useState } from 'react';
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


function App() {
  const [ loginToken, setLoginToken ] = useState<string|null>(loginService.getToken());
  
  return (
    <div>
      <Router>
      <header className="d-flex justify-content-between">
        <ul className="nav">
          <li className="nav-item">
            <Link to="/" className="mx-1">home</Link>
          </li>
          <li className="nav-item">
            <Link to="/order" className="mx-1">order</Link>
          </li>
        </ul>
        {loginToken ? <ul className="nav">
          <li className="nav-item">
            <Link to="/manage" className="mx-1">manage</Link>
          </li>
          <li className="nav-item">
            <Link to="/logout" className="mx-1">logout</Link>
          </li>
        </ul> : 
        <ul className="nav">
          <li className="nav-item">
            <Link to="/login" className="mx-1">login</Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="mx-1">register</Link>
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
          <Route path="/order/:orderID">
            <OrderView />
          </Route>
          <Route path="/register">
            <RegisterView />
          </Route>
          <Route path="/login">
            {loginToken ? <Redirect to="/manage"/> : <LoginView setLoginToken={setLoginToken}/>}
          </Route>
          <Route path="/manage">
            {loginToken ? <ManageView /> : <Redirect to="/login"/>}
          </Route>
          <Route path="/logout">
            {loginToken ? <LogoutView  setLoginToken={setLoginToken}/> : <Redirect to="/"/>}
          </Route>
          <Route path="/place/:placeID">
            <PlaceView />
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
