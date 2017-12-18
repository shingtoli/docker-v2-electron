import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from '../common/pages/main';
import Reducers from '../common/reducers/reducers';

const store = createStore(Reducers, {
  images: [],
  url: '',
  username: '',
  password: '',
  timestamp: (new Date()).toLocaleString(),
}, applyMiddleware(thunkMiddleware));

window.onload = () => {
  ReactDOM.render(
    <MuiThemeProvider>
      <Provider store={store}>
        <Main />
      </Provider>
    </MuiThemeProvider>,
    document.getElementById('app'),
  );
};
