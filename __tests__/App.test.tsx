/**
 * @format
 * @jest-environment jsdom
 */

import 'react-native'
import React from 'react'

import Enzyme, { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

import App from '../App'

describe('App', () => {
  it('should render correctly', () => {
    expect.assertions(1)

    const wrapper = shallow(<App />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
