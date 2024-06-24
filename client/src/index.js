import React from "react";
import App from "./components/App";
import "./index.css";
import { createRoot } from "react-dom/client";
//Redux
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import {store} from './store'
//Redux

//Auth0
import { Auth0Provider } from '@auth0/auth0-react';
//Auth0


const container = document.getElementById("root");
const root = createRoot(container);

//Auth0
root.render(
    <Auth0Provider
        domain="dev-pq7dg4vajftv7igc.us.auth0.com"
        clientId="ViYR4q53qmm1RAu1jviv1LdnESbsMuKR"
        authorizationParams={{
            redirect_uri: window.location.origin,
            audience: "sporting-goods-python-flask"
        }}
    >
        <Provider store={store}>
            <App />
        </Provider>
    </Auth0Provider>,
);
