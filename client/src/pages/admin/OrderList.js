import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Axios from 'axios';


function OrderList() {

    let { id } = useParams();

    const [orders, setOrders] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        Axios.get(`http://localhost:3001/orders/byUserId/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((response) => {
            setOrders(response.data);
        });
    }, []);

    return (
        <div>
            <h1>Orders</h1>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Order Date</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Status</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                {orders.map((order) => {
                    return (
                        <tbody>
                            <tr>
                                <th scope="row">{order.orderDate}</th>
                                <td>{order.quantity}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.status === 'Y' ? 'Active' : 'Cancelled'}</td>
                                <td><a className='btn' href={'/user/order/' + order.id}>view</a></td>
                            </tr>
                        </tbody>
                    );
                })}
            </table>
        </div>);
};
export default OrderList;



