import React from 'react';
import { Redirect } from 'react-router-dom';
import { getMetadataExtra } from './metadata';

function RedirectToDefaultRoute(from?: string) : JSX.Element {
  const { defaultRoute } = getMetadataExtra();
  return (defaultRoute && defaultRoute !== from) ? <Redirect to={defaultRoute} /> : <></>;
}

function RedirectToHome() : JSX.Element {
  return <Redirect to="/" />;
}

export {
  RedirectToDefaultRoute,
  RedirectToHome,
};
