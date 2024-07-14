import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Navigation.css";
import Bookings from './Bookings';

const Navigation = () => {
    return (
        <nav>
            <NavLink
                to="/"
                className="nav-link"
                isActive={(match, location) => {
                    return match && match.url === '/';
                  }}
            >
                Home
            </NavLink>
           <NavLink
            to='/mybookings'
            className = "nav-link"
            isActive={(match, location) => {
                return match;
              }}
            >
                Bookings
            </NavLink>
            <NavLink
            to='/mylistings'
            className = "nav-link"
            isActive={(match, location) => {
                return match;
              }}
            >
                Listings
            </NavLink>
            <NavLink
            to='/terms&conditions'
            className = "nav-link"
            isActive ={(match, location) => {
                return match;
            }}>
                Terms + Conditions

            </NavLink>
        </nav>
    )
}

export default Navigation
