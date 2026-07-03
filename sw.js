// Force immediate install
self.addEventListener('install', function(e) {
  self.skipWaiting();
});

// Clear all caches and unregister on activation
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(k) {
        return caches.delete(k);
      }));
    }).then(function() {
      return self.registration.unregister();
    }).then(function() {
      console.log('Service Worker successfully unregistered and cache cleared.');
    })
  );
});

// Intercept nothing, bypass cache completely
self.addEventListener('fetch', function(e) {
  e.respondWith(fetch(e.request));
});
