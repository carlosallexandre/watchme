import { useContext, useEffect, useState } from 'react';

import { api } from '../services/api';

import { Header } from './Header';
import { MovieCard } from './MovieCard';

import '../styles/content.scss';
import { GenresContext } from '../hooks/useGenreContext';

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

export function Content() {
  const [movies, setMovies] = useState<MovieProps[]>([]);

  const { selectedGenre } = useContext(GenresContext);

  useEffect(() => {
    if (selectedGenre.id)
      api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenre.id}`).then(response => {
        setMovies(response.data);
      });
  }, [selectedGenre])

  return(
    <div className="container">
        <Header genreTitle={selectedGenre.title || ''} />
        
        <main>
          <div className="movies-list">
            {movies.map(movie => (
              <MovieCard 
                key ={movie.imdbID} 
                title={movie.Title} 
                poster={movie.Poster} 
                runtime={movie.Runtime} 
                rating={movie.Ratings[0].Value} 
              />
            ))}
          </div>
        </main>

    </div>
  )
}