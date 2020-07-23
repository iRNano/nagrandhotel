import React from "react";
import styled from "styled-components";

const AboutUsWrapper = styled.div`
  display: block;
  padding: 8em;
  flex-flow: row nowrap;
  min-height: 100vh;
  background-color: ${(props) => props.theme.cream};
  //xs
  @media all and (max-width: 767px) {
    padding: 0em;
  }
`;

const AboutUsContent = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 70%;
  margin: 0 auto;
  max-width: 1920px;
  height: auto;
  display: block;
  justify-content: center;
  font-family: ${(props) => props.theme.montserratLight};
  font-size: 2rem;
  color: ${(props) => props.theme.pine};
  @media all and (max-width: 767px) {
    margin-top: 114px;
  }
`;
const AboutUs = () => {
  return (
    <AboutUsWrapper>
      <AboutUsContent>
        <div className="row">
          <div className="col-12 py-5">
            <h1 style={{ fontSize: "4rem" }}>Hello!</h1>
            <small>
              The Nagrand Resort & Spa is an ode to discovery, a love letter to
              life in the heart of Cebu.
            </small>
          </div>
        </div>
        <div className="row">
          <div className="col-12 py-5">
            <p className="py-4">
              The Nagrand Resort & Spa has been created with all the charm and
              the quiet of nature captured in exclusive suites between the
              tropical forest, white sand and the sea. Made with nature
              materials that blend into the environment with spacious terraces
              and private pools giving you the freedom and privacy you need.
            </p>
            <p className="py-4">
              {" "}
              Comfortable and sophisticated interiors designer furniture a space
              that where every glance falls on beauty luminosity and natural
              detail.
            </p>
            <p className="py-4">
              Yaan Wellness energy spa offers healing regeneration and deep
              transformation in a magical and organic setting.
            </p>
            <p className="py-4">
              We hope you enjoy your star with us and take home with you a
              unique experience filled with unforgettable memories.
            </p>
          </div>
        </div>
      </AboutUsContent>
    </AboutUsWrapper>
  );
};

export default AboutUs;
