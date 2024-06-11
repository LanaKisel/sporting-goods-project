import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import LoginButton from "./login";
import LogoutButton from "./logout";
import Profile from "./profile";
import Home from "./Home";
import './App.css';

function App() {
  return (
    <div>
      <h1>Project Client</h1>
      <LoginButton/>
      <LogoutButton/>
      <Profile/>
      <Home/>
      
    </div>
    

  );
}

export default App;
