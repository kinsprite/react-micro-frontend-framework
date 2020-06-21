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
  promiseLoading?: Promise<AppLoadState>;
  loadState?: AppLoadState,
  component?: React.Component; // Component to render the route
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
  registerComponent(id: string, component? :React.Component) {
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
        promiseLoading: undefined,
        loadState: AppLoadState.Init,
        component: undefined,
      };
    });

    Object.keys(this.apps).forEach((id) => {
      const app = this.apps[id];
      app.routes.forEach((route) => {
        this.routes2Apps[route] = app;
      });
    });
  }

  getAppsByRoutes() {
    return Object.keys(this.routes2Apps).map((route) => this.routes2Apps[route]);
  }
}

const register = new AppRegister();
export default register;
