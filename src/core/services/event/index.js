import * as axios from 'axios'

export const eventService = {
    getEvents() {
        return axios.get(`https://my-agenda-api.herokuapp.com/event`);
    },
    saveEvents(eventData) {
        return axios.post(`https://my-agenda-api.herokuapp.com/event`, eventData);
    },
    updateEvents(eventData) {
        return axios.put(`https://my-agenda-api.herokuapp.com/event/${eventData.id}`, eventData);
    },
    deleteEvents(id) {
        return axios.delete(`https://my-agenda-api.herokuapp.com/event/${id}`);
    }
}