import React, {useState, useEffect, Fragment} from 'react'
import styled from 'styled-components'
import {URL} from '../../config'

const TransactionWrapper = styled.div`
    display:block;
    padding: 8em;
    flex-flow: row nowrap;
    min-height: 100vh;
    background-color: ${props => props.theme.pine};
`;

const TransactionContent = styled.div`
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color: ${props=>props.theme.cream};
    width:70%;
    margin: 0 auto;
    max-width: 1920px;
    height:auto;
    display:block;
    justify-content: center;
    font-family: ${props=>props.theme.montserratLight};
    font-size: 1rem;
    color: ${props=>props.theme.pine}

`;
const Transactions = () => {
    const [transactions, setTransactions] = useState([])
    const [rooms, setRooms] = useState([])
    useEffect(()=> {
        fetch(`${URL}/book`)
        .then(res => res.json())
        .then(data => {
            setTransactions(data)
        })
        fetch(`${URL}/rooms`)
        .then(res=>res.json())
        .then(data=>{
            setRooms(data)
        })
    }, [])

    const updateStatus = (statusId, transactionId) => {
        let body = {
            statusId
        }

        fetch(`${URL}/transactions/${transactionId}}`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "x-auth-token": localStorage.getItem('token'),
                "Content-Type": "application/json"
            }
        })
        .then(res=>res.json())
        .then(data=> {
            alert(data.message)
        })
    }

    return(
        <TransactionWrapper>
            <TransactionContent>
            <div>
            <h2>Transactions</h2>
            {transactions.length ? 
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Transaction ID</th>
                            <th>Email</th>
                            <th>Reservations</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => {
                            return(
                                <tr key={transaction._id}>
                                    <td>{transaction._id}</td>                                    
                                    <td>{transaction.email}</td>
                                    <td>
                                        <div className="row">
                                                <div className="col-4">Room</div>
                                                <div className="col-2">Quantity</div>
                                                <div className="col-3">Check-in</div>
                                                <div className="col-3">Check-out</div>
                                                
                                        </div>
                                        <hr/>
                                        { 
                                            transaction.rooms.map(room =>{
                                            return(
                                                <div className="row" key={room._id}>
                                                    <div className="col-4">
                                                        {
                                                            rooms.map(rm => {
                                                                console.log(room._id)
                                                                console.log(rm._id)
                                                                if(room._id === rm._id) {
                                                                    
                                                                    return rm.name
                                                                }
                                                            })
                                                        }
                                                    </div>
                                                    <div className="col-2">{room.quantity}</div>
                                                    <div className="col-3">{new Date(room.checkin).toLocaleString().substring(0,9)}</div>
                                                    <div className="col-3">{new Date(room.checkout).toLocaleString().substring(0,9)}</div>
                                                </div>
                                            )
                                        })

                                        }   
                                    </td>
                                    <td>{transaction.total}</td>                         
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                :<h2>No transactions to show</h2>
            }
        </div>
            </TransactionContent>
        </TransactionWrapper>
        
    )
}

export default Transactions