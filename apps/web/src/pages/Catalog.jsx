import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
// import StyledHeading from "../components/shared/StyledHeading";
import { Link } from "react-router-dom";
// import StyledButton from "../components/shared/StyledButton";
import { URL } from "../config";
import axios from "axios";
import RoomList from "../components/RoomList";
import { AuthContext } from "../context/AuthContext";
import { StyledButton, StyledHeading } from "../components/shared/styles";

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
  padding-top: 5%;
  @media all and (max-width: 767px) {
    padding-top: 114px;
    width: 100%;
  }
`;

const Catalog = () => {
  const [rooms, setRooms] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const rooms = async () => {
      const { data } = await axios.get(`${URL}/rooms`);
      setRooms(data);
    };

    rooms();
  }, []);

  return (
    <div className="container">
      {/* <RoomContent> */}
      <div className="row px-0 w-100 m-0">
        <div className="col-12 px-0">
          <div className="px-5">
            <StyledHeading.H1 location="rooms">Rooms</StyledHeading.H1>
            <StyledHeading.H1 location="rooms">Stay with us</StyledHeading.H1>
            <StyledHeading.H4 location="rooms">
              A sanctuary set against Mactan's historic downtown
            </StyledHeading.H4>
          </div>
        </div>
      </div>
      {user && user.isAdmin ? (
        <div className="text-right pr-3">
          <Link to="/add-room">
            <StyledButton size="large" location="admin">
              Add a room
            </StyledButton>
          </Link>
        </div>
      ) : null}
      <RoomList rooms={rooms} />
      {/* <div className="row px-0 w-100 py-5 m-0">{showRooms}</div> */}
      {/* </RoomContent> */}
    </div>
  );
};

export default Catalog;
