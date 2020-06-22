import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import getRegister from './register';
import { RedirectToDefaultRoute } from '../util';

interface AsyncAppProps {
  appId: string;
  routePath: string;
  redirectOnFail?: string;
  [key: string]: any;
}

function AsyncApp(props : AsyncAppProps) : React.ReactElement {
  const { appId, routePath, redirectOnFail } = props;
  const register = getRegister();
  const app = register.getApp(appId);

  // can't use useState() for React.createElement
  let component : any = app && app.component;
  const redirectElement = redirectOnFail ? <Redirect to={redirectOnFail} /> : RedirectToDefaultRoute(routePath);

  const [loaded, setLoaded] = useState(app && register.isAppLoaded(app.id));
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (app && !loaded) {
      register.loadApp(app.id).then(() => {
        if (isMounted) {
          component = app.component;
          setLoaded(true);
        }
      }).catch(() => {
        if (isMounted) {
          setLoaded(false);
          setRedirect(true);
        }
      });
    }

    return () => { isMounted = false; };
  }, [loaded]);

  if (redirect) {
    return redirectElement;
  }

  return (loaded && component) ? React.createElement(component, props) : <></>;
}

export default AsyncApp;
