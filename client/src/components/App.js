import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import LoginButton from "./login";
import LogoutButton from "./logout";
import Profile from "./profile";
import Home from "./Home";
import Equipment from "./Equipment";
import './App.css';
import { EquipmentsProvider } from "./Context";
import { BrowserRouter as Router} from 'react-router-dom';
// import { Router } from "react-router-dom";
import Navigation from "./Navigation";
import EquipmentByCategory from "./EquipmentByCategory";
import EqRented from "./EqRented";

function App() {
  return (
    <EquipmentsProvider>
      <Router>
        <Navigation />
        <div>
          <LoginButton />
          <LogoutButton />
          <Profile />
          <Switch>
            <Route exact path='/'>{<Home />}</Route>
          </Switch>
          <Switch>
            <Route exact path="/categories/:category_name">{<EquipmentByCategory/>}</Route>
          </Switch>
          <Switch>
            <Route exact path='/equipments/:id'>{<Equipment/>}</Route>
          </Switch>
          <Switch>
            <Route exact path='/rents/:id'>{<EqRented/>}</Route>
          </Switch>          
        </div>
      </Router>
    </EquipmentsProvider>



  );
}

export default App;
