// Service Worker simplificado para All Supplies
const CACHE_NAME = "all-supplies-v1.0.0"
const STATIC_CACHE_NAME = "all-supplies-static-v1.0.0"

// Archivos esenciales para cache (solo los más importantes)
const STATIC_ASSETS = ["/", "/manifest.json"]

// Instalar Service Worker
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...")

  event.waitUntil(
    caches
      .open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Caching static assets")
        // Intentar cachear assets, pero no fallar si alguno no está disponible
        return Promise.allSettled(
          STATIC_ASSETS.map((asset) =>
            cache.add(asset).catch((err) => {
              console.log(`Failed to cache ${asset}:`, err)
              return null
            }),
          ),
        )
      })
      .then(() => {
        console.log("Service Worker: Installed successfully")
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error("Service Worker: Installation failed", error)
      }),
  )
})

// Activar Service Worker
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...")

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME) {
              console.log("Service Worker: Deleting old cache", cacheName)
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => {
        console.log("Service Worker: Activated successfully")
        return self.clients.claim()
      }),
  )
})

// Interceptar requests (versión simplificada)
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Solo manejar requests del mismo origen
  if (url.origin !== location.origin) {
    return
  }

  // Estrategia simple: Network First con fallback a cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Si la respuesta es exitosa, clonarla y guardarla en cache
        if (response.status === 200 && request.method === "GET") {
          const responseClone = response.clone()
          caches
            .open(STATIC_CACHE_NAME)
            .then((cache) => {
              cache.put(request, responseClone)
            })
            .catch(() => {
              // Ignorar errores de cache en desarrollo
            })
        }
        return response
      })
      .catch(() => {
        // Si falla la red, intentar servir desde cache
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse
          }

          // Fallback básico para navegación
          if (request.mode === "navigate") {
            return new Response(
              `<!DOCTYPE html>
                <html lang="es">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Sin conexión - All Supplies</title>
                  <style>
                    body { 
                      font-family: system-ui, sans-serif; 
                      text-align: center; 
                      padding: 2rem; 
                      background: #f1f5f9; 
                      margin: 0;
                    }
                    .container { 
                      max-width: 400px; 
                      margin: 2rem auto; 
                      background: white; 
                      padding: 2rem; 
                      border-radius: 8px; 
                      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); 
                    }
                    .icon { font-size: 4rem; margin-bottom: 1rem; }
                    h1 { color: #1e293b; margin-bottom: 1rem; }
                    p { color: #64748b; margin-bottom: 2rem; }
                    button { 
                      background: #2563eb; 
                      color: white; 
                      border: none; 
                      padding: 0.75rem 1.5rem; 
                      border-radius: 6px; 
                      cursor: pointer; 
                      font-size: 1rem;
                    }
                    button:hover { background: #1d4ed8; }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <div class="icon">📡</div>
                    <h1>Sin conexión a internet</h1>
                    <p>No se puede cargar la página. Verifica tu conexión e intenta nuevamente.</p>
                    <button onclick="window.location.reload()">Reintentar</button>
                  </div>
                </body>
                </html>`,
              {
                headers: { "Content-Type": "text/html" },
                status: 200,
              },
            )
          }

          // Para otros recursos, devolver error
          return new Response("Recurso no disponible offline", { status: 404 })
        })
      }),
  )
})

// Manejar mensajes del cliente
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }
})
