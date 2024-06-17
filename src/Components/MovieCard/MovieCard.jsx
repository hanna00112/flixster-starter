
import React from "react";

const MovieCard= (props) => {
    return (
        <>
        <fieldset>
            <legend>MovieCard</legend>
            <img src={props.imageURL}></img>
            <h2> {props.movieName}</h2>
            <p>Ratings: {props.movieRating} </p>
        </fieldset>

        </>
    )
}

export default MovieCard;