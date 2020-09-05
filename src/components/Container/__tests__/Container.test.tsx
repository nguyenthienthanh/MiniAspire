/**
 * @format
 */

import React from 'react'
import 'react-native'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

import Container from '../Container'

describe('Container', () => {
  it('should render correctly and match the snapshot', () => {
    const container = Enzyme.shallow(<Container />)
    expect(toJson(container)).toMatchSnapshot()
  })

  it('should render with status bar style is "light-content" correctly', () => {
    expect.assertions(1)

    const container = renderer.create(<Container barStyle="light-content" />)

    expect(container.root.findByProps({}).props.barStyle).toBe('light-content')
  })
})
