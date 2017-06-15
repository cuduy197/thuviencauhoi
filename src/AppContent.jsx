import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

//page
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound';

//containers
import CreateQuiz from './containers/Quiz/CreateQuiz.jsx';
//Ui
import NavBar from './components/NavBar/NavBar.jsx';

class AppContent extends Component {
    render() {
        const islogin = this.props.store.auth.islogin
        return (
            <div>
						<NavBar />
            <div className="App-intro">
											<Switch>
												<Route exact path="/" component={Home} />

												<Route path="/home" component={islogin?CreateQuiz:NotFound} />
												<Route exact strict path="/add/:monhoc/:chude" component={CreateQuiz} />
												<Route path="/test/:id" component={Home} />	
												<Route component={NotFound} />
											</Switch>
						</div>
						</div>
        );
    }
}

export default withRouter(connect(store => ({ store }))(AppContent))
