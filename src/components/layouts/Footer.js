import React from "react";
import { Link } from "react-router-dom";
import { FlexDiv } from "../../styles/Flex.styled";
import { Content } from "../../styles/Pages.styled";
import { BrandImg, FooterLinks, FooterStyle } from "../../styles/Footer.styled";

const Footer = () => {
  return (
    <FooterStyle>
      <Content>
        <FlexDiv>
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <BrandImg></BrandImg>
            </div>
          </div>
          <div>
            <p>The Nagrand Resort & Spa</p>
            <p>Buyong, Maribago Mactan Island,</p>
            <p>Lapu-Lapu City, 6015, Philippines</p>
          </div>
          <div>
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
          <div>
            <p>Reservations</p>
            <p>T. +6332 402 1435</p>
            <p>M. +6332 413 7876</p>
            <p>F. +6332 441 5421</p>
          </div>
        </FlexDiv>

        <FlexDiv>
          <div>
            <small>
              Copyright 2020 All rights reserved | Adrian Valdepenas
            </small>
          </div>
          <div>
            <small>www.avaldepenas.com</small>
          </div>
        </FlexDiv>
      </Content>
    </FooterStyle>
  );
};

export default Footer;
