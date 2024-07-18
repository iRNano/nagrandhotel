import React from "react";
import { Link } from "react-router-dom";
import palmTree from "../../images/palmtree.png";

const AboutUs = ({ rooms, displayedRoom, setDisplayedRoom }) => {
  return (
    <section className="about-us bg-crean">
      <div className="container">
        {/* <Content> */}
        {/* <S.AboutUsContent> */}
        <div className="about-us-details">
          <img src={palmTree} style={{ margin: "0 auto" }} />
          <p>
            The Nagrand Resort & Spa is an ode to discovery, a love letter to
            life in the heart of Cebu.
          </p>
          <Link to="/about-us">
            <button className="secondary-button">READ MORE</button>
          </Link>
        </div>

        <div className="about-us-rooms">
          <div>
            <img src={displayedRoom} alt="room" />
          </div>
          <div className="about-us-rooms-list">
            <h1>Rooms</h1>
            <h1>Stay with Us</h1>
            <h5>A sanctuary set against Mactan's historic downtown</h5>

            <ul>
              {rooms.map((room) => (
                <li
                  key={room._id}
                  id={room._id}
                  onClick={() => setDisplayedRoom(`${room.images[0]}`)}
                >
                  {room.name}
                </li>
              ))}
            </ul>
            <Link to="/catalog">
              <button className="secondary-button">VIEW ALL SUITES</button>
            </Link>
          </div>
        </div>
        {/* </S.AboutUsContent> */}
        {/* </Content> */}
      </div>
    </section>
  );
};

export default AboutUs;
