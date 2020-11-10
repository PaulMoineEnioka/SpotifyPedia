import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Singer from './Singer';

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

export default class TrackTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            singers: [],
        };
    }

    componentDidMount = async () => {
        const queryString = "select ?Singer ?Name ?BirthName ?BirthDate ?Description ?quote ?gender ?homepage str(?StartYear) as ?StartYearString GROUP_CONCAT(DISTINCT ?BirthPlace;SEPARATOR=\" | \") as ?BirthPlaces GROUP_CONCAT(DISTINCT ?Album;SEPARATOR=\" | \") as ?Albums where { ?Singer rdf:type dbo:MusicalArtist. ?Singer rdfs:label ?Name.  ?Singer dbo:activeYearsStartYear ?StartYear. OPTIONAL{ ?Singer dbo:birthName ?BirthName. }. OPTIONAL{ ?Singer dct:description ?Description. }. OPTIONAL { ?Singer dbp:quote ?quote }. OPTIONAL { ?Singer foaf:gender ?gender }. OPTIONAL { ?Singer foaf:homepage ?homepage }. OPTIONAL{ ?Singer dbo:birthDate ?BirthDate. FILTER(regex(str(?BirthDate),\"(?!0000)[0-9]{4}-((0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])-(29|30)|(0[13578]|1[02])-31)\")). }. OPTIONAL{ ?Singer dbo:birthPlace ?BirthPlace. ?BirthPlace rdf:type dbo:Location. }. OPTIONAL{ ?Singer ^dbo:artist ?Album. ?Album rdf:type dbo:Album. }. FILTER(regex(?Name, \".*Queen.*\") && langMatches(lang(?Name),\"EN\")). } LIMIT 100";
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
                    singers: response.results.bindings,
                });
                console.log(this.state.singers);
            }
            ); // parses JSON response into native JavaScript objects
    }

    renderSinger(i) {
        if (this.state.singers.length > i) {
            return (<Singer singer={this.state.singers[i]}></Singer>);
        }
    }

    render() {
        const singers = this.state.singers.map((step,index) => {
            return (this.renderSinger(index));
          });

        return (
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="right">Singer</StyledTableCell>
                            <StyledTableCell align="right">BirthName</StyledTableCell>
                            <StyledTableCell align="right">BirthDate</StyledTableCell>
                            <StyledTableCell align="right">Description</StyledTableCell>
                            <StyledTableCell align="right">Quote</StyledTableCell>
                            <StyledTableCell align="right">Gender</StyledTableCell>
                            <StyledTableCell align="right">HomePage</StyledTableCell>
                            <StyledTableCell align="right">StartYear</StyledTableCell>
                            <StyledTableCell align="right">BirthPlaces</StyledTableCell>
                            <StyledTableCell align="right">Albums</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                       singers
                    }
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}