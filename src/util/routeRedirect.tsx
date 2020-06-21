import React from 'react';
import { Redirect } from 'react-router-dom';

function RedirectToDefaultRoute() : JSX.Element {
  const { defaultRoute } = (window as any).rmfMetadataExtra || {};
  return defaultRoute ? <Redirect to={defaultRoute} /> : null;
}

function RedirectToHome() : JSX.Element {
  return <Redirect to="/" />;
}

export {
  RedirectToDefaultRoute,
  RedirectToHome,
};
