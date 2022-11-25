import React, { Fragment, useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import * as S from './style'
import * as T from '../../config/theme'
//shared styled components
import Button from "../../components/shared/Button";
import beach from "../../images/beach1919.png";
import Heading from "../../components/shared/Heading";
import palmTree from "../../images/palmtree.png";
import { URL } from "../../config";
import { useInView} from 'react-intersection-observer'

const MainContent = ({setActiveSection}) => {
  const [rooms, setRooms] = useState([]);
  const [displayedRoom, setDisplayedRoom] = useState();

  const landingRef = useRef(null)
  const aboutRef = useRef(null)
  const specialRef = useRef(null)

  const observerHandler = (entries => {
    const [entry] = entries
    let color;

    console.log('name',entry.target.id)
    if(entry.target.id === 'landing' || entry.target.id === 'special') color = T.pine
    if(entry.target.id === 'about') color = T.cream
    
    if(entry.isIntersecting) setActiveSection(color)
  })

  const options = useMemo(()=>{
    return{
      root: null,
      rootMargin: '0px',
      threshold: 0.9
    }
  },[])

  useEffect(() => {
    fetch(`${URL}/rooms`)
      .then((res) => res.json())
      .then((data) => {
        setRooms(data.slice(0, 3));
        
        if(data[0]?.images[0]?.path) setDisplayedRoom(`${URL}/${data[0].images[0].path}`);
      });

      
      const landingObs = new IntersectionObserver(observerHandler, options)
      const aboutObs = new IntersectionObserver(observerHandler, options)
      const specialObs = new IntersectionObserver(observerHandler, options)


      landingObs.observe(landingRef.current)
      aboutObs.observe(aboutRef.current)
      specialObs.observe(specialRef.current)
      
      return () => {
        landingObs.disconnect()
        aboutObs.disconnect()
        specialObs.disconnect()
        
      }

  }, []);

  const displayedRoomHandler = (room) => {
    setDisplayedRoom(`${URL}/${room.images[0].path}`);
  };

  return (
    <Fragment>
      <S.LandingPage ref={landingRef} id="landing">
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
      <S.AboutUs ref={aboutRef} id="about">
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
      <S.SpecialOffer ref={specialRef} id="special">
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
