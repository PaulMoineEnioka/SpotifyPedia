import './App.css';
import React from "react";
import { Component } from "react";
import SongPage from "./pages/song.page";
import songData from './song.data';
import SearchBar from "./components/SearchBar"
import TrackTable from "./components/TrackTable"
import AlbumTable from './components/AlbumTable';
import TrackTableSinger from "./components/TrackTableSinger";


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      keyword: null
    };
  }

  updateKeyword = (value) => {
    this.setState({keyword: value});
  }

  render() {
    return (
      <div>
        <SearchBar updateKeyword={this.updateKeyword}/>
        <TrackTable keyword={this.state.keyword}/>
        <SongPage song = { songData[1] }/>
      </div>
    );
    /*return (
      <div>
        <SearchBar updateKeyword={this.updateKeyword}/>
        <TrackTableSinger keyword={this.state.keyword}></TrackTableSinger>
      </div>
    );*/
  }
}

export default App;