/**
 * @format
 * @jest-environment jsdom
 */
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import 'react-native'
import * as Redux from 'react-redux'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import { ReduxReducers } from '../../../reducers'
import RepaymentScreen from '../RepaymentScreen'

Enzyme.configure({ adapter: new Adapter() })

const mockStore = configureStore()

describe('RepaymentScreen', () => {
  it('should render correctly and match the snapshot', () => {
    expect.assertions(2)

    const state: ReduxReducers['loanRepayment'] = {
      loading: true,
      data: { amount: 2000000, repaymentsAt: new Date() },
    }

    const wrapper = renderer.create(
      <Redux.Provider
        store={mockStore({
          loan: {
            loading: false,
            data: {
              id: 'loan-1',
              amount: 30000000,
              term: new Date(),
              weeklyAmount: 2000000,
              weeklyRepaid: false,
            },
          },
          loanRepayment: state,
        })}
      >
        <RepaymentScreen />
      </Redux.Provider>,
    )

    expect(wrapper.root.findByProps({ testID: 'repay' }).props.loading).toBe(
      true,
    )
    expect(wrapper.toJSON()).toMatchSnapshot()
  })
})
