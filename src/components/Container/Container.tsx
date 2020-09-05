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
}

const Container: FC<ContainerProps> = (props) => {
  const { colors } = useTheme()

  return (
    <View style={{ backgroundColor: colors.background }}>
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
