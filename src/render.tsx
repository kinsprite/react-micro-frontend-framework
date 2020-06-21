/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

import App from './App';
import { register, AsyncApp } from './micro';

export default function render(element: Element) : void {
  const apps = register.getAppsByRoutes();

  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/sub-app">About</Link>
            </li>
          </ul>

          <Switch>
            {apps.map((pair) => (
              <AsyncApp routePath={pair.route} />
            ))}
            <Route exact path="/">
              <App />
            </Route>
            <Route path="*">
              <Redirect
                to={{ pathname: '/' }}
              />
            </Route>
          </Switch>
        </div>
      </Router>
      <App />
    </React.StrictMode>,
    element,
  );
}
