import React from "react";
import { Link } from "react-router-dom";
import nagrandBrand from "../../assets/images/Nagrandcream.png";

const Footer = () => {
  return (
    <footer className="bg-pine">
      <div className="container">
        <div className="primary-footer">
          <div className="brand">
            <img src={nagrandBrand}></img>
          </div>
          <div>
            <p>The Nagrand Resort & Spa</p>
            <p>Buyong, Maribago Mactan Island,</p>
            <p>Lapu-Lapu City, 6015, Philippines</p>
          </div>
          <div>
            <Link as={Link} to="/about-us">
              <p>About Us</p>
            </Link>

            <Link to="/contact">
              <p>Contact Us</p>
            </Link>

            <Link to="/catalog">
              <p>Rooms</p>
            </Link>
          </div>
          <div>
            {" "}
            <p>Reservations</p>
            <p>T. +6332 402 1435</p>
            <p>M. +6332 413 7876</p>
            <p>F. +6332 441 5421</p>
          </div>
        </div>
        <div className="credits">
          <small>Copyright 2020 All rights reserved | Adrian Valdepenas</small>
          <small>www.avaldepenas.com</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
