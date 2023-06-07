import React, { useEffect, useState } from "react";
import RoomList from "../RoomList";
import { URL } from "../../config";
import Button from "../shared/Button";
const Accommodation = ({ dates, capacity }) => {
  const [rooms, setRooms] = useState([]);
  //   const [capacity, setCapacity] = useState("3");
  //   const [dates, setDates] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({});
  //filter rooms by capacity & dates
  useEffect(() => {
    //get rooms

    console.log("dates", dates);
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
                  !dates.dates.some((date) => unavailableDates.includes(date))
                )
                  room.availableRooms.push(number);

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
  console.log(selectedRoom);
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
            booking={true}
            rooms={rooms}
          />
        ) : null}
      </div>
      <div className="details" style={{ flexGrow: 2 }}>
        {selectedRoom?.name ? (
          <div className="room-details">
            <h1>{selectedRoom.name}</h1>
            <h1>Capacity: {selectedRoom.maxNumber}</h1>
            <h1>Price: {selectedRoom.price}</h1>
            <h1>Available Rooms: {selectedRoom.availableRooms.length}</h1>

            <Button>Book</Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Accommodation;
