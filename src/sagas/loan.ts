import { takeLatest, call, put, all } from 'redux-saga/effects'
import { Action } from 'redux'
import {
  FETCH_CURRENT_LOAN_FAILED,
  FETCH_CURRENT_LOAN_REQUESTED,
  FETCH_CURRENT_LOAN_SUCCESS,
  FETCH_LOAN_REPAYMENTS_REQUESTED,
  FETCH_LOAN_REPAYMENTS_SUCCESS,
  FETCH_LOAN_REPAYMENTS_FAILED,
  REPAY_LOAN_SUCCESS,
  REPAY_LOAN_FAILED,
  REPAY_LOAN_REQUESTED,
} from '../actions'

function* fetchCurrentLoan() {
  try {
    const fetchAPI = () =>
      fetch('/current-loan')
        .then((response) => response.json())
        .catch((error) => {
          throw error
        })

    const loan = yield call(fetchAPI)

    yield put({ type: FETCH_CURRENT_LOAN_SUCCESS, loan })
  } catch (error) {
    yield put({ type: FETCH_CURRENT_LOAN_FAILED, error })
  }
}

export function* watchCurrentLoan() {
  yield takeLatest(FETCH_CURRENT_LOAN_REQUESTED, fetchCurrentLoan)
}

function* fetchLoanRepayments(action: Action<any> & { loanId: string }) {
  try {
    const fetchAPI = () =>
      fetch(`/loan/${action.loanId}/recent-repayments`)
        .then((response) => response.json())
        .catch((error) => {
          throw error
        })

    const loanRepayments = yield call(fetchAPI)

    yield put({ type: FETCH_LOAN_REPAYMENTS_SUCCESS, loanRepayments })
  } catch (error) {
    yield put({ type: FETCH_LOAN_REPAYMENTS_FAILED, error })
  }
}

export function* watchLoanRepayments() {
  yield takeLatest(FETCH_LOAN_REPAYMENTS_REQUESTED, fetchLoanRepayments)
}

function* repayLoan(action: Action<any> & { loanId: string }) {
  try {
    const fetchAPI = () =>
      fetch(`/loan/${action.loanId}/repay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .catch((error) => {
          throw error
        })

    const loanRepayment = yield call(fetchAPI)

    yield put({ type: REPAY_LOAN_SUCCESS, loanRepayment })
  } catch (error) {
    yield put({ type: REPAY_LOAN_FAILED, error })
  }
}

export function* watchRepayLoan() {
  yield takeLatest(REPAY_LOAN_REQUESTED, repayLoan)
}

export default function* loanSaga() {
  yield all([watchCurrentLoan(), watchLoanRepayments(), watchRepayLoan()])
}
