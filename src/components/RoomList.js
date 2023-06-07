import React from "react";
import RoomItem from "./RoomItem";

const RoomList = ({ booking, rooms, setSelectedRoom }) => {
  return (
    <div className="row px-0 w-100 py-5 m-0">
      {rooms.map((room, index) => (
        <RoomItem
          booking={booking}
          roominfo={room}
          key={index}
          setSelectedRoom={setSelectedRoom}
        />
      ))}
    </div>
  );
};

export default RoomList;
