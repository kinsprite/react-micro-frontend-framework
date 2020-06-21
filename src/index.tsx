import './polyfill';
// import './index.css';
import render from './render';

export * from './exports';

render(document.getElementById('root'));

console.log('subApp: loading...');
import('./subApp').then((SubApp) => {
  console.log('subApp: loaded.', SubApp);
});
