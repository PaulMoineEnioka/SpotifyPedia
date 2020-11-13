import React from "react";
import mediasUtil from '../utils/medias.util';
import "../style/song.page.css";

export default class SingerPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            medias: {
                picture: '',
            },
            singer: {},
        }
    }

    fetchMedias = async () => {
        if(this.props.singer) {
            const medias = await mediasUtil.getSingerMedias(this.props.singer.Name.value);
            this.setState(
                {
                    medias: { picture: medias.picture,}
                }
            );
        }
    }

    fetchData = () => {
        const singer = this.props.singer;
        const queryString = "select ?Singer ?Name ?BirthName ?BirthDate ?Description ?Quote ?Gender str(?StartYear) as ?StartYearString GROUP_CONCAT(DISTINCT ?Homepage;SEPARATOR=\" | \") as ?Homepages GROUP_CONCAT(DISTINCT ?BirthPlace;SEPARATOR=\" | \") as ?BirthPlaces GROUP_CONCAT(DISTINCT ?Album;SEPARATOR=\" | \") as ?Albums where { ?Singer rdf:type dbo:MusicalArtist. ?Singer rdfs:label ?Name. ?Singer dbo:wikiPageID  ?Id.  ?Singer dbo:activeYearsStartYear ?StartYear. OPTIONAL{ ?Singer dbo:birthName ?BirthName. }. OPTIONAL{ ?Singer dct:description ?Description. }. OPTIONAL { ?Singer dbp:quote ?Quote }. OPTIONAL { ?Singer foaf:gender ?Gender }. OPTIONAL { ?Singer foaf:homepage ?Homepage }. OPTIONAL{ ?Singer dbo:birthDate ?BirthDate. FILTER(regex(str(?BirthDate),\"(?!0000)[0-9]{4}-((0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])-(29|30)|(0[13578]|1[02])-31)\")). }. OPTIONAL{ ?Singer dbo:birthPlace ?BirthPlace. ?BirthPlace rdf:type dbo:Location. }. OPTIONAL{ ?Singer ^dbo:artist ?Album. ?Album rdf:type dbo:Album. }. FILTER(regex(?Id, \""+singer.Id.value+"\") && langMatches(lang(?Name),\"EN\")). } LIMIT 1";
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
                this.setState({
                    singer: response.results.bindings[0],
                });
            }
            ); // parses JSON response into native JavaScript objects
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.singer !== prevProps.singer) 
        {
            this.fetchData();
            this.fetchMedias();
        }
    }

    affichageAlbum(singer) {
        if(singer.Albums.value === "") return(<div></div>);
        let albums = this.state.singer.Albums.value.split("|");
        return albums.map((val) => {
            val = val.replace("http://dbpedia.org/resource/","");
            return (<div key={val}>{val}</div>);
        });
    }

    affichageBirthPlaces(singer) {
        if(singer.BirthPlaces.value === "") return(<div></div>);
        let birthPlaces = this.state.singer.BirthPlaces.value;
        birthPlaces = birthPlaces.replaceAll("http://dbpedia.org/resource/","");
        birthPlaces = birthPlaces.replaceAll(" | ",", ");
        return birthPlaces;
    }

    affichageHomepages(singer) {
        if(singer.Homepages.value === "") return(<div></div>);
        let homepages = this.state.singer.Homepages.value.split("|");
        return homepages.map((val) => {
            return (<a key={val} href={val} rel="noreferrer" target="_blank">{val}</a>);
        });
    }

    render = () => {
        if(!this.props.singer){
            return(<div></div>);
        }
        const singer = this.state.singer;

        if(!singer.Name) {
            singer.Name = {};
            singer.Name.value = "";
        }

        if(!singer.BirthName) {
            singer.BirthName = {};
            singer.BirthName.value = "";
        }

        if(!singer.BirthDate) {
            singer.BirthDate = {};
            singer.BirthDate.value = "";
        }

        if(!singer.Description) {
            singer.Description = {};
            singer.Description.value = "";
        }

        if(!singer.Quote) {
            singer.Quote = {};
            singer.Quote.value = "";
        }

        if(!singer.Gender) {
            singer.Gender = {};
            singer.Gender.value = "";
        }

        if(!singer.Homepages) {
            singer.Homepages = {};
            singer.Homepages.value = "";
        }

        if(!singer.Albums) {
            singer.Albums = {};
            singer.Albums.value = "";
        }

        if(!singer.BirthPlaces) {
            singer.BirthPlaces = {};
            singer.BirthPlaces.value = "";
        }

        if(!singer.StartYearString) {
            singer.StartYearString = {};
            singer.StartYearString.value = "";
        }


        return (
            <div className={"page"}>
                <div className="panel">
                    <div className="titlebar">
                        <h1>{singer.Name.value}</h1>
                        <h2>{singer.BirthName.value}</h2>
                    </div>
                    <div className="topbar">
                        <div>
                            <strong>Description</strong>
                            <p>{singer.Description.value}</p>
                        </div>
                        <img src={this.state.medias.picture} alt={""}/>
                    </div>
                    <div className="main-infos">
                        <div><strong>Albums : </strong> 
                        <br/>
                        {this.affichageAlbum(singer)}
                        </div>
                    </div>
                    <div>
                        <strong>Gender : </strong>
                        {
                            singer.Gender.value
                        }
                    </div>
                    <br/>
                    <br/>
                    <div>
                        <strong>Birth Date : </strong>
                        {
                            singer.BirthDate.value
                        }
                    </div>
                    <br/>
                    <div>
                        <strong>Birth Place : </strong>
                        {
                            this.affichageBirthPlaces(singer)
                        }
                    </div>
                    <br/>
                    <div>
                        <strong>Start Year : </strong>
                        {
                            singer.StartYearString.value
                        }
                    </div>
                    <br/>
                    <div>
                        <strong>Quote : </strong>
                        {
                            singer.Quote.value
                        }
                    </div>
                    <br/>
                    <div>
                        <strong>Homepages : </strong>
                        {
                            this.affichageHomepages(singer)
                        }
                    </div>
                </div>
            </div>
        );
    };
}