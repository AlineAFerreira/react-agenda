import * as axios from 'axios'

export const userService = {
    getUsers() {
        return axios.get(`${process.env.REACT_APP_DOMAIN}/users`);
    }
}