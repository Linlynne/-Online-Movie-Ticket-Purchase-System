import React, { useEffect, useState } from "react";
import axios from 'axios';
import { AuthContext } from '../../helpers/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';


function UserList() {

    let { id } = useParams();

    const navigate = useNavigate();

    const [listOfUsers, setListOfUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/auth/account', {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }).then((response) => {
            // console.log(response.data);
            setListOfUsers(response.data);
        });
    }, []);

const editEmail = () => {
    let newEmail = prompt('Enter new Email:');
    axios.put(`http://localhost:3001/auth/email`,{newEmail: newEmail, id: id},{headers:{
        accessToken: localStorage.getItem('accessToken')
    }});
    // setPostObject({...postObject, title: newTitle});
};




    return (
        <div className="mt-3">
            <h1>Clients</h1>
            <div className="scheduleList mt-3">
                {listOfUsers.map((value) => {
                    if (value.role === 0) {
                        return (
                            <div key={value.id} id={value.id} className="card mt-3">
                                <div className="card-header" onClick={() => { navigate(`/admin/user/${value.id}`) }}>
                                    User Name: {value.lastName}, {value.firstName} 
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item " >Email: {value.email}</li>
                                    <li className="list-group-item ">Phone: {value.phone}</li>
                                </ul>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
}


export default UserList;