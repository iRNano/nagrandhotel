import React from "react";
import beach from "../../images/beach1919.png";

const SpecialOffers = () => {
  return (
    <section className="special">
      <div>
        <div>
          <img src={beach} className="img-fluid"></img>
        </div>
        <div className="special-ad bg-blush">
          <button className="transparent-button">
            Sign up for Special offers and promotions
          </button>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
