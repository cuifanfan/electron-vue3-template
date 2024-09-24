(() => {
    const e = chrome.runtime.connect({ name: 'content-script' });
    function n(e) {
        window.postMessage({ source: 'vue-devtools-proxy', payload: e }, '*');
    }
    function t(t) {
        t.data && 'vue-devtools-backend' === t.data.source
            ? e.postMessage(t.data.payload)
            : t.data &&
              'vue-devtools-backend-injection' === t.data.source &&
              'listening' === t.data.payload &&
              n('init');
    }
    function o() {
        window.removeEventListener('message', t), n('shutdown');
    }
    e.onMessage.addListener(n),
        window.addEventListener('message', t),
        e.onDisconnect.addListener(o),
        n('init');
})();
