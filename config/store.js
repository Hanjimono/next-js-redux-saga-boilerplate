import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import createRootReducer from './reducer'
import rootSaga from './saga'
import { createWrapper } from 'next-redux-wrapper'

export const makeStore = (context) => {
  const sagaMiddleware = createSagaMiddleware()
  let enhancer = applyMiddleware(sagaMiddleware)
  if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production'){
    enhancer = applyMiddleware(sagaMiddleware, logger)
  }
  const store = createStore(createRootReducer(), enhancer)
  sagaMiddleware.run(rootSaga)

  if (module.hot) {
    module.hot.accept('./reducer', () =>
      store.replaceReducer(require('./reducer'))) // eslint-disable-line global-require
  }
  return store
}

export const wrapper = createWrapper(makeStore, { debug: true })

export default makeStore