import AsyncStorage from '@react-native-community/async-storage'
import { applyMiddleware, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import reducers from '../reducers'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  persistReducer(persistConfig, reducers),
  {} as any,
  applyMiddleware(sagaMiddleware),
)

export const persistor = persistStore(store)

export default store
