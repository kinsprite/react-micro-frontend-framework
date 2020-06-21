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
              <Link to="/example">Example</Link>
            </li>
          </ul>

          <Switch>
            {apps.map((pair) => (
              <Route path={pair.route} key="pair.route">
                <AsyncApp routePath={pair.route} />
              </Route>
            ))}
            <Route exact path="/">
              <App />
            </Route>
          </Switch>
        </div>
      </Router>
    </React.StrictMode>,
    element,
  );
}
