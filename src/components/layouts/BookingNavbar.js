import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
// import Button from '../shared/Button'

const Headerstyle = styled.header`
    width:100%;
    background: ${props=>props.theme.pine};

`;
const Navbar = styled.nav`
    background-color: red;
    width:100%;
    display:flex;
    align-items: center;

`;

const Button = styled.button`
    height: auto;
    width: 100%;
    display:block;
`;

const BookingNavbar = ({setActiveTab}) => {
    return(
        <Headerstyle>
            <Navbar>
                <Button onClick={()=> setActiveTab(0)}>Capacity</Button>
                <Button onClick={()=> setActiveTab(1)}>Pick A Date</Button>
                <Button onClick={()=> setActiveTab(2)}>Accomodations</Button>
                <Button onClick={()=> setActiveTab(3)}>Checkout</Button>
            </Navbar>
        </Headerstyle>
    )
}

export default BookingNavbar