import React, { useState, Fragment, useEffect } from "react";
import "react-dates/initialize";
import Button from "../shared/Button";
import styled from "styled-components";
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController,
} from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import Heading from "../shared/Heading";
import BookingNavbar from "../layouts/BookingNavbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Capacity from "./Capacity";
import DatePicker from "./DatePicker";
import Accommodation from "./Accommodation";
import Checkout from "./Checkout";
import { URL } from "../../config";

const BookingWrapper = styled.div`
  display: block;
  padding: 8em;
  flex-flow: row nowrap;
  min-height: 100vh;
  background-color: ${(props) => props.theme.pine};
  idth: 250pxpx;
  //xs
  @media all and (max-width: 767px) {
    padding: 0em;
    min-height: 100%;
  }
`;

const BookingContent = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: ${(props) => props.theme.cream};
  width: 70%;
  margin: 0 auto;
  max-width: 1920px;
  height: auto;
  display: block;
  justify-content: center;
  font-family: ${(props) => props.theme.montserratLight};
  font-size: 2rem;
  color: ${(props) => props.theme.pine};
  @media all and (max-width: 767px) {
    margin-top: 114px;
    width: 100%;
  }
`;

const CatalogContainer = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const InteractionDiv = styled.div`
  display: flex;
  font-size: 1.3rem;
`;
const Booking = ({ user, token }) => {
  const [availableRooms, setAvailableRooms] = useState([]);
  const [dates, setDates] = useState({});
  const [bookings, setBookings] = useState([]);
  const [booking, setBooking] = useState(false);
  const [nights, setNights] = useState(0);

  const [checkout, setCheckout] = useState(false);

  const dateHandler = (e) => {
    let checkin, checkout;
    if (e.target.name === "checkin") {
      console.log(e.target.value);
      checkin = new Date(e.target.value);
      console.log(checkin);
      console.log(Date.now());
      if (checkin >= Date.now()) {
        setDates({
          ...dates,
          checkin,
        });
        console.log(dates);
      } else {
        alert("Please select valid checkin");
      }
    }

    if (e.target.name === "checkout") {
      checkout = new Date(e.target.value);
      if (dates.checkin !== null && checkout > dates.checkin) {
        setDates({
          ...dates,
          checkout,
        });
      } else {
        alert("Please select valid checkout");
      }
    }
    setBooking(false);
  };

  const onClickHandler = (dates) => {
    //initialize cartItems
    let cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    if (dates.checkin && dates.checkout) {
      let checkinDate = new Date(dates.checkin);
      let checkoutDate = new Date(dates.checkout);
      setNights(parseInt(checkoutDate - checkinDate) / 86400000);

      //fetch all transactions between the 2 dates provided
      fetch(`${URL}/book/?checkin=${dates.checkin}&checkout=${dates.checkout}`)
        .then((res) => res.json())
        .then((data) => setBookings(data));

      fetch(`${URL}/rooms/`)
        .then((res) => res.json())
        .then((data) => {
          setAvailableRooms(data);
        });
      // console.log(availableRooms.forEach(room => room.rooms.forEach(rum => console.log(rum))))
    } else {
      alert("Please select valid dates");
    }
  };
  const bookingHandler = (room, e) => {
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (cartItems === null) {
      let cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    let matched = cartItems.find((item) => {
      return item._id === room._id;
    });
    if (matched) {
      matched.nights = nights;
      matched.quantity += parseInt(e.target.previousElementSibling.value);
      alert("Updated your current reservation(s)");
    } else {
      console.log(nights);
      if (nights > 0) {
        cartItems.push({
          ...room,
          nights,
          quantity: parseInt(e.target.previousElementSibling.value),
          checkin: dates.checkin,
          checkout: dates.checkout,
        });
        alert("Added to your reservations");
      } else {
        alert("Pick a date!");
      }
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  //Show available rooms
  const showAvailableRooms = availableRooms.map((room) => {
    if (room.quantity > 0) {
      return (
        <div className="col-12 col-lg-6 pb-5" key={room._id}>
          <div className="card">
            <img
              style={{ maxWidth: "700px", width: "100%" }}
              className="card-img-top img-fluid"
              src={`${URL}${room.images[0].path}`}
            />
            <div className="card-body">
              <Heading.H3 location="booking">{room.name}</Heading.H3>
              <Heading.H4 location="booking">
                Available rooms: {room.quantity}
              </Heading.H4>
              <Heading.H4 location="booking">P {room.price}</Heading.H4>

              <InteractionDiv>
                <input
                  style={{ width: "20%", float: "left" }}
                  type="number"
                  name="quantity"
                  min="1"
                  max={room.quantity}
                />
                <Button
                  size="large"
                  style={{ width: "80%" }}
                  location="booking"
                  onClick={(e) => {
                    if (e.target.previousElementSibling.value !== "") {
                      bookingHandler(room, e);
                      e.target.previousElementSibling.value = "";
                    } else {
                      alert("Please input quantity");
                    }
                  }}
                >
                  Book
                </Button>
              </InteractionDiv>
            </div>
          </div>
        </div>
      );
    }
  });

  return (
    <BookingWrapper>
      <BookingContent className="p-5">
        <Heading.H1 location="checkout" className="text-center py-3">
          Dates of Stay
        </Heading.H1>
        <hr />
        <Fragment>
          <div style={{ display: "flex" }} className="row pb-2">
            <div className="col-lg-4 col-12">
              <input
                className="w-100"
                type="date"
                name="checkin"
                onChange={(e) => dateHandler(e)}
              />
            </div>
            <div className="col-lg-4 col-12">
              <input
                className="w-100"
                type="date"
                name="checkout"
                onChange={(e) => dateHandler(e)}
              />
            </div>
            <div className="col-lg-4 col-12">
              <Button
                location="booking"
                size="large"
                onClick={() => {
                  onClickHandler(dates);
                  setBooking(true);
                }}
              >
                Check Available Rooms
              </Button>
            </div>
          </div>

          {booking && availableRooms.length > 0 ? (
            <CatalogContainer>
              <Heading.H1 location="checkout" className="text-center">
                Accommodations
              </Heading.H1>
              <hr />
              <div className="row">{showAvailableRooms}</div>
              <div className="text-right " style={{ size: "5rem" }}>
                <Link to="/checkout">
                  <Button location="booking" size="large">
                    Checkout
                  </Button>
                </Link>
              </div>
            </CatalogContainer>
          ) : null}
        </Fragment>
        {/* {
                    checkout? <Checkout availableRooms={availableRooms} setAvailableRooms={setAvailableRooms}/> : null
                } */}
      </BookingContent>
    </BookingWrapper>
  );
};
export default Booking;
