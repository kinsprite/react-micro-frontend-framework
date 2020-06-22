import './polyfill';

// import './index.css';

import render from './render';
import { getRegister } from './micro';
import * as Util from './util';

import registerApp from './registerApp';
import { getStore } from './store';

export * from './vendorExports';

export {
  Util,
  registerApp,
  getStore,
};

const apps = ((window as any).rmfMetadataApps) || [];
getRegister().registerFromMetadata(apps);

render(document.getElementById('root'));
