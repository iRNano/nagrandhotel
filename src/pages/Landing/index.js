import React, { Fragment, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import * as S from './style'
//shared styled components
import Button from "../../components/shared/Button";
import beach from "../../images/beach1919.png";
import Heading from "../../components/shared/Heading";
import palmTree from "../../images/palmtree.png";
import { URL } from "../../config";

const MainContent = () => {
  const [rooms, setRooms] = useState([]);
  const [displayedRoom, setDisplayedRoom] = useState();

  const aboutRef = useRef()

  useEffect(() => {
    fetch(`${URL}/rooms`)
      .then((res) => res.json())
      .then((data) => {
        setRooms(data.slice(0, 3));
        
        if(data[0]?.images[0]?.path) setDisplayedRoom(`${URL}/${data[0].images[0].path}`);
      });

      const observer = new IntersectionObserver((entries => {
        const entry = (entries[0])
        console.log(entry)
        if(entry.isIntersecting) console.log('intersect')
      }))

      observer.observe(aboutRef.current)
  }, []);

  const displayedRoomHandler = (room) => {
    setDisplayedRoom(`${URL}/${room.images[0].path}`);
  };

  return (
    <Fragment>
      <S.LandingPage>
        <S.LandingPageContent>
          <S.FloatingText>
            <S.LandingHeading>Find</S.LandingHeading>
            <S.LandingHeading>Yourself</S.LandingHeading>
            <S.LandingHeading>Here</S.LandingHeading>
            <Link to="/booking">
              <Button location="landing" size="large" type="button">
                BOOK NOW
              </Button>
            </Link>
          </S.FloatingText>
        </S.LandingPageContent>
      </S.LandingPage>
      <S.AboutUs ref={aboutRef}>
        <S.AboutUsContent>
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
        </S.AboutUsContent>
      </S.AboutUs>
      <S.SpecialOffer>
        <S.SpecialOfferContent>
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
        </S.SpecialOfferContent>
      </S.SpecialOffer>
    </Fragment>
  );
};

export default MainContent;
