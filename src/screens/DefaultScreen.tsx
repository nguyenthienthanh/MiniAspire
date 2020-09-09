import React, { FC } from 'react'
import { Text, StyleSheet } from 'react-native'
import Container from '../components/Container'

export type DefaultScreenProps = {}

const DefaultScreen: FC<DefaultScreenProps> = (props) => {
  return (
    <Container variant="light">
      <Text>Text</Text>
    </Container>
  )
}

export default DefaultScreen

const styles = StyleSheet.create({})
