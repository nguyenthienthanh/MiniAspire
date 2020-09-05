import React, { FC } from 'react'
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  StatusBarProps,
  View,
} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'

export type ContainerProps = {
  barStyle?: StatusBarProps['barStyle']
}

const Container: FC<ContainerProps> = (props) => {
  return (
    <View style={styles.root}>
      <StatusBar barStyle={props.barStyle} translucent />
      <SafeAreaView>{props.children}</SafeAreaView>
    </View>
  )
}

Container.defaultProps = {
  barStyle: 'dark-content',
}

export default Container

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.lighter,
  },
})
