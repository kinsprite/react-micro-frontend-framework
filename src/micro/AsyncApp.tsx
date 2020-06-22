import React, { useState, useEffect } from 'react';

import getRegister from './register';
import { RedirectToDefaultRoute } from '../util';

interface AsyncAppProps {
  routePath: string;
  [key: string]: any;
}

function AsyncApp(props : AsyncAppProps) : React.ReactElement {
  const { routePath } = props;
  const register = getRegister();
  const app = register.getAppByRoute(routePath);

  // can't use useState() for React.createElement
  let component : any = app && app.component;
  const redirectDefault = RedirectToDefaultRoute();

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
    return redirectDefault;
  }

  return (loaded && component) ? React.createElement(component, props) : <></>;
}

export default AsyncApp;
