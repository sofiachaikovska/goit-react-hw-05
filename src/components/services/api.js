import axios from "axios";

const getTrendingMoviesURL =
  "https://api.themoviedb.org/3/trending/movie/day?api_key=68cf0ded334d8f1049a78c447c071692";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGNmMGRlZDMzNGQ4ZjEwNDlhNzhjNDQ3YzA3MTY5MiIsInN1YiI6IjY2MWUzMjViNmEzMDBiMDE3ZTMyNDUxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E_BDGMYUv5gjSAORuprYI_bJ8LzpS42U_z5vfyBrldE",
  },
};

export const getTrendingMovies = async () => {
  const { data } = await axios.get(getTrendingMoviesURL, options);
  return data;
};

export const requestMoviesByQuery = async (query = "") => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=68cf0ded334d8f1049a78c447c071692`,
    options
  );
  return data;
};

export const requestMovieDetailsById = async (movieId) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=68cf0ded334d8f1049a78c447c071692`,
    options
  );
  return data;
};

export const requestMovieCastById = async (movieId) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=68cf0ded334d8f1049a78c447c071692`,
    options
  );
  return data;
};

export const requestMovieReviewsById = async (movieId) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=68cf0ded334d8f1049a78c447c071692`,
    options
  );
  return data;
};
