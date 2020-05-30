import {ADD_USER, UPDATE_USER} from '../types/user';

const initialState = {
  users: []
};
const users = (state = initialState, action) => {
    switch (action.type) {
      case 'USERS_FETCH_SUCCEEDED': 
        return {
          ...state,
          users: action.users
        };
      case ADD_USER:
        return {
          ...state,
          users: state.users.concat(action.user)
        }
      case UPDATE_USER:
        return state.map(user =>
          user.id === action.user.id ? { ...action.user } : user
        )
      default:
        return state
    }
  }
  
  export default users