import React, { FC } from 'react'
import { View, Text as RNText, StyleSheet } from 'react-native'

export type TextProps = {
  variant: string
}

const Text: FC<TextProps> = (props) => {
  return (
    <View>
      <RNText />
    </View>
  )
}

export default Text

const styles = StyleSheet.create({})
