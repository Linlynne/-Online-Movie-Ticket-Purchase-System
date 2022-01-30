import React from "react";


function GenreBar(props) {


    return (
        <div className="bg-dark text-white">
            <ul className="nav ">
                <li className="nav-item">
                    <a className="nav-link active text-white fw-bold" aria-current="page" >Genre</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-white btn" value="action" onClick={(e) => props.handleGenre("")}>All</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-white btn" value="action" onClick={(e) => props.handleGenre("action")}>Action</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-white btn" value="adventure" onClick={(e) => props.handleGenre("adventure")}>Adventure</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-white btn" value="animation" onClick={(e) => props.handleGenre("animation")}>Animation</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-white btn" value="family" onClick={(e) => props.handleGenre("family")}>Family</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-white btn" value="drama" onClick={(e) => props.handleGenre("drama")}>Drama</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-white btn" value="comedy" onClick={(e) => props.handleGenre("comedy")}>Comedy</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-white btn" value="kids" onClick={(e) => props.handleGenre("kids")}>Kids</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-white btn" value="horror" onClick={(e) => props.handleGenre("horror")}>Horror</a>
                </li>
            </ul>
        </div>
    );
}


export default GenreBar;



