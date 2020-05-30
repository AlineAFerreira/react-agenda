import * as axios from 'axios'

export const userService = {
    getUsers() {
        return axios.get('http://localhost:3001/users');
    }
}