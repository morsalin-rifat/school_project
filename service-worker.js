const CACHE_NAME = 'ccrs-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/notices.html',
    '/admin.html',
    '/assets/css/style.css',
    '/assets/css/notices.css',
    '/assets/css/admin.css',
    '/assets/js/home.js',
    '/assets/js/notices.js',
    '/assets/js/admin.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});
