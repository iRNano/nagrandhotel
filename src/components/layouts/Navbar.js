import React, { useState, Fragment } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import nagrand from "../../images/Nagrandcream.png";

const BrandImg = styled.img.attrs({
  src: nagrand,
})`
  max-width: 200px;
  height: auto;
`;

const StyledNav = styled.div`
  position: fixed;
  top: 0;
  padding: 4em;
  width: 100%;
  background-color: ${(props) => props.theme.pine};
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
    font-size: 1rem;
    position: relative;
    list-style: none;
    text-align: center;
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

const TopNav = ({ user, token, logout }) => {
  const [collapsed, setCollapsed] = useState(true);
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
    //       <Link to="/profile" className="nav-link">
    //         <i className="fas fa-user-circle"></i>
    //       </Link>

  } else {

    if(user && !user.isAdmin) menulinks = logInnedLinks
    if(user.isAdmin) menulinks = adminLinks

        //       <Link to="/profile" className="nav-link">
        //         {user ? user.fullname : <i class="fas fa-user-circle"></i>}
        //       </Link>


    menulinks.push({ path: "/", name: "LOGOUT" });

  }

  return (
    <StyledNav>
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
    // <nav
    //   style={{ backgroundColor: "#4D5C58" }}
    //   className="navbar navbar-expand-lg navbar-dark fixed-top"
    // >
    //   <Link className="navbar-brand" to="/">
    //     <BrandImg></BrandImg>
    //   </Link>
    //   <Hamburger >
    //     <span></span>
    //     <span></span>
    //     <span></span>
    //   </Hamburger>
    //   <button
    //     className="navbar-toggler"
    //     type="button"
    //     data-toggle="collapse"
    //     data-target="#navbarSupportedContent"
    //     aria-controls="navbarSupportedContent"
    //     aria-expanded="false"
    //     aria-label="Toggle navigation"
    //   >
    //     <span className="navbar-toggler-icon"></span>
    //   </button>

    //   <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //     {/* <ul class="navbar-nav mr-auto">
    //                 <li class="nav-item active">
    //                     <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
    //                 </li>
    //                 <li class="nav-item">
    //                     <a class="nav-link" href="#">Link</a>
    //                 </li>

    //                 <li class="nav-item">
    //                     <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
    //                 </li>
    //                 </ul> */}
    //     <ul className="navbar-nav ml-auto">
    //       {guestLinks}
    //       {authLinks}
    //     </ul>
    //   </div>
    // </nav>
  );
};

{
  /* <Navbar style={{backgroundColor:"#4D5C58"}}expand="md" fixed="top" className="px-5 navbar-dark">
                <Link to="/" className="navbar-brand">
                    <BrandImg></BrandImg>
                </Link>
                <NavbarToggler onClick={()=>setCollapsed(!collapsed)} className="mr-2"/>
                <Collapse isOpen={!collapsed} navbar>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            {guestLinks}  
                            {authLinks}
                        </ul>
                    </div>
                        
                        
                        
                    
                </Collapse>
            </Navbar> */
}
export default TopNav;

