import React, { Component } from 'react';
import './App.css';
import NavBar from './components/ui/nav/NavBar';
import CreateQuiz from './components/ui/quiz/CreateQuiz.jsx';

export default class App extends Component {
    render() {
        return (
            <div className="App animated fadeIn">
				<CreateQuiz />
			</div >
        );
    }
}
