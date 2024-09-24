(() => {
    const e = {};
    function n(e) {
        return +e + '' === e;
    }
    function o(n) {
        chrome.tabs.executeScript(n, { file: '/build/proxy.js' }, function (o) {
            o || e[n].devtools.postMessage('proxy-fail');
        });
    }
    function t(n, o, t) {
        function s(e) {
            if ('log' === e.event) return console.log('tab ' + n, e.payload);
            t.postMessage(e);
        }
        function a(e) {
            if ('log' === e.event) return console.log('tab ' + n, e.payload);
            o.postMessage(e);
        }
        function c() {
            o.onMessage.removeListener(s),
                t.onMessage.removeListener(a),
                o.disconnect(),
                t.disconnect(),
                (e[n] = null);
        }
        o.onMessage.addListener(s),
            t.onMessage.addListener(a),
            o.onDisconnect.addListener(c),
            t.onDisconnect.addListener(c);
    }
    chrome.runtime.onConnect.addListener((s) => {
        let a, c;
        n(s.name)
            ? ((a = s.name), (c = 'devtools'), o(+s.name))
            : ((a = s.sender.tab.id), (c = 'backend')),
            e[a] || (e[a] = { devtools: null, backend: null }),
            (e[a][c] = s),
            e[a].devtools && e[a].backend && t(a, e[a].devtools, e[a].backend);
    }),
        chrome.runtime.onMessage.addListener((e, n) => {
            if (n.tab && e.vueDetected) {
                const o = e.nuxtDetected ? '.nuxt' : '';
                chrome.browserAction.setIcon({
                    tabId: n.tab.id,
                    path: {
                        16: `icons/16${o}.png`,
                        48: `icons/48${o}.png`,
                        128: `icons/128${o}.png`
                    }
                }),
                    chrome.browserAction.setPopup({
                        tabId: n.tab.id,
                        popup: e.devtoolsEnabled
                            ? `popups/enabled${o}.html`
                            : `popups/disabled${o}.html`
                    });
            }
            'vue-take-screenshot' === e.action &&
                'devtools_child' === n.envType &&
                browser.tabs.captureVisibleTab({ format: 'png' }).then((n) => {
                    browser.runtime.sendMessage({
                        action: 'vue-screenshot-result',
                        id: e.id,
                        dataUrl: n
                    });
                });
        });
})();
