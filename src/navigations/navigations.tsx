import React, { useCallback } from 'react'
import { useColorScheme } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import LoanInformationScreen from '../screens/LoanInformationScreen'
import RepaymentScreen from '../screens/RepaymentScreen'
import { colors } from 'react-native-elements'

const BottomTab = createBottomTabNavigator()

const MyDarkTheme: Theme = {
  dark: true,
  colors: {
    ...colors,
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(244, 244, 244)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
}

const AppNavigator = () => {
  const scheme = useColorScheme()

  const screenOptions = useCallback(
    ({ route }) => ({
      tabBarIcon: ({ focused, color, size }: any) => {
        let iconName = 'account-cash'

        if (route.name === 'LoanInformationScreen') {
          iconName = focused ? 'account-cash' : 'account-cash-outline'
        } else if (route.name === 'RepaymentScreen') {
          iconName = focused ? 'cash-refund' : 'cash-refund'
        }

        // You can return any component that you like here!
        return (
          <MaterialCommunityIcons name={iconName} size={size} color={color} />
        )
      },
    }),
    [],
  )

  return (
    <NavigationContainer theme={scheme === 'dark' ? MyDarkTheme : DefaultTheme}>
      <BottomTab.Navigator
        lazy
        screenOptions={screenOptions}
        tabBarOptions={{
          labelStyle: {
            fontSize: 13,
          },
        }}
        initialRouteName="LoanInformationScreen"
      >
        <BottomTab.Screen
          name="LoanInformationScreen"
          component={LoanInformationScreen}
          options={{
            title: 'LoanInformation',
          }}
        />
        <BottomTab.Screen
          name="RepaymentScreen"
          component={RepaymentScreen}
          options={{ title: 'Repayment' }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
