import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation } from 'react-router-dom';
import axios from "axios";


function Schedule() {

    let {state} = useLocation();
    let { id } = useParams();   
    const [scheduleObject, setScheduleObject] = useState({});
    const [isUpdate, setIsUpdate] = useState(false);
    const [newShowTime, setNewShowTime] = useState(new Date());
    const [newPrice, setNewPrice] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:3001/schedule/byId/${id}`, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }).then((response) => {
            console.log(response.data);
            setScheduleObject(response.data);
        });
    }, []);

    const updateSchedule = () => {
        setIsUpdate(false);
        console.log("about to update schedule");
        if (newShowTime.length !== 0) {
            console.log("put1");
            axios.put(`http://localhost:3001/schedule/showtime`, { newShowTime: newShowTime, id: id }, {
                headers: {
                    accessToken: localStorage.getItem('accessToken')
                }
            });
            setScheduleObject({ ...scheduleObject, showTime: newShowTime });
        }
        if (newPrice > 0 ) {
            axios.put(`http://localhost:3001/schedule/price`, { newPrice: newPrice, id: id }, {
                headers: {
                    accessToken: localStorage.getItem('accessToken')
                }
            });
            setScheduleObject({ ...scheduleObject, price: newPrice });
        }
        setNewShowTime('');
        setNewPrice('');
    };

    const formatDate = (date) => {
        var dateee = new Date(date).toJSON();
        return new Date(new Date(dateee) - 5 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
    };

    var result = Date.parse(new Date(scheduleObject.showTime)) > Date.parse(new Date());

    return (
        <div>
            <div className="mt-3 col-4">
                <div className="card mt-3">
                    <div className="card-header">
                        Movie Name: {state.movieName}
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item " onClick={() => { if (result) { setIsUpdate(true) } }}>ShowTime: {formatDate(scheduleObject.showTime)}</li>
                        <li className="list-group-item " onClick={() => { if (result) { setIsUpdate(true) } }}>Price: {scheduleObject.price}</li>
                        <li className="list-group-item " >Room: {scheduleObject.RoomId}</li>
                    </ul>
                </div>
            </div>
            {isUpdate &&
                <div className="mt-3 col-4">
                    <label>Show Time:</label>
                    <input type="datetime-local" className="form-control" onChange={(event) => { setNewShowTime(event.target.value); }} />

                    <label className="mt-3">Price:</label>
                    <input type="number" className="form-control" step="0.01" placeholder="0.00" onChange={(event) => { setNewPrice(event.target.value); }} />

                    <button className="w-100 btn btn-lg btn-primary" onClick={updateSchedule}>Update</button>
                </div>
            }
        </div>
    );
}


export default Schedule;