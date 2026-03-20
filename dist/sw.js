const CACHE_NAME = 'drevaia-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/robots.txt',
  '/sitemap.xml',
  '/assets/favicon/favicon.ico',
  '/assets/favicon/favicon-192.png',
  '/assets/favicon/favicon-512.png',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip Supabase API requests
  if (url.hostname.includes('supabase.co')) return;

  // Strategy: Network First, then Cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Clone the response
        const responseClone = response.clone();

        // Cache the response
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseClone);
        });

        return response;
      })
      .catch(() => {
        // Return from cache if network fails
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          // Return offline page for navigation requests
          if (request.mode === 'navigate') {
            return caches.match('/index.html');
          }

          throw new Error('Network error and no cache available');
        });
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-comments') {
    event.waitUntil(syncComments());
  }
  if (event.tag === 'sync-favorites') {
    event.waitUntil(syncFavorites());
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {};
  const title = data.title || 'Drevaia Digital';
  const options = {
    body: data.body || 'Nueva notificación',
    icon: '/assets/favicon/favicon-192.png',
    badge: '/assets/favicon/favicon-72.png',
    data: data.data || {},
    actions: data.actions || [],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const notificationData = event.notification.data;
  const url = notificationData?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      // If a window client is already open, focus it
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise, open a new window
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

// Helper functions
async function syncComments() {
  // Sync pending comments
  const pendingComments = await getPendingComments();
  for (const comment of pendingComments) {
    try {
      await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment),
      });
      await removePendingComment(comment.id);
    } catch (error) {
      console.error('Failed to sync comment:', error);
    }
  }
}

async function syncFavorites() {
  // Sync pending favorites
  const pendingFavorites = await getPendingFavorites();
  for (const favorite of pendingFavorites) {
    try {
      await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(favorite),
      });
      await removePendingFavorite(favorite.id);
    } catch (error) {
      console.error('Failed to sync favorite:', error);
    }
  }
}

// IndexedDB helpers (simplified)
async function getPendingComments() {
  // Implementation would use IndexedDB
  return [];
}

async function removePendingComment(id) {
  // Implementation would use IndexedDB
}

async function getPendingFavorites() {
  // Implementation would use IndexedDB
  return [];
}

async function removePendingFavorite(id) {
  // Implementation would use IndexedDB
}
