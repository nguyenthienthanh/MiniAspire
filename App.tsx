import React, { useMemo } from 'react'
import { ActivityIndicator, useColorScheme } from 'react-native'

import { Provider as ReactReduxProvider } from 'react-redux'
import { PersistGate as ReduxPersistGate } from 'redux-persist/integration/react'
import './src/fakeApi'
import AppNavigator, {
  MyLightTheme,
  MyDarkTheme,
} from './src/navigations/navigations'
import store, { persistor } from './src/stores'
import { ThemeProvider, Theme, colors } from 'react-native-elements'

const MyRNElementsDefaultTheme: Theme = {
  ListItemTitle: {
    style: {
      fontSize: 13,
    },
  },
  ListItemSubtitle: {
    style: {
      fontSize: 12,
    },
  },
  colors: {
    ...colors,
    ...MyLightTheme.colors,
  },
}

const MyRNElementsDarkTheme: Theme = {
  ...MyRNElementsDefaultTheme,
  colors: {
    ...colors,
    ...MyDarkTheme.colors,
  },
}

const App = () => {
  const scheme = useColorScheme()

  const theme = useMemo(
    () =>
      scheme === 'dark' ? MyRNElementsDarkTheme : MyRNElementsDefaultTheme,
    [scheme],
  )

  return (
    <ReactReduxProvider store={store}>
      <ReduxPersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <AppNavigator />
        </ThemeProvider>
      </ReduxPersistGate>
    </ReactReduxProvider>
  )
}

export default App
