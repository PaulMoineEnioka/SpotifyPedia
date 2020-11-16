import { withStyles } from "@material-ui/core/styles";
import { Component } from "react";
import React from "react";
import SongPage from "../pages/song.page";
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

class TrackTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
        tracks: [],
        fetchedData: false,
        error: null,
        popupOpen: false,
        selectedName: null,
        selectedArtist: null
    };
  }

  fetchdata = () => {
    const base = this;
    fetch(
        `http://dbpedia.org/sparql?query=SELECT DISTINCT ?Name ?Desc
    (GROUP_CONCAT(DISTINCT ?Artists; SEPARATOR="||") AS ?Artists)
WHERE {
    ?Track rdf:type dbo:Single.
    ?Track   foaf:name   ?Name. 
    ?Track dbo:musicalArtist ?ArtistsLinks.
    OPTIONAL {
        ?Track dbo:abstract ?Desc.
        FILTER(langMatches(lang(?Desc), "en")).
    }
    ?ArtistsLinks rdfs:label ?Artists.
    FILTER(regex(lcase(str(?Name)),   ".*${this.props.keyword}.*")).
    FILTER(langMatches(lang(?Name), "en")).
    FILTER(langMatches(lang(?Artists), "en")).
    
} GROUP BY ?Name ?Desc LIMIT 20`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
    )
        .then((res) => res.json())
        .then((result) => {
          base.setState({
            fetchedData: true,
            tracks: result.results.bindings,
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
    this.setState({
      selectedName: name,
      selectedArtsit: artist
    })
  }

  handleClose = () => {
    this.setState({
      selectedName: null,
      selectedArtsit: null
    })
  }
  
  render = () => {
    const { tracks, selectedName, selectedArtsit} = this.state;
    const openPopup = (selectedName && selectedArtsit) !== null;
    return (
      <>
      <TableContainer>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Artists</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tracks.map((track) => (
              <StyledTableRow key={track.Name.value + track.Artists.value} >
                <StyledTableCell align="right">
                  <button onClick= {() => this.handleRowClick(track.Name.value,track.Artists.value)}>{track.Name.value}</button>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {track.Artists.value.split("||").map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog onClose={this.handleClose} open={openPopup} fullScreen={true}>
        <DialogTitle id="simple-dialog-title">
          <IconButton onClick={this.handleClose}>
            <CloseIcon />
        </IconButton>
        </DialogTitle>
          <SongPage songName={selectedName} artists={selectedArtsit}/>
        </Dialog>
      </>
    );
  };
}

export default TrackTable;