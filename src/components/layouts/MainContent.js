import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'

import styled from 'styled-components'
//shared styled components
import Button from '../shared/Button'
import Wrapper from '../shared/Wrapper'
import landingPageImage from '../../../src/images/home2189.png'
import arenaSuite from '../../../src/images/arenasuite1166.png'
import beach from '../../../src/images/beach1919.png'
import Heading from '../shared/Heading'
import palmTree from '../../../src/images/palmtree.png'

const LandingPage = styled.div`
    display:flex;
    padding: 8em;
    flex-flow: row nowrap;
    min-height: 100vh;
    background-color: ${props => props.theme.pine};
    //xs
    @media all and (max-width:767px){
        padding: 0em;
    }
    
`;

const LandingPageContent = styled.div`
    background-image: url(${landingPageImage});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width:60%;
    margin: 0 auto;
    max-width: 1920px;
    height:auto;
    font-family: ${props => props.theme.zcoolXiaoWei}

    //lg
    @media all and (min-width:1200px){
        max-width:350px;
    }
    //md
    @media all and (max-width:1199){
        max-width:300px;
    }
    //sm
    @media all and (max-width:991px){
        max-width:250pxpx;
    }

    //xs
    @media all and (max-width:767px){
        width:100%;
    }

`;
const AboutUs = styled.div`
    display:flex;
    flex-flow: row nowrap;
    min-height: 100vh;
    padding: 8em;
    background-color: ${props => props.theme.cream};
    font-family: ${props => props.theme.zcoolXiaoWei};
    //xs
    @media all and (max-width:767px){
        padding: 0em;
    }
`;

const AboutUsContent = styled.div`
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width:75%;
    margin: 0 auto;
    max-width: 1920px;
    height:auto;
    display:block;
    justify-content: center;
    color: ${props=>props.theme.pine};
    //xs
    @media all and (max-width:767px){
        width:100%;
    }
`;


const LandingHeading = styled.h2`
    font-size: 5rem;
    color: white;
    line-height: 5rem;
`;

const FloatingText = styled.div`
    position relative;
    right:10%;
    top:30%;

`;

const SpecialOffer = styled.div`
    display:block;
    flex-flow: row nowrap;
    min-height: 100vh;
    background-color: ${props => props.theme.blush};
    font-family: ${props => props.theme.zcoolXiaoWei}

`;

const SpecialOfferContent = styled.div`
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    
    max-width: 1920px;
    // height:auto;
    // display:block;
    // justify-content: center;
color: ${props=>props.theme.pine}
`;
const MainContent = () => {
    return(
        <Fragment>
            <LandingPage>
                <LandingPageContent>
                    
                    <FloatingText>
                        <LandingHeading>Find</LandingHeading>
                        <LandingHeading>Yourself</LandingHeading>
                        <LandingHeading>Here</LandingHeading>
                        <Link to="/booking">
                            <Button location="landing" size="large" type="button">Book now</Button>
                        </Link>
                    </FloatingText>
                </LandingPageContent>
            </LandingPage>
            <AboutUs>
                <AboutUsContent>
                    <div className="row">
                        <div className="col-12 text-center p-5">
                            <img src={palmTree} />
                            <p>The Nagrand Resort & Spa is an ode to discovery, a love letter to life in the heart of Cebu.</p>
                            <Button location="aboutus" size="large" type="button">READ MORE</Button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-12 p-5">
                            <img src={`${arenaSuite}`} className="img-fluid"/>
                        </div>
                        <div className="col-lg-6 col-12 p-5">
                            <h1>Rooms</h1>
                            <h1>Stay with Us</h1>
                            <h5>A sanctuary set against Mactan's historic downtown</h5>

                            <ul>
                                <li>Jungle Suite</li>
                                <li>Aqua Suite</li>
                                <li>Tiera Suite</li>
                            </ul>

                            <Button location="aboutus" size="large" type="button"> VIEW ALL SUITES</Button>
                        </div>
                    </div>
                </AboutUsContent>
            </AboutUs>
            <SpecialOffer>
                <SpecialOfferContent>
                    <div className="row text-center w-100 m-0">
                        <div className="col-12 px-0">
                            <img src={`${beach}`} className="w-100"></img>
                        </div>    
                    </div>
                    <div className="row text-center w-100 m-0">
                        <div className="col-12 px-0 py-5">
                            <h1>Sign up for Special offers and promotions</h1>
                        </div>
                    </div>
                </SpecialOfferContent>
            </SpecialOffer>
        </Fragment>
            
        
    )
}

export default MainContent