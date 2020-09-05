import update from 'immutability-helper'
import {
  LoanReduxActionsType,
  REPAY_LOAN_SUCCESS,
  REPAY_LOAN_REQUESTED,
  REPAY_LOAN_FAILED,
} from '../actions'
import { LoanRepayment } from '../types/loan'

export type LoanRepaymentReduxState = {
  loading: boolean
  error?: Error
  data?: LoanRepayment
}

const initialState: LoanRepaymentReduxState = {
  loading: false,
}

const loanRepaymentReducer = (
  state: LoanRepaymentReduxState = initialState,
  action: LoanReduxActionsType,
): LoanRepaymentReduxState => {
  switch (action.type) {
    case REPAY_LOAN_REQUESTED:
      return update(state, {
        loading: {
          $set: true,
        },
      })
    case REPAY_LOAN_SUCCESS:
      return update(state, {
        $set: {
          loading: false,
          data: action.loanRepayment,
        },
      })
    case REPAY_LOAN_FAILED:
      return update(state, {
        loading: {
          $set: false,
        },
        error: {
          $set: action.error,
        },
      })

    default:
      return state
  }
}

export default loanRepaymentReducer
