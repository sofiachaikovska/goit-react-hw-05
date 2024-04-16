import MovieList from "../../components/MovieList/MovieList";
import { getTrendingMovies } from "../../components/services/api";
import { useState } from "react";
import { useEffect } from "react";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await getTrendingMovies();
        setMovies(response.results);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  return <MovieList movies={movies} isLoading={isLoading} isError={isError} />;
}

export default HomePage;
