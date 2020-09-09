import React, { FC, useCallback } from 'react'
import { StyleSheet, View, ActivityIndicator, FlatList } from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import { ReduxReducers } from '../../reducers'
import { isEqual } from 'lodash'
import { fetchCurrentLoan, fetchLoanRepayment } from '../../actions'
import Container from '../../components/Container'
import { Card, Text, colors, ListItem } from 'react-native-elements'
import { format } from 'date-fns'
import numeral from 'numeral'

export type LoanInformationScreenProps = {}

const LoanInformationScreen: FC<LoanInformationScreenProps> = (props) => {
  const loan = useSelector<ReduxReducers, ReduxReducers['loan']>(
    (state) => state.loan,
    isEqual,
  )

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchCurrentLoan())
  }, [dispatch])

  return (
    <Container>
      <Card>
        <Card.Title testID="loanInformationTitle">Loan</Card.Title>
        <Card.Divider />

        {loan.loading && !loan.data ? (
          <ActivityIndicator />
        ) : (
          <>
            <Text testID="loanAmount" style={styles.text}>
              <Text style={styles.textTitle}>Amount: </Text>
              {numeral(loan.data?.amount ?? 0).format('0,0')} VND
            </Text>

            <Text testID="loanTerm" style={styles.text}>
              <Text style={styles.textTitle}>Term: </Text>
              {loan.data?.term &&
                format(new Date(loan.data.term), 'dd/MM/yyyy')}
            </Text>

            <Text testID="weeklyAmount" style={styles.text}>
              <Text style={styles.textTitle}>Weekly amount: </Text>
              {numeral(loan.data?.weeklyAmount ?? 0).format('0,0')} VND
            </Text>

            {loan.data?.weeklyRepaid && (
              <View testID="weeklyRepaid" style={styles.repaid}>
                <Text style={styles.repaidText}>REPAID</Text>
              </View>
            )}
          </>
        )}
      </Card>

      {loan.data?.id && <RecentRepayments loanId={loan.data.id} />}
    </Container>
  )
}

export default LoanInformationScreen

const RecentRepayments: FC<{ loanId: string }> = (props) => {
  const loanRepayments = useSelector<
    ReduxReducers,
    ReduxReducers['loanRepayments']
  >((state) => state.loanRepayments, isEqual)

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchLoanRepayment(props.loanId))
  }, [dispatch, props.loanId])

  const keyExtractor = useCallback((_, index) => index.toString(), [])
  const renderItem = useCallback(({ item }) => {
    return (
      <ListItem testID="recentRepaymentItem">
        <ListItem.Content>
          <ListItem.Subtitle>
            <Text testID="recentRepaymentsAt" style={styles.text}>
              {format(new Date(item.repaymentsAt), 'dd/MM/yyyy')}
            </Text>
          </ListItem.Subtitle>

          <ListItem.Title>
            <Text testID="recentRepaymentAmount" style={styles.text}>
              <Text style={styles.textTitle}>Amount: </Text>
              {numeral(item.amount ?? 0).format('0,0')} VND
            </Text>
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
    )
  }, [])

  return (
    <Card>
      <Card.Title testID="recentRepaymentTitle">Recent repayments</Card.Title>
      <Card.Divider />
      {loanRepayments.loading && !loanRepayments.data.length ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={loanRepayments.data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      )}
    </Card>
  )
}

const styles = StyleSheet.create({
  textTitle: {
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 4,
  },
  repaid: {
    position: 'absolute',
    width: 80,
    height: 80,
    right: 0,
    bottom: 0,
    transform: [{ rotateZ: '30deg' }],
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.success,
  },
  repaidText: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.success,
  },
})
