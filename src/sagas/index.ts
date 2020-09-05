import LoanSaga from './loan'
import { all } from 'redux-saga/effects'

export default function* sagas() {
  yield all([LoanSaga()])
}
