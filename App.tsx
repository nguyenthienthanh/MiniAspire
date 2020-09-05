import React from 'react'
import { ActivityIndicator } from 'react-native'

import { Provider as ReactReduxProvider } from 'react-redux'
import { PersistGate as ReduxPersistGate } from 'redux-persist/integration/react'
import './src/fakeApi'
import AppNavigator from './src/navigations/navigations'
import store, { persistor } from './src/stores'

const App = () => {
  return (
    <ReactReduxProvider store={store}>
      <ReduxPersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <AppNavigator />
      </ReduxPersistGate>
    </ReactReduxProvider>
  )
}

export default App
