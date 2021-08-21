import React from 'react';
import { Link } from "react-router-dom";
import Heading from "./shared/Heading";
import { URL } from "../config";

const RoomItem = (props) => {
    
  return (
    
    <div className="col-lg-6 col-12 py-5">
        {console.log(props)}
      <div className="card w-100">
        <img className="img-fluid card-img-top" src={`${URL}${props.roominfo.images[0].path}`} alt="test"></img>
      </div>
      <div className="text-center p-2">
        <Heading.H1 location="rooms">{props.roominfo.name}</Heading.H1>
        <p>{props.roominfo.description}</p>
        <Link to={`/rooms/${props.roominfo._id}`}>
          <Heading.H4 location="rooms">VIEW ROOM</Heading.H4>
        </Link>
      </div>
    </div>
  );
};

export default RoomItem;
