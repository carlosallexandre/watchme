import { useState, useEffect, Dispatch, SetStateAction } from 'react';

import { api } from '../services/api';

import { Button } from './Button';

import '../styles/sidebar.scss';

export type GenreProps = {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

type SideBarProps = {
  setSelectedGenreId: Dispatch<SetStateAction<number>>;
  genreId: number;
}

export function SideBar({ setSelectedGenreId, genreId: selectedGenreId }: SideBarProps) {
  const [genres, setGenres] = useState<GenreProps[]>([]);

  useEffect(() => {
    api.get<GenreProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  function showMoviesFromGenre(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => showMoviesFromGenre(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}