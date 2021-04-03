import { combineReducers } from 'redux';
import spatialReducer from './spatialReducer';

const rootReducer = combineReducers({
  spatial: spatialReducer,
});

export default rootReducer;
