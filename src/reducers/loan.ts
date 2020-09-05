import update from 'immutability-helper'
import {
  LoanReduxActionsType,
  FETCH_CURRENT_LOAN_REQUESTED,
  FETCH_CURRENT_LOAN_SUCCESS,
  FETCH_CURRENT_LOAN_FAILED,
  REPAY_LOAN_SUCCESS,
} from '../actions'
import { Loan } from '../types/loan'

export type LoanReduxState = {
  loading: boolean
  error?: Error
  data?: Loan
}

const initialState: LoanReduxState = {
  loading: false,
}

const loanReducer = (
  state: LoanReduxState = initialState,
  action: LoanReduxActionsType,
): LoanReduxState => {
  switch (action.type) {
    case REPAY_LOAN_SUCCESS:
      if (!state.data) {
        return state
      }

      return update(state, {
        data: {
          weeklyRepaid: {
            $set: true,
          },
        },
      })
    case FETCH_CURRENT_LOAN_REQUESTED:
      return update(state, {
        $set: {
          loading: true,
        },
      })
    case FETCH_CURRENT_LOAN_SUCCESS:
      return update(state, {
        $set: {
          loading: false,
          data: action.loan,
        },
      })
    case FETCH_CURRENT_LOAN_FAILED:
      return update(state, {
        $set: {
          loading: false,
          error: action.error,
        },
      })

    default:
      return state
  }
}

export default loanReducer
