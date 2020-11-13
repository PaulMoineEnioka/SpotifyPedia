import './App.css';
import React from "react";
import { Component } from "react";
import AlbumPage from "./pages/album.page";
import SongPage from "./pages/song.page";
import songData from './song.data';
import SearchBar from "./components/SearchBar"
import TrackTable from "./components/TrackTable"
import AlbumTable from './components/AlbumTable';
import TrackTableSinger from "./components/TrackTableSinger";
import GroupTable from "./components/GroupTable";

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
    /*
    return (
      <div>
        <SearchBar updateKeyword={this.updateKeyword}/>
        <GroupTable keyword={this.state.keyword}></GroupTable>
      </div>
    );
    */
    return(
      <div>
        <AlbumPage album = {['"Thriller"@en','"Michael Jackson"@en']}/>
      </div>
    );
  }
}

export default App;