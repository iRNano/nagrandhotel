import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
//layout
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import MainContent from "./components/layouts/MainContent";
import AboutUs from "./components/layouts/AboutUs";
import Contact from "./components/layouts/Contact";
import Room from "./components/layouts/Room";
//forms
import Login from "./components/forms/Login";
import Register from "./components/forms/Register";
import AddRoom from "./components/forms/AddRoom";
import Catalog from "./components/Catalog";
import Booking from "./components/forms/Booking";
import Profile from "./components/forms/Profile";
// import EditRoom from './components/forms/EditRoom'
import "./App.css";
import Auth from "./components/Auth";
import { ThemeProvider } from "styled-components";
import * as theme from "./config/theme";
import Checkout from "./components/forms/Checkout";
import Transactions from "./components/layouts/Transactions";
import Confirmation from "./components/Confirmation";
import ScrollToTop from "./ScrollToTop";

const App = () => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");

  useEffect(() => {
    if (token) {
      let decoded = jwt_decode(token);
      let now = new Date();

      if (decoded.exp >= now.getTime()) {
        localStorage.clear();
      }
    }
    if (user) {
      setUser(JSON.parse(localStorage.getItem("user")));
      setToken(localStorage.getItem("token"));
    }
  }, [token]);

  //logout
  const logout = () => {
    localStorage.clear();
    setUser({});
    setToken("");
    window.location.href = "/";
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <ScrollToTop />
          <Navbar user={user} token={token} logout={logout} />
          <Switch>
            <Route exact path="/">
              <MainContent />
            </Route>
            <Route path="/about-us">
              <AboutUs />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/add-room">
              {user && token && user.isAdmin ? <AddRoom /> : <Auth />}
            </Route>
            <Route path="/catalog">
              <Catalog user={user} token={token} />
            </Route>
            <Route path="/booking">
              {user ? <Booking user={user} token={token} /> : <Auth />}
            </Route>
            <Route path="/rooms/:_id">
              <Room user={user} token={token} />
            </Route>
            <Route path="/checkout">
              <Checkout />
            </Route>
            <Route path="/profile">
              <Profile user={user} />
            </Route>
            <Route path="/transactions">
              <Transactions />
            </Route>
            <Route path="/confirmation">
              <Confirmation user={user} token={token} />
            </Route>
          </Switch>

          <Footer />
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
