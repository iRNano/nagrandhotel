import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { InView } from "react-intersection-observer";

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${(props) => (props.dark ? "#333" : "#f1f1f1")};
  padding: 20px;
  z-index: 999;
  color: ${(props) => (props.dark ? "#fff" : "#333")};
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin-right: 10px;

  @media (max-width: 768px) {
    margin-right: 5px;
  }
`;

const NavLink = styled.a`
  color: inherit;
  text-decoration: none;
  padding: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

const isColorDark = (color) => {
  const hex = color.replace("#", "");
  const rgb = parseInt(hex, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;
  const luminance = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
  return luminance < 0.5;
};

const NavigationBar = () => {
  const [isDark, setIsDark] = useState(false);
  const navRef = useRef(null);

  const handleIntersection = (inview, entry) => {
    console.log(entry.target);
    console.log(entry.boundClientRect);
    console.log(entry.rootBounds);
    console.log(entry.target);
    // entries.forEach((entry) => {
    //   console.log(entry.target);
    if (entry.isIntersecting) {
      const targetColor = getComputedStyle(entry.target).backgroundColor;
      console.log(targetColor);
      // setIsDark(targetColor === "rgb(51, 51, 51)");
    }
    // });
  };
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    // const observer = new IntersectionObserver(handleIntersection, options);
    // observer.observe(navRef.current);

    // return () => {
    //   observer.disconnect();
    // };
  }, []);

  return (
    <InView
      as="div"
      onChange={(inview, entry) => {
        handleIntersection(inview, entry);
      }}
    >
      <NavContainer dark={isDark} ref={navRef}>
        <NavList>
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/about">About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/services">Services</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/contact">Contact</NavLink>
          </NavItem>
        </NavList>
      </NavContainer>
    </InView>
  );
};

export default NavigationBar;
