import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
//layout
import Navbar from "./components/layouts/Navbar";
import Navbar2 from "./components/layouts/Navbar2";
import Footer from "./components/layouts/Footer";

// import EditRoom from './components/forms/EditRoom'
import "./App.css";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/Global";
import * as theme from "./config/theme";
import ScrollToTop from "./ScrollToTop";
import { AuthContextProvider } from "./context/AuthContext";
import RouteHandler from "./RouteHandler";

const App = () => {
  // const [user, setUser] = useState({});
  // const [token, setToken] = useState("");
  const [activeSection, setActiveSection] = useState("");

  // useEffect(() => {
  //   if (token) {
  //     let decoded = jwt_decode(token);
  //     let now = new Date();

  //     if (decoded.exp >= now.getTime()) {
  //       localStorage.clear();
  //     }
  //   }
  //   if (user) {
  //     setUser(JSON.parse(localStorage.getItem("user")));
  //     setToken(localStorage.getItem("token"));
  //   }
  // }, [token]);

  //logout
  const logout = () => {
    console.log("loguout");
    localStorage.clear();
    // setUser({});
    // setToken("");
    window.location.href = "/";
  };

  return (
    <div className="App">
      <AuthContextProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Router>
            <ScrollToTop />
            <Navbar
              // user={user}
              // token={token}
              logout={logout}
              activeSection={activeSection}
            />
            <RouteHandler setActiveSection={setActiveSection} />

            <Footer />
          </Router>
          {/* </GlobalStyle> */}
        </ThemeProvider>
      </AuthContextProvider>
    </div>
  );
};

export default App;
