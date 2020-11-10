import './App.css';

import SongPage from "./pages/song.page";
import songData from './song.data';

function App() {
    return ( <
        SongPage song = { songData[1] }
        />
    );
}

export default App;