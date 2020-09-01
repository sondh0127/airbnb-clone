import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App/App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import * as serviceWorker from './serviceWorker';
import { StylesProvider, ThemeProvider } from '@material-ui/styles';
// Theme setup
import theme from './App/theme';
import { FiltersProvider } from './store/context/filtersContext';

const store = configureStore();

const app = (
  <Provider store={store}>
    <FiltersProvider>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Router>
            <Route component={App} />
          </Router>
        </ThemeProvider>
      </StylesProvider>
    </FiltersProvider>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
