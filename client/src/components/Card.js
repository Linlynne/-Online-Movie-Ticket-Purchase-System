import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';


function Card(props) {

    const navigate = useNavigate();

    const { authState } = useContext(AuthContext);

    const handleBooking = (movieId) => {
        localStorage.setItem('bookingMovieId',movieId);
        navigate(`/booking/${movieId}`);
    };

    return (
        <div className="card mt-3" >
            <img src={props.img} onClick={() => { navigate(`/admin/movie/${props.id}`) }} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title" onClick={() => { if (authState.role === 1) { props.editMovie('card-title') } }}>{props.movieName}</h5>
                <p className="card-text" onClick={() => { if (authState.role === 1) { props.editMovie('card-text') } }}>{props.description}</p>
                {authState.role === 1 ? <a onClick={() => {
                    props.deleteMovie(props.id);
                }} className="btn btn-primary">Delete</a> : <a className="btn btn-primary" onClick={()=>{handleBooking(props.id)}}>Book Ticket</a>}
            </div>
        </div>);
    }


export default Card;