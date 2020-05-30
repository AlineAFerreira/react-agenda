import {ADD_USER, UPDATE_USER} from '../types/user';

const initialState = [];
const users = (state = initialState, action) => {
    switch (action.type) {
      case ADD_USER:
        return [
          ...state,
          {
            ...action.user
          }
        ]
      case UPDATE_USER:
        return state.map(user =>
          user.id === action.user.id ? { ...action.user } : user
        )
      default:
        return state
    }
  }
  
  export default users