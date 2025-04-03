self.addEventListener('install', (event) => {
    console.log('[Service Worker] Install');
    event.waitUntil(
        caches.open('static-cache').then((cache) => {
            console.log('[Service Worker] Caching Static Files');
            return cache.addAll([
                '/',
                '/icon-192x192.png',
                '/icon-512x512.png',
                //'/favicon.ico',
                '/header_1.png',
                '/super_3.1.png',
                '/super_3.3.png',
                '/try_again_3.png',
                '/settings',
                '/contacts',
                '/play',
                '/result'
                // Add other assets you want to cache
            ]);
        })
    );
});

function returnNoNetwork() {
    return caches.open("static-cache").then((cache) => {
        return cache.match(HOME + "post");
    });
}

async function cacheThenNetwork(request) {
    if (request) {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            console.log("Found response in cache:", cachedResponse);
            return cachedResponse;
        }
        console.log("Falling back to network");
        return fetch(request).then((networkResponse) => {
            caches.open("static-cache").then((cache) => {
                if (
                    networkResponse &&
                    networkResponse.status < 400
                ) {
                    console.log("Adding response to cache")
                    cache.put(request.url, networkResponse.clone());
                    return networkResponse;
                }
                return networkResponse
            })
                .catch(() => {
                    console.log("No network connection")
                    return returnNoNetwork();
                });
        })
    }
}

self.addEventListener("fetch", (event) => {
    console.log(`Handling fetch event for ${event.request.url}`);
    event.respondWith(cacheThenNetwork(event.request));
});