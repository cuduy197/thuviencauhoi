/*eslint-disable */
import React, { Component } from 'react';
import './App.css';
import NavBar from './components/ui/nav/NavBar';
import CreateQuiz from './components/ui/quiz/CreateQuiz.jsx';


import { Layout, Button, Spin, Tabs, Icon } from 'antd';
const TabPane = Tabs.TabPane;
const { Header, Content, Footer } = Layout;

const MediaQuery = require('react-responsive');




export default class App extends Component {


	render() {

		return (
			<div className="App animated fadeIn">
				<CreateQuiz />
			</div >
		);
	}
}

