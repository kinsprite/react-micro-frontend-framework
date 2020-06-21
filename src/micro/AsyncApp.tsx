import React, { useState, useEffect } from 'react';

import register from './register';

interface AsyncAppProps {
  routePath: string;
}

function AsyncApp({ routePath } : AsyncAppProps): React.ReactElement {
  const [loaded, setLoaded] = useState(false);
  const [component, setComponent] = useState(null);

  useEffect(() => {
    const app = register.getAppByRoute(routePath);

    if (app) {
      register.loadApp(app.id).then(() => {
        setLoaded(true);
        setComponent(app.component);
      }).catch(() => {
        setLoaded(false);
      });
    }
  });

  return loaded ? component : null;
}

export default AsyncApp;
