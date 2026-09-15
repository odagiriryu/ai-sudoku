const CACHE_NAME = 'ai-sudoku-v4';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        './index.html',
        './images/coach_robot_normal.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  // GAS（外部API）への通信はキャッシュせずにスルーする
  if (event.request.url.includes('script.google.com')) return;
  
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request))
  );
});