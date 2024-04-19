import css from "./MovieDetailsPage.module.css";
import { requestMovieDetailsById } from "../../components/services/api";
import { Link, useParams, Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();

  const backLinkRef = useRef(location.state ?? "/");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const data = await requestMovieDetailsById(movieId);
        setMovieDetails(data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (isError) {
    return <p className={css.errorText}>Failed to load movie details.</p>;
  }
  if (isLoading) {
    return <p className={css.loadingText}>Loading...</p>;
  }

  return (
    <>
      <Link className={css.backHome} to={backLinkRef.current}>
        ← Back Home
      </Link>
      {movieDetails && (
        <div className={css.movieDetailsContainer}>
          <img
            className={css.movieImage}
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
          />
          <div className={css.movieDetailsTextContainer}>
            <h2>{movieDetails.title}</h2>
            <p>User score: {Math.round(movieDetails.vote_average * 10)}%</p>
            <h3>Overview</h3>
            <p>{movieDetails.overview}</p>
            <h4>Genres</h4>
            <p>{movieDetails.genres.map((genre) => genre.name).join(", ")}</p>
          </div>
        </div>
      )}
      <div className={css.additionalInfoContainer}>
        <p>Additional information</p>
        <ul className={css.additionalInfoList}>
          <li>
            <Link className={css.additionalInfoItem} to="cast">
              → Cast
            </Link>
          </li>
          <li>
            <Link className={css.additionalInfoItem} to="reviews">
              → Reviews
            </Link>
          </li>
        </ul>
        <Routes>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Routes>
      </div>
    </>
  );
}

export default MovieDetailsPage;
