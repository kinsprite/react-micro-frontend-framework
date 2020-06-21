import { loadMultiStyles } from './loadStyle';
import { loadMultiScripts } from './loadScript';

export enum AppLoadState {
  Init,
  Loading,
  Loaded,
}

interface AppInfo {
  id: string; // as 'serviceName' in manifest
  dependencies: string[]; // dependencies ids
  styles: string[]; // css files
  entries: string[]; // js entries files
  routes: string[]; // as 'path' in 'react-router'
  promiseLoading?: Promise<boolean>;
  loadState?: AppLoadState,
  component?: JSX.Element; // Component to render the route
}

interface AppRegisterInfo {
  [id: string]: AppInfo;
}

class AppRegister {
  // appId to AppInfo
  apps: AppRegisterInfo = {}

  // routes path to AppInfo
  routes2Apps: AppRegisterInfo = {}

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

  // use in sub-Apps to register routes' component
  registerComponent(id: string, component?: JSX.Element) {
    const app = this.apps[id];

    if (app) {
      app.component = component;
    }
  }

  // use in framework to init apps info
  registerFromMetadata(apps: AppInfo[]) {
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
        loadMultiStyles(app.styles),
        loadMultiScripts(app.entries),
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
export default register;
