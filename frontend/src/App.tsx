import React from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom";
import SearchPanel from './components/SearchPanel';
import SearchView from './components/SearchView';
import RestaurantView from './components/RestaurantView';
import BookingView from './components/BookingView';
import DeliverView from './components/DeliverView';
import ConfirmationView from './components/ConfirmationView';


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
            <Link to="/booking" className="mx-1">booking</Link>
          </li>
          <li className="nav-item">
            <Link to="/delivery" className="mx-1">delivery</Link>
          </li>
          <li className="nav-item">
            <Link to="/confirmation" className="mx-1">confirmation</Link>
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
          <Route path="/booking">
            <BookingView />
          </Route>
          <Route path="/delivery">
            <DeliverView />
          </Route>
          <Route path="/confirmation">
            <ConfirmationView />
          </Route>
          <Route path="/:restaurant">
            <RestaurantView />
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
