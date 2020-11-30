importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

workbox.precaching.precacheAndRoute(
  [
    { url: "/", revision: "1" },
    { url: "/nav.html", revision: "1" },
    { url: "/index.html", revision: "1" },
    { url: "/css/materialize.css", revision: "1" },
    { url: "/css/style.css", revision: "1" },
    { url: "/sw-reg.js", revision: "1" },
    { url: "/js/materialize.js", revision: "1" },
    { url: "/js/nav.js", revision: "1" },
    { url: "/js/api.js", revision: "1" },
    { url: "/js/idb.js", revision: "1" },
    { url: "/js/main.js", revision: "1" },
    { url: "/assets/icons/soccer-72.png", revision: "1" },
    { url: "/assets/icons/soccer-192.png", revision: "1" },
    { url: "/assets/icons/soccer-512.png", revision: "1" },
    { url: "/manifest.json", revision: "1" },
    { url: "/push-handle.js", revision: "1" },
    { url: "https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap", revision: "1" },
    { url: "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2", revision: "1" },
  ],
  {
    ignoreUrlParametersMatching: [/.*/],
  }
);

workbox.routing.registerRoute(
  new RegExp("https://api.football-data.org/v2/"),
  new workbox.strategies.StaleWhileRevalidate()
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: "images",
    plugin: [
      new workbox.expiration.Plugin({
        maxEntries: 22,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "static-resources",
  })
);

workbox.routing.registerRoute(
  ({ url }) => url.origin === "https://fonts.googleapis.com",
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "google-fonts-stylesheets",
  })
);

self.addEventListener("push", function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});