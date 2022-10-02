'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "b6b9eecc708dc3a90b91b0b1f1c048c1",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/img/avatar.png": "65cb0a0d09c319692970b1162f78805e",
"assets/img/background.jpg": "8a0fac10812e91b542416eb3802397ec",
"assets/img/ic_lock.png": "30f1083f9e092079b7c0ffb891f29cda",
"assets/img/ic_mail.png": "53ba7629bea774d204514b7f8d9bfed9",
"assets/img/ic_phone.png": "fea6aad602081b0e20a6fae952afd0fe",
"assets/img/ic_user.png": "cfd933d62f5ff45e5657d1cdb2253c08",
"assets/img/images1.jpg": "2a80b8d68e7b6d183edad67786a7f68a",
"assets/img/images2.jpg": "b9e8ad865624d8c08950ce3ce955844d",
"assets/img/images3.png": "0e2ecab0f02defb9c4a424bed41c4b61",
"assets/img/images4.jpg": "74742ab59e4d2d3cab177d1b28bc0fae",
"assets/img/justin.jpg": "ed3f75ff543aba2fa60ff0927d1f0059",
"assets/img/logo.png": "dd327c82f54d05a1b6fe7581e1c7b7ed",
"assets/img/logo1.png": "d668c23b8296f079d73c63310d27f5d2",
"assets/img/mtp.jpg": "b07b307d180556ef34d3c476d111aa73",
"assets/img/ngot.jpg": "3950fa403e14507a05f93c12c2519715",
"assets/img/pic-1.jpg": "fcec716d787010da34ecf8a7bd6465a3",
"assets/img/pic-2.webp": "57c631e975f97d787ad7f57f809bfdc2",
"assets/img/pic-3.jpg": "1d62634f29a64e01b0d09b366e247e00",
"assets/img/pic-4.jpg": "5ea219d44b7a3079b11dcaa73f7a1de0",
"assets/img/sing1.jpg": "12b09c7cee4b84aaf6b9c30cc5538c4a",
"assets/img/sing2.webp": "297be6d032c8c2e01e4c34bec2f20256",
"assets/img/sing3.jpg": "c56ac5e8e5520c0f9319d78c4bb6d620",
"assets/img/sing4.webp": "2609ff991a9c7bfbf01174475201819e",
"assets/img/sing5.jpg": "99629363e4b7b1232dcf98b5988e6daf",
"assets/img/sing6.jpg": "ef81ad78f97b3d0b41e0e6fcde26331a",
"assets/img/sing7.jpg": "748ac9d6e08728ad2286803f16627135",
"assets/img/sing8.jpg": "de3d3d61512723d33fd39f3ff5610395",
"assets/img/snoop.jpg": "11750a4b897450ce77a0f33627af40aa",
"assets/json/detail.json": "6ee1e784b889accc4ea2dc851faa4c04",
"assets/json/recent.json": "dae9a89e4e9574b4e1015dd92ad1cfb3",
"assets/NOTICES": "26ec57666367f8e830f007329ec67914",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "f630c2774cff468ca650a226c198971d",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "2c9438f55180d57952600f14e84826b6",
"/": "2c9438f55180d57952600f14e84826b6",
"main.dart.js": "f63514c620a19741fb9f2d0c8d34cd2f",
"manifest.json": "d1ef8f694538e10cfc137a1100c5a9a7",
"version.json": "c8623d1f9a6b2efd775a035bc4dbb987"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
