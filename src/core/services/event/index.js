import * as axios from 'axios'

export const eventService = {
    getevents() {
        return axios.get(`https://my-agenda-api.herokuapp.com/event`);
    },
    saveevents(eventData) {
        return axios.post(`https://my-agenda-api.herokuapp.com/event`, eventData);
    }
}