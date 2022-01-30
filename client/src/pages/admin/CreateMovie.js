import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function CreateMovie() {

    const navigate = useNavigate();

    const initialValues = {
        movieName: "",
        description: "",
        genre: "",
        img: ""
    };

    // useEffect(() => {
    //     if(!localStorage.getItem('accessToken')){
    //         navigate('/login');
    //     }
    // },[]); 

    const validationSchema = Yup.object().shape({
        movieName: Yup.string().required('Movie Name is a required field'),
        description: Yup.string().required('Description is a required field'),
        genre: Yup.string().required('Genre is a required field')
    });

    const onSubmit = (data) => {
        axios.post('http://localhost:3001/movies',data,
        {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }
        ).then((response) => {
            console.log(response.data);
            navigate('/');
        });
    };

    return (
        <div className="form-signin mt-5">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label className="form-label">Movie Name:</label>
                    <ErrorMessage className="alert alert-danger" name="movieName" component="h6" />
                    <Field className="form-control" autoComplete="off" id="input1" name="movieName" placeholder="Movie Name..." />
                    <label className="form-label mt-3">Description:</label>
                    <ErrorMessage className="alert alert-danger" name="description" component="h6" />
                    <Field className="form-control" id="input2" name="description" placeholder="Description..." />
                    <label className="form-label mt-3">Genre:</label>
                    <ErrorMessage className="alert alert-danger" name="genre" component="h6" />
                    <Field as="select" className="form-select" id="input3" name="genre" >
                        <option value="" label="Select a genre" />
                        <option value="action" label="Action" />
                        <option value="adventure" label="Adventure" />
                        <option value="animation" label="Animation" />
                        <option value="family" label="Family" />
                        <option value="horror" label="Horror" />
                        <option value="drama" label="Drama" />
                        <option value="comedy" label="Comedy" />
                        <option value="kids" label="Kids" />
                    </Field>
                    <label className="form-label mt-3">Movie Image URL:</label>
                    <ErrorMessage name="img" component="h6" />
                    <Field className="form-control" autoComplete="off" id="input1" name="img" placeholder="Movie Image URL..." />

                    <button className="btn btn-primary mt-3" type="submit">Create Movie</button>
                </Form>
            </Formik>
        </div>
    );
}


export default CreateMovie;