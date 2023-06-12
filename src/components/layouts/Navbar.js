import React, { useState, Fragment, useContext } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  BrandImg,
  NavUnlisted,
  StyledNav,
  Hamburger,
} from "../../styles/Navbar.styled";

import { AuthContext } from "../../context/AuthContext";

const isColorDark = (color) => {
  console.log("color ", color);
  const hex = color.replace("#", "");
  const rgb = parseInt(hex, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;
  const luminance = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
  return luminance < 0.5;
};

const TopNav = ({ logout, activeSection }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [color, setColor] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const { user } = useContext(AuthContext);
  const [menulinks, setMenulinks] = useState([]);
  //links

  // console.log(user);

  useEffect(() => {
    // console.log("activeSection", activeSection);
    // if (isColorDark(activeSection)) setIsDark(true);
    if (activeSection === "#4D5C58") setColor("#F3EDEA");
    if (activeSection === "#F3EDEA") setColor("#4D5C58");
  }, [activeSection]);

  useEffect(() => {
    let logInnedLinks = [
      { path: "/booking", name: "BOOKING" },
      { path: "/", name: "LOGOUT" },
    ];

    if (user) {
      setMenulinks([
        { path: "/", name: "HOME" },
        { path: "/catalog", name: "ROOMS" },
        { path: "/about-us", name: "ABOUT US" },
        { path: "/contact", name: "CONTACT" },
        ...logInnedLinks,
      ]);
    } else {
      console.log("fail", user);
      setMenulinks([
        { path: "/", name: "HOME" },
        { path: "/catalog", name: "ROOMS" },
        { path: "/about-us", name: "ABOUT US" },
        { path: "/contact", name: "CONTACT" },
        { path: "/profile", name: "LOGIN" },
      ]);
    }
  }, [user]);

  return (
    <StyledNav>
      <NavLink to="/" exact>
        <BrandImg></BrandImg>
      </NavLink>
      <Hamburger onClick={() => setCollapsed(!collapsed)}>
        <span></span>
        <span></span>
        <span></span>
      </Hamburger>
      <NavUnlisted collapsed={collapsed} color={color}>
        {menulinks.length &&
          menulinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              exact
              activeClassName={link.name !== "LOGOUT" ? "current" : ""}
            >
              <li onClick={() => (link.name === "LOGOUT" ? logout() : null)}>
                {link.name}
              </li>
            </NavLink>
          ))}
      </NavUnlisted>
    </StyledNav>
  );
};
export default TopNav;
