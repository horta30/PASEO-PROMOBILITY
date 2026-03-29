// ══════════════════════════════════════════
// PASEO PROMOBILITY — Service Worker
// Cachea tiles del mapa para uso offline
// Área: Cordillera de la Costa, V Región
// ══════════════════════════════════════════

const CACHE_NAME = 'promobility-v1';
const CACHE_TILES = 'promobility-tiles-v1';

// Archivos estáticos del app
const STATIC_FILES = [
  '/PASEO-PROMOBILITY/',
  '/PASEO-PROMOBILITY/index.html',
  '/PASEO-PROMOBILITY/mapa.html',
  '/PASEO-PROMOBILITY/assets/ruta.js',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js',
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&display=swap'
];

// Generar URLs de tiles para la zona de la ruta
// Bbox: lat -32.722 a -32.668 | lon -71.415 a -71.318
function latLonToTile(lat, lon, zoom) {
  const n = Math.pow(2, zoom);
  const x = Math.floor((lon + 180) / 360 * n);
  const latRad = lat * Math.PI / 180;
  const y = Math.floor((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n);
  return { x, y };
}

function generateTileURLs() {
  const MIN_LAT = -32.722, MAX_LAT = -32.668;
  const MIN_LON = -71.415, MAX_LON = -71.318;
  const urls = [];

  const TOPO_URL = (z, x, y) => `https://a.tile.opentopomap.org/${z}/${x}/${y}.png`;
  const SAT_URL  = (z, x, y) => `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`;
  const OSM_URL  = (z, x, y) => `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;

  for (let zoom = 10; zoom <= 15; zoom++) {
    const { x: x1, y: y2 } = latLonToTile(MIN_LAT, MIN_LON, zoom);
    const { x: x2, y: y1 } = latLonToTile(MAX_LAT, MAX_LON, zoom);

    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        urls.push(TOPO_URL(zoom, x, y));
        urls.push(SAT_URL(zoom, x, y));
        urls.push(OSM_URL(zoom, x, y));
      }
    }
  }

  return urls;
}

// ── INSTALL — cachea archivos estáticos
self.addEventListener('install', event => {
  console.log('[SW] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Cacheando archivos estáticos');
        return cache.addAll(STATIC_FILES.map(url => new Request(url, { mode: 'cors' })))
          .catch(err => console.warn('[SW] Algunos archivos estáticos no se pudieron cachear:', err));
      })
      .then(() => self.skipWaiting())
  );
});

// ── ACTIVATE — limpia caches viejos
self.addEventListener('activate', event => {
  console.log('[SW] Activando...');
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== CACHE_TILES)
          .map(k => {
            console.log('[SW] Eliminando cache viejo:', k);
            return caches.delete(k);
          })
      ))
      .then(() => self.clients.claim())
  );
});

// ── FETCH — estrategia por tipo de recurso
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Tiles de mapa → Cache First (offline prioritario)
  if (isTileRequest(url)) {
    event.respondWith(tileStrategy(event.request));
    return;
  }

  // Archivos del app → Cache First con fallback a red
  if (isAppFile(url)) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  // Todo lo demás → Network First con fallback a cache
  event.respondWith(networkFirst(event.request));
});

function isTileRequest(url) {
  return (
    url.hostname.includes('opentopomap.org') ||
    url.hostname.includes('openstreetmap.org') ||
    url.hostname.includes('arcgisonline.com') ||
    url.hostname.includes('tile.')
  );
}

function isAppFile(url) {
  return url.hostname === 'horta30.github.io' ||
    url.hostname.includes('cdnjs.cloudflare.com') ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com');
}

// Cache First — devuelve cache si existe, sino red y guarda
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Offline — recurso no disponible', { status: 503 });
  }
}

// Tile Strategy — cache agresivo para tiles
async function tileStrategy(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request, { mode: 'cors' });
    if (response.ok) {
      const cache = await caches.open(CACHE_TILES);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    // Tile no disponible offline — devolver tile transparente
    return new Response(
      // PNG 1x1 transparente en base64
      Uint8Array.from(atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='),
        c => c.charCodeAt(0)),
      { headers: { 'Content-Type': 'image/png' } }
    );
  }
}

// Network First — red primero, cache como fallback
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response('Offline', { status: 503 });
  }
}

// ── MENSAJE desde el app — precachear tiles de la zona
self.addEventListener('message', event => {
  if (event.data === 'PRECACHE_TILES') {
    precacheTiles();
  }
});

async function precacheTiles() {
  console.log('[SW] Iniciando precache de tiles de la ruta...');
  const tileURLs = generateTileURLs();
  const cache = await caches.open(CACHE_TILES);
  let cached = 0, failed = 0;

  // Cachear en lotes de 5 para no saturar la red
  for (let i = 0; i < tileURLs.length; i += 5) {
    const batch = tileURLs.slice(i, i + 5);
    await Promise.all(batch.map(async url => {
      try {
        const existing = await cache.match(url);
        if (existing) { cached++; return; }
        const response = await fetch(url, { mode: 'cors' });
        if (response.ok) {
          await cache.put(url, response);
          cached++;
        }
      } catch {
        failed++;
      }
    }));
    // Reportar progreso al app
    const clients = await self.clients.matchAll();
    clients.forEach(client => client.postMessage({
      type: 'CACHE_PROGRESS',
      cached,
      total: tileURLs.length,
      failed
    }));
    // Pausa entre lotes
    await new Promise(r => setTimeout(r, 100));
  }

  const clients = await self.clients.matchAll();
  clients.forEach(client => client.postMessage({
    type: 'CACHE_COMPLETE',
    cached,
    total: tileURLs.length,
    failed
  }));
  console.log(`[SW] Precache completo: ${cached}/${tileURLs.length} tiles`);
}
