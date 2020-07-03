import { call, all, put, takeLatest } from 'redux-saga/effects'
import {eventService} from '../../services/event'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUsers(action) {
   try {
      const response = yield call(eventService.getevents);
      yield put({type: "USERS_FETCH_SUCCEEDED", users: response.data.data});
   } catch (e) {
      yield put({type: "USERS_FETCH_FAILED", message: e.message});
   }
}

function* getUsers() {
  yield takeLatest("USERS_FETCH_REQUESTED", fetchUsers);
}

export default function* usersRootSaga() {
    yield all([
        getUsers()
    ])
    // code after all-effect
  }