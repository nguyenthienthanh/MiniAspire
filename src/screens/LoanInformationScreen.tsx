import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { ReduxReducers } from '../reducers'
import { isEqual } from 'lodash'
import { fetchCurrentLoan, fetchLoanRepayment, repayLoan } from '../actions'
import Container from '../components/Container'

export type LoanInformationScreenProps = {}

const LoanInformationScreen: FC<LoanInformationScreenProps> = (props) => {
  // const loan = useSelector((state) => state, isEqual) as any

  // console.log(loan)

  // const dispatch = useDispatch()

  // React.useEffect(() => {
  //   dispatch(fetchCurrentLoan())
  // }, [dispatch])

  // React.useEffect(() => {
  //   dispatch(fetchLoanRepayment(loan.loan.data?.id))
  // }, [loan.loan.data?.id])

  // React.useEffect(() => {
  //   dispatch(repayLoan(loan.loan.data?.id))
  // }, [loan.loan.data?.id])

  return (
    <Container>
      <Text>LoanInformationScreen</Text>
    </Container>
  )
}

export default LoanInformationScreen

const styles = StyleSheet.create({})
