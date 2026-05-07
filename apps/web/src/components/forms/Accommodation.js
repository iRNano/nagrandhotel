import React, { useEffect, useState } from "react";
import RoomList from "../RoomList";
import { URL } from "../../config";
import Button from "../shared/Button";
const Accommodation = ({ dates, capacity, cartItems, setCartItems }) => {
  const [rooms, setRooms] = useState([]);
  //   const [capacity, setCapacity] = useState("3");
  //   const [dates, setDates] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({});
  //filter rooms by capacity & dates
  useEffect(() => {
    //get rooms

    console.log(
      "dates",
      dates.dates.forEach((date) => {
        console.log(new Date(date).toUTCString());
      })
    );
    console.log("capacity", capacity);
    fetch(`${URL}/rooms`)
      .then((res) => res.json())
      .then((data) => {
        setRooms(
          data
            .filter(({ maxNumber }) => maxNumber >= parseInt(capacity.adult)) //capacity
            .filter((room) => {
              //room available dates
              const { name, roomNumbers } = room;
              room.availableRooms = [];
              console.log(name);

              roomNumbers.forEach(({ unavailableDates, number }) => {
                if (
                  //   !dates.dates.some((date) =>
                  //     unavailableDates.includes()
                  //   )
                  !unavailableDates.some((date) =>
                    dates.dates.includes(new Date(date).getTime())
                  )
                )
                  room.availableRooms.push(number);

                console.log(
                  unavailableDates.some((date) => {
                    console.log(new Date(date).getTime());
                    dates.dates.includes(new Date(date).getTime());
                  })
                );
                //iterate through dates

                //if any date in unavailableDates array set to false
                // else set to true
              });

              if (room.availableRooms?.length) return true;
              else return false;
            })
        );
      });
  }, []);

  useEffect(() => {
    if (rooms.length) setSelectedRoom(rooms[0]);
  }, [rooms]);

  //   const bookingHandler
  //   console.log(selectedRoom);
  return (
    <div style={{ display: "flex" }}>
      <div
        className="list"
        style={{ maxWidth: "300px", maxHeight: "500px", overflowY: "scroll" }}
      >
        {rooms.length ? null : rooms.length}
        {rooms.length ? (
          <RoomList
            setSelectedRoom={setSelectedRoom}
            setCartItems={setCartItems}
            cartItems={cartItems}
            booking={true}
            rooms={rooms}
          />
        ) : null}
      </div>
      <div className="details" style={{ flexGrow: 2 }}>
        {cartItems.length
          ? cartItems.map((item) => {
              return (
                <div key={item._id}>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Accommodation;
