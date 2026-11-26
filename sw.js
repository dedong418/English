// 离线缓存。改内容后把 CACHE 版本号 +1，用户下次联网会自动更新。
const CACHE = "ykyy-v3";
const ASSETS = [
  "./", "./index.html", "./styles.css", "./app.js",
  "./manifest.webmanifest",
  "./data/content.js", "./data/vocab.js", "./data/meeting.js", "./data/shadowing.js",
  "./data/daily.js", "./data/dailyread.js", "./data/dailylisten.js",
  "./icon-192.png", "./icon-512.png"
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      return res;
    }).catch(() => hit))
  );
});
