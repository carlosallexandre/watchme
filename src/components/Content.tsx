import { useEffect, useState } from 'react';

import { api } from '../services/api';

import { Header } from './Header';
import { MovieCard } from './MovieCard';
import { GenreProps } from './SideBar';

import '../styles/content.scss';

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

type ContentProps = {
  genreId: number;
}

export function Content({ genreId: selectedGenreId }: ContentProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreProps>({} as GenreProps);

  useEffect(() => {
    Promise.all([
      api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`),
      api.get<GenreProps>(`genres/${selectedGenreId}`)
    ]).then(response => {
      const movies = response[0].data;
      const genre = response[1].data;

      setMovies(movies);
      setSelectedGenre(genre);
    });
  }, [selectedGenreId])

  return(
    <div className="container">
        <Header genreTitle={selectedGenre.title} />
        
        <main>
          <div className="movies-list">
            {movies.map(movie => (
              <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
            ))}
          </div>
        </main>

    </div>
  )
}