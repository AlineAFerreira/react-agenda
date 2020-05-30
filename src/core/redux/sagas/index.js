import { all } from 'redux-saga/effects'
import usersRootSaga from './user';


export default function* rootSaga() {
    yield all([
        usersRootSaga(),
    ])
    // code after all-effect
  }