export type Loan = {
  id: string
  amount: number
  weeklyAmount: number
  weeklyRepaid?: boolean
  term: Date
}

export type LoanRepayment = {
  amount: number
  repaymentsAt: Date
}
