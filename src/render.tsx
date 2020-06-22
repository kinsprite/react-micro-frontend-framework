import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { Provider } from 'react-redux';
import { getRegister, AsyncApp } from './micro';
import { RedirectToDefaultRoute } from './util';
import { getStore } from './store';

function RouterBase() {
  const apps = getRegister().getAppsByRoutes().filter((pair) => pair.app.render === 'root');
  const redirectDefault = RedirectToDefaultRoute('/');

  return (
    <Router>
      <Switch>
        {apps.map((pair) => (
          <Route path={pair.route} key={pair.route}>
            <AsyncApp appId={pair.app.id} routePath={pair.route} />
          </Route>
        ))}
        <Route exact path="/">
          { redirectDefault }
        </Route>
        )
      </Switch>
    </Router>
  );
}

export default function render(element: Element) : void {
  const store = getStore();

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterBase />
      </Provider>
    </React.StrictMode>,
    element,
  );
}
