const APP = {
  SW: null,
  cacheName: "assetCache1",
  init() {
    APP.startCaching();

    document
      .querySelector("header>h2")
      .addEventListener("click", APP.deleteCache);
  },
  startCaching() {
    //open a cache and save some responses
    return caches
      .open(APP.cacheName)
      .then((cache) => {
        console.log(`Cache ${APP.cacheName} opened`);

        let urlString = "./img/cache-definition.png";
        cache.add(urlString); //add = fetch + put

        cache.keys().then((keys) => {
          keys.forEach((key, index) => {
            // console.log(index, key);
          });
        });
        return cache;
      })
      .then((cache) => {
        //check if a cache exists
        caches.has(APP.cacheName).then((hasCache) => {
          // console.log(`${APP.cacheName} ${hasCache}`);
        });

        //search for files in caches
        // cache.match() cache.matchAll()
        // caches.match() - look in all caches
        let urlString = "./img/cache-definition.png";
        return caches.match(urlString).then((cacheResponse) => {
          if (cacheResponse) {
            //not an error if not found
            console.log("found in the cache");
            // console.log(cacheResponse);
            return cacheResponse;
          } else {
            //no match found
            console.log("not in cache");
            return fetch(urlString).then((fetchResponse) => {
              if (!fetchResponse.ok) throw fetchResponse.statusText;
              //we have a valid fetch
              cache.put(urlString, fetchResponse.clone());
              return fetchResponse;
            });
          }
        });
      })
      .then((response) => {
        console.log(response);
        document.querySelector("output").textContent = response.url;
        return response.blob();
      })
      .then((blob) => {
        let url = URL.createObjectURL(blob);
        let img = document.createElement("img");
        img.src = url;
        document.querySelector("output").append(img);
      });
  },
  deleteCache() {
    caches.delete(APP.cacheName).then((isGone) => {
      console.log(isGone);
    });
  },
};

document.addEventListener("DOMContentLoaded", APP.init);
