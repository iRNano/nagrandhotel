import React from 'react'
import nagrand from '../../images/Nagrandcream.png'
import styled from 'styled-components'

const FooterStyle = styled.div`
    background-color: ${props=>props.theme.pine};
    box-sizing:border-box;
    margin: 0;
    padding: 0;
`;

const FooterContent = styled.div`
    width:62%;
    margin: 0 auto;
    padding-top: 5%;
    color: ${props => props.theme.cream};
    //xs
    @media all and (max-width:767px){
        width:100%;
    }
`;


const BrandImg = styled.img.attrs(
    {
        src: nagrand
    }
)`
    max-width: 200px;
    height: auto;
`;
const Footer = () => {
    return(
        <FooterStyle>
            <FooterContent>
                <div className="row w-100">
                    <div className="col-lg-3 col-6">
                        <BrandImg></BrandImg>
                    </div>
                    <div className="col-lg-3 col-6">
                        <p>The Nagrand Resort & Spa</p>
                        <p>Buyong, Maribago Mactan Island,</p> 
                        <p>Lapu-Lapu City, 6015, Philippines</p>
                        
                    </div>
                    <div className="col-4 text-center">
                        <p>About Us</p>
                        <p>Contact Us</p>
                        <p>Services</p>
                    </div>
                    <div className="col-2 text-center">
                        <p>Reservations</p>
                        <p>T. +6332 402 1435</p>
                        <p>M. +6332 413 7876</p>
                        <p>F. +6332 441 5421</p>
                    </div>
                </div>
                <div className="row w-100 py-5">
                    <div className="col-6">
                        <small>Copyright 2020 All rights reserved | Adrian Valdepenas</small>
                    </div>
                    <div className="col-6 text-right">
                        <small>www.avaldepenas.com</small>
                    </div>
                </div>
            </FooterContent>
        </FooterStyle>
    )
}

export default Footer