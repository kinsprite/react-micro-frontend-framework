import React from 'react';

import styles from './subApp.module.css';

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
