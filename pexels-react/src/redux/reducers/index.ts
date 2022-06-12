import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { photoReducer } from './photo';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  photo: photoReducer,
});

export default rootReducer;
