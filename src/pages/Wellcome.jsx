import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    action as actionAction,
} from 'path';

const mapDispatchToProps = (dispatch) => {
    return {
        action: () => {
            dispatch(actionAction());
        },
    };
};

const mapStateToProps = ({ state }) => ({
    prop: state.prop
});

export class Wellcome extends Component {
    render() {
        const {
            action
        } = this.props;

        return (
            
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Wellcome);
