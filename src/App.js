import React, { Component } from 'react';

//Content
import AppContent from './AppContent.jsx';

//UI, Lang
import './index.less';
import './App.css';


import { LocaleProvider } from 'antd';
import viVN from 'antd/lib/locale-provider/vi_VN';

//Store 
import { store, history } from './redux/store.js';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';



   export default class App extends Component {
    render() {
        return (
            <LocaleProvider locale={viVN}>
						    <Provider store={store}>
								<ConnectedRouter history={history}>
										<AppContent />
								</ConnectedRouter>
							</Provider>
			</LocaleProvider>
        );
    }
}
