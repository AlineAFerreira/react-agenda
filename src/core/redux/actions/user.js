import { ADD_USER, UPDATE_USER } from '../types/user';

let nextTodoId = 0
export const addUser = user => ({
    type: ADD_USER,
    user: {
        ...user,
        id: nextTodoId++
    }
})

export const updateUser = user => ({
    type: UPDATE_USER,
    user
})