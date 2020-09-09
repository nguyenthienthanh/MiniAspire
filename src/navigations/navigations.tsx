import React, { useCallback } from 'react'
import { useColorScheme, View } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  DefaultTheme,
  DarkTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import LoanInformationScreen from '../screens/LoanInformationScreen'
import RepaymentScreen from '../screens/RepaymentScreen'
import {
  AspireIcon,
  CreditIcon,
  PaymentIcon,
  ProfileIcon,
  CardIcon,
} from '../assets/icons'
import DefaultScreen from '../screens/DefaultScreen'
import { colors } from 'react-native-elements'
import DebitCardScreen from '../screens/DebitCardScreen'

const BottomTab = createBottomTabNavigator()

export const MyDarkTheme: Theme = {
  dark: true,
  colors: {
    ...colors,
    ...DarkTheme.colors,
    white: '#fff',
    primary: '#01D167',
  } as any,
}

export const MyLightTheme: Theme = {
  dark: false,
  colors: {
    ...colors,
    ...DefaultTheme.colors,
    white: '#fff',
    primary: '#01D167',
  } as any,
}

const AppNavigator = () => {
  const scheme = useColorScheme()

  const screenOptions = useCallback(
    ({ route }) => ({
      tabBarIcon: ({ color }: any) => {
        let IconComponent = null

        switch (route.name) {
          case 'HomeScreen':
            IconComponent = AspireIcon
            break
          case 'DebitCardScreen':
            IconComponent = CardIcon
            break
          case 'PaymentsScreen':
            IconComponent = PaymentIcon
            break
          case 'CreditScreen':
            IconComponent = CreditIcon
            break
          case 'ProfileScreen':
            IconComponent = ProfileIcon
            break
        }

        if (!IconComponent) {
          return null
        }

        // You can return any component that you like here!
        return <IconComponent fill={color} />
      },
    }),
    [],
  )

  return (
    <NavigationContainer theme={scheme === 'dark' ? MyDarkTheme : MyLightTheme}>
      <BottomTab.Navigator
        lazy
        screenOptions={screenOptions}
        tabBarOptions={{
          labelStyle: {
            fontSize: 12,
            fontFamily: 'AvenirNext-Medium',
          },
          tabStyle: {
            height: 56,
          },
          style: {
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,

            elevation: 6,
          },
          inactiveTintColor: '#ddd',
        }}
        initialRouteName="DebitCardScreen"
      >
        <BottomTab.Screen
          name="HomeScreen"
          component={DefaultScreen}
          options={{
            title: 'Home',
          }}
        />

        <BottomTab.Screen
          name="DebitCardScreen"
          component={DebitCardScreen}
          options={{ title: 'Debit Card' }}
        />

        <BottomTab.Screen
          name="PaymentsScreen"
          component={DefaultScreen}
          options={{ title: 'Payments' }}
        />

        <BottomTab.Screen
          name="CreditScreen"
          component={DefaultScreen}
          options={{ title: 'Credit' }}
        />

        <BottomTab.Screen
          name="ProfileScreen"
          component={DefaultScreen}
          options={{ title: 'Profile' }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
