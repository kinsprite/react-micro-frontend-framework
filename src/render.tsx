/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import App from './App';
import { register, AsyncApp } from './micro';
import { RedirectToDefaultRoute } from './util';

export default function render(element: Element) : void {
  const apps = register.getAppsByRoutes();
  const redirectDefault = RedirectToDefaultRoute();

  ReactDOM.render(
    <React.StrictMode>
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
              <Route path={pair.route} key="pair.route">
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
    </React.StrictMode>,
    element,
  );
}
