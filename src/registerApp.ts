import { combineReducers } from 'redux';
import { Task } from 'redux-saga';

import { filter } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';

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

function combineEpicsAndReplace() {
  const apps = getRegister().getApps();
  const epics = Object.keys(apps).map((id) => apps[id].epic).filter(Boolean);

  if (epics.length) {
    getStore().runEpic(combineEpics(...epics));
  } else {
    getStore().runEpic((action$) => action$.pipe(filter(() => false)));
  }
}

function registerApp(id: string, appInfo?: AppInfo): RegisterResult {
  const ok = getRegister().registerFromSubApp(id, { ...appInfo, saga: null, sagaArgs: null });

  if (appInfo.reducer) {
    combineReducersAndReplace();
  }

  if (appInfo.epic) {
    combineEpicsAndReplace();
  }

  return {
    ok,
    sagaTask: appInfo.saga ? getStore().runSaga(appInfo.saga, ...(appInfo.sagaArgs || [])) : null,
  };
}

export default registerApp;
