import React, { useEffect, useState } from "react";
import axios from 'axios';
import { AuthContext } from '../../helpers/AuthContext';
import { useNavigate, Link } from 'react-router-dom';


function ScheduleList() {

    const [listOfSchedules, setListOfSchedules] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/schedule', {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }).then((response) => {
            setListOfSchedules(response.data.listOfSchedules);
        });
    }, []);

    const deleteSchedule = (id) => {
        axios.delete(`http://localhost:3001/schedule/${id}`, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }).then((response) => {
            if (response.data.error) {
                navigate('/login');
            } else {
                axios.get('http://localhost:3001/schedule', {
                    headers: {
                        accessToken: localStorage.getItem('accessToken')
                    }
                }).then((response) => {
                    setListOfSchedules(response.data.listOfSchedules);
                });
                // setListOfSchedules([...listOfSchedules]);
                //  setListOfSchedules(listOfSchedules.filter((val) => {
                //     return val.Schedules.id != id;
                // }));
            }
        });
    };

    const formatDate = (date) => {
        var dateee = new Date(date).toJSON();
        return new Date(+new Date(dateee) - 5 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
    };


    return (
        <div className="mt-3">
            <h1>Schedule</h1>
            {listOfSchedules.map((movie) => {
                return (
                    <div key={movie.id}>
                        <div className="scheduleList mt-3">
                            {movie.Schedules.map((screening, key) => {
                                return (
                                    <div key={key} className="card mt-3">
                                        <div className="card-header"><Link className="nav-link px-2 text-black" to={"/admin/schedule/" + screening.id} state={{ movieName: `${movie.movieName}` }}>Movie Name: {movie.movieName} </Link></div>
                                        {/* <div className="card-header" onClick={() => { navigate(`/admin/schedule/${screening.id}`) }} moviename={movie.movieName} >
                                            Movie Name: {movie.movieName}
                                        </div> */}
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">Show Time: {formatDate(screening.showTime)}</li>
                                            <li className="list-group-item">Price: {screening.price}</li>
                                            <li className="list-group-item">Hall Number: {screening.RoomId}</li>
                                            <li className="list-group-item btn btn-primary" onClick={() => { deleteSchedule(screening.id) }}>Delete</li>
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}


export default ScheduleList;