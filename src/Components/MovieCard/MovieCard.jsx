
import React from "react";
import "./MovieCard.css";

const MovieCard= (props) => {
    return (
        <>
        <div className="card">
        <fieldset>
            <legend>MovieCard</legend>
            <img src={props.imageURL} alt={props.movieName}></img>
            <h2> {props.movieName}</h2>
            <p>Ratings: {props.movieRating} </p>
        </fieldset>
        </div>

        </>
    )
}

export default MovieCard;