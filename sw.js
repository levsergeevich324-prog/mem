const CACHE_NAME = 'memory-site-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/photo.jpg',
  '/manifest.json',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png'
];

// Установка Service Worker и кэширование файлов
self.addEventListener('install', event => {
  console.log('Service Worker устанавливается...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Кэширование файлов...');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Перехват запросов и возврат из кэша
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Возвращаем из кэша
        }
        return fetch(event.request); // Иначе загружаем из сети
      })
  );
});

// Очистка старого кэша при активации новой версии
self.addEventListener('activate', event => {
  console.log('Service Worker активируется...');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('Удаление старого кэша:', key);
          return caches.delete(key);
        }
      }));
    })
  );
});
