import './polyfill';
// import './index.css';
import render from './render';
import { register } from './micro';
import * as Util from './util';

export * from './vendorExports';
export * from './micro';

export {
  Util,
};

const apps = ((window as any).rmfMetadataApps) || [];
register.registerFromMetadata(apps);

render(document.getElementById('root'));
