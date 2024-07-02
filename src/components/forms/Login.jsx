import React, { useState, useContext } from "react"
import Swal from 'sweetalert2'
import {URL} from '../../config'
import { AuthContext } from "../../context/AuthContext"
import { StyledButton, StyledHeading } from "../shared/styles"

const Login = () => {
    const [formData,setFormData] = useState({
        email:"",
        password:"",
    })

    const {dispatch} = useContext(AuthContext)
    
    const onSubmitHandler = (e) => {
        e.preventDefault()
        let reqOptions = {
            method: "POST",
            body: JSON.stringify(formData),
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            
        }
        fetch(`${URL}/auth/login`, reqOptions)
        .then(res =>  res.json())
        .then(data => {
            console.log('login', data)
            console.log(document.cookie)
            if(data.details){
                Swal.fire({
                    icon: 'success',
                    text: data.message,
                    timer: 1500,
                    showConfirmButton: false
                }) // useContext
                console.log(data)

                dispatch({type: 'LOGIN_SUCCESS', payload: data})
                // localStorage.setItem('user', JSON.stringify(data.details.user))
                // localStorage.setItem('token', data.details.token)
                // let cartItems = []
                // localStorage.setItem('cartItems', JSON.stringify(cartItems))
                window.location.href = "/"
            }else{
                Swal.fire({
                    icon: 'error',
                    text: data.message,
                    timer: 1500,
                    showConfirmButton: false
                })
            }
        })
    }

    const onChangeHandler = (e) => {
        setFormData({
            ...formData, 
            [e.target.name] : e.target.value
        })
    }
    
    return(
        <form className="mx-auto col-sm-12 p-3" onSubmit={onSubmitHandler}>
            <StyledHeading.H1 location="profile" className="text-center">Login</StyledHeading.H1>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" name="email" onChange={onChangeHandler}/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" name="password" onChange={onChangeHandler}/>
            </div>
            <StyledButton className="w-100" location="profile">Login</StyledButton>
        </form>
    )
}

export default Login