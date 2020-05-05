import React, {useEffect, useState} from "react"
import StripeCheckout from "react-stripe-checkout"
import { PUBLISHABLE_KEY} from "../../config/index"
import Confirmation from '../Confirmation'
import {URL} from '../../config'


const Stripe = ({total, cartItems, setCartItems, setCheckout, setPaid, setTransaction}) => {
    const [availableRooms, setAvailableRooms] = useState([])
    useEffect(()=>{
        fetch(`${URL}/rooms`)
        .then(res=>res.json())
        .then(data=>setAvailableRooms(data))
    },[])

    const checkout = (token) => {
        console.log('checkingout')
        let body = {
            token,
            total,
            cartItems
        }        
        // deduct quantity from inventory
        console.log(typeof availableRooms)
        let checkoutItems = JSON.parse(localStorage.getItem('cartItems'))
        console.log(checkoutItems.length)
        for(let i=0; i<checkoutItems.length; i++){
            for(let j =0;j<availableRooms.length;j++){
                if(checkoutItems[i]._id === availableRooms[j]._id){
                    if(availableRooms[j].quantity >= checkoutItems[i].quantity){
                        fetch(`${URL}/rooms/${checkoutItems[i]._id}?quantity=${checkoutItems[i].quantity}`)
                            .then(res=>res.json())
                            .then(data=>console.log(data))
                    }else{
                        console.log('no available rooms')
                    }

                }
            }
        }
        
        //posting payment
        console.log('posting payment')
        fetch(`${URL}/book/stripe`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(res=> res.json())
        .then(data => {
            console.log(data.booking)
            if(data.status === 200){
                setPaid(true)
                localStorage.setItem('cartItems', JSON.stringify([]))
                setCartItems(localStorage.getItem('cartItems'))
                setTransaction(data.booking)
                console.log('payment successful')
                
            }
        })
    }
    return (
        <StripeCheckout 
            stripeKey={PUBLISHABLE_KEY}
            label="Card Payment"
            name="Nagrand Hotel"
            description="Find yourself here"
            panelLabel="submit"
            amount={total}
            billingAddress={false}
            currency="PHP"
            allowRememberMe={true}
            token={checkout}
        />
    )
}

export default Stripe