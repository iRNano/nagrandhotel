import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
//shared styled components
import Button from "../shared/Button";
import Wrapper from "../shared/Wrapper";
import landingPageImage from "../../../src/images/home2189.png";
import arenaSuite from "../../../src/images/arenasuite1166.png";
import beach from "../../../src/images/beach1919.png";
import Heading from "../shared/Heading";
import palmTree from "../../../src/images/palmtree.png";
import { URL } from "../../config";

const LandingPage = styled.div`
  display: flex;
  padding: 8em;
  flex-flow: row nowrap;
  min-height: 100vh;
  background-color: ${(props) => props.theme.pine};
  //xs
  @media all and (max-width: 767px) {
    padding: 1em;
  }
`;

const LandingPageContent = styled.div`
  background-image: url(${landingPageImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 60%;
  margin: 0 auto;

  height: auto;
  font-family: ${(props) => props.theme.zcoolXiaoWei};

  //lg
  @media all and (min-width: 1200px) {
    max-width: 1920px;
  }
  //xs
  @media all and (max-width: 767px) {
    width: 100%;
    // background-size: 300px;
  }
`;

const LandingHeading = styled.h2`
  font-size: 5rem;
  color: white;
  line-height: 5rem;
  @media all and (max-width: 767px) {
    font-size: 3rem;
    line-height: 3rem;
  }
`;

const FloatingText = styled.div`
    position relative;
    right:10%;
    top:30%;
    @media all and (max-width:767px){
        right:0%;
    }
    
`;
const AboutUs = styled.div`
  display: flex;
  flex-flow: row nowrap;
  min-height: 100vh;
  padding: 8em;
  background-color: ${(props) => props.theme.cream};
  font-family: ${(props) => props.theme.zcoolXiaoWei};
  //xs
  @media all and (max-width: 767px) {
    padding: 0em;
  }
`;

const AboutUsContent = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 75%;
  margin: 0 auto;

  height: auto;
  display: block;
  justify-content: center;
  color: ${(props) => props.theme.pine};
  @media all and (min-width: 1200px) max-width: 1920px;
  //xs
  @media all and (max-width: 767px) {
    width: 100%;
  }
`;

const SpecialOffer = styled.div`
  display: block;
  flex-flow: row nowrap;
  //   min-height: 100vh;
  background-color: ${(props) => props.theme.blush};
  font-family: ${(props) => props.theme.zcoolXiaoWei};
`;

const SpecialOfferContent = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;

  max-width: 1920px;
  // height:auto;
  // display:block;
  // justify-content: center;
  color: ${(props) => props.theme.pine};
`;
const MainContent = () => {
  const [rooms, setRooms] = useState([]);
  const [displayedRoom, setDisplayedRoom] = useState();

  useEffect(() => {
    fetch(`${URL}/rooms`)
      .then((res) => res.json())
      .then((data) => {
        setRooms(data.slice(0, 3));
        setDisplayedRoom(`${URL}/${data[0].images[0].path}`);
      });
  }, []);

  const displayedRoomHandler = (room) => {
    setDisplayedRoom(`${URL}/${room.images[0].path}`);
  };

  return (
    <Fragment>
      <LandingPage>
        <LandingPageContent>
          <FloatingText>
            <LandingHeading>Find</LandingHeading>
            <LandingHeading>Yourself</LandingHeading>
            <LandingHeading>Here</LandingHeading>
            <Link to="/booking">
              <Button location="landing" size="large" type="button">
                Book now
              </Button>
            </Link>
          </FloatingText>
        </LandingPageContent>
      </LandingPage>
      <AboutUs>
        <AboutUsContent>
          <div className="row py-5" style={{ margin: "auto" }}>
            <div className="col-12 text-center ">
              <img src={palmTree} />
              <p>
                The Nagrand Resort & Spa is an ode to discovery, a love letter
                to life in the heart of Cebu.
              </p>
              <Link to="/about-us">
                <Button location="aboutus" size="large" type="button">
                  READ MORE
                </Button>
              </Link>
            </div>
          </div>
          <div className="row py-5" style={{ margin: "auto" }}>
            <div className="col-lg-6 col-12 ">
              <img src={displayedRoom} className="img-fluid" />
            </div>
            <div className="col-lg-6 col-12 ">
              <h1>Rooms</h1>
              <h1>Stay with Us</h1>
              <h5>A sanctuary set against Mactan's historic downtown</h5>

              <ul>
                {rooms.map((room) => (
                  <Fragment key={room._id}>
                    <li onClick={() => displayedRoomHandler(room)}>
                      {room.name}
                    </li>
                  </Fragment>
                ))}
              </ul>
              <Link to="/catalog">
                <Button location="aboutus" size="large" type="button">
                  {" "}
                  VIEW ALL SUITES
                </Button>
              </Link>
            </div>
          </div>
        </AboutUsContent>
      </AboutUs>
      <SpecialOffer>
        <SpecialOfferContent>
          <div className="row text-center" style={{ margin: "auto" }}>
            <div className="col-12 px-0 justify-content">
              <img src={`${beach}`} className="img-fluid"></img>
            </div>
            <div className="row text-center" style={{ margin: "auto" }}>
              <div className="col-12 px-0 py-5">
                <Heading.H1 location="profile">
                  Sign up for Special offers and promotions
                </Heading.H1>
              </div>
            </div>
          </div>
        </SpecialOfferContent>
      </SpecialOffer>
    </Fragment>
  );
};

export default MainContent;
