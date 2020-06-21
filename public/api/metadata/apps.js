/* eslint-disable */
"use strict";

(function(callback) {
  var apps = [
    {
      id: 'example',
      dependencies: ['echart', 'app1'], // NOT implement yet
      styles: ['/rmf-example/658c5f91//app-example-a200b003.css'],
      entries: ['/rmf-example/658c5f91/app-example-b889c22.js'],
      routes: ['/example'],
    },
  ];

  if (callback) callback(apps);
})(rmfMetadataAppsCallback);
