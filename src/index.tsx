import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
// import * as serviceWorker from './serviceWorker';
// import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// import express from 'express'
console.log(process.env);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
