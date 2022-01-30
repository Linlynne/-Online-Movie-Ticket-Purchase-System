import { style } from '@mui/system';
import { useNavigate,useParams } from "react-router-dom";
import React,{useEffect, useState } from "react";
import Axios from 'axios';
import { Link } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import './User.css';

function Profile  () {

  const [loginUser, setLoginUser] = useState({});
  const [message, setMessage] = useState({});
  const navigate = useNavigate();

  if (localStorage.getItem("accessToken")===null) {
    navigate("/login");
  }

  useEffect(() => {
    console.log(localStorage.getItem("accessToken"));
    let movieId = localStorage.getItem('bookingMovieId');
    //Get login User
    Axios.get("http://localhost:3001/auth/check",{headers:{
      accessToken:localStorage.getItem("accessToken")
      }}).then((response)=>{
        console.log(response.data);
        setLoginUser(response.data);
        localStorage.setItem("loginUser",JSON.stringify(response.data));
        console.log(response.data);
    });
  }, []);


  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .max(20),
    lastName: Yup.string()
      .max(20),
    oldPassword: Yup.string()
      .required('oldPassword required'),
    newPassword: Yup.string()
      .max(10)  
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = data => {
    Axios.put("http://localhost:3001/auth/update/",
      {
        id:loginUser.id,
        email:loginUser.email,
        firstName:data.firstName,
        lastName:data.lastName,
        oldPassword:data.oldPassword,
        newPassword:data.newPassword
     },
     {
      headers: {
          accessToken: localStorage.getItem('accessToken')
      }
    })
    .then((response)=>{
      setMessage(response.data);

    }).catch((error)=>{
      setMessage(error);
    });
  };


  return(
  <div className='continer2'>
  <div><h2 >Profile </h2></div>
   
  <form onSubmit={handleSubmit(onSubmit)}>
   <div className='profile'>Email: {loginUser.email}</div>
   <div className='profile'> <span>First Name: {loginUser.firstName} </span></div>
   
   
   
   <div className="form-group">
          
          <input
            name="firstName" placeholder='Put your new first name'
            type="text"
            {...register('firstName')}
            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.firstName?.message}</div>
  </div>
  <div className='profile'> <span>Last Name: {loginUser.lastName} </span></div>
   <div className="form-group">

          <input
            name="lastName" placeholder='Put your new last name'
            type="text"
            {...register('lastName')}
            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.lastName?.message}</div>
  </div>
  <div className="form-group">
          <label>Old Password</label>
          <input
            name="oldPassword" placeholder='Put your old password'
            type="password"
            {...register('oldPassword')}
            className={`form-control ${errors.oldPassword ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.oldPassword?.message}</div>
  </div>
  <div className="form-group">
          <label>New Password</label>
          <input
            name="newPassword"placeholder='Put your new password'
            type="password"
            {...register('newPassword')}
            className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.newPassword?.message}</div>
  </div>


  
  <h5 className='erro'>{message.error}</h5>
  <h5 className='erro'>{message.result}</h5>
  <button  type="submit" className="btn btn-primary" id="button1" >Update</button>
 
    
</form>
         </div>)
};
export default Profile;
