import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import getRegister from './register';
import { MetadataRender, RedirectToDefaultRoute } from '../util';

interface AsyncAppProps extends MetadataRender {
  appId: string;
  disableRedirect?: boolean,
  redirectOnFail?: string;
  [key: string]: any;
}

enum LoadedState {
  Init,
  OK,
  Failed,
}

function AsyncApp(props : AsyncAppProps) : React.ReactElement {
  const {
    appId, routePath, componentKey, disableRedirect, redirectOnFail,
  } = props;
  const register = getRegister();
  const app = register.getApp(appId);

  const isAppLoaded = app && register.isAppLoaded(app.id);

  const [once] = useState(1);
  const [result, setResult] = useState(
    isAppLoaded ? {
      loaded: LoadedState.OK,
      // Can't use React.FC in useState() for React.createElement()
      component: app && app.components && app.components[componentKey],
    } : {
      loaded: LoadedState.Init,
      component: null,
    },
  );

  useEffect(() => {
    let isMounted = true;

    if (app && result.loaded === LoadedState.Init) {
      register.loadApp(app.id).then(() => {
        if (isMounted) {
          setResult({
            loaded: LoadedState.OK,
            component: app.components && app.components[componentKey],
          });
        }
      }).catch(() => {
        if (isMounted) {
          setResult({
            loaded: LoadedState.Failed,
            component: null,
          });
        }
      });
    }

    return () => { isMounted = false; };
  }, [once]);

  if (result.loaded === LoadedState.Failed && !disableRedirect) {
    return redirectOnFail ? <Redirect to={redirectOnFail} /> : RedirectToDefaultRoute(routePath);
  }

  return (result.loaded === LoadedState.OK && result.component)
    ? React.createElement(result.component as any, props) : <></>;
}

export default AsyncApp;
