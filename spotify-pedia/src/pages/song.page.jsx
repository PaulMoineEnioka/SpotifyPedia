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
        this.fetchData();
    }

    fetchData = async () => {
        const request = `
            SELECT DISTINCT ?Name ?Desc ?Artists
                (GROUP_CONCAT(DISTINCT ?Genres; SEPARATOR="||") AS ?Genres)  
                (GROUP_CONCAT(DISTINCT ?Albums; SEPARATOR="||") AS ?Albums) 
                (GROUP_CONCAT(DISTINCT ?ReleaseDates; SEPARATOR="||") AS ?ReleaseDates) 
                (GROUP_CONCAT(DISTINCT ?Producers; SEPARATOR="||") AS ?Producers) 
                (GROUP_CONCAT(DISTINCT ?RecordLabels; SEPARATOR="||") AS ?RecordLabels) 
                (GROUP_CONCAT(DISTINCT ?Writers; SEPARATOR="||") AS ?Writers) 
            WHERE { 
                {
                    SELECT DISTINCT ?Track ?Name (GROUP_CONCAT(DISTINCT ?Artists; SEPARATOR="||") AS ?Artists) WHERE {
                        ?Track rdf:type dbo:Single.
                        ?Track foaf:name ?Name.
                        ?Track dbo:musicalArtist ?ArtistsLinks. 
                        ?ArtistsLinks rdfs:label ?Artists. 
                        
                        FILTER(langMatches(lang(?Artists), "en")). 
                        FILTER(lcase(str(?Name)) = "${this.props.songName.toLowerCase()}").
                        FILTER(langMatches(lang(?Name), "en")). 
                    } GROUP BY ?Name ?Track
                }
            
                ?Track dbo:album ?AlbumsLinks. 
                ?Track dbo:genre ?GenresLinks. 
                ?Track dbo:releaseDate ?ReleaseDates. 
                OPTIONAL { 
                    ?Track dbo:abstract ?Desc. 
                    FILTER(langMatches(lang(?Desc), "en")). 
                } 
                OPTIONAL { 
                    ?Track dbo:producer ?ProducersLink. 
                    ?ProducersLink rdfs:label ?Producers. 
                    FILTER(langMatches(lang(?Producers), "en")). 
                } 
                OPTIONAL { 
                    ?Track dbo:recordLabel ?LabelsLinks. 
                    ?LabelsLinks rdfs:label ?RecordLabels. 
                    FILTER(langMatches(lang(?RecordLabels), "en")). 
                } 
                OPTIONAL { 
                    ?Track dbo:writer ?WritersLinks. 
                    ?WritersLinks rdfs:label ?Writers. 
                    FILTER(langMatches(lang(?Writers), "en")). 
                }
                ?AlbumsLinks rdfs:label ?Albums. 
                ?GenresLinks rdfs:label ?Genres. 
                FILTER(langMatches(lang(?Albums), "en")). 
                FILTER(langMatches(lang(?Genres), "en")).
                FILTER(regex(lcase(str(?Artists)), ".*${this.props.artists.toLowerCase()}.*")). 
            } GROUP BY ?Name ?Desc ?Artists`;
        const formData = new FormData();
        formData.append('query', request);
        const res = await(await fetch(`http://dbpedia.org/sparql`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        })).json();
        if (res.results.bindings.length) {
            this.setState({ song: res.results.bindings[0] });
        }
        this.fetchMedias();
    }

    fetchMedias = async () => {
        const trackData = this.formatTrackData();
        const medias = await mediasUtil.getTrackMedias(trackData.artists[0], "SOS");
        this.setState({medias: { picture: medias.picture, video: medias.video}});
    }

    render = () => {
        if (!this.state.song) return null;
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
        const { Name, Desc, Genres, Artists, Albums, ReleaseDates, Producers, RecordLabels, Writers} = this.state.song;
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