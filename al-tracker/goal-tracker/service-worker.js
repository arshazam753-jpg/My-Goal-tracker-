const cacheName = "goal-tracker-v1";
const assetsToCache = [
    "/",
    "/index.html",
    "/style.css",
    "/script.js",
    "/manifest.json",
    "/icon.png"
];

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => cache.addAll(assetsToCache))
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => response || fetch(e.request))
    );
});
