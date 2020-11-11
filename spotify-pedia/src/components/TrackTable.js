import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Component } from 'react';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

class TrackTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      fetchedData: false,
      error: null
    };
  }
  
  fetchdata = () =>  {
    const base = this
    console.log("base: ")
    console.log(base)
    fetch(`http://dbpedia.org/sparql?query=SELECT%20DISTINCT%20?Name%20?Desc%20(GROUP_CONCAT(DISTINCT%20?Genres;%20SEPARATOR="||")%20AS%20?Genres)%20(GROUP_CONCAT(DISTINCT%20?Artists;%20SEPARATOR="||")%20AS%20?Artists)%20(GROUP_CONCAT(DISTINCT%20?Albums;%20SEPARATOR="||")%20AS%20?Albums)%20(GROUP_CONCAT(DISTINCT%20?ReleaseDates;%20SEPARATOR="||")%20AS%20?ReleaseDates)%20(GROUP_CONCAT(DISTINCT%20?Producers;%20SEPARATOR="||")%20AS%20?Producers)%20(GROUP_CONCAT(DISTINCT%20?RecordLabels;%20SEPARATOR="||")%20AS%20?RecordLabels)%20(GROUP_CONCAT(DISTINCT%20?Writers;%20SEPARATOR="||")%20AS%20?Writers)%20WHERE%20{%20?Track%20rdf:type%20dbo:Single.%20?Track%20rdfs:label%20?Name.%20?Track%20dbo:album%20?AlbumsLinks.%20?Track%20dbo:genre%20?GenresLinks.%20?Track%20dbo:musicalArtist%20?ArtistsLinks.%20?Track%20dbo:releaseDate%20?ReleaseDates.%20OPTIONAL%20{%20?Track%20dbo:abstract%20?Desc.%20FILTER(langMatches(lang(?Desc),%20"en")).%20}%20OPTIONAL%20{%20?Track%20dbo:producer%20?ProducersLink.%20?ProducersLink%20rdfs:label%20?Producers.%20FILTER(langMatches(lang(?Producers),%20"en")).%20}%20OPTIONAL%20{%20?Track%20dbo:recordLabel%20?LabelsLinks.%20?LabelsLinks%20rdfs:label%20?RecordLabels.%20FILTER(langMatches(lang(?RecordLabels),%20"en")).%20}%20OPTIONAL%20{%20?Track%20dbo:writer%20?WritersLinks.%20?WritersLinks%20rdfs:label%20?Writers.%20FILTER(langMatches(lang(?Writers),%20"en")).%20}%20?AlbumsLinks%20rdfs:label%20?Albums.%20?GenresLinks%20rdfs:label%20?Genres.%20?ArtistsLinks%20rdfs:label%20?Artists.%20FILTER(regex(?Name,%20".*${this.props.keyword}.*")).%20FILTER(langMatches(lang(?Name),%20"en")).%20FILTER(langMatches(lang(?Albums),%20"en")).%20FILTER(langMatches(lang(?Genres),%20"en")).%20FILTER(langMatches(lang(?Artists),%20"en")).%20}%20GROUP%20BY%20?Name%20?Desc`, {
        "method": "GET",
        "headers": {
            "Accept": "application/json"
        }
    }).then(res => res.json())
    .then(result => {
      console.log(base)
      console.log(result)
      base.setState({
        fetchedData: true,
        tracks: result.results.bindings
      });
    }).catch(err => {
      base.setState({
        error: err
      });
    });
  }

  componentDidMount = () => {
    this.fetchdata();
  }

  componentDidUpdate = () => {
    this.fetchdata();
  }

  render = () => {
    const { tracks , fetchedData } = this.state;
    console.log("state:");
    console.log(this.state);
    console.log(this.props);
    return (
      <TableContainer>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Genres</StyledTableCell>
              <StyledTableCell align="right">Albums</StyledTableCell>
              <StyledTableCell align="right">Artists</StyledTableCell>
              <StyledTableCell align="right">Release Dates</StyledTableCell>
              <StyledTableCell align="right">Producers</StyledTableCell>
              <StyledTableCell align="right">Record Labels</StyledTableCell>
              <StyledTableCell align="right">Writers</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {tracks.map((track) => (
            <StyledTableRow key={track.name}>
              <StyledTableCell align="right">{track.Name.value}</StyledTableCell>
              <StyledTableCell align="right">{track.Genres.value}</StyledTableCell>
              <StyledTableCell align="right">{track.Albums.value}</StyledTableCell>
              <StyledTableCell align="right">{track.Artists.value}</StyledTableCell>
              <StyledTableCell align="right">{track.ReleaseDates.value}</StyledTableCell>
              <StyledTableCell align="right">{track.Producers.value}</StyledTableCell>
              <StyledTableCell align="right">{track.RecordLabels.value}</StyledTableCell>
              <StyledTableCell align="right">{track.Writers.value}</StyledTableCell>
            </StyledTableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}

export default TrackTable;