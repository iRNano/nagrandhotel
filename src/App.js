import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
//layout
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import Landing from "./pages/Landing/index";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Room from "./pages/Room";
//forms
import Login from "./components/forms/Login";
import Register from "./components/forms/Register";
import AddRoom from "./components/forms/AddRoom";
import Catalog from "./pages/Catalog";
import Booking from "./pages/Booking";
import Profile from "./pages/Profile";
// import EditRoom from './components/forms/EditRoom'
import "./App.css";
import Auth from "./components/Auth";
import { ThemeProvider } from "styled-components";
import * as theme from "./config/theme";
import Checkout from "./components/forms/Checkout";
import Transactions from "./pages/Transactions";
import Confirmation from "./components/Confirmation";
import ScrollToTop from "./ScrollToTop";
import { AuthContextProvider } from "./context/AuthContext";

const App = () => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [activeSection, setActiveSection] = useState("")

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
    console.log('loguout')
    localStorage.clear();
    setUser({});
    setToken("");
    window.location.href = "/";
  };

  return (
    <div className="App">
      <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <ScrollToTop />
          <Navbar user={user} token={token} logout={logout} activeSection={activeSection}/>
          <Switch>
            <Route exact path="/">
              <Landing setActiveSection={setActiveSection}/>
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
              <AddRoom />
            </Route>
            <Route path="/catalog">
              <Catalog />
            </Route>
            <Route path="/booking">
            <Booking user={user} token={token} />
              {/* {user ? <Booking user={user} token={token} /> : <Auth />} */}
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
      </AuthContextProvider>
    </div>
  );
};

export default App;
