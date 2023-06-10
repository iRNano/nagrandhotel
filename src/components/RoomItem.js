import React from "react";
import { Link } from "react-router-dom";
import Heading from "./shared/Heading";
import { URL } from "../config";
import Button from "./shared/Button";

const RoomItem = ({
  setSelectedRoom,
  booking,
  roominfo,
  cartItems,
  setCartItems,
}) => {
  const { _id, images, name, description, availableRooms, price, maxNumber } =
    roominfo;
  const clickHandler = (e) => {
    console.log("clickItem");
    setSelectedRoom(roominfo);
  };

  const bookHandler = (e) => {
    setCartItems([...cartItems, roominfo]);
  };
  return (
    <div
      className="col-lg-6 col-12 py-5"
      // onClick={booking ? clickHandler : null}
      // onBlur={
      //   booking ? (e) => (e.target.style.backgroundColor = "unset") : null
      // }
    >
      <div className="card w-100">
        <img
          className="img-fluid card-img-top"
          src={`${images[0]}`}
          alt="test"
        ></img>
      </div>
      <div className="text-center p-2">
        <Heading.H1 location="rooms">{name}</Heading.H1>
        <p>{description}</p>
        {booking ? (
          <div>
            <h1>Capacity: {maxNumber}</h1>
            <h1>Price: {price}</h1>
            <h1>Available Rooms: {availableRooms.length}</h1>
            <Button onClick={bookHandler}>Book</Button>
          </div>
        ) : (
          <Link to={`/rooms/${_id}`}>
            {booking ? null : (
              <Heading.H4 location="rooms">VIEW ROOM</Heading.H4>
            )}
          </Link>
        )}
      </div>
    </div>
  );
};

export default RoomItem;
