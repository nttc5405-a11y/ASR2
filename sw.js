var CACHE = 'asr2-v1';
var ASSETS = [
  '/ASR2/',
  '/ASR2/index.html',
  '/ASR2/manifest.json',
  '/ASR2/工作場地標記.PNG',
  '/ASR2/受困者標記.PNG',
  '/ASR2/快速清理標記RCM.PNG',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      return cached || fetch(e.request).then(function(resp) {
        var clone = resp.clone();
        caches.open(CACHE).then(function(cache){cache.put(e.request, clone);});
        return resp;
      });
    }).catch(function() {
      return caches.match('./index.html');
    })
  );
});
