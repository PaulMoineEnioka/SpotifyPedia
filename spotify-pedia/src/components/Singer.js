import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default class Singer extends React.Component {

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
        if (!this.props.singer.Name) {
            this.props.singer.Name = {};
            this.props.singer.Name.value = "";
        }

        return (
            <StyledTableRow key={this.props.index}>
                <StyledTableCell style={this.state.cursorStyle} onMouseOver={this.mouseOver}
                                 onClick={() => this.props.onClick(this.props.singer)}>{this.props.singer.Name.value}</StyledTableCell>
            </StyledTableRow>
        );
    }
}

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
