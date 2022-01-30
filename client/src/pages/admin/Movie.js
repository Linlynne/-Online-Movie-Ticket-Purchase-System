import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from '../../helpers/AuthContext';
import Card from "../../components/Card";


function Movie() {

    let { id } = useParams();
    const [movieObject, setMovieObject] = useState({});
    const [showTime, setShowTime] = useState(new Date());
    const [price, setPrice] = useState(0);
    const [RoomId, setRoomId] = useState(0);
    const { authState } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isUpdate, setIsUpdate] = useState(false);
    const [movieName, setMovieName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3001/movies/byId/${id}`).then((response) => {
            console.log(response.data);
            setMovieObject(response.data);
        });
    }, []);

    const deleteMovie = (id) => {
        axios.delete(`http://localhost:3001/movies/${id}`, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }).then((response) => {
            if (response.data.error) {
                alert(response.data.error)
            } else {
                navigate('/');
            }
        });
    };


    // const updateMovie = () => {
    //     setIsUpdate(false);
    //     if (movieName.length !== 0) {
    //         axios.put('http://localhost:3001/movies/movieName', { movieName: movieName, id: id }, {
    //             headers: {
    //                 accessToken: localStorage.getItem('accessToken')
    //             }
    //         });
    //         setMovieObject({ ...movieObject, movieName: movieName });
    //     }
    //     if(description.length !== 0){
    //         axios.put('http://localhost:3001/movies/description', { description: description, id: id }, {
    //                 headers: {
    //                     accessToken: localStorage.getItem('accessToken')
    //                 }
    //             });
    //             setMovieObject({ ...movieObject, description: description });     
    //     }
    //     setMovieName('');
    //     setDescription('');
    // };

    const editMovie = (option) => {

        if (option === 'card-title') {
            let newMoviename = prompt('Enter new movie name:');
            if (newMoviename.length !== 0) {
                axios.put('http://localhost:3001/movies/movieName', { newMoviename: newMoviename, id: id }, {
                    headers: {
                        accessToken: localStorage.getItem('accessToken')
                    }
                });
                setMovieObject({ ...movieObject, movieName: newMoviename });
            }

        } else {
            let newDescription = prompt('Enter new description: ');
            if (newDescription.length !== 0) {
                axios.put('http://localhost:3001/movies/description', { newDescription: newDescription, id: id }, {
                    headers: {
                        accessToken: localStorage.getItem('accessToken')
                    }
                }).then((response) => {
                    if (response.data.error) {
                        alert(response.data.error);
                    }
                });
                setMovieObject({ ...movieObject, description: newDescription });
            }
        }
    };

    const onSubmit = () => {
        axios.post(`http://localhost:3001/movies/${id}`, { MovieId: id, RoomId: RoomId, showTime: showTime, price: price }, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }).then((response) => {
            navigate('/admin/schedule_list');
        });
    };


    return (
        <div className="row">
            <div className="col-4"><Card
                id={movieObject.id}
                img={movieObject.img}
                movieName={movieObject.movieName}
                description={movieObject.description}
                deleteMovie={deleteMovie}
                editMovie={editMovie} />
            </div>
            {isUpdate &&
                <div>
                    <label>Movie Name:</label>
                    <input type="text" className="form-control" placeholder="Movie Name..." onChange={(event) => { setMovieName(event.target.value); }} />
                    <label className="mt-3">Description:</label>
                    <input type="text" className="form-control" placeholder="Description..." onChange={(event) => { setDescription(event.target.value); }} />

                    <button className="w-100 btn btn-lg btn-primary" >Update</button>
                </div>
            }

            {authState.role === 1 &&
                <div className="col-4">
                    <h2>Schedule</h2>
                    <label>Show Time:</label>
                    <input type="datetime-local" className="form-control" onChange={(event) => { setShowTime(event.target.value); }} />

                    <label className="mt-3">Hall:</label>
                    <select type="password" className="form-control" onChange={(event) => { setRoomId(event.target.value); }}>
                        <option value="">Select a hall</option>
                        <option value="1">IMAX Hall</option>
                        <option value="2">4D Hall</option>
                        <option value="3">Giant Screen Hall</option>
                    </select>

                    <label className="mt-3">Price:</label>
                    <input type="number" className="form-control" step="0.01" placeholder="0.00" onChange={(event) => { setPrice(event.target.value); }} />

                    <button className="w-100 btn btn-lg btn-primary" onClick={onSubmit}>Save</button>
                </div>
            }
        </div>
    );
}


export default Movie;