import React from "react"
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import Heading from './shared/Heading'

const AuthWrapper = styled.div`
    display:block;
    padding: 8em;
    flex-flow: row nowrap;
    min-height: 60vh;
    background-color: ${props => props.theme.cream};
`;

const AuthContent = styled.div`
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width:70%;
    margin: 0 auto;
    max-width: 1920px;
    height:auto;
    display:block;
    justify-content: center;
    font-family: ${props=>props.theme.montserratLight};
    font-size: 2rem;
    color: ${props=>props.theme.pine}

`;
const Auth = () => {
    return(
        <AuthWrapper>
            <AuthContent>
                <Heading.H1 location="admin" className="text-center p-5">
                    You have no access on this page please <Link to="/profile">Sign in</Link> or view our 
                    <Link to="/"> Rooms</Link>
                </Heading.H1>
            </AuthContent>
        </AuthWrapper>
        
    )
}

export default Auth