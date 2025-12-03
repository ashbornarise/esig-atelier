// Service Worker pour ESIG Global Success
// Version 1.0.0

const CACHE_NAME = 'esig-atelier-v1.0.0';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/admin.html',
  '/manifest.json',
  '/logo-esig.png',
  '/icon-192.png',
  '/icon-512.png'
];

// Installation du Service Worker
self.addEventListener('install', event => {
  console.log('[SW] Installation...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Mise en cache des fichiers');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activation du Service Worker
self.addEventListener('activate', event => {
  console.log('[SW] Activation...');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Suppression ancien cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Interception des requêtes
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retourner la ressource en cache si disponible
        if (response) {
          return response;
        }

        // Sinon, faire la requête réseau
        return fetch(event.request)
          .then(response => {
            // Vérifier si la réponse est valide
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Cloner la réponse
            const responseToCache = response.clone();

            // Mettre en cache pour les prochaines fois
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // En cas d'échec (offline), retourner une page par défaut
            return caches.match('/index.html');
          });
      })
  );
});

// Gestion des messages
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.delete(CACHE_NAME)
        .then(() => {
          return self.clients.matchAll();
        })
        .then(clients => {
          clients.forEach(client => {
            client.postMessage({ type: 'CACHE_CLEARED' });
          });
        })
    );
  }
});

// Synchronisation en arrière-plan (pour sauvegarder sur Google Sheets)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    console.log('[SW] Synchronisation des données...');
    event.waitUntil(syncData());
  }
});

async function syncData() {
  try {
    // Récupérer les données non synchronisées
    const response = await fetch('/api/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      console.log('[SW] Données synchronisées avec succès');
    }
  } catch (error) {
    console.error('[SW] Erreur de synchronisation:', error);
  }
}

// Notifications push (pour alertes maintenance, etc.)
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'ESIG Atelier';
  const options = {
    body: data.body || 'Nouvelle notification',
    icon: '/icon-192.png',
    badge: '/icon-72.png',
    vibrate: [200, 100, 200],
    data: data.data || {},
    actions: data.actions || []
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Gestion des clics sur notifications
self.addEventListener('notificationclick', event => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});
