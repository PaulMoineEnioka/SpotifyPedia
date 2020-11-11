import React from "react";
import mediasUtil from '../utils/medias.util';
import "../style/song.page.css";

export default class SongPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            medias: {
                picture: '',
                video: '',
            }
        }
    }

    componentDidMount() {
        this.fetchMedias();
    }

    fetchMedias = async () => {
        const trackData = this.formatTrackData();
        const medias = await mediasUtil.getTrackMedias(trackData.artists[0], "SOS");
        this.setState({medias: { picture: medias.picture, video: medias.video}});
    }

    render = () => {
        const trackData = this.formatTrackData();

        return (
            <div className={"page"}>
                <div className="panel">
                    <div className="titlebar">
                        <h1>{trackData.name}</h1>
                        <h2>{trackData.artists.join(', ')}</h2>
                    </div>
                    <div className="topbar">
                        <div>
                            <strong>Description</strong>
                            <p>{trackData.desc}</p>
                        </div>
                        <img src={this.state.medias.picture} alt={""}/>
                    </div>
                    <div className="main-infos">
                        <div><strong>Album{trackData.albums.length > 1 ? 's': ''}:</strong> {trackData.albums.join(', ')}</div>
                        <div><strong>First release:</strong> {trackData.releaseDate[0]}</div>
                    </div>
                    <div className="additional-infos">
                        <div>
                            <strong>Producers</strong>
                            {
                                trackData.producers.length ?
                                    <ul>
                                        {trackData.producers.map(p => (
                                            <li key={p}>{p}</li>
                                        ))}
                                    </ul> : <span>Unknown</span>
                            }

                        </div>
                        <div>
                            <strong>Record labels</strong>
                            {
                                trackData.recordLabels.length ?
                                    <ul>
                                        {trackData.recordLabels.map(p => (
                                            <li key={p}>{p}</li>
                                        ))}
                                    </ul> : <span>Unknown</span>
                            }
                        </div>
                        <div>
                            <strong>Writers</strong>
                            {
                                trackData.writers.length ?
                                    <ul>
                                        {trackData.writers.map(p => (
                                            <li key={p}>{p}</li>
                                        ))}
                                    </ul> : <span>Unknown</span>
                            }
                        </div>
                        <div>
                            <strong>Genres</strong>
                            {
                                trackData.genres.length ?
                                    <ul>
                                        {trackData.genres.map(p => (
                                            <li key={p}>{p}</li>
                                        ))}
                                    </ul> : <span>Unknown</span>
                            }
                        </div>
                    </div>
                    <div className="bottombar">
                        <div className="video">
                            {this.state.medias.video ?

                                <iframe width="560" height="315" src={`https://www.youtube-nocookie.com/embed/${this.state.medias.video}`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen>
                                </iframe> : null

                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    formatTrackData = () => {
        const { Name, Desc, Genres, Artists, Albums, ReleaseDates, Producers, RecordLabels, Writers} = this.props.song;
        return {
            name: Name.value,
            desc: Desc.value,
            genres: Genres.value.split('||'),
            artists: Artists.value.split('||'),
            albums: Albums.value.split('||'),
            releaseDate: ReleaseDates.value.split('||'),
            producers: Producers.value ? Producers.value.split('||') : [],
            recordLabels: RecordLabels.value.split('||'),
            writers: Writers.value.split('||')
        }
    }

}