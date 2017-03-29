var cacheName = 'v1';
var cacheFiles = [
  '/static/css/styles.css',
  '/search?q=rembrandt'
]

self.addEventListener('install', function (event) {
    console.log('[serviceWorker] installed');
    // event.waitUntil Delays the event until the Promise is resolved
    event.waitUntil(
      caches.open(cacheName).then(function(cache){
        console.log("[serviceWorker] caching cacheFiles")
        // Add all the default files to the cache
        return cache.addAll(cacheFiles);
      })
    )
})

self.addEventListener('activate', function (event) {
    console.log('[serviceWorker] activated');
    event.waitUntil(

      caches.keys().then(function(cacheNames){
        return Promise.all(cacheNames.map(function(thisCacheName) {
          if(thisCacheName !== cacheName) {
            console.log('[serviceWorker] Removing cached files from', thisCacheName);
            return caches.delete(thisCacheName);
          }
        }))
      })
    )
})

self.addEventListener('fetch', function (event) {
    console.log('[serviceWorker] fetching', event.request.url);
    event.respondWith(

      caches.match(event.request).then(function(response){
        if(response){
          console.log("[serviceWorker] Found in cache", event.request.url);
          return response;
        }
        var requestClone = event.request.clone();
        fetch(requestClone).then(function(response){
          if(!response){
            console.log("[serviceWorker] No response from fetch");
            return response;
          }
          var responseClone = response.clone();
          caches.open(cacheName).then(function (cache) {
            console.log("[serviceWorker] New Data New", event.request.url);
            cache.put(event.request, responseClone);
            return response;
          });
      })
      .catch(function(err) {
        console.log('[serviceWorker] error fetching and cashing new request');
      })
    }))
  })
