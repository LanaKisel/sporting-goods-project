import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import LoginButton from "./login";
import LogoutButton from "./logout";
import Profile from "./profile";
import Home from "./Home";
import Equipment from "./Equipment";
import './App.css';
import { EquipmentsProvider } from "./Context";
import { BrowserRouter as Router } from 'react-router-dom';
// import { Router } from "react-router-dom";
import Navigation from "./Navigation";
import EquipmentByCategory from "./EquipmentByCategory";
import EqRented from "./EqRented";
import RentEquipment from "./RentEquipment";
import UpdateRent from "./UpdateRent";
import CancelRent from "./CancelRent";
import Bookings from "./Bookings";
import { useSelector, useDispatch } from 'react-redux'
import { setUser, setToken } from '../userSlice'
import { useAuth0 } from "@auth0/auth0-react";
import { ConfigProvider } from 'antd';
import { gray } from '@ant-design/colors';


function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const token = useSelector((state) => state.user.value.token);

  useEffect(() => {
    console.log("App.js: user", user);
    console.log("App.js: isAuthenticated",  isAuthenticated)
    console.log("App.js: isLoading", isLoading)
    console.log("App.js: token", token)

    if (isAuthenticated) { 
      getAccessTokenSilently().then((at) => { dispatch(setToken(at)); });
    }

    //setUser(isAuthenticated?user:undefined);
  }, [isAuthenticated, token])


  return (
    <ConfigProvider theme={{ token: {colorPrimary: gray.primary,}, }}>
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
            <Route exact path="/categories/:category_name">{<EquipmentByCategory />}</Route>
          </Switch>
          <Switch>
            <Route exact path='/equipments/:id'>{<Equipment />}</Route>
          </Switch>
          <Switch>
            <Route exact path='/rentals/:id'>{<EqRented />}</Route>
          </Switch>
          <Switch>
            <Route exact path='/rentals'>{<RentEquipment />}</Route>
          </Switch>
          <Switch>
            <Route exact path='/mybookings'>{<Bookings />}</Route>
          </Switch>
        </div>
      </Router>
    </EquipmentsProvider>
    </ConfigProvider>
  );
}

export default App;
