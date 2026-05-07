import React from "react";
import contact from "../images/contact.png";
import * as S from "./style";
import * as T from "../config/theme";

const Contact = () => {
  return (
    <div className="container bg-cream">
      <S.Content fontFamily={T.montserratLight} color={T.pine}>
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
      </S.Content>
    </div>
  );
};

export default Contact;
