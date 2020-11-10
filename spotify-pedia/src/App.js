import './App.css';
import TrackTable from './components/TrackTable'
import React, { Component } from 'react';
import SearchBar from './components/SearchBar';

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
      </div>
    );
  } 
}

export default App;
