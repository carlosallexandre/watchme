import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import { GenresProvider } from './hooks/useGenreContext';

import './styles/global.scss';

export function App() {
  return (
    <GenresProvider>
      <SideBar />
      <Content />
    </GenresProvider>
  )
}