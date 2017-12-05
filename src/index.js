import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import createStore from './store/createStore'


const store = createStore(window.__INITIAL_STATE__)

ReactDOM.render(<App store={store} />, document.getElementById('root'));
registerServiceWorker();
