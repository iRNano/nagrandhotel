import React, { Fragment, useEffect, useState } from "react";
import Heading from "../shared/Heading";
import Button from "../shared/Button";
import Stripe from "./Stripe";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Confirmation from "../Confirmation";

//styles
const BookingWrapper = styled.div`
  display: block;
  padding: 8em;
  flex-flow: row nowrap;
  min-height: 100vh;
  background-color: ${(props) => props.theme.pine};
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
  width: 60%;
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
const Checkout = ({ setCheckout }) => {
  const [transaction, setTransaction] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [paid, setPaid] = useState(false);
  let total;
  useEffect(() => {
    console.log("useeffect");
    setCartItems(JSON.parse(localStorage.getItem("cartItems")));
  }, [paid, transaction]);

  if (cartItems.length > 0) {
    let subTotals = cartItems.map(
      (item) => parseInt(item.price) * parseInt(item.quantity)
    );

    total = subTotals.reduce((accumulator, subPerItem) => {
      return accumulator + subPerItem;
    });
  }

  const emptyCart = () => {
    let cartItems = [];
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    window.location.href = "/cart";
  };
  console.log(paid);
  console.log(transaction);
  return (
    <BookingWrapper>
      <BookingContent>
        <Fragment>
          {!paid ? (
            <Fragment>
              <div className="row text-center pt-3 " style={{ margin: "auto" }}>
                <div className="col-12">
                  <Heading.H1 location="checkout">Reservations</Heading.H1>
                  <hr />
                </div>
              </div>
              <div className="row p-5" style={{ margin: "auto" }}>
                {cartItems.length ? (
                  <Fragment>
                    <div className="col-12 col-lg-6">
                      <Heading.H1 location="checkout" className="py-2">
                        Your Accommodation/s
                      </Heading.H1>

                      <div className="row " style={{ margin: "auto" }}>
                        {cartItems.map((item) => {
                          return (
                            <Fragment key={item._id}>
                              <div className="col-7">
                                <Heading.H4 location="checkout">
                                  {item.name} - {item.quantity} room(s)
                                </Heading.H4>
                                <small>{item.nights} night(s)</small>
                              </div>
                              <div className="col-5">
                                <p>
                                  {item.price * item.quantity * item.nights}
                                </p>
                              </div>
                            </Fragment>
                          );
                        })}
                        <div className="col-7">
                          <Heading.H4 location="checkout">Total</Heading.H4>
                        </div>
                        <div className="col-5">{total}</div>
                      </div>
                      <Link to="/booking">
                        <Button location="booking">Add more room(s)</Button>
                      </Link>
                    </div>
                    <div className="col-12 col-lg-6">
                      <Heading.H1 location="checkout" className="py-2">
                        Payment Method
                      </Heading.H1>
                      <Stripe
                        total={total * 100}
                        cartItems={cartItems}
                        setCartItems={setCartItems}
                        setCheckout={setCheckout}
                        setPaid={setPaid}
                        setTransaction={setTransaction}
                      />
                    </div>
                  </Fragment>
                ) : (
                  <Heading.H1>No reservations</Heading.H1>
                )}
              </div>
            </Fragment>
          ) : (
            <Confirmation transaction={transaction} />
          )}
        </Fragment>
      </BookingContent>
    </BookingWrapper>
  );
};

export default Checkout;
