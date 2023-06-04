import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Heading from "../shared/Heading";
import Button from "../shared/Button";
import Swal from "sweetalert2";
import { URL as url } from "../../config";

const AddRoomWrapper = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.pine};
  padding: 8em;
`;

const RoomWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  min-height: 100vh;
  padding: 2em;
  background-color: ${(props) => props.theme.pine};
  font-family: ${(props) => props.theme.zcoolXiaoWei};
`;

const RoomContent = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: ${(props) => props.theme.cream};
  width: 100%;
  margin: 0 auto;
  max-width: 1920px;
  height: auto;
  display: block;
  justify-content: center;
  color: ${(props) => props.theme.pine};
`;

const EditRoom = ({ room, setEditing }) => {
  const [formData, setFormData] = useState(room);
  const [imagePreview, setImagePreview] = useState([]);
  const [categories, setCategories] = useState([]);
  const [roomNumbers, setRoomNumbers] = useState();

  useEffect(() => {
    fetch(`${url}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data));

    if (room.roomNumbers.length) {
      setRoomNumbers(
        room.roomNumbers.map((roomNo) => roomNo.number).toString()
      );
    }
  }, []);

  //formData handler
  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  console.log(formData);
  //roomNumberHandler
  const roomNumbersHandler = (i, e) => {
    if (e.target) {
      if (roomNumbers[i]) {
        console.log(i);
        roomNumbers[i] = e.target.value;
      } else {
        setRoomNumbers([...roomNumbers, e.target.value]);
      }
    }
  };

  //File handler
  const handleFile = (e) => {
    setFormData({
      ...formData,
      images: e.target.files,
    });
    let imgPreview = [];
    for (let i = 0; i < e.target.files.length; i++) {
      imgPreview.push(e.target.files[i]);
    }
    setImagePreview(imgPreview);
  };

  //onSubmitHandler
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const updatedProduct = new FormData();
    updatedProduct.append("name", formData.name);
    updatedProduct.append("description", formData.description);
    updatedProduct.append("categoryId", formData.categoryId);
    updatedProduct.append("price", formData.price);
    updatedProduct.append("quantity", formData.quantity);

    for (let i = 0; i < formData.images.length; i++) {
      updatedProduct.append("images", formData.images[i]);
    }

    for (var pair of updatedProduct.entries()) {
      console.log(pair[0] + "," + pair[1]);
    }

    fetch(`${url}/rooms/${formData._id}`, {
      method: "PUT",
      body: updatedProduct,
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          Swal.fire({
            icon: "success",
            text: data.message,
            timer: 1500,
            showConfirmButton: false,
          });
          window.location.href = `/rooms/${formData._id}`;
        } else {
          Swal.fire({
            icon: "error",
            text: "Please check your inputs",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      });
  };
  console.log(room);
  return (
    <RoomWrapper>
      <RoomContent>
        <form
          className="mx-auto col-sm-12 py-5"
          onSubmit={onSubmitHandler}
          encType="multipart/form-data"
        >
          <Heading.H1 location="admin" className="text-center">
            Edit {room.name}
          </Heading.H1>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              onChange={onChangeHandler}
              value={formData.name}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              name="description"
              className="form-control"
              onChange={onChangeHandler}
              value={formData.description}
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              className="form-control"
              onChange={onChangeHandler}
              value={formData.price}
            />
          </div>

          <div className="form-group">
            <label>Image</label>
            <input
              type="file"
              name="images"
              accept="image"
              className="form-control"
              onChange={handleFile}
              multiple
            />
            {imagePreview.length
              ? imagePreview.map((img) => {
                  return (
                    <img
                      style={{ "max-width": "200px" }}
                      src={URL.createObjectURL(img)}
                    />
                  );
                })
              : formData.images.map((img) => {
                  return <img style={{ "max-width": "200px" }} src={img} />;
                })}
          </div>
          <div className="form-group">
            <label>Max number</label>
            <input
              type="number"
              name="maxNumber"
              className="form-control"
              onChange={onChangeHandler}
              value={formData.maxNumber}
            ></input>
          </div>

          <div className="form-group">
            <label>Room Numbers</label>
            <textarea
              onChange={(e) => setRoomNumbers(e.target.value)}
              placeholder="give comma between room numbers."
              name="roomNumbers"
              value={roomNumbers}
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <Button
              size="large"
              className="w-100"
              location="admin"
              style={{ display: "block" }}
            >
              Update
            </Button>
            <Button
              type="button"
              location="admin"
              size="large"
              className="w-100"
              onClick={() => setEditing(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </RoomContent>
    </RoomWrapper>
  );
};

export default EditRoom;
