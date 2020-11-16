import React from "react";
import { Component } from "react";
import Button from '@material-ui/core/Button';


class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: "",
            type: 'artist'
        };
    }

    updateKeyword = () => {
        this.props.updateKeyword(this.state.keyword.toLowerCase(), this.state.type);
    }

    onChangeType = (event) => {
        this.setState({ type: event.target.value });
    }

    onChangeSearch = (event) => {
        this.state.keyword = event.target.value;
        this.updateKeyword()
        this.setState({ keyword: event.target.value });
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
                    onChange={this.onChangeSearch}
                />
                <Button variant="contained" color="primary" onClick={this.updateKeyword}>
                    Search
                </Button>
                <select onChange={this.onChangeType} value={this.state.type}>
                    <option value="artist">Rechercher un artiste</option>
                    <option value="album">Rechercher un album</option>
                    <option value="track">Rechercher une musique</option>
                </select>
            </div>
        );
    };
}

export default SearchBar;


/*
<iframe scrolling="no" frameBorder="0" allowTransparency="true"
        src="https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=EF5466&layout=&size=medium&type=album&id=1238967&app_id=1"
        width="700" height="350"></iframe>

https://api.deezer.com/search/album?q=album:%22loud%22%20artist:%22rihanna%22*/
