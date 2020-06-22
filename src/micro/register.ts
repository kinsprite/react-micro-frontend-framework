import { Reducer } from 'redux';
import { Saga } from 'redux-saga';
import { Epic } from 'redux-observable';

import { loadMultiStyles } from './loadStyle';
import { loadMultiScripts } from './loadScript';

export enum AppLoadState {
  Init,
  Loading,
  Loaded,
}

export interface AppInfo {
  component?: React.Component | React.FC; // Component to render the route
  /* Global redux store here, but recommend to use isolated store in every app */
  reducer?: Reducer,
  saga?: Saga, // will NOT save in register
  sagaArgs?: Array<any>, // will NOT save in register
  epic?: Epic, // will NOT save in register
}

interface AppRegisterInfo extends AppInfo {
  id: string; // as 'serviceName' in manifest
  dependencies: string[]; // dependencies ids
  entries: string[]; // css/js entries files
  routes: string[]; // as 'path' in 'react-router'
  render: string; // 'root' or others string. 'root' will render on root's router switch
  promiseLoading?: Promise<boolean>;
  loadState?: AppLoadState,
}

interface AppRegisterInfoMap {
  [id: string]: AppRegisterInfo;
}

class AppRegister {
  // appId to AppRegisterInfo
  apps: AppRegisterInfoMap = {}

  // routes path to AppRegisterInfo
  routes2Apps: AppRegisterInfoMap = {}

  getApps() {
    return this.apps;
  }

  getApp(id: string) {
    return this.apps[id];
  }

  setAppLoadState(id: string, loadState: AppLoadState) {
    const app = this.apps[id];

    if (app) {
      app.loadState = loadState;
    }
  }

  getAppLoadState(id: string) {
    const app = this.apps[id];
    return app ? app.loadState : AppLoadState.Init;
  }

  isAppLoaded(id: string) {
    return this.getAppLoadState(id) === AppLoadState.Loaded;
  }

  // use in sub-Apps to register routes' component and other info (such as redux)
  registerFromSubApp(id: string, appInfo: AppInfo) : boolean {
    const app = this.apps[id];

    if (app && appInfo) {
      Object.assign(app, appInfo);
      return true;
    }

    return false;
  }

  // use in framework to init apps info, or append apps which not render on 'root' later
  registerFromMetadata(apps: AppRegisterInfo[]) {
    apps.forEach((app) => {
      this.apps[app.id] = {
        ...app,
        promiseLoading: null,
        loadState: AppLoadState.Init,
        component: null,
      };
    });

    Object.keys(this.apps).forEach((id) => {
      const app = this.apps[id];
      app.routes.forEach((route) => {
        this.routes2Apps[route] = app;
      });
    });
  }

  getAppByRoute(route) {
    return this.routes2Apps[route];
  }

  getAppsByRoutes() {
    return Object.keys(this.routes2Apps).map((route) => ({ route, app: this.routes2Apps[route] }));
  }

  loadApp(id: string) : Promise<boolean> {
    const app = this.getApp(id);

    if (!app) {
      return Promise.reject(new Error(`Not app for id: ${id}`));
    }

    if (app.promiseLoading) {
      return app.promiseLoading;
    }

    app.promiseLoading = new Promise((resolve, reject) => {
      app.loadState = AppLoadState.Loading;
      Promise.all([
        loadMultiStyles(app.entries.filter((x) => x.toLowerCase().endsWith('.css'))),
        loadMultiScripts(app.entries.filter((x) => x.toLowerCase().endsWith('.js'))),
      ]).then(
        () => {
          app.loadState = AppLoadState.Loaded;
          resolve(true);
        },
        (e) => {
          app.loadState = AppLoadState.Init;
          app.promiseLoading = null;
          reject(e);
        },
      );
    });

    return app.promiseLoading;
  }
}

const register = new AppRegister();

export default function getRegister() : AppRegister {
  return register;
}
