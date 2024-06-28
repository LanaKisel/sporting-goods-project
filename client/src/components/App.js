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

import Header from "./Header";

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const token = useSelector((state) => state.user.value.token);
  const appUser = useSelector((state) => state.user.value.user);

  useEffect(() => {
    if (isAuthenticated) { 
      getAccessTokenSilently().then((at) => { 
        dispatch(setToken(at));
        fetch('/users/me', {
          headers: new Headers({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + at
          })
        })
          .then(r => r.json())
          .then(data => {
            dispatch(setUser(data))
          })
      });
    }
  }, [isAuthenticated, token])


  return (
    <ConfigProvider theme={{ token: {colorPrimary: gray.primary,}, }}>
    <EquipmentsProvider>
      <Router>   
        <Navigation/>  
        <div>
          {(!!appUser ? <div><LogoutButton /><Profile /></div> : <LoginButton />)}
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
