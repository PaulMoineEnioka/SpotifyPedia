import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import {IconButton} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import AlbumPage from "../pages/album.page";
import Dialog from "@material-ui/core/Dialog";
import SongPage from "../pages/song.page";
import SingerPage from "../pages/singer.page";
import GroupPage from '../pages/group.page';

export default class SearchResults extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showDetails: false,
            details: {
                type: '',

            }
        }
    }

    renderResult = (result) => {
        switch (result.type) {
            case "track":
                return this.renderTrack(result.data);
            case "artist":
                return this.renderArtist(result.data);
            case "album":
                return this.renderAlbum(result.data);
            case "group":
                return this.renderGroup(result.data);
            default:
                return null;
        }
    };

    render = () => {
        return (
            <>
                <div className="results">
                    {this.props.results.map(result => this.renderResult(result))}
                </div>
                {this.renderDetails()}
            </>
        )
    }

    renderTrack = (track) => {
        return <div onClick={() => this.openDetails('track', {trackId: track.Track.value}
        )} className={"result track"} key={"track_" + track.Name.value + track.Artists.value}>
            <span className="type">Track</span>
            <span className="name">{track.Name.value}</span>
            <span className="artists">{track.Artists.value.split("||").join(', ')}</span>
        </div>
    };

    renderArtist = (singer) => {
        return <div onClick={() => this.openDetails('artist', {singer})} className="result singer"
                    key={"singer_" + singer.Id.value}>
            <span className="type">Singer</span>
            <span className="name">{singer.Name.value}</span>
        </div>
    }

    renderAlbum = (album) => {
        return <div onClick={() => this.openDetails("album", {
                album: '"' + album.AlbumName.value + '"@en',
                artists: '"' + album.ArtistName.value + '"@en'
            }
        )} className="result album" key={"album_" + album.AlbumName.value + album.ArtistName.value}>
            <span className="type">Album</span>
            <span className="name">{album.AlbumName.value}</span>
            <span className="artists">{album.ArtistName.value}</span>
        </div>
    }

    renderGroup = (group) => {
        return <div onClick={() => this.openDetails('group', { group })} className="result group" key={group.Id.value}>
            <span className="type">Group</span>
            <span className="name">{group.Name.value}</span>
        </div>
    }

    renderDetails = () => {
        return (
          <Dialog onClose={this.handleClose} open={this.state.showDetails} fullScreen={true}>
              <DialogTitle id="simple-dialog-title">
                  <IconButton onClick={this.handleClose}>
                      <CloseIcon />
                  </IconButton>
              </DialogTitle>
              {
                  this.state.details.type === 'album' ?
                    <AlbumPage albumName={this.state.details.album} artistName={this.state.details.artists}
                               openDetails={this.openDetails} />
                    : this.state.details.type === 'artist' ?
                    <SingerPage singer={this.state.details.singer} openDetails={this.openDetails} />
                    : this.state.details.type === 'group' ?
                      <GroupPage group={this.state.details.group} openDetails={this.openDetails} />
                      : <SongPage openDetails={this.openDetails} trackId={this.state.details.trackId} />
              }
          </Dialog>);
    }

    openDetails = (type, data) => {
        this.setState({showDetails: true, details: {type, ...data}});
    };

    handleClose = () => {
        this.setState({showDetails: false});
    }
}