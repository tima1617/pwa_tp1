var CACHE_NAME = "what-whatch-cache-v1";
var urlsToCache = ["/", "/index.html", "/style.css"];

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
  console.log("Service work has been installed!");
});

self.addEventListener("activate", (evt) => {
  var cacheWhitelist = [CACHE_NAME];

  evt.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  console.log("Service work has been activated!");
});

self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then(function (response) {
      if (response) {
        return response;
      }

      var fetchRequest = evt.request.clone();

      return fetch(fetchRequest).then(function (response) {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        var responseToCache = response.clone();

        caches.open(staticCacheName).then(function (cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
  evt.console.log("Ressources récupérées : " + evt.request.url);
});
