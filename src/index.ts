import './polyfill';

// import './index.css';

import render from './render';
import { AsyncApp, getRegister } from './micro';
import * as Util from './util';

import registerApp from './registerApp';
import { getStore } from './store';

export * from './vendorExports';

export {
  AsyncApp,
  Util,
  registerApp,
  getRegister,
  getStore,
};

const apps = ((window as any).rmfMetadataApps) || [];
getRegister().registerFromMetadata(apps);

render(document.getElementById('root'));
