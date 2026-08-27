'use strict';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      try {
        await self.registration.unregister();
      } catch (error) {
        console.warn('Failed to unregister the service worker:', error);
      }

      try {
        const clients = await self.clients.matchAll({type: 'window'});
        clients.forEach((client) => {
          if (client.url && 'navigate' in client) {
            client.navigate(client.url);
          }
        });
      } catch (error) {
        console.warn('Failed to refresh a service worker client:', error);
      }
    })(),
  );
});
