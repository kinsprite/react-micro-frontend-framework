// redux store

import {
  createStore, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createEpicMiddleware } from 'redux-observable';

const composeEnhancers = process.env.NODE_ENV !== 'production'
  && typeof window === 'object'
  && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  }) : compose;

const sagaMiddleware = createSagaMiddleware();
const epicMiddleware = createEpicMiddleware();

const enhancer = composeEnhancers(
  applyMiddleware(thunk, sagaMiddleware, epicMiddleware),
  // other store enhancers if any
);

const store = {
  ...createStore((state) => state, enhancer),
  runSaga: sagaMiddleware.run,
  runEpic: epicMiddleware.run,
};

// eslint-disable-next-line
export function getStore() {
  return store;
}
