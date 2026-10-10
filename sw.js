/* Offline: every page and file of the site is stored on the device when it
   is first opened, so the games work in airplane mode (and from the home
   screen). Pages are served from that copy straight away and refreshed from
   the network in the background, so a new version shows on the next visit.
   Add a new file or game to FILES. */
const CACHE = 'webgame-v1';
const FILES = [
    './', 'index.html', 'menu.js', 'manifest.webmanifest',
    'icons/icon.svg', 'icons/icon-180.png', 'icons/icon-192.png', 'icons/icon-512.png',
    'lines98/', 'sudoku/', 'blocks/', '2048/'
];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
    e.waitUntil(caches.keys()
        .then(keys => Promise.all(keys.filter(k => k.startsWith('webgame-') && k !== CACHE).map(k => caches.delete(k))))
        .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
    const req = e.request;
    if(req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
    e.respondWith(caches.open(CACHE).then(async cache => {
        const hit = await cache.match(req, {ignoreSearch: true});
        const fresh = fetch(req).then(res => {
            if(res.ok && res.type === 'basic') cache.put(req, res.clone());
            return res;
        });
        if(hit){ e.waitUntil(fresh.catch(() => {})); return hit; }
        try{ return await fresh; }
        catch(err){
            // offline and never seen: a page falls back to the game list
            if(req.mode === 'navigate') return (await cache.match('./')) || Response.error();
            throw err;
        }
    }));
});
