import React, { Component } from 'react';
import { increase, decrease } from '../redux/actions/count';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';


class Home extends Component {
	componentWillMount() {
		console.log(this.props.state)
	}

	constructor(props) {
		super(props)
		console.log(this.props);

	}

	render() {
		let number = this.props.number;
		return (
			<div className="animated fadeIn">
				<h1>ok {number}</h1>
				<h3>ID: {this.props.match.params.id}</h3>
				<Link to='home' > Home </Link>
				<button onClick={() => this.props.increase(1)}>Increase</button>
				<button onClick={() => this.props.decrease(1)}>Decrease</button>
			</div>
		)
	}
}

export default withRouter(connect(
	state => ({
		number: state.count.number,
		state: state
	}),
	{ increase, decrease }
)(Home))
