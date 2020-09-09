import React, { FC } from 'react'
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  StatusBarProps,
  View,
  ScrollView,
  Text,
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import { GreenAspire } from '../../assets/icons'
import * as Animatable from 'react-native-animatable'

export type ContainerProps = {
  barStyle?: StatusBarProps['barStyle']
  title?: React.ReactNode
  subtitle?: React.ReactNode
  variant?: 'light' | 'default' | 'secondary'
}

const Container: FC<ContainerProps> = (props) => {
  const { colors } = useTheme() as any

  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          props.variant === 'light'
            ? colors.white
            : props.variant === 'secondary'
            ? colors.secondary
            : colors.background,
      }}
    >
      <StatusBar
        barStyle={props.barStyle}
        translucent
        backgroundColor="transparent"
      />
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.headerLogo}>
              <GreenAspire />
            </View>

            <Text style={styles.headerTitle}>{props.title}</Text>
            {props.subtitle}
          </View>

          <ScrollView
            bounces={false}
            contentContainerStyle={{
              flexGrow: 1,
            }}
          >
            <Animatable.View
              animation="slideInUp"
              style={styles.contentContainer}
            >
              {props.children}
            </Animatable.View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  )
}

Container.defaultProps = {
  barStyle: 'dark-content',
}

export default Container

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: StatusBar.currentHeight,
    position: 'relative',
  },
  headerContainer: {
    position: 'absolute',
    top: 8,
    bottom: 0,
    left: 24,
    right: 24,
  },
  contentContainer: {
    position: 'relative',
    marginTop: 260,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    height: '100%',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'AvenirNext-Bold',
  },
  headerLogo: {
    alignItems: 'flex-end',
  },
})
