import React from "react";
import { Link } from "react-router-dom";
import Heading from "./shared/Heading";
import { URL } from "../config";

const RoomItem = ({ setSelectedRoom, booking, roominfo }) => {
  const clickHandler = (e) => {
    console.log("clickItem");
    setSelectedRoom(roominfo);
  };
  return (
    <div
      className="col-lg-6 col-12 py-5"
      onClick={booking ? clickHandler : null}
      // onBlur={
      //   booking ? (e) => (e.target.style.backgroundColor = "unset") : null
      // }
    >
      <div className="card w-100">
        <img
          className="img-fluid card-img-top"
          src={`${roominfo.images[0]}`}
          alt="test"
        ></img>
      </div>
      <div className="text-center p-2">
        <Heading.H1 location="rooms">{roominfo.name}</Heading.H1>
        <p>{roominfo.description}</p>
        <Link to={`/rooms/${roominfo._id}`}>
          {booking ? null : <Heading.H4 location="rooms">VIEW ROOM</Heading.H4>}
        </Link>
      </div>
    </div>
  );
};

export default RoomItem;
