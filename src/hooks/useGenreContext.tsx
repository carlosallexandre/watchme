import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../services/api';

interface GenreProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface GenresContextData {
  genres: GenreProps[];
  selectedGenre: GenreProps;
  showMoviesFromGenre: (id: number) => void;
}

interface GenresProviderProps {
  children: ReactNode;
}

export const GenresContext = createContext({} as GenresContextData);

export function GenresProvider({ children }: GenresProviderProps) {
  const [genres, setGenres] = useState<GenreProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreProps>({} as GenreProps);
  
  useEffect(() => {
    api.get<GenreProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    setSelectedGenre(genres[0] || {});
  }, [genres])

  function showMoviesFromGenre(id: number) {
    setSelectedGenre(genres.find(genre => genre.id === id) || {} as GenreProps);
  }

  return (
    <GenresContext.Provider value={{
      genres,
      selectedGenre,
      showMoviesFromGenre,
    }}>
      {children}
    </GenresContext.Provider>
  )
}