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
    // background-color:${props=>props.theme.pine}
`
const TopNav = ({user, token, logout}) => {
    const [collapsed, setCollapsed] = useState(true)
    let guestLinks, authLinks;
    //links
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

            <nav style={{"background-color":"#4D5C58"}}class="navbar navbar-expand-lg navbar-dark">
                <Link class="navbar-brand" to="/"><BrandImg></BrandImg></Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                
                    <li class="nav-item">
                        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                    </li>
                    </ul> */}
                    <ul className="navbar-nav ml-auto">
                        {guestLinks}  
                        {authLinks}
                    </ul>
                </div>
            </nav>
    )
}

 {/* <Navbar style={{backgroundColor:"#4D5C58"}}expand="md" fixed="top" className="px-5 navbar-dark">
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
            </Navbar> */}
export default TopNav;