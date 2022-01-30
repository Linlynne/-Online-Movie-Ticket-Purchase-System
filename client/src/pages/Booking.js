import React, { useState,useEffect,useContext } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import Axios from 'axios';
import Seat from '../components/Seat';
import { AuthContext } from "../helpers/AuthContext";
import { appendErrors, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { format } from "date-fns";
import { v4 as uuid } from 'uuid';
import{ init } from '@emailjs/browser';
import emailjs from 'emailjs-com'
import '../App.css';



function Booking() {

  const navigate = useNavigate();
  const [movie, setMovie] = useState({});
  const [scheduleList, setScheduleList] = useState([]);
  const [loginUser, setLoginUser] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [amount, setAmount] = useState();
  const [scheduleId, setScheduleId] = useState();
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const { authState } = useContext(AuthContext);
  const [selectedScheduleId, setSelectedScheduleId] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState({});
  const [selectedRoom, setSelectedRoom] = useState({});
  const [showSeatList, setShowSeatList] = useState([]);
  const [cardNumber, setCardNumber] = useState('');
  const [expireMonth, setExpireMonth] = useState('');
  const [expireYear, setExpireYear] = useState('');
  const [cvv, setCvv] = useState('');
  
  
  //existed local storage variable
  /*bookingMovieId,bookingMovie, accessToken,prevUrl,loginUser,
  selectedSchedule,selectedRoom,selectedSeats, bookingQuantity, bookingAmount,
  bookingPayment*/
  localStorage.setItem("prevUrl","/booking");

  if (localStorage.getItem("accessToken")===null) {
    navigate("/login");
  }
  useEffect(() => {
    let movieId = localStorage.getItem('bookingMovieId');
    //Get movie detail    
    Axios.get(`http://localhost:3001/movies/byId/${movieId}`)
      .then((response)=>{
        setMovie(response.data);
        localStorage.setItem("bookingMovie",JSON.stringify(response.data));
    });
    //Get schedule list
    Axios.get(`http://localhost:3001/schedules/byMovieId/${movieId}`)
      .then((response)=>{
        setScheduleList(response.data);
    });
    //Get login User
    Axios.get("http://localhost:3001/auth/check",{headers:{
      accessToken:localStorage.getItem("accessToken")
      }}).then((response)=>{
        setLoginUser(response.data);
        localStorage.setItem("loginUser",JSON.stringify(response.data));
    });
  }, []);

  
  const handleClickSeat = () => {
    let bookingSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    localStorage.setItem("bookingQuantity",bookingSeats.length);
    var amount = Number(bookingSeats.length* 
          JSON.parse(localStorage.getItem('selectedSchedule')).price);
    amount = amount.toFixed(2);
    console.log(amount);
    localStorage.setItem("bookingAmount",amount);
    setQuantity(bookingSeats.length);
    setAmount(amount);
  };

  const scheduleChanged = (e, scheduleId, roomId) => {
    e.stopPropagation();
    setSelectedScheduleId(e.target.value);
    localStorage.removeItem("selectedSchedule");
    localStorage.removeItem("selectedRoom");
    localStorage.removeItem("bookingQuantity");
    localStorage.removeItem("bookingAmount");
    localStorage.removeItem("selectedSeats");
    var occupiedSeats;
    Axios.get(`http://localhost:3001/schedules/byId/${scheduleId}`)
      .then((response)=>{
        setSelectedSchedule(response.data);
        localStorage.setItem('selectedSchedule',JSON.stringify(response.data));
        occupiedSeats = response.data.occupiedSeats;
        console.log(occupiedSeats);
        /*******calculate showed seat List start *****/
        Axios.get(`http://localhost:3001/room/byId/${roomId}`)
        .then((response)=>{
          setSelectedRoom(response.data);
          localStorage.setItem('selectedRoom',JSON.stringify(response.data));
            //get show seats 
          var showSeats = [];
          for(var i = 0; i < response.data.rownum; i++){
            for(var j = 0; j < response.data.colnum; j++){
              var seatTitle = "R"+String(i+1) + "C"+String(j+1);
              showSeats = [...showSeats, seatTitle];
            }
          }
          //filter occupied seat
          if(occupiedSeats){
            var occupiedSeatArray = occupiedSeats.split(",");
            for(var k=0; k < occupiedSeatArray.length; k++){
              showSeats = showSeats.filter(seat=>seat!==occupiedSeatArray[k]);
            }
          }
          setShowSeatList(showSeats);
        });
        /**********calculate showed seat List end*********/
      });
  };

  const validationSchema = Yup.object().shape({
    cardnumber: Yup.string()
      .required('Card Number is required')
      .label('Card number')
      .max(16),
    expiremonth: Yup.string()
      .required('Expire Month is required')
      .label('Expiry month')
      .min(2)
      .max(2),
    expireyear: Yup.string()
      .required('Expire Date is required')
      .label('Expiry year')
      .min(4)
      .max(4),
    cvv: Yup.string()
      .required('CVV is required')
      .label('CVC')
      .min(3)
      .max(4)  
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });
  const sendEmail = (to_name, order_number, movie_name, 
    room, seat, show_time, amount)=> {
    var templateParams = {
      to_name: to_name,
      order_number: order_number,
      movie_name: movie_name,
      room: room,
      seat: seat,
      show_time: show_time,
      amount: amount
    };

    emailjs.send('service_7ksnage', 'template_cta4ktj', templateParams,'user_B547hBrZE7q9XTD0znjXb')
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
      }, function(error) {
        console.log('FAILED...', error);
      });
  }

  const onSubmit = data => {
    const unique_id = uuid();
    const orderNumber = unique_id.slice(0,8);
    localStorage.setItem("orderNumber", orderNumber); 

    Axios.post("http://localhost:3001/orders/",
      {
        orderNumber:orderNumber,
        quantity:localStorage.getItem("bookingQuantity"),             
        totalPrice:localStorage.getItem("bookingAmount"),
        scheduleId:JSON.parse(localStorage.getItem("selectedSchedule")).id,
        userId:JSON.parse(localStorage.getItem("loginUser")).id
     })
    .then((res)=>{
      //update seats in the schedule
        Axios.put("http://localhost:3001/schedules/seats",
          {id:JSON.parse(localStorage.getItem("selectedSchedule")).id,
            seats:JSON.parse(localStorage.getItem('selectedSeats')).toString()
        })
        .then((response)=>{
          localStorage.setItem("bookingPayment",JSON.stringify(data));
          console.log(data);
          //send email
          sendEmail(loginUser.firstName + ' ' + loginUser.lastName, 
          orderNumber, movie.movieName, 
          selectedRoom.description, JSON.parse(localStorage.getItem('selectedSeats')).join(), 
          JSON.parse(localStorage.getItem("selectedSchedule")).showTime, localStorage.getItem("bookingAmount"));
          navigate(`/confirm/${res.data.id}`);
        });
    }).catch((error)=>{
      console.log(error);
    });
  };
  
 

  return (
    <div className="" >
    <div className="card3">
      <div className="card-header"><h4>Movie Detail</h4></div>
      <div className="card-body">
      <div>Name: {movie.movieName}</div>
      <div>Description: {movie.description}</div>
      <div>Genre: {movie.genre}</div>
      <div className='img'><img src={movie.img }/></div>
      </div>
    </div>
    <div className="card3">
      <div className="card-header"><h4>Schedule</h4></div>
      <div className="card-body">
        {scheduleList.map((schedule)=>{
          return (<div>
            <div className="table">
              <tr>
                <td>
                <div class="control">
                  <label className="radio">
                    <input className ="round" type="radio" name={"schedule"+schedule.id}
                      value={"schedule"+schedule.id}
                      checked={selectedScheduleId === ("schedule"+schedule.id)}
                      onChange={(e)=>scheduleChanged(e,schedule.id, schedule.RoomId)}/>
                    {"Schedule "+ schedule.id}
                  </label>
                </div>

                </td>
              </tr>
              <tr>
                <td>Room: {schedule.RoomId}</td>
              </tr>
              
              <tr>
                <td>Seats: capacity 50 people</td>
              </tr>
              <tr>
                <td>Seats Number: Row(5) R1-R5 </td>
                <td> Colnum(10) C1-C10 </td>
              </tr>
              <tr>
              </tr>
              <tr>
                <td>Show Time: {schedule.showTime}</td>
              </tr><tr>
                <td>Price $: {schedule.price}</td>
              </tr>
            </div>
            <div>
              <button  class ="btn1"data-bs-toggle="collapse" data-bs-target={"#schedule" + schedule.id} 
                disabled={selectedScheduleId !== ("schedule"+schedule.id)}>Choose Seats</button>
                <div id={"schedule" + schedule.id} className="collapse">
                <div className="d-flex flex-wrap">
                    {showSeatList.map((title)=>{
                      return (<Seat title={title} handleClickSeat={handleClickSeat}/>)
                })}
                </div></div>
            </div>
          </div>)
        })}
      </div>
    </div>
    <div className="card2">
      <div className="order"><h4>Order Detail</h4></div>
      <div className="order">
        <div className="order">Quantity:{quantity}</div>
        <div className="order">Total price $:{amount}</div>
      </div>
    
    <div className="order">
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="order">
        <label>Card Number</label>
        <input className="order"
          name="cardnumber"
          type="text"
          {...register('cardnumber')}
          className={`form-control ${errors.cardnumber ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.cardnumber?.message}</div>
      </div>
      <div className="order">
        <label>Expire Month</label>
        <input className="order"
          name="expiremonth"
          type="text"
          {...register('expiremonth')}
          className={`form-control ${errors.expiremonth ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.expiremonth?.message}</div>
      </div>
      <div className="order">
        <label>Expire Year</label>
        <input
          name="expireyear"
          type="text"
          {...register('expireyear')}
          className={`form-control ${errors.expireyear ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.expireyear?.message}</div>
      </div>
      <div className="order">
          <label>CVV</label>
          <input
            name="cvv"
            type="text"
            {...register('cvv')}
            className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.cvv?.message}</div>
        </div>
      <div className="order">
        <button type="submit" className="btn btn-primary" id="btn2" >
          Confirm
        </button>
      </div>
    </form>
    </div>
  </div>  </div>
  );
}

  
  export default Booking;