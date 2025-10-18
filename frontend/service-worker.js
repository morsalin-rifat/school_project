const CACHE_NAME = 'ccrs-school-cache-v2'; // ভার্সন আপডেট করেছি
const URLS_TO_CACHE = [
    '/',
    'index.html',
    'notices.html',
    'admin.html',
    'manifest.json',
    'assets/css/style.css',
    'assets/js/app.js',
    'images/icons/icon-192x192.png',
    'images/icons/icon-512x512.png'
    // প্রতিটি মডিউল তৈরির পর এখানে সংশ্লিষ্ট ফাইল যোগ করা হবে।
];

// ইনস্টলেশন: ফাইলগুলো ক্যাশে সেভ করা
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Cache opened');
            return cache.addAll(URLS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// ফেচ: নেটওয়ার্ক রিকোয়েস্ট নিয়ন্ত্রণ করা
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// অ্যাক্টিভেশন: পুরনো ক্যাশ পরিষ্কার করা
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});