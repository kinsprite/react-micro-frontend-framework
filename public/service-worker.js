/* eslint-disable */

var cacheApps = {
  'app-home': true,
  'app-example': true
};
var cacheName = 'rmf-cache';
var rmfMetadataJSONP = {apps: [], extra: {}};

function isImageAddress(addr) {
  return (addr.pathname.endsWith('.png') || addr.pathname.endsWith('.svg')
    || addr.pathname.endsWith('.jpg') || addr.pathname.endsWith('.ico'));
}

function cacheAppEntries(metadata) {
  metadata = metadata || rmfMetadataJSONP;
  return caches.open(cacheName).then(function (cache) {
    var apps = metadata.apps.filter(function(app) {
      return cacheApps[app.id];
    });
    var entries = apps.reduce(function (acc, cur) {
      return acc.concat(cur.entries);
    }, []).filter(function(entry) {
      var url = new URL(entry, self.location.origin);
      return url.origin === self.location.origin;
    });

    console.log('[Service Worker] Caching app entries');
    return cache.addAll(entries).catch(function(e) {
      console.log("[Service Worker] Error in caching ", e)
    });
  });
}

self.addEventListener('install', function (e) {
  console.log('[Service Worker] Install');
  e.waitUntil(
    self.clients.matchAll({
      includeUncontrolled: true,
      type: 'all',
    }).then(function(clients) {
      clients.forEach(function(client) {
        client.postMessage({type: 'rmf-cache-require', payload: null});
      });
    })
  );
});

self.addEventListener('fetch', function (e) {
  // console.log(e.request.url);
  var addr = new URL(e.request.url);
  var isCacheType = addr.pathname.startsWith('/rmf-') || isImageAddress(addr);

  if (e.request.method != 'GET' || !isCacheType) {
    return;
  }

  e.respondWith(
    caches.match(e.request).then(function (r) {
      return r || fetch(e.request).then(function (response) {
        return caches.open(cacheName).then(function (cache) {
          console.log('[Service Worker] Caching new resource: ' + e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});

self.addEventListener('message', function (e) {
  if (e.data && e.data.type == 'rmf-cache-prefetch') {
    console.log('[Service Worker] Message "rmf-cache-prefetch" received');
    var metadata = Object.assign({apps: [], extra: {}}, e.data.payload);

    if (e.waitUntil) {
      e.waitUntil(cacheAppEntries(metadata));
    } else {
      cacheAppEntries(metadata);
    }
  }
});
