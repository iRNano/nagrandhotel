import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import Heading from "../components/shared/Heading";
import Button from "../components/shared/Button";
import { Link } from "react-router-dom";
import EditRoom from "../components/forms/EditRoom";
import Swal from "sweetalert2";
import { URL } from "../config";
import * as S from './style'
import * as T from '../config/theme'

const Room = ({ user, token }) => {
  let { _id } = useParams();
  const [editing, setEditing] = useState(false);
  const [room, setRoom] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`${URL}/rooms/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setRoom(data);
        setLoaded(true);
      });
  }, []);

  const deleteHandler = (roomId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        fetch(`${URL}/rooms/${roomId}`, {
          method: "DELETE",
          headers: {
            "x-auth-token": token,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === 200) {
              Swal.fire("Deleted!", `${data.message}`, "success");
              window.location.href = "/catalog";
            }
          });
      }
    });
  };
  return (
    <S.Wrapper bgColor={T.cream}>
      {loaded ? (
        <S.Content fontFamily={T.montserratLight} fontSize={"2rem"} color={T.pine}>
          {editing ? (
            <EditRoom room={room} setEditing={setEditing} />
          ) : (
            <Fragment>
              <Link to="/catalog">
                <Button size="large" location="admin" className="mb-5">
                  {" "}
                  ALL ROOMS
                </Button>
              </Link>
              <div className="row" style={{ margin: "auto" }}>
                <div className="col-lg-6 col-12">
                  {room.images.length > 0 ? (
                    <img
                      className="img-fluid"
                      src={`${URL}${room.images[0].path}`}
                    />
                  ) : null}
                </div>
                <div className="col-lg-6 col-12 p-5">
                  <div className="pb-3">
                    <Heading.H1 className="pb-5" location="rooms">
                      {room.name}
                    </Heading.H1>
                    <Heading.H4 location="rooms" className="pb-5">
                      {room.description}
                    </Heading.H4>
                    {user && !user.isAdmin ? (
                      <Link to="/booking">
                        <Button location="admin" size="large">
                          BOOK NOW
                        </Button>
                      </Link>
                    ) : null}
                  </div>
                  {user && user.isAdmin ? (
                    <div>
                      <Button
                        onClick={() => setEditing(true)}
                        type="edit"
                        className="mr-2"
                        location="admin"
                        size="large"
                      >
                        EDIT ROOM
                      </Button>
                      <Link to="/delete">
                        <Button
                          type="delete"
                          location="admin"
                          size="large"
                          onClick={() => deleteHandler(room._id)}
                        >
                          DELETE ROOM
                        </Button>
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>
            </Fragment>
          )}
        </S.Content>
      ) : null}
    </S.Wrapper>
  );
};

export default Room;
