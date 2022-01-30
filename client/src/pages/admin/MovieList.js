import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import axios from 'axios';



function MovieList(props) {

    const [listOfMovies, setListOfMovies] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/movies').then((response) => {
            setListOfMovies(response.data);
        });
    }, []);

    return (
        <div>
            <div className="movieList">
                {listOfMovies.filter((value) => {
                    if (props.searchMovieName == '') {
                        return value;
                    } else if (value.movieName.toLowerCase().includes(props.searchMovieName.toLowerCase())) {
                        return value;
                    }
                }).map((value) => {
                    return (
                        <Card key={value.id}
                            id={value.id}
                            img={value.img}
                            movieName={value.movieName}
                            description={value.description}
                        />
                    );
                })}
            </div>
        </div>
    );
}


export default MovieList;