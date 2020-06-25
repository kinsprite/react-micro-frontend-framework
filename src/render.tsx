import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { Provider } from 'react-redux';
import { getRegister, AsyncApp, AppRegisterInfo } from './micro';
import { MetadataRender, RedirectToDefaultRoute } from './util';
import { getStore } from './store';

interface RenderItem {
  app: AppRegisterInfo;
  render: MetadataRender;
}

function RouterBase() {
  const renderItems = [];

  getRegister().getAppsAsArray().forEach((app) => {
    app.renders.forEach((metaRender) => {
      if (metaRender.renderId === 'root') {
        renderItems.push({
          app,
          render: metaRender,
        });
      }
    });
  });

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
