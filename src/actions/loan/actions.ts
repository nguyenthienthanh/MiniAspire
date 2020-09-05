import {
  FETCH_CURRENT_LOAN_REQUESTED,
  FETCH_LOAN_REPAYMENTS_REQUESTED,
  REPAY_LOAN_REQUESTED,
} from './types'

export const fetchCurrentLoan = () => {
  return {
    type: FETCH_CURRENT_LOAN_REQUESTED,
  }
}

export const fetchLoanRepayment = (loanId: string) => {
  return {
    type: FETCH_LOAN_REPAYMENTS_REQUESTED,
    loanId,
  }
}

export const repayLoan = (loanId: string) => {
  return {
    type: REPAY_LOAN_REQUESTED,
    loanId,
  }
}
