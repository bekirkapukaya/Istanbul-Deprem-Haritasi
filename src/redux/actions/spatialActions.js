import { GET_POINTS } from './actionTypes';
import apiData from '../../api';

export const getPoints = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_POINTS,
      payload: apiData,
    });
  } catch (err) {
    console.log(err);
  }
};
