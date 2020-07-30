import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Heading from "./shared/Heading";

const AuthWrapper = styled.div`
  display: block;
  // padding: 8em;
  flex-flow: row nowrap;
  min-height: 60vh;
  background-color: ${(props) => props.theme.cream};
`;

const AuthContent = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 70%;
  margin: 0 auto;
  max-width: 1920px;
  height: auto;
  display: block;
  justify-content: center;
  font-family: ${(props) => props.theme.montserratLight};
  font-size: 2rem;
  color: ${(props) => props.theme.pine};
`;
const Confirmation = ({ transaction, roomDetails }) => {
  let user = JSON.parse(localStorage.getItem("user"));

  console.log(transaction);

  return (
    <AuthWrapper>
      <AuthContent>
        {JSON.stringify(transaction) !== "{}" ? (
          <Fragment>
            <Heading.H1 location="admin" className="text-center p-5">
              Reservation Confirmation
            </Heading.H1>

            <Heading.H1 location="admin"> Dear {user.fullname}</Heading.H1>

            <p>
              Thank you for choosing The Nagrand Hotel & Spa as your home away
              from home. It is our pleasure to confirm your reservation. Please
              don't hesitate to contact us with any changes on your reservation
            </p>

            <table className="table table-hover">
              <thead>
                <tr>
                  <th colspan="2">Reservation Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {
                    <Fragment>
                      <td>Confirmation Number</td>
                      <td>NGRND{transaction._id}</td>
                    </Fragment>
                  }
                </tr>
                {transaction.rooms.map((room) => {
                  return (
                    <Fragment>
                      <tr>
                        <td>Room</td>
                        <td>
                          {roomDetails.length
                            ? roomDetails.map((rm) =>
                                room._id === rm._id ? rm.name : null
                              )
                            : null}
                        </td>
                      </tr>
                      <tr>
                        <td>Check-in</td>
                        <td>{new Date(room.checkin).toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td>Check-out</td>
                        <td>{new Date(room.checkout).toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td>Nightly Rate</td>
                        <td>{room.price}</td>
                      </tr>
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </Fragment>
        ) : (
          <Heading.H1>Processing Payment</Heading.H1>
        )}
      </AuthContent>
    </AuthWrapper>
  );
};

export default Confirmation;
