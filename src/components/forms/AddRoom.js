import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Heading from "../shared/Heading";
import Button from "../shared/Button";
import { URL as url } from "../../config";
import Swal from "sweetalert2";

const AddRoomWrapper = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.pine};
  padding: 8em;
  @media all and (max-width: 767px) {
    min-height: 100%;
    padding: 0;
  }
`;

const RoomWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  min-height: 100vh;
  padding: 8em;
  background-color: ${(props) => props.theme.pine};
  font-family: ${(props) => props.theme.zcoolXiaoWei};
  @media all and (max-width: 767px) {
    min-height: 100%;
    padding: 0;
  }
`;

const RoomContent = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: ${(props) => props.theme.cream};
  width: 50%;
  margin: 0 auto;
  max-width: 1920px;
  height: auto;
  display: block;
  justify-content: center;
  color: ${(props) => props.theme.pine};
  @media all and (max-width: 767px) {
    margin-top: 114px;
    width: 100%;
    padding: 2em;
  }
`;

const AddRoom = () => {
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState([]);
  const [categories, setCategories] = useState([]);
  const [roomNumbers, setRoomNumbers] = useState([]);

  useEffect(() => {
    fetch(`${url}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  //formData handler
  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
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

  //quantity handler
  // const quantityHandler = (quantity, productId) => {
  //     // // alert("Quantity: "+ quantity +" - "+ productId)
  //     // let itemToUpdate = cartItems.find(item => item._id === productId)
  //     // itemToUpdate.quantity = parseInt(quantity)
  //     // console.log(itemToUpdate.quantity)
  //     // let updatedCart = cartItems.map(item=>{
  //     //     return item._id === productId ? {...itemToUpdate} : item
  //     // })
  //     // localStorage.setItem('cartItems', JSON.stringify(updatedCart))
  //     // setCartItems(JSON.parse(localStorage.getItem('cartItems')))

  // }

  // //quantity handler
  // const roomHandler = (quantity) => {
  //     let arrayOfinputs = []
  //     for(let i = 0; i<quantity;i++){
  //         arrayOfinputs.push(<input type="text" name={`room${i}`} onChange={(e)=>roomNumbersHandler(i, e)}/>)
  //     }
  //     return (
  //         arrayOfinputs.map(input => input)
  //     )
  // }
  //onSubmitHandler
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const product = new FormData();
    product.append("name", formData.name);
    product.append("description", formData.description);
    product.append("categoryId", formData.categoryId);
    product.append("price", formData.price);
    product.append("quantity", formData.quantity);
    roomNumbers.map((room) => product.append("rooms", room));
    for (let i = 0; i < formData.images.length; i++) {
      product.append("images", formData.images[i]);
    }
    fetch(`${url}/rooms`, {
      method: "POST",
      body: product,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          Swal.fire({
            icon: "success",
            text: data.message,
            timer: 1500,
            showConfirmButton: false,
          });
          window.location.href = `/catalog`;
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

  return (
    <RoomWrapper>
      <RoomContent>
        <form
          className="mx-auto col-12 py-5"
          onSubmit={onSubmitHandler}
          encType="multipart/form-data"
        >
          <Heading.H1 location="admin" className="text-center">
            Add a room
          </Heading.H1>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              onChange={onChangeHandler}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              name="description"
              className="form-control"
              onChange={onChangeHandler}
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              className="form-control"
              onChange={onChangeHandler}
            />
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              className="form-control"
              onChange={onChangeHandler}
            />
          </div>
          <div className="form-group">
            <label>Image</label>
            <input
              type="file"
              name="images"
              accept="image/*"
              className="form-control"
              onChange={handleFile}
              multiple
            />
            {imagePreview.map((img) => {
              return (
                <img className="img-fluid" src={URL.createObjectURL(img)} />
              );
            })}
          </div>
          <div className="form-group">
            <label>Category</label>
            <select
              className="form-control mb-3"
              name="categoryId"
              onChange={onChangeHandler}
            >
              <option disabled selected>
                Select Category
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <Button
            size="large"
            className="w-100"
            location="admin"
            style={{ display: "block" }}
          >
            Add
          </Button>
        </form>
      </RoomContent>
    </RoomWrapper>
  );
};

export default AddRoom;
