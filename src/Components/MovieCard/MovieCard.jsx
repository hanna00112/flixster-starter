import React from "react";
import "./MovieCard.css";

const MovieCard = ({imageURL, movieName, movieRating, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <fieldset>
        <legend>MovieCard</legend>
        <img src={imageURL} alt={movieName}></img>
        <h2> {movieName}</h2>
        <p>Ratings: {movieRating} </p>
      </fieldset>
    </div>
  );
};

export default MovieCard;
