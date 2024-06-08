const CACHE_NAME = 'v001.2';
const STATIC_CACHE_URLS = [
 'index.html', 
 'offline.html',
 'manifest.json', 
 'assets/js/App.js',
 'assets/js/card/CardComponent.js',
 'assets/js/component/Component.js',
 'assets/js/form/FormContact.js',
 'assets/js/modal/Modal.js',
 'assets/js/lib/FetchData.js',
 'assets/js/pages/AboutPage.js',
 'assets/js/pages/ContactPage.js',
 'assets/js/pages/ErrorPage.js',
 'assets/js/pages/FullContent.js',
 'assets/js/pages/HomePage.js',
 'assets/js/router/Navbar.js',
 'assets/js/router/Router.js',
 'assets/js/script.js',
 'assets/css/w3.css',
 'assets/img/image1.jpg',
 'assets/img/image2.jpg',
 'assets/img/image3.jpg',
 'assets/img/image4.jpg',
 'assets/img/logo.png'
 ];

 self.addEventListener('fetch', event => {
  event.respondWith(
      caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
              return cachedResponse;
          }
          return fetch(event.request).then(networkResponse => {
              if (networkResponse.ok) {
                  return caches.open(CACHE_NAME).then(cache => {
                      cache.put(event.request, networkResponse.clone());
                      return networkResponse;
                  });
              }
              return caches.match('offline.html'); 
          });
      }).catch(() => {
          return caches.match('offline.html'); 
      })
  );
});


self.addEventListener('install', event => {
  event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
          return cache.addAll(STATIC_CACHE_URLS).catch(error => {
              console.error("Erro durante o cache.addAll: ", error);
              throw error;
          });
      })
  );
});


self.addEventListener('activate', event => {
const cacheWhitelist = [CACHE_NAME]; 
event.waitUntil(
  caches.keys().then(cacheNames => {
    return Promise.all(
      cacheNames.map(cacheName => {
        if (cacheWhitelist.indexOf(cacheName) === -1) {
          return caches.delete(cacheName); 
        }
      })
    );
  })
);
});



