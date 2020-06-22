/*
 * build size: 342 KB >> Saga 356KB >> RxJS 402KB
      >> RxJSOperators 478KB >> RxJS All 494KB >>redux-observable 499KB
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactRouterDOM from 'react-router-dom';

import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';

import * as RxJS from 'rxjs';
// import * as RxJSAjax from 'rxjs/ajax';
// import * as RxJSFetch from 'rxjs/fetch';
import * as RxJSOperators from 'rxjs/operators';
// import * as RxJSTesting from 'rxjs/testing';
// import * as RxJSWebSocket from 'rxjs/webSocket';

// 'redux-observable' only use 'rxjs' and 'rxjs/operators'
import * as ReduxObservable from 'redux-observable';

import * as ReduxSaga from 'redux-saga';
import * as ReduxSagaEffects from 'redux-saga/effects';

export {
  React,
  ReactDOM,
  ReactRouterDOM,
  Redux,
  ReactRedux,

  RxJS,
  // RxJSAjax,
  // RxJSFetch,
  RxJSOperators,
  // RxJSTesting,
  // RxJSWebSocket,

  ReduxObservable,

  ReduxSaga,
  ReduxSagaEffects,
};
