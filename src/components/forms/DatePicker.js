import React, { useState, Fragment } from 'react'
import Button from '../shared/Button'
import Heading from '../shared/Heading'

const DatePicker = () => {
    const [dates, setDates] = useState({})
    const [bookings,setBookings] = useState([])
    const [availableRooms, setAvailableRooms] = useState([])
    const dateHandler = (e) => {
        setDates({...dates,
            [e.target.name] : e.target.value
        })
    }

    const onClickHandler = (dates) => {
        // // fetch all transactions between the 2 dates provided
        fetch(`http://localhost:4000/book/?checkin=${dates.checkin}&checkout=${dates.checkout}`)
        .then(res=>res.json())
        .then(data=>setBookings(data))
        // //use result of the above query as parameter to find available rooms
        fetch('http://localhost:4000/rooms/')
        .then(res=>res.json())
        .then(data=>{
            setAvailableRooms(data)
        })
    }
    return(
        <Fragment>
            <div className="row">
                <div className="col-6">
                <input className="w-100"type="date" name="checkin" onChange={(e) =>dateHandler(e)}/>
                </div>
                <div className="col-6">
                <input className="w-100"type="date" name="checkout" onChange={(e) => dateHandler(e)}/>
                </div>   
            </div>
            <Button onClick={onClickHandler(dates)}>Check Room</Button>
        </Fragment>
    )
}

export default DatePicker