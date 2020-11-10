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

class AlbumTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      fetchedData: false,
      error: null
    };
  }
  componentDidMount = () => {
    const base = this
    console.log("base: ")
    console.log(base)
    fetch(`http://dbpedia.org/sparql?query=SELECT%20?AlbumName%20?ArtistName%20?Description%20COUNT(DISTINCT%20?TitleName)%20AS%20?Number_of_titles%20(GROUP_CONCAT(DISTINCT%20?TitleName;%20SEPARATOR=%22||%22)%20AS%20?Titles)%20(GROUP_CONCAT(DISTINCT%20?Genre_name;%20SEPARATOR=%22||%22)%20AS%20?Genres)%20(GROUP_CONCAT(DISTINCT%20?Award;%20SEPARATOR=%22||%22)%20AS%20?Awards)%20(GROUP_CONCAT(DISTINCT%20?Release_Date;%20SEPARATOR=%22||%22)%20AS%20?Release_Dates)%20WHERE%20{%20?Album%20a%20schema:MusicAlbum;%20foaf:name%20?AlbumName;%20dbo:artist%20?Artist.%20?Artist%20foaf:name%20?ArtistName.%20OPTIONAL%20{%20{%20?Album%20dbp:title%20?Title.%20?Title%20rdfs:label%20?TitleName.%20FILTER(langMatches(lang(?TitleName),%20%22en%22)).%20}%20UNION%20{%20?Album%20dbp:title%20?TitleName.%20FILTER(datatype(?TitleName)%20=%20rdf:langString).%20}%20}%20OPTIONAL%20{%20?Album%20dbp:award%20?Award.%20}%20OPTIONAL%20{%20?Album%20dbo:releaseDate%20?Release_Date.%20}%20OPTIONAL%20{%20?Album%20dbo:genre%20?Genre.%20?Genre%20rdfs:label%20?Genre_name.%20FILTER(langMatches(lang(?Genre_name),%20%22en%22)).%20}%20OPTIONAL%20{%20?Album%20dbo:abstract%20?Description.%20FILTER(langMatches(lang(?Description),%20%22en%22)).%20}%20FILTER(langMatches(lang(?AlbumName),%20%22en%22)).%20FILTER(?AlbumName%20=%20%22Abbey%20Road%22@en).%20FILTER(?ArtistName%20=%20%22The%20Beatles%22@en).%20}%20LIMIT%20100`, {
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
        albums: result.results.bindings
      });
    }).catch(err => {
      base.setState({
        error: err
      });
    });
  }
  render = () => {
    const { albums , fetchedData } = this.state;
    console.log("state:");
    console.log(this.state);
    return (
      <TableContainer>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Artists</StyledTableCell>
              <StyledTableCell align="right">Release Dates</StyledTableCell>
              <StyledTableCell align="right">Genres</StyledTableCell>
              <StyledTableCell align="right">Number of titles</StyledTableCell>
              <StyledTableCell align="right">Titles</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
              <StyledTableCell align="right">Awards</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {albums.map((album) => (
            <StyledTableRow key={album.name}>
              <StyledTableCell align="right">{album.AlbumName.value}</StyledTableCell>
              <StyledTableCell align="right">{album.ArtistName.value}</StyledTableCell>
              <StyledTableCell align="right">{album.Release_Dates.value}</StyledTableCell>
              <StyledTableCell align="right">{album.Genres.value}</StyledTableCell>
              <StyledTableCell align="right">{album.Number_of_titles.value}</StyledTableCell>
              <StyledTableCell align="right">{album.Titles.value}</StyledTableCell>
              <StyledTableCell align="right">{album.Description.value}</StyledTableCell>
              <StyledTableCell align="right">{album.Awards.value}</StyledTableCell>
            </StyledTableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}

export default AlbumTable;
