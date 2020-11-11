import React from "react";
import { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
    };
  }

  updateKeyword = () => {
    this.props.updateKeyword(this.state.keyword);
  }

  render = () => {
    const BarStyling = {
      width: "30rem",
      background: "#F2F1F9",
      border: "none",
      padding: "0.75rem"
    };
    return (
      <div>
        <input
          style={BarStyling}
          key="search-bar"
          value={this.state.keyword}
          placeholder={"What are you looking for?"}
          onChange={(e) =>
            this.setState({
              keyword: e.target.value,
            })
          }
        />
        <Button variant="contained" color="primary" onClick={this.updateKeyword}>
          Search
        </Button>
      </div>
    );
  };
}

export default SearchBar;
