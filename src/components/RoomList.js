import React from 'react'
import RoomItem from "./RoomItem";

const RoomList = (props) => {
  return (
    
      <div className="row px-0 w-100 py-5 m-0">
        {props.rooms.map((room) => (
          <RoomItem roominfo={room} />
        ))}
      </div>
    
  );
};

export default RoomList;
