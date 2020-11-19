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




export default class Group extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cursorStyle: {
                cursor: "auto",
            },
        };
    }


    mouseOver = () => { //component is clickable
        this.setState({
            cursorStyle: {
                cursor: "pointer",
            },
        });
    }

    render() {
        if(!this.props.group.Name) {
            this.props.group.Name = {};
            this.props.group.Name.value = "";
        }

        if(!this.props.group.StartYearString) {
            this.props.group.StartYearString = {};
            this.props.group.StartYearString.value = "";
        }

        if(!this.props.group.Genres) {
            this.props.group.Genres = {};
            this.props.group.Genres.value = "";
        }

        if(!this.props.group.Comment) {
            this.props.group.Comment = {};
            this.props.group.Comment.value = "";
        }

        if(!this.props.group.Members) {
            this.props.group.Members = {};
            this.props.group.Members.value = "";
        }

        if(!this.props.group.Former_Members) {
            this.props.group.Former_Members = {};
            this.props.group.Former_Members.value = "";
        }

        if(!this.props.group.HomepageLink) {
            this.props.group.HomepageLink = {};
            this.props.group.HomepageLink.value = "";
        }

        if(!this.props.group.Albums) {
            this.props.group.Albums = {};
            this.props.group.Albums.value = "";
        }

        return (
            <StyledTableRow key={this.props.index}>
                <StyledTableCell style={this.state.cursorStyle} onMouseOver={this.mouseOver}
                                 onClick={() => this.props.onClick(this.props.group)}>{this.props.group.Name.value}</StyledTableCell>
            </StyledTableRow>
        );
    }
}