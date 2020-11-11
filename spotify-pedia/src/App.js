import './App.css';

import { Component } from "react";
import React from "react";
import SearchBar from "./components/SearchBar";
import SongPage from "./pages/song.page";
import TrackTable from "./components/TrackTable";
import TrackTableSinger from "./components/TrackTableSinger";
import songData from './song.data';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: null
        };
    }

    updateKeyword = (value) => {
        this.setState({ keyword: value });
        console.log("Updated in app");
        console.log(this.state.keyword);
    }

    render() {
        return ( <
            div >
            <
            SearchBar updateKeyword = { this.updateKeyword }
            /> <
            TrackTable keyword = { this.state.keyword }
            /> <
            SongPage song = { songData[1] }
            /> <
            /div>
        );
    }
}

export default App;