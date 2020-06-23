import React from 'react';
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import App from './containers/App';
import reducer from './store/reducers';

import * as serviceWorker from './serviceWorker';

const store : any = createStore(reducer, applyMiddleware(thunk));

render(
  <Provider store={store}><App /></Provider>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
