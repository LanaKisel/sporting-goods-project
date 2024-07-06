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
import Policies from "./Policies";
import { useSelector, useDispatch } from 'react-redux'
import { setToken } from '../userSlice'
import { useAuth0 } from "@auth0/auth0-react";
import { ConfigProvider } from 'antd';
import { gray } from '@ant-design/colors';
import Header from "./Header";
import { skipToken } from '@reduxjs/toolkit/query/react'
import { useGetCurrentUserQuery } from "../services/sportingGoodsApi"


function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, getAccessTokenSilently, isLoading} = useAuth0();

  const token = useSelector((state) => state.user.value.token);
  const { data: currUser } = useGetCurrentUserQuery(token ?? skipToken)

  useEffect(() => {
    if (!isAuthenticated) { // if user logs out/loses auth status => remove token
      dispatch(setToken(undefined));
    } else {
      if (!token) { // if no token AND authenticated, get token then set token
        getAccessTokenSilently().then(at => {
          dispatch(setToken(at));
        })
      }
    }
  }, [isAuthenticated, token, currUser])

  return (
    <ConfigProvider theme={{ token: { colorPrimary: gray.primary, }, }}>
      <EquipmentsProvider>
        <Router>
          <Navigation />
          {(!!currUser ? <div style={{ display: 'flex' }}><LogoutButton /><Profile /></div> : (!isAuthenticated && !isLoading ? <LoginButton /> : <></>))}
          <div style={{ clear: 'both' }}>
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
            <Switch>
              <Route exact path='/terms&conditions'>{<Policies />}</Route>
            </Switch>
          </div>
        </Router>
      </EquipmentsProvider>
    </ConfigProvider>
  );
}

export default App;
