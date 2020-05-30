import { ADD_USER, UPDATE_USER, USERS_FETCH_REQUESTED } from '../types/user';

let nextTodoId = 0
export const addUser = user => ({
    type: ADD_USER,
    user: {
        ...user,
        id: nextTodoId++
    }
})

export const getUsers = user => ({
    type: USERS_FETCH_REQUESTED
})

export const updateUser = user => ({
    type: UPDATE_USER,
    user
})