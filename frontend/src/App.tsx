import React from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom";
import SearchPanel from './components/SearchPanel';
import SearchView from './components/SearchView';
import PlaceView from './components/PlaceView';
import ConfirmationView from './components/ConfirmationView';
import ManageView from './components/ManageView';


function App() {
  return (
    <div>

      <Router>
      <header>
        <ul className="nav">
          <li className="nav-item">
            <Link to="/" className="mx-1">home</Link>
          </li>
          <li className="nav-item">
            <Link to="/confirmation" className="mx-1">confirmation</Link>
          </li>
          <li className="nav-item">
            <Link to="/manage" className="mx-1">manage</Link>
          </li>
        </ul>
      </header>

        <Switch>
          <Route exact path="/">
            <SearchPanel />
          </Route>
          <Route path="/search">
            <SearchView />
          </Route>
          <Route path="/confirmation">
            <ConfirmationView />
          </Route>
          <Route path="/manage">
            <ManageView />
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
