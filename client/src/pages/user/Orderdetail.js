import React, { useState,useEffect } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import '../../App.css';
import Axios from 'axios';


function Orderdetail(){

  const [loginUser, setLoginUser] = useState({});
  const navigate = useNavigate();
  const [order, setOrder] = useState({});
  const [schedule, setSchedule] = useState({});
  const [room, setRoom] = useState({});
  const [movie, setMovie] = useState({});
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [cancelButtonDisable, setCancelButtonDisable] = useState(false);
  
  let {orderId} = useParams();

  useEffect(() => {
    Axios.get("http://localhost:3001/auth/check",{headers:{
      accessToken:localStorage.getItem("accessToken")
      }}).then((response)=>{
        setLoginUser(response.data);
        localStorage.setItem("loginUser",JSON.stringify(response.data));
        var loginUserId = JSON.parse(localStorage.getItem("loginUser")).id;
        //Get Order detail
        Axios.get(`http://localhost:3001/orders/byId/${orderId}`,{headers:{
          accessToken:localStorage.getItem("accessToken")
          }}).then((response)=>{
            setOrder(response.data);
            setStatus(response.data.status==='Y'?'Active':'Canceled');
            setCancelButtonDisable(response.data.status!=='Y');
            //Get Schedule detail
            Axios.get(`http://localhost:3001/schedules/byId/${response.data.ScheduleId}`,{headers:{
              accessToken:localStorage.getItem("accessToken")
              }}).then((response)=>{
                setSchedule(response.data);
                //Get Room
                Axios.get(`http://localhost:3001/room/byId/${response.data.RoomId}`,{headers:{
                  accessToken:localStorage.getItem("accessToken")
                  }}).then((response)=>{
                    setRoom(response.data);
                });
                //Get Movie
                Axios.get(`http://localhost:3001/movies/byId/${response.data.MovieId}`,{headers:{
                  accessToken:localStorage.getItem("accessToken")
                  }}).then((response)=>{
                    setMovie(response.data);
                });
            });
        });
    });
  }, []);

  const handleCancelClick = () => {
    Axios.put("http://localhost:3001/orders/status",
      {
        id:orderId,
        status:'N'
     },
     {
      headers: {
          accessToken: localStorage.getItem('accessToken')
      }
    })
    .then((response)=>{
      setCancelButtonDisable(true);
      setMessage("You succeed canceled this order");
      setStatus('Canceled');
    }).catch((error)=>{
      setMessage(error);
    });
  };

  return (
    
    <div className="container5">
      {message}
      <div className="card4">
        <div className="card-header"><h4>Order Detail</h4></div>
        <div className="card-body">
        <p>Order Number: {order.orderNumber}</p>
        <p>Order Date: {order.orderDate}</p> 
        <p>Quantity: {order.quantity}</p> 
        <p>Amount: {order.totalPrice}</p> 
        <p>Status: {status}</p> 
        <p>Show Time: {schedule.showTime}</p>
        <p>Room: {room.description}</p>
        <p>Movie: {movie.movieName}</p>
        <button disabled={cancelButtonDisable} onClick={handleCancelClick}>Cancel</button>
        </div>
      </div>
    </div>  
  );
};
export default Orderdetail;