import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section className="hero bg-pine">
      <div className="container">
        <div className="hero-content">
          <div className="floating-text">
            <h2 className="heading">Find</h2>
            <h2 className="heading">Yourself</h2>
            <h2 className="heading">Here</h2>
            <Link to="/booking">
              <button className="primary-button">BOOK NOW</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
