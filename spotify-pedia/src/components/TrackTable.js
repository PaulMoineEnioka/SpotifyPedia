import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useState, useEffect } from "react";
import axios from "axios";
import { Component } from "react";

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
      error: null,
    };
  }

  fetchdata = () => {
    const base = this;
    console.log("base: ");
    console.log(base);
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
    
} GROUP BY ?Name ?Desc`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(base);
        console.log(result);
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

  componentDidUpdate = (prevProps) => {
    if (this.props.keyword != prevProps.keyword) this.fetchdata();
  };

  render = () => {
    const { tracks, fetchedData } = this.state;
    console.log("state:");
    console.log(this.state);
    console.log(this.props);
    console.log(tracks);
    return (
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
              <StyledTableRow key={track.Name.value + track.Artists.value}>
                <StyledTableCell align="right">
                  {track.Name.value}
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
    );
  };
}

export default TrackTable;
