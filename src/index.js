import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
//Page 
import App from './App';

//FIX 404 USING Switch
ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
