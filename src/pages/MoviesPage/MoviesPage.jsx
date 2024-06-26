import css from "./MoviesPage.module.css";
import { requestMoviesByQuery } from "../../components/services/api";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const query = searchParams.get("query") || "";
  const location = useLocation();

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const data = await requestMoviesByQuery(query);
        setMovies(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchParams({ query: inputValue });
  };

  return (
    <>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          className={css.searchFormInput}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search for movies"
        />
        <button className={css.searchFormBtn} type="submit">
          Search
        </button>
      </form>
      {isLoading && <p className={css.loadingText}>Loading...</p>}
      {error && <p className={css.errorText}>Error loading movies.</p>}
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={location}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default MoviesPage;
