/* Service worker: מאפשר שימוש באפליקציה גם בלי אינטרנט.
   קבצים מוגשים מהמטמון ומתעדכנים ברקע (stale-while-revalidate). */
const CACHE = "english-quest-v2";
const FILES = ["./", "index.html", "css/style.css", "js/data.js", "js/content-band1.js", "js/content-band2.js", "js/content-reading.js", "js/content-listening.js", "js/content-writing.js", "js/app.js", "js/skills.js", "js/main.js", "manifest.webmanifest", "icons/icon.svg", "icons/icon-192.png", "icons/icon-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.open(CACHE).then((cache) =>
      cache.match(e.request).then((cached) => {
        const net = fetch(e.request).then((res) => {
          if (res && res.ok && (res.type === "basic" || res.type === "cors")) cache.put(e.request, res.clone());
          return res;
        }).catch(() => cached);
        return cached || net;
      })
    )
  );
});
