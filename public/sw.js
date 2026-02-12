importScripts("/scram/scramjet.wasm.js");
importScripts("/scram/scramjet.codecs.js");
importScripts("/scram/scramjet.config.js");

self.$scramjet = {
    config: {
        prefix: "/service/",
        codec: "xor",
        files: {
            wasm: "/scram/scramjet.wasm.wasm",
            worker: "/scram/scramjet.worker.js",
            client: "/scram/scramjet.client.js",
            shared: "/scram/scramjet.shared.js",
            sync: "/scram/scramjet.sync.js",
        },
    },
};

self.ScramjetServiceWorker.prototype.route = function(event) {
    return event.request.url.startsWith(location.origin + self.$scramjet.config.prefix);
};

self.addEventListener("fetch", (event) => {
    const sw = new ScramjetServiceWorker();
    if (sw.route(event)) {
        event.respondWith(sw.fetch(event));
    }
});
