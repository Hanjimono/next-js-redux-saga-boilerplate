import {all} from 'redux-saga/effects'
import {saga as mainSaga} from 'Ducks/main'

export default function * rootSaga() {
  yield all([
    mainSaga(),
  ])
}