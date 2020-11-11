import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

export default class Singer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <TableRow>
                <StyledTableCell>{this.props.singer.Name.value}</StyledTableCell>
                <StyledTableCell>{this.props.singer.Singer.value}</StyledTableCell>
                <StyledTableCell>{this.props.singer.StartYearString.value}</StyledTableCell>
                <StyledTableCell>{this.props.singer.BirthPlaces.value}</StyledTableCell>
                <StyledTableCell>{this.props.singer.Albums.value}</StyledTableCell>
            </TableRow>
        );
    }
}