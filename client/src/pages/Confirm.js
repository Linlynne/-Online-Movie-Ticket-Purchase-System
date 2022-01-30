import React, { useState,useEffect } from 'react';
import { useHistory,useParams } from "react-router-dom";
import Axios from 'axios';
import '../App.css';


function Confirm() {

    const [selectedSchedule, setSelectedSchedule] = useState({});
    const [selectedSeats, setSelectedSeats] = useState('');
    const [bookingQuantity, setBookingQuantity] = useState();
    const [bookingAmount, setBookingAmount] = useState();
    const [selectedRoom, setSelectedRoom] = useState({});
    const [bookingPayment, setBookingPayment] = useState({});
    const [bookingMovie, setBookingMovie] = useState({});
    const [orderNumber, setOrderNumber] = useState('');

    useEffect(() => {
        var selectedSchedule = JSON.parse(localStorage.getItem('selectedSchedule'));
        var selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
        var bookingQuantity = JSON.parse(localStorage.getItem('bookingQuantity'));
        var bookingAmount = JSON.parse(localStorage.getItem('bookingAmount'));
        var selectedRoom = JSON.parse(localStorage.getItem('selectedRoom'));
        var bookingPayment = JSON.parse(localStorage.getItem('bookingPayment'));
        var bookingMovie = JSON.parse(localStorage.getItem('bookingMovie'));
        var orderNumber = localStorage.getItem('orderNumber');
        setSelectedSchedule(selectedSchedule);
        setSelectedSeats(selectedSeats.join());
        setBookingQuantity(bookingQuantity);
        setBookingAmount(bookingAmount);
        setSelectedRoom(selectedRoom);
        setBookingPayment(bookingPayment);
        console.log(bookingPayment);
        setBookingMovie(bookingMovie);
        setOrderNumber(orderNumber);
    }, []);

    return (
        <div className="container2">
        <div className="card5">
          <div className="card-header">Movie/Ticket Detail</div>
          <div className="card-body">
           <p>Movie Name: {bookingMovie.movieName}</p> 
           <p>Room: {selectedRoom.description}</p> 
           <p>Seat: {selectedSeats}</p> 
           <p>Show Time: {selectedSchedule.showTime}</p> 
           <p>Quantity: {bookingQuantity}</p> 
          </div>
        </div>
        <div className="card6">
          <div className="card-header">Order Detail</div>
          <div className="card-body">
          <p>orderNumber: {orderNumber}</p>
           <p>Amount: {bookingAmount}</p> 
           <p>Card: {bookingPayment.cardnumber}</p> 
          </div>
        </div>
      </div>  
    );
  }
  
  export default Confirm;