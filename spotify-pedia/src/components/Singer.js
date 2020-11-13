import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

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

export default class Singer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if(!this.props.singer.Name) {
            this.props.singer.Name = {};
            this.props.singer.Name.value = "";
        }

        return (
            <StyledTableRow key={this.props.index}>
                <StyledTableCell>{this.props.singer.Name.value}</StyledTableCell>
            </StyledTableRow>
        );
    }
}