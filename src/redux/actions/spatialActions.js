import { GET_POINTS } from './actionTypes';
import { getPointsApi } from '../../api';

export const getPoints = () => async (dispatch) => {
  try {
    const { data } = await getPointsApi();
    console.log(`action ${data}`);
    dispatch({
      type: GET_POINTS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};
