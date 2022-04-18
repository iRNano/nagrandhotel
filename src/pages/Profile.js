import React, { Fragment, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import styled from "styled-components";
import Login from "../components/forms/Login";
import Register from "../components/forms/Register";
import AccountDetail from "../components/forms/AccountDetail";

const ProfileWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  min-height: 60vh;
  padding: 8em;
  background-color: ${(props) => props.theme.pine};
  font-family: ${(props) => props.theme.zcoolXiaoWei};
  //xs
  @media all and (max-width: 767px) {
    padding: 0em;
  }
`;

const ProfileContent = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: ${(props) => props.theme.cream};
  width: 30%;
  margin: 0 auto;
  max-width: 1920px;
  height: auto;
  display: block;
  justify-content: center;
  color: ${(props) => props.theme.pine};
  //xs
  @media all and (max-width: 767px) {
    padding-top: 114px;
    width: 100%;
  }
`;

const Profile = ({ user, token }) => {
  return (
    <ProfileWrapper>
      {user ? (
        <AccountDetail user={user} />
      ) : (
        <ProfileContent>
          <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
            <Tab eventKey="login" title="Login" style={{ width: "100%" }}>
              <Login />
            </Tab>
            <Tab eventKey="register" title="Register" style={{ width: "100%" }}>
              <Register />
            </Tab>
          </Tabs>
        </ProfileContent>
      )}
    </ProfileWrapper>
  );
};

export default Profile;
