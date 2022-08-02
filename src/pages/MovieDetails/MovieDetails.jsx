// import { useState } from 'react';
import { useEffect, useState } from 'react';
import { useParams, Outlet, useLocation } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { getMovieById } from 'service/FetchMovies';
import MovieExtraInfo from 'components/MovieExtraInfo/MovieExtraInfo';
import { Container, MovieInfoBox, List, NavItem } from './MovieDetails.styled';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [detail, setDetail] = useState([]);
  const location = useLocation();
  const genreList = [];
  const IMAGE_URL = 'https://image.tmdb.org/t/p/w300';

  useEffect(() => {
    getMovieById(movieId).then(movie => setDetail(movie));
  }, [movieId]);
  if (!detail.genres) {
    return null;
  }
  detail.genres.map(genre => genreList.push(genre.name));
  const { poster_path, original_title, release_date, overview } = detail;
console.log('locationDetails :>> ', location.state);
  const backLinkHref = location.state?.from ?? '/movies';


  return (
    <main>
      <NavItem to={backLinkHref}>
        <IoArrowBack size="20px" />
        Back
      </NavItem>
      {detail && (
        <Container>
          <img src={`${IMAGE_URL}${poster_path}`} alt={original_title} />
          <MovieInfoBox>
            <h1>
              {original_title} ({Number.parseInt(release_date)})
            </h1>
            <p>User Score: 100% </p>
            <h2>Overview</h2>
            <p>{overview}</p>
            <h3>Genres</h3>
            <List>
              {genreList.length > 0 &&
                genreList.map(genre => <li key={genre}>{genre}</li>)}
            </List>
          </MovieInfoBox>
        </Container>
      )}
      <MovieExtraInfo location={backLinkHref} />
      <Outlet />
    </main>
  );
};

export default MovieDetails;
