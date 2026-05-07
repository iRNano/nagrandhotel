import React from 'react'
import Capacity from '../forms/Capacity'
import {
    DateRangePicker,

  } from "react-dates";
const BookingTabWdiget = ({activeTab, drpProps}) => {
    const {startDate, endDate, focusedInput, setFocusedInput, changedDateHandler} = drpProps
    switch(activeTab){
        case 0: return <Capacity />
        case 1: return             <DateRangePicker
        startDate={startDate} // momentPropTypes.momentObj or null,
        startDateId="start1d" // PropTypes.string.isRequired,
        endDate={endDate} // momentPropTypes.momentObj or null,
        endDateId="end1d" // PropTypes.string.isRequired,
        onDatesChange={({ startDate, endDate }) => changedDateHandler(startDate, endDate)} // PropTypes.func.isRequired,
        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={focusedInput => {
          if(!focusedInput) return
          setFocusedInput(focusedInput)
        }} // PropTypes.func.isRequired,
      />

        default: return <Capacity />
    }
}

export default BookingTabWdiget