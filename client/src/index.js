import React from "react";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./components/App";
import "./index.css";
import { createRoot } from "react-dom/client";
//Redux
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
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
        clientId="TE6MVyIwPhTXTcWKUjgqk3dtvP9CXTYo"
        authorizationParams={{
            redirect_uri: window.location.origin,
            audience: 'sprtnggdslk'
        }}
    >
        <Provider store={store}>
            <App />
        </Provider>
    </Auth0Provider>,
);
