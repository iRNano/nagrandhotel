import React from "react";
import * as S from './style'
import * as T from '../config/theme'

const AboutUs = () => {
  return (
        <S.Wrapper bgColor={T.cream}>
          <S.Content 
          fontFamily={T.montserratLight} 
          color={T.pine} 
          fontSize={"2rem"}>

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
          </S.Content>
        </S.Wrapper>
      
  );
};

export default AboutUs;
