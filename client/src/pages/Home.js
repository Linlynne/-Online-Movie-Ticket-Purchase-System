import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
import GenreBar from "../components/GenreBar";
import axios from 'axios';


function Home(props) {

    const [listOfMovies, setListOfMovies] = useState([]);
    const [genre, setGenre] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/movies').then((response) => {
            setListOfMovies(response.data);
        });
    }, []);

    const handleGenre = (value) => {
        setGenre(value);
    };

    return (
        <div >
            <Carousel />
            <GenreBar handleGenre={handleGenre} />
            <div className="movieList">
                {listOfMovies.filter((value) => {
                    if (genre === '') {
                        if (props.searchMovieName == '') {
                            return value;
                        } else if (value.movieName.toLowerCase().includes(props.searchMovieName.toLowerCase())) {
                            return value;
                        }
                    } else if (value.genre === genre) {
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


export default Home;