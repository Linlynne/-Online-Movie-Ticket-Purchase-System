import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Registration() {

    const navigate = useNavigate();

    const initialValues = {
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        password: "",
        rePassword: ""
    };

    const phoneRegExp = /^([1-9]{3})(-)([0-9]{3})(-)([0-9]{4})$/;

    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required(),
        firstName: Yup.string().min(3).required(),
        lastName: Yup.string().min(3).required(),
        phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid,ex: 888-888-8888').required(),
        password: Yup.string().min(6).max(20).required(),
        rePassword: Yup.string().oneOf([Yup.ref('password'), null], 'Confirm Password does not match').required('Please repeat password')
    });

    const onSubmit = (data) => {
        axios.post('http://localhost:3001/auth', {
            email: data.email, firstName: data.firstName,
            lastName: data.lastName, phone: data.phone, password: data.password
        }).then((response) => {
            // console.log(data);
            navigate(`/`);
        });
    };

    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="form-signin mt-5">
                    <label>Email:</label>
                    <ErrorMessage className="alert alert-danger" name="email" component="h6" />
                    <Field className="form-control" name="email" placeholder="Email..." />

                    <label>First Name:</label>
                    <ErrorMessage className="alert alert-danger" name="firstName" component="h6" />
                    <Field className="form-control" name="firstName" placeholder="First Name..." />

                    <label>Last Name:</label>
                    <ErrorMessage className="alert alert-danger" name="lastName" component="h6" />
                    <Field className="form-control" name="lastName" placeholder="Last Name..." />

                    <label>Phone Number:</label>
                    <ErrorMessage className="alert alert-danger" name="phone" component="h6" />
                    <Field className="form-control" name="phone" placeholder="Phone Number..." />

                    <label>Password:</label>
                    <ErrorMessage className="alert alert-danger" name="password" component="h6" />
                    <Field type="password" className="form-control" name="password" placeholder="Password..." />

                    <label>Repeat Password:</label>
                    <ErrorMessage className="alert alert-danger" name="rePassword" component="h6" />
                    <Field type="password" className="form-control" name="rePassword" placeholder="Repeat Password..." />

                    <button type="submit" className="w-100 btn btn-lg btn-primary">Registration</button>
                </Form>
            </Formik>
        </div>
    );
}


export default Registration;