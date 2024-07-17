import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import "./Navigation.css";
import { useSelector, useDispatch } from 'react-redux'
import { setToken } from '../userSlice'
import { useAuth0 } from "@auth0/auth0-react";
import { skipToken } from '@reduxjs/toolkit/query/react'
import { useGetCurrentUserQuery } from "../services/sportingGoodsApi"

const Navigation = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();

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
    }, [isAuthenticated, token, currUser, dispatch, getAccessTokenSilently])

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
            {(!!currUser ? <div>
                <NavLink
                    to='/mybookings'
                    className="nav-link"
                    isActive={(match, location) => {
                        return match;
                    }}
                >
                    Bookings
                </NavLink>
                <NavLink
                    to='/mylistings'
                    className="nav-link"
                    isActive={(match, location) => {
                        return match;
                    }}
                >
                    Listings
                </NavLink>
            </div> : (!isAuthenticated && !isLoading ? <></> : <></>))}
            <NavLink
                to='/terms&conditions'
                className="nav-link"
                isActive={(match, location) => {
                    return match;
                }}>
                    Terms + Conditions
            </NavLink>
        </nav>
    )
}

export default Navigation
