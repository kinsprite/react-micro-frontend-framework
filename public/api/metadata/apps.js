/* eslint-disable */

"use strict";

(function(callback) {
  var apps = {
    // [appName: string]: {}
    appExample: {
      id: 'appExample',
      dependencies: ['echart', 'app1'],
      routes: ['/appExample'],
      styles: ['/app-example-f00322/app-example-a200b003.css'],
      entries: ['/app-example-f00322/app-example-b889c22.js'],
    }
  };

  if (callback) callback(apps);
})(rmfMetadataAppsCallback);
