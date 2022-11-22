import React, { useState, Fragment } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import nagrand from "../../images/Nagrandcream.png";
import * as T from '../../config/theme'

const BrandImg = styled.img.attrs({
  src: nagrand,
})`
  max-width: 150px;
  color:red;
  @media (max-width: 768px) {
max-width: 80px;
  }
`;

const StyledNav = styled.div`
  position: fixed;
  top: 0;
  padding: 2em;
  width: 100%;
  background-color: ${(props) => props.bgColor};
  z-index: 100;
  display: flex;
  justify-content:space-between;
  flex-wrap: wrap;
  align-items:center;

  @media (max-width: 768px){
    padding: 2em;
  }
`;
const NavUnlisted = styled.ul`
  display: flex;
  padding: 0;
  margin: 0;

  a {
    text-decoration: none;
  }
  li {
    color: ${(props) => props.theme.cream};
    margin: 0 0.8rem;
    font-size: .8rem;
    position: relative;
    list-style: none;
    text-align: center;
    font-family: ${props => props.theme.fontfamily.monsterrat}
  }

  .current {
    li {
      color: ${(props) => props.theme.blush};
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    overflow: hidden;
    max-height:  ${({collapsed}) => (collapsed ? "300px" : "0")};
    transition: max-height 0.3s ease-in;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;

  span {
    height: 2px;
    width: 40px;
    background: ${(props) => props.theme.cream};
    margin-bottom: 6px;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const TopNav = ({ user, token, logout, activeSection }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [bgColor, setBgColor] = useState(null)
  let guestLinks, authLinks;
  let menulinks = []
  //links
  let notLoggedOnLinks = [
    {path: "/", name: "HOME"},
    { path: "/catalog", name: "ROOMS" },
    { path: "/about-us", name: "ABOUT US" },
    { path: "/contact", name: "CONTACT" },
    { path: "/profile", name: "PROFILE" },
  ];

  let logInnedLinks = [
    {path: "/", name: "HOME"},
    { path: "/catalog", name: "ROOMS" },
    { path: "/booking", name: "BOOKING" },
    { path: "/about-us", name: "ABOUT US" },
    { path: "/contact", name: "CONTACT" },
    { path: "/profile", name: "PROFILE" },
  ];

  let adminLinks = [
    { path: "/contact", name: "CONTACT" },
    { path: "/profile", name: "PROFILE" },
  ];
  if (!user && !token) {
    menulinks = notLoggedOnLinks


  } else {

    if(user && !user.isAdmin) menulinks = logInnedLinks
    if(user.isAdmin) menulinks = adminLinks
    menulinks.push({ path: "/", name: "LOGOUT" });

  }

  useEffect(()=>{
    console.log(activeSection)
  },[activeSection])
  return (
    <StyledNav bgColor={activeSection}>
      <BrandImg></BrandImg>
      <Hamburger onClick={() => setCollapsed(!collapsed)}>
        <span></span>
        <span></span>
        <span></span>
      </Hamburger>
      <NavUnlisted collapsed={collapsed}>
        {menulinks.map((link, index)=> (
          <NavLink key={index} to={link.path} exact activeClassName={link.name !== "LOGOUT" ? "current": ''}>
            <li>{link.name}</li>
          </NavLink>
        ))}
      </NavUnlisted>
    </StyledNav>

  );
};
export default TopNav;

