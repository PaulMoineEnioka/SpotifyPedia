import { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Component } from "react";
import Paper from "@material-ui/core/Paper";
import React from "react";
import AlbumPage from "../pages/album.page";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import 'reactjs-popup/dist/index.css';

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
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

class AlbumTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      fetchedData: false,
      error: null,
      popupOpen: false
    };
  }

  fetchdata = () => {
    const base = this;
    fetch(
        `http://dbpedia.org/sparql?query=SELECT DISTINCT ?AlbumName ?ArtistName
        WHERE {
          ?Album a schema:MusicAlbum;
          foaf:name ?AlbumName;
          dbo:artist ?Artist.

          ?Artist foaf:name ?ArtistName.
          
          FILTER(regex(lcase(str(?AlbumName)),   ".*${this.props.keyword}.*")).
          FILTER(langMatches(lang(?AlbumName), "en")). 
          FILTER(langMatches(lang(?ArtistName),"en")).
          } LIMIT 50`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
    )
        .then((res) => res.json())
        .then((response) => {
          base.setState({
            fetchedData: true,
            albums: response.results.bindings,
          });
        })
        .catch((err) => {
          base.setState({
            error: err,
          });
        });
  };

  componentDidMount() {
    this.fetchdata();
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.keyword !== prevProps.keyword) this.fetchdata();
  };

  handleRowClick = (name,artist) => {
    console.log("handle");
    console.log(name);
    console.log(artist);
    var nameEn = '"' + name + '"@en';
    console.log(nameEn);
    var artistEn = '"' + artist + '"@en';
    this.setState({
      selectedName: nameEn,
      selectedArtist: artistEn
    })
  }

  handleClose = () => {
    this.setState({
      selectedName: null,
      selectedArtist: null
    })
    console.log("Closed popup");
  }
  
  render = () => {
    const { albums, fetchedData, selectedName, selectedArtist} = this.state;
    const closeImg = {cursor:'pointer', float:'right', marginTop: '5px', width: '20px'};
    console.log("state:");
    console.log(this.state);
    console.log(this.props);
    console.log(albums);
    return (
      <>
      <TableContainer>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Album</StyledTableCell>
              <StyledTableCell align="right">Artist</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {albums.map((album) => (
              <StyledTableRow key={album.AlbumName.value + album.ArtistName.value} >
                <StyledTableCell align="right">
                  <a onClick= {() => this.handleRowClick(album.AlbumName.value,album.ArtistName.value)}>{album.AlbumName.value}</a>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {album.ArtistName.value}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog onClose={this.handleClose} open={selectedName && selectedArtist} fullScreen={true}>
        <DialogTitle id="simple-dialog-title">
          <IconButton onClick={this.handleClose}>
            <CloseIcon />
        </IconButton>
        </DialogTitle>
          <AlbumPage albumName={selectedName} artistName={selectedArtist}/>
        </Dialog>
      </>
    );
  };
}

export default AlbumTable;