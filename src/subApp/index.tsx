import React from 'react';

import styles from './subApp.module.css';

import { appendRoutes } from '../render';

function SubApp() : JSX.Element {
  return (
    <div className={styles.container}>
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Home
      </a>
    </div>
  );
}

export default SubApp;

appendRoutes([{
  path: '/sub-app',
  component: SubApp,
  routes: [],
}]);
