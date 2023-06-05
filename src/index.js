import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import {BrowserRouter} from "react-router-dom"
import { AuthProvider } from './AuthContext';
import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";

makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <CartProvider>
    <WishlistProvider>
    <AuthProvider>
    <App />
    </AuthProvider>
    </WishlistProvider>
    </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
