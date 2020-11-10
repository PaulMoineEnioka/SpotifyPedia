import React from 'react';
import { Component } from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: null
        };
    }
  render = () => {
    return (
        <input 
         key="search-bar"
         value={this.state.keyword}
         placeholder={"What are you looking for?"}
         onChange= { (e) => this.setState({
            keyword: e.target.value}) }
        />
      );
  }
}

export default SearchBar