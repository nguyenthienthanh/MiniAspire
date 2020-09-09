import React, { FC } from 'react'
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  StatusBarProps,
  View,
} from 'react-native'
import { useTheme } from '@react-navigation/native'

export type ContainerProps = {
  barStyle?: StatusBarProps['barStyle']
  variant?: 'light' | 'default'
}

const Container: FC<ContainerProps> = (props) => {
  const { colors } = useTheme() as any

  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          props.variant === 'light' ? colors.white : colors.background,
      }}
    >
      <StatusBar
        barStyle={props.barStyle}
        translucent
        backgroundColor="transparent"
      />
      <SafeAreaView style={styles.container}>{props.children}</SafeAreaView>
    </View>
  )
}

Container.defaultProps = {
  barStyle: 'dark-content',
}

export default Container

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
  },
})
