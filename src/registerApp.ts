import { combineReducers } from 'redux';
import { Task } from 'redux-saga';

import { getRegister } from './micro';
import { AppInfo } from './micro/register';
import { getStore } from './store';

interface RegisterResult {
  ok: boolean;
  sagaTask: Task | null;
}

function combineReducersAndReplace() {
  const apps = getRegister().getApps();
  let count = 0;

  const reducers = Object.keys(apps).filter((id) => apps[id].reducer).reduce((acc, id) => {
    acc[id] = apps[id].reducer;
    count += 1;
    return acc;
  }, {});

  if (count) {
    getStore().replaceReducer(combineReducers(reducers));
  } else {
    getStore().replaceReducer((state) => state);
  }
}

function registerApp(id: string, appInfo?: AppInfo): RegisterResult {
  const ok = getRegister().registerFromSubApp(id, {
    ...appInfo,
    saga: null,
    sagaArgs: null,
    epic: null,
  });

  if (appInfo.reducer) {
    combineReducersAndReplace();
  }

  if (appInfo.epic) {
    getStore().runEpic(appInfo.epic);
  }

  return {
    ok,
    sagaTask: appInfo.saga ? getStore().runSaga(appInfo.saga, ...(appInfo.sagaArgs || [])) : null,
  };
}

export default registerApp;
