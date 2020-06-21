import './polyfill';
// import './index.css';
import render from './render';
import { register } from './micro';

export * from './vendorExports';
export * from './micro';

const apps = ((window as any).rmfMetadataApps) || [];
register.registerFromMetadata(apps);

render(document.getElementById('root'));
