import React, { Component } from 'react';

export default class TestComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
        };
    }

    componentDidMount = async() => {};

    render() {
        return <div > { this.state.results } < /div>;
    }
}