import { GET_POINTS } from '../actions/actionTypes';
import initialStates from './initialStates';

const spatialReducer = (state = initialStates, action) => {
  switch (action.type) {
    case GET_POINTS:
      return { ...state, spatial: action.payload };

    default:
      return { ...state };
  }
};

export default spatialReducer;
