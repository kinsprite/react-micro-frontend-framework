import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

// import './index.css';
import render from './render';

export * from './exports';

render(document.getElementById('root'));

console.log('subApp: loading...');
import('./subApp').then((SubApp) => {
  console.log('subApp: loaded.', SubApp);
});
