import React, { Component } from 'react';

//Content
import AppContent from './AppContent.jsx';

//UI, Lang
import './index.less';
import './App.css';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

//Store 
import { store, history } from './redux/store.js';
import { Provider, connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

export default class App extends Component {
    render() {
        return (
            <LocaleProvider locale={enUS}>
						    <Provider store={store}>
								<ConnectedRouter history={history}>
										<AppContent />
								</ConnectedRouter>
							</Provider>
						</LocaleProvider>
        );
    }
}
