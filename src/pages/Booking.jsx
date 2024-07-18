import React, { useState, Fragment, useEffect } from "react";
import "react-dates/initialize";
import momentPropTypes from "react-moment-proptypes";
import moment from "moment";
import styled from "styled-components";
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController,
} from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import BookingNavbar from "../components/layouts/BookingNavbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Capacity from "../components/forms/Capacity";
import DatePicker from "../components/forms/DatePicker";
import Accommodation from "../components/forms/Accommodation";
import Checkout from "../components/forms/Checkout";
import { URL } from "../config";
import * as S from "./style";
import * as T from "../config/theme";
import BookingTabWdiget from "../components/layouts/BookingTabWidget";
import { StyledButton, StyledHeading } from "../components/shared/styles";

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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState("startDate");
  const [activeTab, setActiveTab] = useState(0);

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

  const changedDateHandler = (start, end) => {
    console.log("change", start + end);
    setStartDate(start);
    setEndDate(end);
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
              <StyledHeading.H3 location="booking">
                {room.name}
              </StyledHeading.H3>
              <StyledHeading.H4 location="booking">
                Available rooms: {room.quantity}
              </StyledHeading.H4>
              <StyledHeading.H4 location="booking">
                P {room.price}
              </StyledHeading.H4>

              <InteractionDiv>
                <input
                  style={{ width: "20%", float: "left" }}
                  type="number"
                  name="quantity"
                  min="1"
                  max={room.quantity}
                />
                <StyledButton
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
                </StyledButton>
              </InteractionDiv>
            </div>
          </div>
        </div>
      );
    }
  });

  return (
    <div className="container bg-pine">
      <S.Content
        fontFamily={T.montserratLight}
        bgColor={T.cream}
        color={T.pine}
        fontSize={"2rem"}
      >
        <StyledHeading.H1 location="checkout" className="text-center py-3">
          Booking
        </StyledHeading.H1>
        <hr />
        <Fragment>
          <BookingNavbar setActiveTab={setActiveTab} />
          <BookingTabWdiget
            activeTab={activeTab}
            drpProps={{
              startDate,
              endDate,
              focusedInput,
              setFocusedInput,
              changedDateHandler,
            }}
          />
          {/* <div style={{ display: "flex" }} className="row pb-2"> */}

          {/* <div className="col-lg-4 col-12">
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
         <StyledButton
           location="booking"
           size="large"
           onClick={() => {
             onClickHandler(dates);
             setBooking(true);
           }}
         >
           Check Available Rooms
         </StyledButton>
       </div> */}
          {/* </div> */}

          {/* {booking && availableRooms.length > 0 ? (
       <CatalogContainer>
         <StyledHeading.H1 location="checkout" className="text-center">
           Accommodations
         </StyledHeading.H1>
         <hr />
         <div className="row">{showAvailableRooms}</div>
         <div className="text-right " style={{ size: "5rem" }}>
           <Link to="/checkout">
             <StyledButton location="booking" size="large">
               Checkout
             </StyledButton>
           </Link>
         </div>
       </CatalogContainer>
     ) : null} */}
        </Fragment>
      </S.Content>
    </div>
  );
};
export default Booking;
