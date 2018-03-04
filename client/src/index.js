import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import MultiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(
<Provider store={store}>
<BrowserRouter>
<MultiThemeProvider>
<App />
</MultiThemeProvider>
</BrowserRouter>
</Provider>
, document.getElementById('root'));
registerServiceWorker();
