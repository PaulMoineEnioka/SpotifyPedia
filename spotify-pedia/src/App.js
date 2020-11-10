import './App.css';
import songData from './song.data';
import SongPage from "./pages/song.page";

function App() {
  return (
      <SongPage song={songData[1]}/>
  );
}

export default App;
