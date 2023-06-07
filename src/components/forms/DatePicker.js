import React, { useState, Fragment, useEffect } from "react";
import Button from "../shared/Button";
import Heading from "../shared/Heading";

const DatePicker = ({ dates, setDates }) => {
  // const [dates, setDates] = useState({});
  const [availableRooms, setAvailableRooms] = useState([]);

  useEffect(() => {
    console.log(dates);
  }, [dates]);
  const dateHandler = (e) => {
    setDates({ ...dates, [e.target.name]: e.target.value });
  };

  const getBetweenDates = ({ startDate, endDate }) => {
    const datesArray = [];
    const currentDate = new Date(startDate);
    const end = new Date(endDate);
    console.log(currentDate.getTime());
    while (currentDate <= end) {
      datesArray.push(new Date(currentDate.getTime()));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setDates({ ...dates, dates: datesArray });
  };

  const onClickHandler = () => {
    if (dates.startDate && dates.endDate) getBetweenDates(dates);
  };
  return (
    <Fragment>
      <div className="row">
        <div className="col-6">
          <input
            className="w-100"
            type="date"
            name="startDate"
            onChange={(e) => dateHandler(e)}
            value={dates.startDate}
          />
        </div>
        <div className="col-6">
          <input
            className="w-100"
            type="date"
            name="endDate"
            onChange={(e) => dateHandler(e)}
            value={dates.endDate}
          />
        </div>
      </div>
      <Button onClick={onClickHandler}>Check Room</Button>
    </Fragment>
  );
};

export default DatePicker;
