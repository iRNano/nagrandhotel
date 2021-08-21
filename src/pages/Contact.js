import React from "react";
import styled from "styled-components";
import contact from "../images/contact.png";

const ContactWrapper = styled.div`
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

const ContactContent = styled.div`
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
  // font-size: 2rem;
  color: ${(props) => props.theme.pine};
  @media all and (max-width: 767px) {
    margin-top: 114px;
  }
`;
const Contact = () => {
  return (
    <ContactWrapper>
      <ContactContent>
        <div className="row">
          <div className="col-lg-6 col-12 py-5">
            <h1>Get in touch</h1>
            <p>
              We’re always happy to help, but first you may find what you need
              here in the frequently asked questions.
            </p>
            <h1>The Nagrand Resort & Spa</h1>
            <p>Buyong, Maribago, Mactan Island</p>
            <p>Lapu-Lapu City, 6015, Philippines</p>
            <h1>For Reservations please call:</h1>
            <p>T. +6332 402 1435</p>
            <p>M. +6332 413 7876</p>
            <p>F. +6332 441 5421</p>
            <p>E: reservations@thenagrand.com</p>
          </div>
          <div className="col-lg-6 col-12 py-5">
            <img src={contact} className="img-fluid"></img>
          </div>
        </div>
      </ContactContent>
    </ContactWrapper>
  );
};

export default Contact;
