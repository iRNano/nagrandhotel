import React, { useState } from "react";
import Swal from "sweetalert2";
import Button from "../shared/Button";
import Heading from "../shared/Heading";
import { URL } from "../../config";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
    password2: "",
  });
  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  console.log(formData);
  const onSubmitHandler = (e) => {
    console.log(formData);
    e.preventDefault();
    fetch(`${URL}/users/register`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          Swal.fire({
            icon: "success",
            text: data.message,
          });
          window.location.href = "/";
        } else {
          console.log(data.status);
          Swal.fire({
            icon: "error",
            text: data.message,
            timer: 1500,
            showConfirmButton: false,
          });
        }
      });
  };
  return (
    <form className="col-sm-12 mx-auto p-3" onSubmit={onSubmitHandler}>
      <Heading.H1 location="profile" className="text-center">
        Register
      </Heading.H1>
      <div className="form-group">
        <label htmlFor="fullname">Full name</label>
        <input
          className="form-control"
          type="text"
          id="fullname"
          name="fullname"
          onChange={onChangeHandler}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          className="form-control"
          type="email"
          id="email"
          name="email"
          onChange={onChangeHandler}
        />
      </div>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          className="form-control"
          type="text"
          id="username"
          name="username"
          onChange={onChangeHandler}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          className="form-control"
          type="password"
          id="password"
          name="password"
          onChange={onChangeHandler}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password2">Confirm Password</label>
        <input
          className="form-control"
          type="password"
          id="password2e"
          name="password2"
          onChange={onChangeHandler}
        />
      </div>
      <Button className="w-100" location="profile">
        Register
      </Button>
    </form>
  );
};

export default Register;
