import React, { useState, useEffect } from 'react';

import register from './register';
import { RedirectToDefaultRoute } from '../util';

interface AsyncAppProps {
  routePath: string;
}

function AsyncApp({ routePath } : AsyncAppProps): React.ReactElement {
  const [loaded, setLoaded] = useState(false);
  const [component, setComponent] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const redirectDefault = RedirectToDefaultRoute();

  useEffect(() => {
    let isMounted = true;
    const app = register.getAppByRoute(routePath);

    if (app) {
      register.loadApp(app.id).then(() => {
        if (isMounted) {
          setLoaded(true);
          setComponent(app.component);
        }
      }).catch(() => {
        if (isMounted) {
          setLoaded(false);
          setRedirect(true);
        }
      });
    }

    return () => { isMounted = false; };
  });

  if (redirect) {
    return redirectDefault;
  }

  return loaded ? component : null;
}

export default AsyncApp;
