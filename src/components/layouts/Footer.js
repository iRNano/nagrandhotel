import React from "react";
import nagrand from "../../images/Nagrandcream.png";
import styled from "styled-components";
import { Link, NavItem } from "react-router-dom";

const FooterStyle = styled.div`
  background-color: ${(props) => props.theme.pine};
  box-sizing: border-box;
  margin: 0;
  padding: 0;
`;

const FooterContent = styled.div`
  width: 70%;
  margin: 0 auto;
  padding-top: 5%;
  color: ${(props) => props.theme.cream};
  //xs

  .align {
    text-align: right;
  }
  @media all and (max-width: 767px) {
    width: 100%;
    font-size: 0.7rem;

    .align {
      text-align: center;
    }
  }
`;

const FooterLinks = styled.p`
  color: ${(props) => props.theme.cream};
`;

const BrandImg = styled.img.attrs({
  src: nagrand,
})`
  max-width: 200px;
  height: auto;
`;
const Footer = () => {
  return (
    <FooterStyle>
      <FooterContent>
        <div className="row " style={{ margin: "0 auto" }}>
          <div className="col-lg-3 col-12 py-2">
            <div style={{ display: "flex", "justify-content": "center" }}>
              <BrandImg></BrandImg>
            </div>
          </div>
          <div className="col-lg-3 col-12 py-2 text-center">
            <p>The Nagrand Resort & Spa</p>
            <p>Buyong, Maribago Mactan Island,</p>
            <p>Lapu-Lapu City, 6015, Philippines</p>
          </div>
          <div className="col-lg-4 col-12 py-2 text-center">
            <Link as={Link} to="/about-us">
              <FooterLinks>About Us</FooterLinks>
            </Link>

            <Link to="/contact">
              <FooterLinks>Contact Us</FooterLinks>
            </Link>

            <Link to="/catalog">
              <FooterLinks>Rooms</FooterLinks>
            </Link>
          </div>
          <div className="col-lg-2 col-12 py-2 text-center">
            <p>Reservations</p>
            <p>T. +6332 402 1435</p>
            <p>M. +6332 413 7876</p>
            <p>F. +6332 441 5421</p>
          </div>
        </div>
        <div className="row text-center py-5" style={{ margin: "auto" }}>
          <div className="col-lg-6 col-12">
            <small>
              Copyright 2020 All rights reserved | Adrian Valdepenas
            </small>
          </div>
          <div className="col-lg-6 col-12 align">
            <small>www.avaldepenas.com</small>
          </div>
        </div>
      </FooterContent>
    </FooterStyle>
  );
};

export default Footer;
