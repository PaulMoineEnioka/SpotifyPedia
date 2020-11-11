import './App.css';
import React from "react";
import { Component } from "react";
import SongPage from "./pages/song.page";
import songData from './song.data';
import SearchBar from "./components/SearchBar";
import TrackTable from "./components/TrackTable";
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
    console.log("Updated in app");
    console.log(this.state.keyword);
  }

  render() {
    return (
      <div>
        <SearchBar updateKeyword={this.updateKeyword}/>
        <TrackTable keyword={this.state.keyword}/>
        <SongPage song = { songData[1] }/>
      </div>
    );
  }
}

export default App;