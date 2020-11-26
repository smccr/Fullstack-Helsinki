import loginService from '../../services/login';

const reducer = (state = null, action) => {
  if(action.type === 'SET_USER') {
    return action.data;
  } else {
    return state;
  }
};

export const setUser = (content) => {
  return dispatch => {
    dispatch({
      type: 'SET_USER',
      data: content
    });
  };
};

export const loginUser = ({ username, password }) => {
  return async dispatch => {
    const loggedUser = await loginService.login(username, password);
    dispatch({
      type: 'SET_USER',
      data: loggedUser
    });
  };
};

export default reducer;