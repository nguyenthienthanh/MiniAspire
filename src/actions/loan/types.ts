import { Loan, LoanRepayment } from '../../types/loan'

export const FETCH_CURRENT_LOAN_REQUESTED = 'FETCH_CURRENT_LOAN_REQUESTED'
export const FETCH_CURRENT_LOAN_SUCCESS = 'FETCH_CURRENT_LOAN_SUCCESS'
export const FETCH_CURRENT_LOAN_FAILED = 'FETCH_CURRENT_LOAN_FAILED'

export const FETCH_LOAN_REPAYMENTS_REQUESTED = 'FETCH_LOAN_REPAYMENTS_REQUESTED'
export const FETCH_LOAN_REPAYMENTS_SUCCESS = 'FETCH_LOAN_REPAYMENTS_SUCCESS'
export const FETCH_LOAN_REPAYMENTS_FAILED = 'FETCH_LOAN_REPAYMENTS_FAILED'

export const REPAY_LOAN_REQUESTED = 'REPAY_LOAN_REQUESTED'
export const REPAY_LOAN_SUCCESS = 'REPAY_LOAN_SUCCESS'
export const REPAY_LOAN_FAILED = 'REPAY_LOAN_FAILED'

export type FetchCurrentLoanRequested = {
  type: typeof FETCH_CURRENT_LOAN_REQUESTED
}

export type FetchCurrentLoanSuccess = {
  type: typeof FETCH_CURRENT_LOAN_SUCCESS
  loan: Loan
}

export type FetchCurrentLoanFailed = {
  type: typeof FETCH_CURRENT_LOAN_FAILED
  error: Error
}

export type FetchLoanRepaymentsRequested = {
  type: typeof FETCH_LOAN_REPAYMENTS_REQUESTED
  loanId: string
}

export type FetchLoanRepaymentsSuccess = {
  type: typeof FETCH_LOAN_REPAYMENTS_SUCCESS
  loanRepayments: LoanRepayment[]
}

export type FetchLoanRepaymentsFailed = {
  type: typeof FETCH_LOAN_REPAYMENTS_FAILED
  error: Error
}

export type RepayLoanRequested = {
  type: typeof REPAY_LOAN_REQUESTED
  loanId: string
}

export type RepayLoanSuccess = {
  type: typeof REPAY_LOAN_SUCCESS
  loanRepayment: LoanRepayment
}

export type RepayLoanFailed = {
  type: typeof REPAY_LOAN_FAILED
  error: Error
}

export type LoanReduxActionsType =
  | FetchCurrentLoanRequested
  | FetchCurrentLoanSuccess
  | FetchCurrentLoanFailed
  | FetchLoanRepaymentsRequested
  | FetchLoanRepaymentsSuccess
  | FetchLoanRepaymentsFailed
  | RepayLoanRequested
  | RepayLoanSuccess
  | RepayLoanFailed
