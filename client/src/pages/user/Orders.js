import React,{ useState,useEffect,useContext } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import Axios from 'axios';
import { AuthContext } from "../../helpers/AuthContext";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import './User.css';

function Orders() {

  const [loginUser, setLoginUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState({});
  const navigate = useNavigate();
  
  if (localStorage.getItem("accessToken")===null) {
    navigate("/login");
  }

  useEffect(() => {
    //Get login User
    Axios.get("http://localhost:3001/auth/check",{headers:{
      accessToken:localStorage.getItem("accessToken")
      }}).then((response)=>{
        setLoginUser(response.data);
        localStorage.setItem("loginUser",JSON.stringify(response.data));
        var loginUserId = JSON.parse(localStorage.getItem("loginUser")).id;
        Axios.get(`http://localhost:3001/orders/byUserId/${loginUserId}`,{headers:{
          accessToken:localStorage.getItem("accessToken")
          }}).then((response)=>{
            setOrders(response.data);
        });
    });
  }, []);

  return (<div>
    <div className='continer4'>
      <h3 className='history'>Orders History</h3><hr></hr>
      <div className="table ">
      <thead>
        <tr>
            <th scope='col' >Order Number</th>
            <th scope='col' >Order Date</th>
            <th scope='col' >Quantity</th>
            <th scope='col'>Amount</th>
            <th scope='col'>Status</th>
            <th scope='col'>View</th>
           </tr>
      </thead>
      {orders.map((order) => {
        return (
          <tbody>
          <tr>
           <th scope = 'row'>{order.orderNumber}</th>
            <th scope = 'row'>{order.orderDate}</th>
            <th scope = 'row'>{order.quantity}</th>
            <th scope = 'row' >{order.totalPrice}</th>
            <th scope = 'row' >{order.status==='Y'?'Active':'Cancelled'}</th>
            <td scope = 'row'><a href={'/user/order/'+order.id}>detail</a></td>
          </tr></tbody>
            );
        })}
    </div>  </div>  
    </div>);
};
export default Orders;