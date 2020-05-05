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

const BookingNavbar = () => {
    return(
        <Headerstyle>
            <Navbar>
                <Button>Capacity</Button>
                <Button>Pick A Date</Button>
                <Button>Accomodations</Button>
                <Button>Checkout</Button>
            </Navbar>
        </Headerstyle>
    )
}

export default BookingNavbar