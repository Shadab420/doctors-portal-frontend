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
import Sidebar from './components/Sidebar/Sidebar';
import DoctorAppointments from './components/DoctorAppointments/DoctorAppointments';

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
            
            <Sidebar>
              <Route path="/doctor/dashboard">
                <Dashboard />
              </Route>
              <Route path="/doctor/appointments">
                <DoctorAppointments />
              </Route>
            </Sidebar>
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
