import './App.css';

import { Component } from "react";
import React from "react";
import SearchBar from "./components/SearchBar";
import SongPage from "./pages/song.page";
import TrackTable from "./components/TrackTable";
import songData from './song.data';
import AlbumTable from './components/AlbumTable';
import TrackTableSinger from "./components/TrackTableSinger";
import GroupTable from "./components/GroupTable";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: null,
            type: null,
        };
    }

    updateKeyword = (value, type) => {
        this.setState({keyword: value, type});
    }

    render() {
        /*return (
          <div>
            <SearchBar updateKeyword={this.updateKeyword}/>
            <TrackTable keyword={this.state.keyword}/>
            <SongPage song = { songData[1] }/>
          </div>
        );*/
        /*return (
          <div>
            <SearchBar updateKeyword={this.updateKeyword}/>
            <TrackTableSinger keyword={this.state.keyword}></TrackTableSinger>
          </div>
        );*/

        return (
            <div>
                <SearchBar updateKeyword={this.updateKeyword}/>
                {this.renderTable()}
            </div>
        );
    }

    renderTable = () => {
        switch (this.state.type) {
            case 'artist':
                return null;
            case 'album':
                return null;
            case 'track':
                return <TrackTable keyword={this.state.keyword}/>
            default:
                return null;
        }
    }
}

export default App;