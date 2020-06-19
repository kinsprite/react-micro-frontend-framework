import React from 'react';
import ReactDOM from 'react-dom';
import 'react-router-dom';

import * as Redux from 'redux';
import 'react-redux';

import 'redux-thunk';
import 'redux-observable';
import 'redux-saga';

import 'connected-react-router';

// import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

export {
  React,
  ReactDOM,
  Redux,
};
