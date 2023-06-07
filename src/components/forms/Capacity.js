import React, { Fragment, useEffect, useState } from "react";
import Heading from "../shared/Heading";
import Button from "../shared/Button";

const Capacity = ({ capacity, setCapacity }) => {
  // const [capacity, setCapacity] = useState({ adult: "", child: "" });

  useEffect(() => {
    console.log(capacity);
  }, []);
  const capacityHandler = (e) => {
    setCapacity({ ...capacity, [e.target.name]: e.target.value });
  };
  return (
    <Fragment>
      <div className="row">
        <div className="col-12">
          <Heading.H1>Guest & Rooms</Heading.H1>
        </div>
        <div className="col-6">
          <select
            name="adult"
            className="w-100"
            onChange={capacityHandler}
            value={capacity.adult}
          >
            <option type="number" value="0">
              Select
            </option>
            <option type="number" value="1">
              1 Adult
            </option>
            <option type="number" value="2">
              2 Adults
            </option>
            <option type="number" value="3">
              3 Adults
            </option>
            <option type="number" value="4">
              4 Adults
            </option>
          </select>
        </div>
        <div className="col-6">
          <select
            name="child"
            className="w-100"
            onChange={capacityHandler}
            value={capacity.child}
          >
            <option type="number" value="0">
              Select
            </option>
            <option type="number" value="1">
              1 Child
            </option>
            <option type="number" value="2">
              2 Children
            </option>
            <option type="number" value="3">
              3 Children
            </option>
            <option type="number" value="4">
              4 Children
            </option>
          </select>
        </div>
      </div>
      <Button onClick={() => console.log(capacity)}>UPDATE</Button>
    </Fragment>
  );
};

export default Capacity;
