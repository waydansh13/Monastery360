// Service Worker for Monastery360 PWA
const CACHE_NAME = 'monastery360-v1.0.0';
const STATIC_CACHE = 'monastery360-static-v1.0.0';
const DYNAMIC_CACHE = 'monastery360-dynamic-v1.0.0';

// Files to cache for offline functionality
const STATIC_FILES = [
    '/',
    '/index.html',
    '/styles/main.css',
    '/styles/responsive.css',
    '/js/app.js',
    '/js/data.js',
    '/js/map.js',
    '/js/chatbot.js',
    '/js/audio.js',
    '/js/pwa.js',
    '/manifest.json',
    // Add icon files
    '/icons/icon-72x72.png',
    '/icons/icon-96x96.png',
    '/icons/icon-128x128.png',
    '/icons/icon-144x144.png',
    '/icons/icon-152x152.png',
    '/icons/icon-192x192.png',
    '/icons/icon-384x384.png',
    '/icons/icon-512x512.png'
];

// External resources to cache
const EXTERNAL_RESOURCES = [
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
    'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css',
    'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css',
    'https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    
    event.waitUntil(
        Promise.all([
            // Cache static files
            caches.open(STATIC_CACHE).then((cache) => {
                console.log('Caching static files...');
                return cache.addAll(STATIC_FILES);
            }),
            // Cache external resources
            caches.open(DYNAMIC_CACHE).then((cache) => {
                console.log('Caching external resources...');
                return cache.addAll(EXTERNAL_RESOURCES);
            })
        ]).then(() => {
            console.log('Service Worker installed successfully');
            return self.skipWaiting();
        })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker activated');
            return self.clients.claim();
        })
    );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension and other non-http requests
    if (!url.protocol.startsWith('http')) {
        return;
    }
    
    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            // Return cached version if available
            if (cachedResponse) {
                console.log('Serving from cache:', request.url);
                return cachedResponse;
            }
            
            // Otherwise, fetch from network
            return fetch(request).then((response) => {
                // Don't cache non-successful responses
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }
                
                // Clone the response
                const responseToCache = response.clone();
                
                // Cache dynamic content
                caches.open(DYNAMIC_CACHE).then((cache) => {
                    cache.put(request, responseToCache);
                });
                
                return response;
            }).catch((error) => {
                console.log('Fetch failed, serving offline page:', error);
                
                // Return offline page for navigation requests
                if (request.mode === 'navigate') {
                    return caches.match('/index.html');
                }
                
                // Return a custom offline response for other requests
                return new Response(
                    JSON.stringify({
                        error: 'Offline',
                        message: 'This content is not available offline'
                    }),
                    {
                        status: 503,
                        statusText: 'Service Unavailable',
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        })
                    }
                );
            });
        })
    );
});

// Background sync event
self.addEventListener('sync', (event) => {
    console.log('Background sync triggered:', event.tag);
    
    if (event.tag === 'monastery-data-sync') {
        event.waitUntil(syncMonasteryData());
    }
});

// Sync monastery data in background
async function syncMonasteryData() {
    try {
        console.log('Syncing monastery data...');
        
        // Here you would typically sync any offline data
        // For now, we'll just log the sync attempt
        console.log('Monastery data sync completed');
        
    } catch (error) {
        console.error('Monastery data sync failed:', error);
    }
}

// Push notification event
self.addEventListener('push', (event) => {
    console.log('Push notification received:', event);
    
    const options = {
        body: event.data ? event.data.text() : 'New content available in Monastery360!',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Explore Monasteries',
                icon: '/icons/icon-72x72.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/icons/icon-72x72.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Monastery360', options)
    );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
    console.log('Notification clicked:', event);
    
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/#monasteries')
        );
    } else if (event.action === 'close') {
        // Just close the notification
        return;
    } else {
        // Default action - open the app
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Message event - handle messages from main thread
self.addEventListener('message', (event) => {
    console.log('Service Worker received message:', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({
            version: CACHE_NAME
        });
    }
});

// Periodic background sync (if supported)
self.addEventListener('periodicsync', (event) => {
    console.log('Periodic sync triggered:', event.tag);
    
    if (event.tag === 'monastery-updates') {
        event.waitUntil(syncMonasteryData());
    }
});

// Cache management utilities
async function updateCache() {
    try {
        const cache = await caches.open(STATIC_CACHE);
        await cache.addAll(STATIC_FILES);
        console.log('Cache updated successfully');
    } catch (error) {
        console.error('Cache update failed:', error);
    }
}

// Clean up old cache entries
async function cleanupCache() {
    try {
        const cache = await caches.open(DYNAMIC_CACHE);
        const requests = await cache.keys();
        
        // Remove entries older than 7 days
        const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
        
        for (const request of requests) {
            const response = await cache.match(request);
            const dateHeader = response.headers.get('date');
            
            if (dateHeader && new Date(dateHeader).getTime() < weekAgo) {
                await cache.delete(request);
                console.log('Removed old cache entry:', request.url);
            }
        }
    } catch (error) {
        console.error('Cache cleanup failed:', error);
    }
}

// Initialize cache cleanup on activation
self.addEventListener('activate', (event) => {
    event.waitUntil(
        Promise.all([
            // Clean up old caches
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
            // Clean up old cache entries
            cleanupCache()
        ]).then(() => {
            return self.clients.claim();
        })
    );
});

console.log('Service Worker script loaded');