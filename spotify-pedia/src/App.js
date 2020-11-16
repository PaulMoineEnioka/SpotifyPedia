import './App.css';

import { Component } from "react";
import React from "react";
import SearchBar from "./components/SearchBar";
import TrackTable from "./components/TrackTable";
import AlbumTable from './components/AlbumTable';
import SingerTable from "./components/SingerTable";

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
                return <SingerTable keyword={this.state.keyword}/>;
            case 'album':
                return <AlbumTable keyword={this.state.keyword}/>
            case 'track':
                return <TrackTable keyword={this.state.keyword}/>
            default:
                return null;
        }
    }
}

export default App;