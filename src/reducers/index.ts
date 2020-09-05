import { combineReducers } from 'redux'
import loanReducers from './loan'
import loanRepaymentsReducer from './loanRepayments'
import loanRepaymentReducer from './loanRepayment'

const reducers = combineReducers({
  loan: loanReducers,
  loanRepayments: loanRepaymentsReducer,
  loanRepayment: loanRepaymentReducer,
})

export type ReduxReducers = Pick<
  ReturnType<typeof reducers>,
  'loan' | 'loanRepayments' | 'loanRepayment'
>

export default reducers
