import './App.css';

import { Component } from "react";
import React from "react";
import SearchBar from "./components/SearchBar";
import TrackTable from "./components/TrackTable";
import AlbumTable from './components/AlbumTable';
import SingerTable from "./components/SingerTable";
import SearchResults from "./components/SearchResults";
import searchDbpediaUtil from './utils/search.dbpedia.util';
import GroupTable from './components/GroupTable';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: null,
            type: null,
            results: [],
        };
    }

    updateKeyword = async (value, type) => {
        this.setState({ keyword: value, type });
        switch (type) {
            case "artist":
                const singers = await searchDbpediaUtil.searchSinger(value);
                this.setState({ results: [...singers.map(s => ({ type: 'artist', data: s }))] });
                break;
            case "album":
                const albums = await searchDbpediaUtil.searchAlbum(value);
                this.setState({ results: [...albums.map(a => ({ type: 'album', data: a }))] });
                break;
            case "track":
                const tracks = await searchDbpediaUtil.searchTrack(value);
                this.setState({ results: [...tracks.map(t => ({ type: 'track', data: t }))] });
                break;
            case "group":
                const groups = await searchDbpediaUtil.searchGroup(value);
                this.setState({ results: [...groups.map(g => ({ type: 'group', data: g }))] });
                break;
            default:
                const albumss = await searchDbpediaUtil.searchAlbum(value);
                const singerss = await searchDbpediaUtil.searchSinger(value);
                const trackss = await searchDbpediaUtil.searchTrack(value);
                const groupss = await searchDbpediaUtil.searchGroup(value);
                this.setState({
                    results: [...albumss.map(a => ({
                        type: 'album',
                        data: a
                    })), ...singerss.map(s => ({ type: 'artist', data: s })), ...trackss.map(t => ({
                        type: 'track',
                        data: t
                    })), ...groupss.map(g => ({ type: 'group', data: g }))]
                });
        }
    }

    render() {
        return (
          <div>
              <SearchBar updateKeyword={this.updateKeyword} />
              <SearchResults results={this.state.results} />
          </div>
        );
    }

    renderTable = () => {
        switch (this.state.type) {
            case 'artist':
                return <SingerTable keyword={this.state.keyword}/>;
            case 'group':
              return <GroupTable keyword={this.state.keyword}/>;
            case 'album':
                return <AlbumTable keyword={this.state.keyword} />
            case 'track':
                return <TrackTable keyword={this.state.keyword} />
            default:
                return null;
        }
    }
}

export default App;