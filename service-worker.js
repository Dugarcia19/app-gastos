const CACHE_NAME = 'gastos-v1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json'
];

// Instalar service worker e cachear arquivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Ativar service worker e limpar cache antigo
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch - Serve do cache, fallback para rede
self.addEventListener('fetch', event => {
  // Ignorar requisições de extensões do navegador
  if (event.request.url.startsWith('chrome-extension://') ||
      event.request.url.startsWith('moz-extension://')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna do cache se existir
        if (response) {
          return response;
        }

        // Tenta buscar da rede
        return fetch(event.request).then(response => {
          // Não cachear se não for sucesso
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }

          // Clona a resposta
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        // Offline fallback
        return new Response('Offline - Seus dados estão salvos localmente', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/plain'
          })
        });
      })
  );
});

// Background sync (para futuras melhorias)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-transacoes') {
    event.waitUntil(syncTransacoes());
  }
});

async function syncTransacoes() {
  // Implementar sincronização de dados aqui se necessário
  console.log('Sincronizando transações...');
}
