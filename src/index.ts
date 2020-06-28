// polyfill include in 'production' only, see: 'scripts/build.js'
// import './polyfill';

import './root.css';

import render from './render';
import { AsyncApp, getRegister } from './micro';
import * as Util from './util';

import registerApp from './registerApp';
import { getStore } from './store';

export * from './vendorExports';

export {
  loadScript,
  loadMultiScripts,
  loadStyle,
  loadMultiStyles,
  preloadStyle,
  preloadMultiStyles,
  preloadScript,
  preloadMultiScripts,
} from './micro';

export {
  AsyncApp,
  Util,
  registerApp,
  getRegister,
  getStore,
};

getRegister().registerFromMetadata(Util.getMetadataApps());
render(document.getElementById('root'));
