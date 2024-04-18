import css from "./MovieList.module.css";
import { Link, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const MovieList = ({ movies, isLoading, isError }) => {
  const location = useLocation();

  if (isError) {
    return <p className={css.errorText}>Error loading movies.</p>;
  }

  if (isLoading) {
    return <p className={css.loadingText}>Loading...</p>;
  }

  return (
    <div>
      <h1>Trending today</h1>
      <ul>
        {Array.isArray(movies) &&
          // eslint-disable-next-line react/prop-types
          movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={location}>
                {movie.title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MovieList;
