import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar.jsx';
import CreateQuiz from './containers/Quiz/CreateQuiz.jsx';

export default class App extends Component {
    render() {
        return (
            <div className="App animated fadeIn">
				<CreateQuiz />
			</div >
        );
    }
}
