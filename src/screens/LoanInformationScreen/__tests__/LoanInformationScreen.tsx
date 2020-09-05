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
import LoanInformationScreen from '../LoanInformationScreen'

Enzyme.configure({ adapter: new Adapter() })

const mockStore = configureStore()

describe('LoanInformationScreen', () => {
  it('should render correctly and match the snapshot', () => {
    expect.assertions(7)

    const loanRepayments: ReduxReducers['loanRepayments'] = {
      loading: true,
      data: [{ amount: 2000000, repaymentsAt: new Date('09/09/2020') }],
    }

    const wrapper = renderer.create(
      <Redux.Provider
        store={mockStore({
          loan: {
            loading: false,
            data: {
              id: 'loan-1',
              amount: 30000000,
              term: new Date('09/09/2020'),
              weeklyAmount: 2000000,
              weeklyRepaid: false,
            },
          },
          loanRepayments,
        })}
      >
        <LoanInformationScreen />
      </Redux.Provider>,
    )

    expect(
      wrapper.root.findByProps({ testID: 'loanInformationTitle' }).props
        .children,
    ).toBe('Loan')
    expect(
      wrapper.root.findByProps({ testID: 'loanAmount' }).props.children,
    ).toContain('30,000,000')
    expect(
      wrapper.root.findByProps({ testID: 'loanTerm' }).props.children,
    ).toContain('09/09/2020')
    expect(
      wrapper.root.findByProps({ testID: 'weeklyAmount' }).props.children,
    ).toContain('2,000,000')
    expect(
      wrapper.root.findByProps({ testID: 'recentRepaymentAmount' }).props
        .children,
    ).toContain('2,000,000')
    expect(
      wrapper.root.findByProps({ testID: 'recentRepaymentsAt' }).props.children,
    ).toContain('09/09/2020')
    expect(wrapper.toJSON()).toMatchSnapshot()
  })
})
