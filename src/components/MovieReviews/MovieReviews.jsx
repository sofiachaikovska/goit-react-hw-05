import css from "./MovieReviews.module.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { requestMovieReviewsById } from "../services/api";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const data = await requestMovieReviewsById(movieId);
        setReviews(data.results);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (isLoading) return <p className={css.loadingText}>Loading...</p>;
  if (error) return <p className={css.errorText}>Error loading the reviews.</p>;

  return (
    <ul className={css.reviewsList}>
      {reviews.map((review) => (
        <li className={css.reviewsListItem} key={review.id}>
          <p>
            <span className={css.authorText}>Author:</span> {review.author}
          </p>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
