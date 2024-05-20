self.addEventListener('install', event => {
    console.log('Service Worker installing.');
    // Cache resources if needed
});

self.addEventListener('activate', event => {
    console.log('Service Worker activating.');
    // Remove old caches if needed
});

self.addEventListener('fetch', event => {
    console.log('Fetching:', event.request.url);
    // You can intercept requests and serve custom responses
});
