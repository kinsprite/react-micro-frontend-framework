import React from 'react';
import { Redirect } from 'react-router-dom';

function RedirectToDefaultRoute(from: string) : JSX.Element {
  const { defaultRoute } = (window as any).rmfMetadataExtra || {};
  return (defaultRoute && defaultRoute !== from) ? <Redirect to={defaultRoute} /> : <></>;
}

function RedirectToHome() : JSX.Element {
  return <Redirect to="/" />;
}

export {
  RedirectToDefaultRoute,
  RedirectToHome,
};
