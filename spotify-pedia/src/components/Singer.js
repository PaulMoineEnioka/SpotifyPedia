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

        if(!this.props.singer.BirthName) {
            this.props.singer.BirthName = {};
            this.props.singer.BirthName.value = "";
        }

        if(!this.props.singer.BirthDate) {
            this.props.singer.BirthDate = {};
            this.props.singer.BirthDate.value = "";
        }

        if(!this.props.singer.Description) {
            this.props.singer.Description = {};
            this.props.singer.Description.value = "";
        }

        if(!this.props.singer.Quote) {
            this.props.singer.Quote = {};
            this.props.singer.Quote.value = "";
        }

        if(!this.props.singer.Gender) {
            this.props.singer.Gender = {};
            this.props.singer.Gender.value = "";
        }

        if(!this.props.singer.Homepages) {
            this.props.singer.Homepages = {};
            this.props.singer.Homepages.value = "";
        }

        return (
            <StyledTableRow key={this.props.index}>
                <StyledTableCell>{this.props.singer.Name.value}</StyledTableCell>
                <StyledTableCell>{this.props.singer.Singer.value}</StyledTableCell>
                <StyledTableCell>{this.props.singer.BirthName.value}</StyledTableCell>
                <StyledTableCell>{this.props.singer.BirthDate.value}</StyledTableCell>
                <StyledTableCell>{this.props.singer.Description.value}</StyledTableCell>
                <StyledTableCell>{this.props.singer.Quote.value}</StyledTableCell>
                <StyledTableCell>{this.props.singer.Gender.value}</StyledTableCell>
                <StyledTableCell>{this.props.singer.Homepages.value}</StyledTableCell>
                <StyledTableCell>{this.props.singer.StartYearString.value}</StyledTableCell>
                <StyledTableCell>{this.props.singer.BirthPlaces.value}</StyledTableCell>
                <StyledTableCell>{this.props.singer.Albums.value}</StyledTableCell>
            </StyledTableRow>
        );
    }
}