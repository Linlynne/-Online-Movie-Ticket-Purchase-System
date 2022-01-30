import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


function User() {

    const initialValues = {
        email: "",
        phone: ""
    };

    const [isUpdate, setIsUpdate] = useState(false);

    const [newEmail,setNewEmail] = useState('');
    const [newPhone,setNewPhone] = useState('');

    const phoneRegExp = /^([1-9]{3})(-)([0-9]{3})(-)([0-9]{4})$/;

    const validationSchema = Yup.object().shape({
        email: Yup.string().email(),//.required(),
        phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid,ex: 888-888-8888')//.required()
    });

    let { id } = useParams();
    const [userObject, setUserObject] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/byId/${id}`, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }).then((response) => {
            console.log(response.data);
            setUserObject(response.data);
        });
    }, []);

    const updateUser = () => {
        setIsUpdate(false);
        axios.put(`http://localhost:3001/auth/email`, { newEmail: newEmail, id: id }, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        });
        if(newEmail.length !== 0){
            setUserObject({ ...userObject, email: newEmail });
        }
        axios.put(`http://localhost:3001/auth/phone`, { newPhone: newPhone, id: id }, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        });
        if(newPhone.length !== 0){
            setUserObject({ ...userObject, phone: newPhone });
        }
        setNewEmail('');
        setNewPhone('');
    };

    return (
        <div className="row">
            <div className="mt-3 col-4">
                <div className="card mt-3">
                    <div className="card-header">
                        Client Name: {userObject.lastName}, {userObject.firstName}
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item " onClick={() => {setIsUpdate(true)}}>Email: {userObject.email}</li>
                        <li className="list-group-item " onClick={() => {setIsUpdate(true)}}>Phone: {userObject.phone}</li>
                        <li className="list-group-item btn btn-primary" ><Link to={'/admin/order_list/' + userObject.id}>Order List</Link></li>
                    </ul>
                </div>
            </div>
            {isUpdate &&
                <div className="col-4" >
                <Formik initialValues={initialValues}  validationSchema={validationSchema}>
                    <Form className="form-signin mt-5">
                        <label>Email:</label>
                        <ErrorMessage className="alert alert-danger" name="email" component="h6" />
                        <Field className="form-control" name="email" placeholder="Email..." value={newEmail} onChange={(event) => {setNewEmail(event.target.value)}}/>

                        <label className="mt-3">Phone Number:</label>
                        <ErrorMessage className="alert alert-danger" name="phone" component="h6" />
                        <Field className="form-control" name="phone" placeholder="Phone Number..." value={newPhone} onChange={(event) => {setNewPhone(event.target.value)}}/>

                        <button className="w-100 btn btn-lg btn-primary mt-3" onClick={updateUser} >update</button>
                    </Form>
                </Formik>
            </div>
            }
            
            {/* <div className=" mt-3 col-4">
                123
            </div> */}
        </div>
    );
}



export default User;