/* eslint-disable */
"use strict";

(function(callback) {
  var apps = [
    {
      id: 'app-example',
      dependencies: ['echart', 'app1'], // NOT implement yet
      entries: [
        '/rmf-app-example/658c5f91/app-example-a200b003.css',
        '/rmf-app-example/658c5f91/app-example-b889c22.js'
      ],
      routes: ['/app-example'],
    },
  ];

  var extra = {
    defaultRoute: '/home',
  };

  if (callback) callback(apps, extra);
})(rmfMetadataAppsCallback);
