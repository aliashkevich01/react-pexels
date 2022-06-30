import { applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { legacy_createStore as configureStore } from '@reduxjs/toolkit';
import rootReducer, { history } from './reducers';
import rootSaga from './sagas';
import { composeWithDevTools } from 'redux-devtools-extension';
const sagaMiddleware = createSagaMiddleware();

const store = configureStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(routerMiddleware(history), sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
