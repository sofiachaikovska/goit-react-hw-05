import css from "./MovieCast.module.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { requestMovieCastById } from "../services/api";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setIsLoading(true);
        const data = await requestMovieCastById(movieId);
        setCast(data.cast);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (isLoading) return <p className={css.loadingText}>Loading...</p>;
  if (error)
    return <p className={css.errorText}>Error loading the cast details.</p>;

  return (
    <ul className={css.castList}>
      {cast.map((actor) => (
        <li className={css.castListItem} key={actor.id}>
          <img
            className={css.castImage}
            src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
            alt={actor.name}
          />
          <p>{actor.name}</p>
          <p>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
