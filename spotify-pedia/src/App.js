import './App.css';
import TrackTable from './components/TrackTable'
import React, { Component } from 'react';
import SearchBar from './components/SearchBar';

class App extends Component {
  render() {
    return  [
      <SearchBar/>,
      <TrackTable/>
    ];
  } 
}

export default App;
