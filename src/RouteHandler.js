import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Booking from "./pages/Booking";
import Booking2 from "./pages/Booking2";
import Room from "./pages/Room";
import Catalog from "./pages/Catalog";
import Transactions from "./pages/Transactions";
import Register from "./components/forms/Register";
import Login from "./components/forms/Login";
import AddRoom from "./components/forms/AddRoom";
import Checkout from "./components/forms/Checkout";
import Confirmation from "./components/forms/Confirmation";

const RouteHandler = ({ setActiveSection }) => {
  return (
    <Switch>
      <Route exact path="/">
        <Landing setActiveSection={setActiveSection} />
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
        {/* <Booking user={user} token={token} /> */}
        <Booking2 />
      </Route>
      <Route path="/rooms/:_id">
        <Room />
      </Route>
      <Route path="/checkout">
        <Checkout />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/transactions">
        <Transactions />
      </Route>
      <Route path="/confirmation">
        <Confirmation />
      </Route>
    </Switch>
  );
};

export default RouteHandler;
