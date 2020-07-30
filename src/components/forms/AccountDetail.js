import React from "react";
import styled from "styled-components";
import Heading from "../shared/Heading";

const ProfileContent = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: ${(props) => props.theme.cream};
  width: 60%;
  margin: 0 auto;
  max-width: 1920px;
  height: auto;
  display: block;
  justify-content: center;
  color: ${(props) => props.theme.pine};
  //xs
  @media all and (max-width: 767px) {
    margin-top: 114px;
    width: 100%;
    padding: 2em;
  }
`;

const onSubmitHandler = () => {
  //do something
};
const AccountDetail = ({ user }) => {
  console.log(user);
  return (
    <ProfileContent>
      <Heading.H1 className="text-center" location="profile">
        Account Details
      </Heading.H1>
      <form
        className="mx-auto col-12 py-5"
        onSubmit={onSubmitHandler}
        encType="multipart/form-data"
      >
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={user.fullname}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={user.email}
            className="form-control"
          />
        </div>
      </form>
    </ProfileContent>
  );
};

export default AccountDetail;
