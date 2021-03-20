import { useContext } from 'react';

import { GenresContext } from '../hooks/useGenreContext';
import { Button } from './Button';

import '../styles/sidebar.scss';

export function SideBar() {
  const {
    genres,
    selectedGenre,
    showMoviesFromGenre,
  } = useContext(GenresContext);

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
            selected={selectedGenre.id === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}