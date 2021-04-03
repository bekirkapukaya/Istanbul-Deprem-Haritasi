import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

const middleware = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(rootReducer, middleware);

export default store;
