import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Singer from './Singer';
import SingerPage from "../pages/singer.page";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);


function toTitleCase(str) { //cf : https://www.w3docs.com/snippets/javascript/how-to-convert-string-to-title-case-with-javascript.html
    return str.toLowerCase().split(' ').map(function (word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }

export default class TrackTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            singers: [],
        };
    }

    fetchData = () => {
        let keyword = "";
        if(this.props.keyword) {
            keyword = toTitleCase(this.props.keyword);
        }
        const queryString = "select ?Name ?Id where { ?Singer rdf:type dbo:MusicalArtist. ?Singer dbo:wikiPageID ?Id. ?Singer rdfs:label ?Name. ?Singer dbo:activeYearsStartYear ?StartYear.  FILTER(regex(?Name, \".*" + keyword + ".*\") && langMatches(lang(?Name),\"EN\")). } LIMIT 100"; //StartYear pour vérifier que ce soit bien un artiste
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
            }
            ); // parses JSON response into native JavaScript objects
    }

    /*componentDidMount = async () => {
        this.fetchData();
    }*/

    componentDidUpdate = (prevProps) => {
        if (this.props.keyword !== prevProps.keyword) this.fetchData();
    }

    renderSinger(uniqueKey, i) {
        if (this.state.singers.length > i) {
            return (<Singer singer={this.state.singers[i]} index={uniqueKey} key={uniqueKey}></Singer>);
        }
    }

    render() {
        const singers = this.state.singers.map((step,index) => {
            return (this.renderSinger(step.Id.value, index));
          });

        return (
            <div>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                        singers
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
                <SingerPage singer={this.state.singers[0]}></SingerPage>
            </div>
        );
    }
}