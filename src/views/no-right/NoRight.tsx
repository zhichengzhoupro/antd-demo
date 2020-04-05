import React, {Component} from 'react';
import {connect} from 'react-redux';

function mapStateToProps(state: any) {
    return {};
}

class NoRight extends Component {
    render() {
        return (
            <div>
                You have no right to view this page
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(NoRight);