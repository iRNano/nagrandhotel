import React, { Fragment, useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { Container, Content } from "../../styles/Pages.styled";
import * as S from "./style";
//shared styled components
import landingPageImage from "../../images/home2189.png";
import Button from "../../components/shared/Button";
import beach from "../../images/beach1919.png";
import Heading from "../../components/shared/Heading";
import palmTree from "../../images/palmtree.png";
import { URL } from "../../config";
import { useInView, InView } from "react-intersection-observer";
import { FlexDiv } from "../../styles/Flex.styled";

const MainContent = ({ setActiveSection }) => {
  const [rooms, setRooms] = useState([]);
  const [displayedRoom, setDisplayedRoom] = useState();
  // const [threshold, setThreshold] = useState(0.9);

  const homeRef = useRef(null);
  const prevScrollY = useRef(0);
  const threshold = useRef(0.6);
  const sectionRefs = useRef([]);

  useEffect(() => {

    async function fetchData() {

      try{
        const response = await fetch(`${URL}/rooms`)
        if(response) setRooms(response.json().slice(0,3))
      }catch{
        console.log('error')
      }
    }

    fetchData()
    
    // fetch(`${URL}/rooms`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setRooms(data.slice(0, 3));
    //     // console.log(data);
    //     if (data[0]?.images[0]) setDisplayedRoom(data[0].images[0]);
    //   });
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY.current) {
        // Scrolling down
        threshold.current = 0.6; // Lower threshold for faster color change
      } else {
        // Scrolling up
        threshold.current = 0.1; // Higher threshold for slower color change
      }
      // console.log("threshold", threshold.current);
      prevScrollY.current = currentScrollY;
    };

    const observerHandler = (entries, observer) => {
      // const [entry] = entries;
      let color;
      console.log(observer.thresholds);
      entries.forEach((entry) => {
        // console.log(entry.target);
        console.log("name", entry.target.id);

        // if (entry.target.id === "landing" || entry.target.id === "special")
        //   color = T.pine;
        // if (entry.target.id === "about") color = T.cream;

        if (entry.isIntersecting) setActiveSection(color);
      });
    };
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: threshold.current,
      // trackVisibility: threshold.current,
      delay: 100,
    };

    const observer = new IntersectionObserver(observerHandler, options);
    console.log(sectionRefs.current);
    sectionRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    // window.addEventListener("scroll", handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setActiveSection]);

  const displayedRoomHandler = (room) => {
    setDisplayedRoom(`${room.images[0]}`);
  };

  return (
    <Fragment>
      <div className="home-page" ref={homeRef} style={{ width: "100%" }}>
        <Container ref={(el) => (sectionRefs.current[0] = el)} id="landing">
          <Content>
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
            {/* <div
                style={{
                  position: "relative",
                  aspectRatio: "3/2",
                  maxWidth: "100%",
                  margin: "0 auto",
                }}
              >
                <img
                  src={landingPageImage}
                  style={{ maxWidth: "80%", margin: "0 auto" }}
                ></img>
              </div> */}
          </Content>
        </Container>
        <Container
          bgColor={"cream"}
          ref={(el) => (sectionRefs.current[1] = el)}
          id="about"
        >
          <Content>
            <S.AboutUsContent>
              <S.AboutUsDetails>
                <img src={palmTree} style={{ margin: "0 auto" }} />
                <p>
                  The Nagrand Resort & Spa is an ode to discovery, a love letter
                  to life in the heart of Cebu.
                </p>
                <Link to="/about-us">
                  <Button location="aboutus" size="large" type="button">
                    READ MORE
                  </Button>
                </Link>
              </S.AboutUsDetails>

              <FlexDiv>
                <div>
                  <img src={displayedRoom} alt="room" />
                </div>
                <S.AboutUsRooms>
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
                </S.AboutUsRooms>
              </FlexDiv>
            </S.AboutUsContent>
          </Content>
        </Container>
        <Container ref={(el) => (sectionRefs.current[2] = el)} id="special">
          <div>
            <div>
              <img src={`${beach}`} className="img-fluid"></img>
            </div>
            <div>
              <div>
                <Heading.H1 location="profile">
                  Sign up for Special offers and promotions
                </Heading.H1>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Fragment>
  );
};

export default MainContent;
