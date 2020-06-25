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
  const renderItems = getRegister().filterRenderItems('root');

  return (
    <Router>
      <Switch>
        {renderItems.map((item) => (
          <Route path={item.render.routePath} key={item.render.routePath}>
            <AsyncApp
              appId={item.app.id}
              renderId={item.render.renderId}
              routePath={item.render.routePath}
              componentKey={item.render.componentKey}
            />
          </Route>
        ))}
        <Route path="*">
          { RedirectToDefaultRoute() }
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
