import { subWeeks } from 'date-fns'
import { Server } from 'miragejs'

if ((window as any).server) {
  ;(window as any).server.shutdown()
}

;(window as any).server = new Server({
  routes() {
    this.get('/current-loan', () => ({
      id: 'loan-1',
      amount: 312000000,
      weeklyAmount: 2000000,
      weeklyRepaid: false,
      term: new Date('09/09/2023'),
    }))

    this.get('loan/:id/recent-repayments', () => [
      {
        amount: 2000000,
        repaymentsAt: new Date('09/05/2020'),
      },
      {
        amount: 2000000,
        repaymentsAt: subWeeks(new Date('09/05/2020'), 1),
      },
      {
        amount: 2000000,
        repaymentsAt: subWeeks(new Date('09/05/2020'), 2),
      },
      {
        amount: 2000000,
        repaymentsAt: subWeeks(new Date('09/05/2020'), 3),
      },
    ])

    this.post('loan/:id/repay', () => ({
      amount: 2000000,
      repaymentsAt: new Date('09/05/2020'),
    }))
  },
})
