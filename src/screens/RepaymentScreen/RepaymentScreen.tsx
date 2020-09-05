import React, { FC, useCallback } from 'react'

import Container from '../../components/Container'
import { Card, Button } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'
import { ReduxReducers } from '../../reducers'
import { isEqual } from 'lodash'
import { repayLoan, fetchCurrentLoan } from '../../actions'

export type RepaymentScreenProps = {}

const RepaymentScreen: FC<RepaymentScreenProps> = (props) => {
  const loan = useSelector<ReduxReducers, ReduxReducers['loan']>(
    (state) => state.loan,
    isEqual,
  )

  const dispatch = useDispatch()

  React.useEffect(() => {
    if (!loan.data) {
      dispatch(fetchCurrentLoan())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const loanRepayment = useSelector<
    ReduxReducers,
    ReduxReducers['loanRepayment']
  >((state) => state.loanRepayment, isEqual)

  const handleRepay = useCallback(() => {
    if (!loan.data?.id) {
      return
    }

    dispatch(repayLoan(loan.data.id))
  }, [dispatch, loan.data])

  return (
    <Container>
      <Card>
        <Button
          testID="repay"
          title="Repay"
          onPress={handleRepay}
          loading={loanRepayment.loading}
          disabled={loanRepayment.loading}
        />
      </Card>
    </Container>
  )
}

export default RepaymentScreen
