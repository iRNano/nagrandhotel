import React from "react";
import { Link } from "react-router-dom";
import { StyledButton, StyledHeading } from "./shared/styles";

interface RoomInfo {
  _id : string; 
  images : string[]; 
  name : string;
  description : string; 
  availableRooms : [];
  price : string;
  maxNumber : string;
}
interface RoomItem {
  setSelectedRoom: ()=>void;
  setCartItems: (cartItems: RoomInfo[])=>void;
  cartItems : RoomInfo[];
  booking?: boolean;
  roomInfo : RoomInfo
  
}
const RoomItem = ({
  setSelectedRoom,
  booking,
  roomInfo,
  cartItems,
  setCartItems,
}: RoomItem) => {
  console.log('roomInfo',roomInfo)
  const { _id , images, name, description, availableRooms, price, maxNumber } = roomInfo;
  // const clickHandler = () => {
  //   console.log("clickItem");
  //   setSelectedRoom(roomInfo);
  // };
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
          src={`${images[0]}`} //TODO add default image
          alt="test"
        ></img>
      </div>
      <div className="text-center p-2">
        <StyledHeading.H1 location="rooms">{name}</StyledHeading.H1>
        <p>{description}</p>
        {booking ? (
          <div>
            <h1>Capacity: {maxNumber}</h1>
            <h1>Price: {price}</h1>
            <h1>Available Rooms: {availableRooms?.length}</h1>
            <StyledButton onClick={()=>setCartItems([...cartItems, roomInfo])}>Book</StyledButton>
          </div>
        ) : (
          <Link to={`/rooms/${_id}`}>
            {booking ? null : (
              <StyledHeading.H4 location="rooms">VIEW ROOM</StyledHeading.H4>
            )}
          </Link>
        )}
      </div>
    </div>
  );
};

export default RoomItem;
