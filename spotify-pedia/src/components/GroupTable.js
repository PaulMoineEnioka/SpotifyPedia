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
import GroupPage from "../pages/group.page";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

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
            selectedGroup: {},
            hasSelectedGroup: false,
        };
    }

    fetchData = () => {
        let keyword = "";
        if(this.props.keyword) {
            keyword = toTitleCase(this.props.keyword);
        }

        const queryString = "select ?Id ?Name where { ?group rdf:type dbo:Group. ?group dbo:wikiPageID ?Id. ?group rdfs:label ?Name. ?group dbo:activeYearsStartYear ?StartYear. FILTER(regex(?Name, \".*" + keyword + ".*\") && langMatches(lang(?Name),\"EN\") ).} LIMIT 20";

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
            }
            ); // parses JSON response into native JavaScript objects
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.keyword !== prevProps.keyword) this.fetchData();
    }

    renderGroup(uniqueKey, i) {
        if (this.state.groups.length > i) {
            return (<Group onClick={(group) => this.handleRowClick(group)} group={this.state.groups[i]}
                            index={uniqueKey} key={uniqueKey}/>);
        }
    }

    handleRowClick = (group) => { //When click on a row
        this.setState({
            selectedGroup: group,
            hasSelectedGroup: true,
        });
    }

    handleClose = () => { //Close the popup
        this.setState({
            hasSelectedGroup: false,
        })
    }

    render() {

        const groups = this.state.groups.map((step,index) => {
            return (this.renderGroup(step.Id.value, index));
        });

        return (
            <div>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Group</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            groups
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog onClose={this.handleClose} open={this.state.hasSelectedGroup} fullScreen={true}>
                    <DialogTitle id="simple-dialog-title">
                        <IconButton onClick={this.handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    </DialogTitle>
                    <GroupPage singer={this.state.selectedGroup}/>
                </Dialog>
            </div>
        );
    }
}