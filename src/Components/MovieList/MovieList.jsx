import { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieList.css";
import Modal from "../Modal/Modal";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


const MovieList = () => {
  const [movies, setMovies] = useState([]); // populating the movies on the page
  const [page, setpage] = useState(1); // LOADING PAGE: keeps track of current page number
  const [loading, setLoading] = useState(false); //if movies are currently being fetched
  const [selectedMovie, setSelectedMovie] = useState(null); // used for search bar
  const [searchTerm, setSearchTerm] = useState(""); // used for the seach bar
  const [sortType, setSortType] = useState(""); // used for the drop-down menu
  const [isSearching, setisSearching] = useState("false"); // used to toggle between discover and search on API

  // useState isSearching

  useEffect(() => {
    async function fetchMovie() {
      setLoading(true); //set loading state to true before fetching
      const apiKey = import.meta.env.VITE_API_KEY;
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.results);
      if (page === 1) {
        setMovies(data.results);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...data.results]); // append new movies to existing list
      }
      setLoading(false); // set loading to false after fetching
    }
    fetchMovie();
  }, [page]);

  async function fetchSearch() {
    setLoading(true);
    const apiKey = import.meta.env.VITE_API_KEY;
    let searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}&page=${page}`;
    //if (searchTerm == "") {
    //  searchUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`;
    //}
    const response = await fetch(searchUrl);
    const data = await response.json();
    console.log(data.results);
    if (page === 1) {
      setMovies(data.results); // Set initial movies
    } else {
      setMovies((prevMovies) => [...prevMovies, ...data.results]); // Append new movies
    }
    setLoading(false);
  }

  // handle for "load More" button click event
  const handleLoadMore = () => {
    setpage((prevPage) => prevPage + 1);
  };
  // Filter movie based on search term
  const filteredMovies = movies.filter((movie) =>
    movie.original_title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSearch = () => {
    setpage(1);
    fetchSearch();
  };
  const sortMovies = (movies, type) => {
    switch (type) {
      case "alphabetic":
        return [...movies].sort((a, b) =>
          a.original_title.localeCompare(b.original_title)
        );
      case "release_date":
        return [...movies].sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date)
        );
      case "rating":
        return [...movies].sort((a, b) => b.vote_average - a.vote_average);
      default:
        return movies;
    }
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  //const filteredMovies = movies.filter((movie) =>
  //  movie.original_title.toLowerCase().includes(searchTerm.toLowerCase())
  //);

  const sortedMovies = sortMovies(filteredMovies, sortType);

  return (
    <>
    <Header />
    <main>
      {/* CODE FOR THE SEARCH BAR*/}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Movie..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch(), setisSearching(true);
          }}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
        </div>
        {/* CODE FOR THE DROP DOWN MENU*/}
      <div className="filter-container">
        <select
          value={sortType}
          onChange={handleSortChange}
          className="sort-dropdown"
        >
          <option value="">Sort By</option>
          <option value="alphabetic">Alphabetic</option>
          <option value="release_date">Release Date</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* CODE FOR THE MOVIE CARDS*/}
      <div className="Movie-Cards">
        {sortedMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            imageURL={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            movieName={movie.original_title}
            movieRating={movie.vote_average}
            onClick={() => setSelectedMovie(movie)}
          />
        ))}
        {/* CODE FOR THE LOADING BUTTON*/}
      </div>
      <div className="loading-Button">
        <button onClick={handleLoadMore} disabled={loading}>
          {loading ? "Loading..." : "Load More"}{" "}
          {/* Display "Loading..." when fetching */}
        </button>
      </div>

      {/* Ternary Statement, CODE FOR THE MODAL*/}
      {selectedMovie && (
        <Modal
          show={selectedMovie !== null}
          onClose={() => setSelectedMovie(null)}
        >
          <h2>{selectedMovie.title}</h2>
          <h4>Rating: {selectedMovie.vote_average}</h4>
          <p>{selectedMovie.overview}</p>
          <img
            src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
            alt={selectedMovie.original_title}
            style={{ width: "100%}" }}
          />
        </Modal>
      )}
      </main>
      <Footer />
    </>
  );
};

export default MovieList;
