import React, { Fragment, useEffect, useState, useRef, useMemo } from "react";

import { URL } from "../../config";

import Landing from "./Landing";
import AboutUs from "./AboutUs";
import SpecialOffers from "./SpecialOffers";

const MainContent = ({ setActiveSection }) => {
  const [rooms, setRooms] = useState([]);
  const [displayedRoom, setDisplayedRoom] = useState();
  // const [threshold, setThreshold] = useState(0.9);

  // const homeRef = useRef(null);
  // const prevScrollY = useRef(0);
  // const threshold = useRef(0.6);
  // const sectionRefs = useRef([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${URL}/rooms`);
        if (!response.ok)
          throw new Error(`Response status: ${response.status}`);

        const json = await response.json();
        setRooms(json);
        setDisplayedRoom(json[0].images[0]);
      } catch {
        console.log("error");
      }
    }
    fetchData();

    // const handleScroll = () => {
    //   const currentScrollY = window.scrollY;

    //   if (currentScrollY > prevScrollY.current) {
    //     // Scrolling down
    //     threshold.current = 0.6; // Lower threshold for faster color change
    //   } else {
    //     // Scrolling up
    //     threshold.current = 0.1; // Higher threshold for slower color change
    //   }
    //   // console.log("threshold", threshold.current);
    //   prevScrollY.current = currentScrollY;
    // };

    // const observerHandler = (entries, observer) => {
    //   // const [entry] = entries;
    //   let color;
    //   console.log(observer.thresholds);
    //   entries.forEach((entry) => {
    //     // console.log(entry.target);
    //     console.log("name", entry.target.id);

    //     // if (entry.target.id === "landing" || entry.target.id === "special")
    //     //   color = T.pine;
    //     // if (entry.target.id === "about") color = T.cream;

    //     if (entry.isIntersecting) setActiveSection(color);
    //   });
    // };
    // const options = {
    //   root: null,
    //   rootMargin: "0px",
    //   threshold: threshold.current,
    //   // trackVisibility: threshold.current,
    //   delay: 100,
    // };

    // const observer = new IntersectionObserver(observerHandler, options);
    // console.log(sectionRefs.current);
    // sectionRefs.current.forEach((ref) => {
    //   if (ref) {
    //     observer.observe(ref);
    //   }
    // });

    // window.addEventListener("scroll", handleScroll);
    // return () => {
    //   observer.disconnect();
    //   window.removeEventListener("scroll", handleScroll);
    // };
  }, []);

  return (
    <Fragment>
      <div className="home-page" style={{ width: "100%" }}>
        <Landing id="landing" />
        <AboutUs
          id="aboutus"
          setDisplayedRoom={setDisplayedRoom}
          displayedRoom={displayedRoom}
          rooms={rooms}
        />
        <SpecialOffers id="special-offers" />
      </div>
    </Fragment>
  );
};

export default MainContent;
