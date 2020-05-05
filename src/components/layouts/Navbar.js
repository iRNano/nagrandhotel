import React, { useState, Fragment } from 'react'
import {Navbar, Collapse, NavbarToggler, Nav, NavItem} from "reactstrap"
import {Link} from "react-router-dom"
import styled from 'styled-components'
import nagrand from '../../images/Nagrandcream.png'


const BrandImg = styled.img.attrs(
    {
        src: nagrand
    }
)`
    max-width: 200px;
    height: auto;
`;



const StyledNavbar = styled.nav`
    color: black;

`;
const TopNav = ({user, token, logout}) => {
    const [collapsed, setCollapsed] = useState(true)
    let guestLinks, authLinks;
    
    if(!user && !token){
        guestLinks=(
            <Fragment>
                {/* <NavItem>
                        <Link to="/login" className="nav-link">Login</Link>                    
                </NavItem>
                <NavItem>
                        <Link to="/register" className="nav-link">Register</Link>                    
                </NavItem> */}
                <NavItem>
                        <Link to="/catalog" className="nav-link">Rooms</Link>                    
                </NavItem>
                {/* <NavItem>
                        <Link to="/booking" className="nav-link">Booking</Link>                    
                </NavItem> */}
                <NavItem>
                        <Link to="/about-us" className="nav-link">About Us</Link>                    
                </NavItem>
                <NavItem>
                        <Link to="/contact" className="nav-link">Contact</Link>                    
                </NavItem>
                <NavItem>
                        <Link to="/profile" className="nav-link"><i className="fas fa-user-circle"></i></Link>                    
                </NavItem>
            </Fragment>
        )
    }else{
        authLinks=(
            <Fragment>
                {user && user.isAdmin === false ? 
                    <Fragment>
                        <NavItem>
                        <Link to="/catalog" className="nav-link">Rooms</Link>                    
                        </NavItem>
                        <NavItem>
                                <Link to="/booking" className="nav-link">Booking</Link>                    
                        </NavItem>
                        <NavItem>
                                <Link to="/about-us" className="nav-link">About Us</Link>                    
                        </NavItem>
                        <NavItem>
                                <Link to="/contact" className="nav-link">Contact</Link>                    
                        </NavItem>
                        <NavItem>
                            <Link to="/profile" className="nav-link">{user ? user.fullname :<i class="fas fa-user-circle"></i>}</Link>                    
                        </NavItem>
                    </Fragment>
                    : null                    
                }
                
                {user.isAdmin? 
                    <Fragment>
                        <NavItem>
                            <Link to="/catalog" className="nav-link">Rooms</Link>                    
                        </NavItem>
                        <NavItem>
                            <Link to="/transactions" className="nav-link">Transactions</Link>
                        </NavItem>
                    </Fragment> :
                    null
                }
                
                <NavItem>
                    <Link to="/" className="nav-link" onClick={logout}>Logout</Link>
                </NavItem>
            </Fragment>
        )
    }
        
    
    return(
        <StyledNavbar>
            <Navbar style={{backgroundColor:"#4D5C58"}}expand="md" fixed="top" className="px-5 navbar-dark">
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
            </Navbar>
        </StyledNavbar>
    )
}

export default TopNav;