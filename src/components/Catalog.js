import React, { useState, useEffect, Fragment } from "react";
import { Container } from "reactstrap";
import styled from "styled-components";
import Heading from "../components/shared/Heading";
import { Link } from "react-router-dom";
import Button from "../components/shared/Button";
import { URL } from "../config";

const RoomWrapper = styled.div`
  background-color: ${(props) => props.theme.cream};
  padding: 8em;
  min-height: 100vh;
  font-family: ${(props) => props.theme.zcoolXiaoWei};

  //xs
  @media all and (max-width: 767px) {
    padding: 0em;
  }
`;

const RoomContent = styled.div`
    width: 70%;
    margin: 0 auto;
    padding-top: 5%:

`;

const Catalog = ({ user, token }) => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    fetch(`${URL}/rooms`)
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, []);

  const showRooms = rooms.map((room) => (
    <Fragment key={room._id}>
      <div className="col-lg-6 col-12 py-5">
        <div className="card w-100">
          {room.images.length > 0 ? (
            <img
              src={`${URL}${room.images[0].path}`}
              className="img-fluid card-img-top"
            ></img>
          ) : null}
        </div>
        <div className="text-center p-2">
          <Heading.H1 location="rooms">{room.name}</Heading.H1>
          <p>{room.description}</p>
          <Link to={`/rooms/${room._id}`}>
            <Heading.H4 location="rooms">VIEW ROOM</Heading.H4>
          </Link>
        </div>
      </div>
    </Fragment>
  ));

  return (
    <RoomWrapper>
      <RoomContent>
        <div className="row px-0 w-100 m-0">
          <div className="col-12 px-0">
            <div className="px-5">
              <Heading.H1 location="rooms">Rooms</Heading.H1>
              <Heading.H1 location="rooms">Stay with us</Heading.H1>
              <Heading.H4 location="rooms">
                A sanctuary set against Mactan's historic downtown
              </Heading.H4>
            </div>
          </div>
        </div>
        {user && user.isAdmin ? (
          <div className="text-right pr-3">
            <Link to="/add-room">
              <Button size="large" location="admin">
                Add a room
              </Button>
            </Link>
          </div>
        ) : null}

        <div className="row px-0 w-100 py-5 m-0">{showRooms}</div>
      </RoomContent>
    </RoomWrapper>
  );
};

export default Catalog;
