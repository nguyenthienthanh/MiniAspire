import update from 'immutability-helper'
import {
  FETCH_LOAN_REPAYMENTS_FAILED,
  FETCH_LOAN_REPAYMENTS_REQUESTED,
  FETCH_LOAN_REPAYMENTS_SUCCESS,
  LoanReduxActionsType,
  REPAY_LOAN_SUCCESS,
} from '../actions'
import { LoanRepayment } from '../types/loan'

export type LoanRepaymentReduxState = {
  loading: boolean
  error?: Error
  data: LoanRepayment[]
}

const initialState: LoanRepaymentReduxState = {
  loading: false,
  data: [],
}

const loanRepaymentsReducer = (
  state: LoanRepaymentReduxState = initialState,
  action: LoanReduxActionsType,
): LoanRepaymentReduxState => {
  switch (action.type) {
    case REPAY_LOAN_SUCCESS:
      return update(state, {
        data: { $unshift: [action.loanRepayment] },
      })
    case FETCH_LOAN_REPAYMENTS_REQUESTED:
      return update(state, {
        loading: {
          $set: true,
        },
      })
    case FETCH_LOAN_REPAYMENTS_SUCCESS:
      return update(state, {
        $set: {
          loading: false,
          data: action.loanRepayments,
        },
      })
    case FETCH_LOAN_REPAYMENTS_FAILED:
      return update(state, {
        $set: {
          loading: false,
          data: state.data,
          error: action.error,
        },
      })

    default:
      return state
  }
}

export default loanRepaymentsReducer
