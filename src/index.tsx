import React from 'react';
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import App from './containers/App';
import reducer from './store/reducers';
import * as ReactRouter from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)
const store : any = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store)

render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ReactRouter.BrowserRouter>
        <ReactRouter.Route exact path='/' component={App}/>
        <ReactRouter.Route path='/:query' component={App}/>
      </ReactRouter.BrowserRouter>
    </PersistGate>
  </Provider>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
