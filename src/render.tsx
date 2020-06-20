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

const allRoutes : any[] = [];

export function appendRoutes(routes: any[]) : void {
  allRoutes.push(...routes);
  console.log('now all routes:', allRoutes);
}

function RouteWithSubRoutes(route : {[key: string]: any}) : JSX.Element {
  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

export default function render(element: Element) : void {
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
            {allRoutes.map((route) => (
              <RouteWithSubRoutes key={route.path} {...route} />
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
