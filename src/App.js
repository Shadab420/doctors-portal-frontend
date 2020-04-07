import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import HomePage from './components/HomePage/HomePage';
import Appointment from './components/Appointment/Appointment';
import Dashboard from './components/Dashboard/Dashboard';


function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/patient/appointment">
              <Appointment />
            </Route>
            <Route path="/doctor/dashboard">
              <Dashboard />
            </Route>
            {/* 
            <Route path="/review">
            <Review></Review>
            </Route>
            <Route path="/inventory">
            <Inventory></Inventory>
            </Route>
            <Route path="/inventory">
            <Inventory></Inventory>
            </Route>
            <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>
            </Route>
            <Route path="*">
            <NoMatch></NoMatch>
            </Route> */}
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
