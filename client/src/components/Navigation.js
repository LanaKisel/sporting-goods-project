import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Navigation.css";
const Navigation = () => {
    return (
        <nav>
            <NavLink
                to="/"
                className="nav-link"
            >
                Home
            </NavLink>
           

        </nav>
    )
}

export default Navigation
