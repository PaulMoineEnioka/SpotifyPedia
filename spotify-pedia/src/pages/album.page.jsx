import React from "react";
import mediasUtil from '../utils/medias.util';
import "../style/album.page.css";


export default class AlbumPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            albums: [],
            albumName : props.album[0],
            albumArtist : props.album[1]
        };
   }

   fetchData = () => {
    const queryString = 'SELECT ?AlbumName ?ArtistName ?Description COUNT(DISTINCT ?TitleName) AS ?Number_of_titles	(GROUP_CONCAT(DISTINCT ?TitleName; SEPARATOR="||") AS ?Titles)	(GROUP_CONCAT(DISTINCT ?Genre_name; SEPARATOR="||") AS ?Genres)	(GROUP_CONCAT(DISTINCT ?Award; SEPARATOR="||") AS ?Awards)	(GROUP_CONCAT(DISTINCT ?Release_Date; SEPARATOR="||") AS ?Release_Dates) WHERE { ?Album a schema:MusicAlbum; foaf:name ?AlbumName;	dbo:artist ?Artist. ?Artist foaf:name ?ArtistName. OPTIONAL { { ?Album dbp:title ?Title. ?Title rdfs:label ?TitleName. FILTER(langMatches(lang(?TitleName), "en")). } UNION { ?Album dbp:title ?TitleName. FILTER(datatype(?TitleName) = rdf:langString).} }OPTIONAL {?Album dbp:award ?Award.}	OPTIONAL {?Album dbo:releaseDate ?Release_Date.	} OPTIONAL { ?Album dbo:genre ?Genre. ?Genre rdfs:label ?Genre_name.	FILTER(langMatches(lang(?Genre_name), "en")).	}	OPTIONAL {	?Album dbo:abstract ?Description. FILTER(langMatches(lang(?Description), "en")). } FILTER(?AlbumName = '+ this.state.albumName + '). FILTER(?ArtistName = ' + this.state.albumArtist + ').}';
    
    console.log("request="+queryString);
   
    const formData = new FormData();
    formData.append('query', queryString)
    fetch("http://dbpedia.org/sparql", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Accept': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData // body data type must match "Content-Type" header
    }).then(response => response.json())
        .then(response => {
            this.setState( {
                albums: response.results.bindings,
            });
            console.log(this.state.albums);
            console.log(response.results);
            console.log(response.results.bindings);
        }
        ); // parses JSON response into native JavaScript objects
    }

    componentDidMount = () => {
        this.fetchData();
    }

    
    renderDesc() {
        if (this.state.albums.length > 0) {
            return (
                    
                    <div className="topbar">
                        <div>
                            <strong>Description</strong>
                            <p>{this.state.albums[0].Description.value}</p>
                        </div>            
                    </div>             
        );
        } else {
            return ("...");
        }
    }

    renderTitleBar() {
        if (this.state.albums.length > 0) {
            return (
                <div className="titlebar">
                    <h1>{this.state.albums[0].AlbumName.value}</h1>
                    <h2>{this.state.albums[0].ArtistName.value}</h2>
                </div>            
            );
        } else {
            return ("...");
        }
    }

    renderMainInfos() {
        if (this.state.albums.length > 0) {
            const genres = this.state.albums[0].Genres.value.split('||');
            const releaseDates = this.state.albums[0].Release_Dates.value.split('||');
            return (
                <div className="main-infos">
                        <div>
                            <strong>Genres:</strong>
                            {
                                genres.length ?
                                    <ul>
                                        {genres.map(p => (
                                            <li key={p}>{p}</li>
                                        ))}
                                    </ul> : <span>Unknown</span>
                            }
                        </div>
                        <div>
                            <strong>Release date(s):</strong> 
                            {
                                
                                releaseDates.length ?
                                    <ul>
                                        {releaseDates.map(p => (
                                            <li key={p}>{p}</li>
                                        ))}
                                    </ul> : <span>Unknown</span>
                                
                            }
                        </div>
                </div>         
            );
        } else {
            return ("...");
        }
    }
    

    renderTitles() {
        if (this.state.albums.length > 0) {
            const titles = this.state.albums[0].Titles.value.split('||');

            return (
                <div className="additional-infos">
                    <div>
                        <strong>Titles ({titles.length ? titles.length : <span>Unknown</span>}):</strong>
                        {
                            titles.length ?
                                <ul>
                                    {titles.map(p => (
                                        <li key={p}>{p}</li>
                                    ))}
                                </ul> : <span>Unknown</span>
                        }
                     
                    </div>
                </div>  
            );
        } else {
            return ("...");
        }
    }

    renderAwards() {
        if (this.state.albums.length > 0) {
            const awards = this.state.albums[0].Awards.value.split('||');

            return (
                <div className="additional-infos">
                    <div>
                        <strong>Awards:</strong>
                        {
                            awards.length ?
                                <ul>
                                    {awards.map(p => (
                                        <li key={p}>{p}</li>
                                    ))}
                                </ul> : <span>Unknown</span>
                        }
                     
                    </div>
                </div>  
            );
        } else {
            return ("...");
        }
    }

    render = () => {
        console.log(this.state);
        return (
            <div className={"page"}>
                <div className="panel">

                    {this.renderTitleBar()}
                    {this.renderDesc()}
                    
                    {this.renderMainInfos()}
                    {this.renderTitles()}
                    {this.renderAwards()}

                    
                    
                </div>

                
                    
            </div>
        )
    };

}