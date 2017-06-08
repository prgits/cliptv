import { applyMiddleware, createStore } from 'redux';
import cliptvApp from './reducers'
// Logger with default options
import logger from 'redux-logger'
const store = createStore(
  cliptvApp,
  applyMiddleware(logger)
);
export default store;