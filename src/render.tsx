/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import { Provider } from 'react-redux';
import App from './App';
import { getRegister, AsyncApp } from './micro';
import { RedirectToDefaultRoute } from './util';
import { getStore } from './store';

function RouterBase() {
  const apps = getRegister().getAppsByRoutes();
  const redirectDefault = RedirectToDefaultRoute();

  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/app-example">App Example</Link>
          </li>
        </ul>

        <Switch>
          {apps.map((pair) => (
            <Route path={pair.route} key={pair.route}>
              <AsyncApp routePath={pair.route} />
            </Route>
          ))}
          <Route path="/home">
            <App />
          </Route>
          <Route exact path="/">
            { redirectDefault }
          </Route>
          )
        </Switch>
      </div>
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
