//import { act } from 'react-dom/test-utils';
import { LOGIN_USER, LOGOUT_USER } from './action';

const initialState = {
  user: null,
  userType: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      console.log("user reducer")
      console.log(action.payload.user)
      console.log(action.payload.userType)
      return {
        ...state,
        user: action.payload.user,
        userType: action.payload.userType
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        userType: null
      };
    default:
      return state;
  }
};

export default userReducer;
