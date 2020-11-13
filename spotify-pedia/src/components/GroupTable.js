import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Group from './Group';

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
            groups: [],
        };
    }

    fetchData = () => {
        let keyword = "";
        if(this.props.keyword) {
            keyword = toTitleCase(this.props.keyword);
        }

        const queryString = "select ?group ?Name ?Comment str(?StartYear) as ?StartYearString GROUP_CONCAT(DISTINCT ?Genre;SEPARATOR=\" | \") as ?Genres GROUP_CONCAT(DISTINCT ?Album;SEPARATOR=\" | \") as ?Albums GROUP_CONCAT(DISTINCT ?Members;SEPARATOR=\" | \") as ?Members GROUP_CONCAT(DISTINCT ?Former_Members;SEPARATOR=\" | \") as ?Former_Members GROUP_CONCAT(DISTINCT ?Link;SEPARATOR=\" | \") as ?HomepageLink where { ?group rdf:type dbo:Group. ?group rdfs:label ?Name. ?group dbo:activeYearsStartYear ?StartYear. OPTIONAL{ ?group foaf:homepage ?Link. } OPTIONAL{ {?group dbo:bandMember ?Members. ?Members rdf:type dbo:Person.} UNION {?group dbp:pastMembers ?Members.} }. OPTIONAL{ ?group dbo:formerBandMember ?Former_Members. ?Former_Members rdf:type dbo:Person. }. OPTIONAL{ ?group dbo:genre ?Genre. }. OPTIONAL{ ?group rdfs:comment ?Comment. }. OPTIONAL{ ?group ^dbo:artist ?Album. ?Album rdf:type dbo:Album. }. FILTER(regex(?Name, \".*" + keyword + ".*\") && langMatches(lang(?Name),\"EN\") && langMatches(lang(?Comment),\"EN\")). } LIMIT 100";
        
        console.log("request="+queryString);
        //  \".*" + keyword + ".*\"
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
                    groups: response.results.bindings,
                });
                console.log(this.state.groups);
            }
            ); // parses JSON response into native JavaScript objects
    }

    /*componentDidMount = async () => {
        this.fetchData();
    }
    */
    componentDidUpdate = (prevProps) => {
        if (this.props.keyword !== prevProps.keyword) this.fetchData();
    }

    renderGroup(uniqueKey, i) {
        if (this.state.groups.length > i) {
            return (<Group group={this.state.groups[i]} index={uniqueKey} key={uniqueKey}></Group>);
        }
    }

    render() {
        const groups = this.state.groups.map((step,index) => {
            return (this.renderGroup(step.Group, index));
          });

        return (
            <div>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Group</StyledTableCell>
                                <StyledTableCell align="right">Start Year</StyledTableCell>
                                <StyledTableCell align="right">Genre</StyledTableCell>
                                <StyledTableCell align="right">Description</StyledTableCell>
                                <StyledTableCell align="right">Members</StyledTableCell>
                                <StyledTableCell align="right">Former Members</StyledTableCell>
                                <StyledTableCell align="right">HomePage</StyledTableCell>
                                <StyledTableCell align="right">Albums</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            groups
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}