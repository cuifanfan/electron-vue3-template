(() => {
    'use strict';
    var __webpack_modules__ = {
            6793: (e, t, n) => {
                function r(e, t = !1) {
                    const o = '6.0';
                    let i = {};
                    function s(e) {
                        if (!e.__vdevtools__injected)
                            try {
                                e.__vdevtools__injected = !0;
                                const t = () => {
                                    try {
                                        e.contentWindow.__VUE_DEVTOOLS_IFRAME__ = e;
                                        const t = e.contentDocument.createElement('script');
                                        (t.textContent = ';(' + r.toString() + ')(window, true)'),
                                            e.contentDocument.documentElement.appendChild(t),
                                            t.parentNode.removeChild(t);
                                    } catch (t) {}
                                };
                                t(), e.addEventListener('load', () => t());
                            } catch (t) {}
                    }
                    let a = 0;
                    function c() {
                        if ('undefined' === typeof window) return;
                        const e = document.querySelectorAll(
                            'iframe:not([data-vue-devtools-ignore])'
                        );
                        for (const t of e) s(t);
                    }
                    c();
                    const l = setInterval(() => {
                        c(), a++, a >= 5 && clearInterval(l);
                    }, 1e3);
                    if (Object.prototype.hasOwnProperty.call(e, '__VUE_DEVTOOLS_GLOBAL_HOOK__'))
                        return void (
                            e.__VUE_DEVTOOLS_GLOBAL_HOOK__.devtoolsVersion !== o &&
                            console.error(
                                'Another version of Vue Devtools seems to be installed. Please enable only one version at a time.'
                            )
                        );
                    let u;
                    if (t) {
                        const e = (e) => {
                            try {
                                const t = window.parent.__VUE_DEVTOOLS_GLOBAL_HOOK__;
                                if (t) return e(t);
                                console.warn('[Vue Devtools] No hook in parent window');
                            } catch (t) {
                                console.warn(
                                    '[Vue Devtools] Failed to send message to parent window',
                                    t
                                );
                            }
                        };
                        u = {
                            devtoolsVersion: o,
                            set Vue(t) {
                                e((e) => {
                                    e.Vue = t;
                                });
                            },
                            set enabled(t) {
                                e((e) => {
                                    e.enabled = t;
                                });
                            },
                            on(t, n) {
                                e((e) => e.on(t, n));
                            },
                            once(t, n) {
                                e((e) => e.once(t, n));
                            },
                            off(t, n) {
                                e((e) => e.off(t, n));
                            },
                            emit(t, ...n) {
                                e((e) => e.emit(t, ...n));
                            },
                            cleanupBuffer(t) {
                                var n;
                                return (
                                    null !== (n = e((e) => e.cleanupBuffer(t))) && void 0 !== n && n
                                );
                            }
                        };
                    } else
                        (u = {
                            devtoolsVersion: o,
                            Vue: null,
                            enabled: void 0,
                            _buffer: [],
                            _bufferMap: new Map(),
                            _bufferToRemove: new Map(),
                            store: null,
                            initialState: null,
                            storeModules: null,
                            flushStoreModules: null,
                            apps: [],
                            _replayBuffer(e) {
                                const t = this._buffer;
                                (this._buffer = []),
                                    this._bufferMap.clear(),
                                    this._bufferToRemove.clear();
                                for (let n = 0, r = t.length; n < r; n++) {
                                    const r = t[n].slice(1);
                                    r[0] === e ? this.emit.apply(this, r) : this._buffer.push(t[n]);
                                }
                            },
                            on(e, t) {
                                const n = '$' + e;
                                i[n] ? i[n].push(t) : ((i[n] = [t]), this._replayBuffer(e));
                            },
                            once(e, t) {
                                const n = (...r) => (this.off(e, n), t.apply(this, r));
                                this.on(e, n);
                            },
                            off(e, t) {
                                if (((e = '$' + e), arguments.length)) {
                                    const n = i[e];
                                    if (n)
                                        if (t)
                                            for (let e = 0, r = n.length; e < r; e++) {
                                                const r = n[e];
                                                if (r === t || r.fn === t) {
                                                    n.splice(e, 1);
                                                    break;
                                                }
                                            }
                                        else i[e] = null;
                                } else i = {};
                            },
                            emit(e, ...t) {
                                const n = '$' + e;
                                let r = i[n];
                                if (r) {
                                    r = r.slice();
                                    for (let n = 0, i = r.length; n < i; n++)
                                        try {
                                            const o = r[n].apply(this, t);
                                            'function' ===
                                                typeof (null === o || void 0 === o
                                                    ? void 0
                                                    : o.catch) &&
                                                o.catch((n) => {
                                                    console.error(
                                                        `[Hook] Error in async event handler for ${e} with args:`,
                                                        t
                                                    ),
                                                        console.error(n);
                                                });
                                        } catch (o) {
                                            console.error(
                                                `[Hook] Error in event handler for ${e} with args:`,
                                                t
                                            ),
                                                console.error(o);
                                        }
                                } else {
                                    const n = [Date.now(), e, ...t];
                                    this._buffer.push(n);
                                    for (let e = 2; e < t.length; e++)
                                        if ('object' === typeof t[e] && t[e]) {
                                            this._bufferMap.set(t[e], n);
                                            break;
                                        }
                                }
                            },
                            cleanupBuffer(e) {
                                const t = this._bufferMap.has(e);
                                return t && this._bufferToRemove.set(this._bufferMap.get(e), !0), t;
                            },
                            _cleanupBuffer() {
                                const e = Date.now();
                                (this._buffer = this._buffer.filter(
                                    (t) => !this._bufferToRemove.has(t) && e - t[0] < 1e4
                                )),
                                    this._bufferToRemove.clear(),
                                    this._bufferMap.clear();
                            }
                        }),
                            setInterval(() => {
                                u._cleanupBuffer();
                            }, 1e4),
                            u.once('init', (t) => {
                                (u.Vue = t),
                                    t &&
                                        (t.prototype.$inspect = function () {
                                            const t = e.__VUE_DEVTOOLS_INSPECT__;
                                            t && t(this);
                                        });
                            }),
                            u.on('app:init', (e, t, n) => {
                                const r = { app: e, version: t, types: n };
                                u.apps.push(r), u.emit('app:add', r);
                            }),
                            u.once('vuex:init', (e) => {
                                (u.store = e), (u.initialState = A(e.state));
                                const t = e.replaceState.bind(e);
                                let n, r;
                                (e.replaceState = (e) => {
                                    (u.initialState = A(e)), t(e);
                                }),
                                    e.registerModule &&
                                        ((u.storeModules = []),
                                        (n = e.registerModule.bind(e)),
                                        (e.registerModule = (e, t, r) => {
                                            'string' === typeof e && (e = [e]),
                                                u.storeModules.push({
                                                    path: e,
                                                    module: t,
                                                    options: r
                                                }),
                                                n(e, t, r);
                                        }),
                                        (r = e.unregisterModule.bind(e)),
                                        (e.unregisterModule = (e) => {
                                            'string' === typeof e && (e = [e]);
                                            const t = e.join('/'),
                                                n = u.storeModules.findIndex(
                                                    (e) => e.path.join('/') === t
                                                );
                                            -1 !== n && u.storeModules.splice(n, 1), r(e);
                                        })),
                                    (u.flushStoreModules = () => (
                                        (e.replaceState = t),
                                        e.registerModule &&
                                            ((e.registerModule = n), (e.unregisterModule = r)),
                                        u.storeModules || []
                                    ));
                            });
                    if (
                        (Object.defineProperty(e, '__VUE_DEVTOOLS_GLOBAL_HOOK__', {
                            get() {
                                return u;
                            }
                        }),
                        e.__VUE_DEVTOOLS_HOOK_REPLAY__)
                    )
                        try {
                            e.__VUE_DEVTOOLS_HOOK_REPLAY__.forEach((e) => e(u)),
                                (e.__VUE_DEVTOOLS_HOOK_REPLAY__ = []);
                        } catch (D) {
                            console.error('[vue-devtools] Error during hook replay', D);
                        }
                    const { toString: p } = Function.prototype,
                        {
                            create: f,
                            defineProperty: _,
                            getOwnPropertyDescriptor: d,
                            getOwnPropertyNames: h,
                            getOwnPropertySymbols: g,
                            getPrototypeOf: m
                        } = Object,
                        { hasOwnProperty: E, propertyIsEnumerable: O } = Object.prototype,
                        v = {
                            SYMBOL_PROPERTIES: 'function' === typeof g,
                            WEAKSET: 'function' === typeof WeakSet
                        },
                        T = () => {
                            if (v.WEAKSET) return new WeakSet();
                            const e = f({
                                add: (t) => e._values.push(t),
                                has: (t) => !!~e._values.indexOf(t)
                            });
                            return (e._values = []), e;
                        },
                        y = (e, t) => {
                            if (!e.constructor) return f(null);
                            const n = e.__proto__ || m(e);
                            if (e.constructor === t.Object)
                                return n === t.Object.prototype ? {} : f(n);
                            if (~p.call(e.constructor).indexOf('[native code]'))
                                try {
                                    return new e.constructor();
                                } catch (D) {}
                            return f(n);
                        },
                        b = (e, t, n, r) => {
                            const o = y(e, t);
                            for (const i in e) E.call(e, i) && (o[i] = n(e[i], r));
                            if (v.SYMBOL_PROPERTIES) {
                                const t = g(e);
                                if (t.length)
                                    for (let i, s = 0; s < t.length; s++)
                                        (i = t[s]), O.call(e, i) && (o[i] = n(e[i], r));
                            }
                            return o;
                        },
                        C = (e, t, n, r) => {
                            const o = y(e, t),
                                i = v.SYMBOL_PROPERTIES ? [].concat(h(e), g(e)) : h(e);
                            if (i.length)
                                for (let s, a, c = 0; c < i.length; c++)
                                    (s = i[c]),
                                        'callee' !== s &&
                                            'caller' !== s &&
                                            ((a = d(e, s)), (a.value = n(e[s], r)), _(o, s, a));
                            return o;
                        },
                        N = (e) => {
                            let t = '';
                            return (
                                e.global && (t += 'g'),
                                e.ignoreCase && (t += 'i'),
                                e.multiline && (t += 'm'),
                                e.unicode && (t += 'u'),
                                e.sticky && (t += 'y'),
                                t
                            );
                        },
                        { isArray: S } = Array,
                        I = (() =>
                            'undefined' !== typeof self
                                ? self
                                : 'undefined' !== typeof window
                                  ? window
                                  : 'undefined' !== typeof n.g
                                    ? n.g
                                    : void (
                                          console &&
                                          console.error &&
                                          console.error(
                                              'Unable to locate global object, returning "this".'
                                          )
                                      ))();
                    function A(e, t = null) {
                        const n = !(!t || !t.isStrict),
                            r = (t && t.realm) || I,
                            o = n ? C : b,
                            i = (e, t) => {
                                if (!e || 'object' !== typeof e || t.has(e)) return e;
                                if ('undefined' !== typeof HTMLElement && e instanceof HTMLElement)
                                    return e.cloneNode(!1);
                                const s = e.constructor;
                                if (s === r.Object) return t.add(e), o(e, r, i, t);
                                let a;
                                if (S(e)) {
                                    if ((t.add(e), n)) return C(e, r, i, t);
                                    a = new s();
                                    for (let n = 0; n < e.length; n++) a[n] = i(e[n], t);
                                    return a;
                                }
                                if (e instanceof r.Date) return new s(e.getTime());
                                if (e instanceof r.RegExp)
                                    return (
                                        (a = new s(e.source, e.flags || N(e))),
                                        (a.lastIndex = e.lastIndex),
                                        a
                                    );
                                if (r.Map && e instanceof r.Map)
                                    return (
                                        t.add(e),
                                        (a = new s()),
                                        e.forEach((e, n) => {
                                            a.set(n, i(e, t));
                                        }),
                                        a
                                    );
                                if (r.Set && e instanceof r.Set)
                                    return (
                                        t.add(e),
                                        (a = new s()),
                                        e.forEach((e) => {
                                            a.add(i(e, t));
                                        }),
                                        a
                                    );
                                if (r.Buffer && r.Buffer.isBuffer(e))
                                    return (
                                        (a = r.Buffer.allocUnsafe
                                            ? r.Buffer.allocUnsafe(e.length)
                                            : new s(e.length)),
                                        e.copy(a),
                                        a
                                    );
                                if (r.ArrayBuffer) {
                                    if (r.ArrayBuffer.isView(e)) return new s(e.buffer.slice(0));
                                    if (e instanceof r.ArrayBuffer) return e.slice(0);
                                }
                                return (E.call(e, 'then') && 'function' === typeof e.then) ||
                                    e instanceof Error ||
                                    (r.WeakMap && e instanceof r.WeakMap) ||
                                    (r.WeakSet && e instanceof r.WeakSet)
                                    ? e
                                    : (t.add(e), o(e, r, i, t));
                            };
                        return i(e, T());
                    }
                }
                (t.U = void 0), (t.U = r);
            },
            79310: (e, t) => {
                function n() {
                    return t.backendInjections.instanceMap;
                }
                function r(e) {
                    return t.backendInjections.getCustomInstanceDetails(e);
                }
                function o(e, n) {
                    return t.backendInjections.getCustomObjectDetails(e, n);
                }
                function i(e) {
                    return t.backendInjections.isVueInstance(e);
                }
                function s(e) {
                    return {
                        _custom: {
                            type: 'router',
                            display: 'VueRouter',
                            value: { options: e.options, currentRoute: e.currentRoute },
                            fields: { abstract: !0 }
                        }
                    };
                }
                function a(e) {
                    return {
                        _custom: {
                            type: 'store',
                            display: 'Store',
                            value: { state: e.state, getters: c(e) },
                            fields: { abstract: !0 }
                        }
                    };
                }
                function c(e) {
                    const t = {},
                        n = e.getters || {},
                        r = Object.keys(n);
                    for (let o = 0; o < r.length; o++) {
                        const e = r[o];
                        Object.defineProperty(t, e, {
                            enumerable: !0,
                            get: () => {
                                try {
                                    return n[e];
                                } catch (t) {
                                    return t;
                                }
                            }
                        });
                    }
                    return t;
                }
                Object.defineProperty(t, '__esModule', { value: !0 }),
                    (t.getCatchedGetters =
                        t.getCustomStoreDetails =
                        t.getCustomRouterDetails =
                        t.isVueInstance =
                        t.getCustomObjectDetails =
                        t.getCustomInstanceDetails =
                        t.getInstanceMap =
                        t.backendInjections =
                            void 0),
                    (t.backendInjections = {
                        instanceMap: new Map(),
                        isVueInstance: () => !1,
                        getCustomInstanceDetails: () => ({}),
                        getCustomObjectDetails: () => {}
                    }),
                    (t.getInstanceMap = n),
                    (t.getCustomInstanceDetails = r),
                    (t.getCustomObjectDetails = o),
                    (t.isVueInstance = i),
                    (t.getCustomRouterDetails = s),
                    (t.getCustomStoreDetails = a),
                    (t.getCatchedGetters = c);
            },
            47294: (e, t, n) => {
                Object.defineProperty(t, '__esModule', { value: !0 }), (t.Bridge = void 0);
                const r = n(22699),
                    o = n(86283),
                    i = 100;
                class s extends r.EventEmitter {
                    constructor(e) {
                        super(),
                            this.setMaxListeners(1 / 0),
                            (this.wall = e),
                            e.listen((e) => {
                                Array.isArray(e) ? e.forEach((e) => this._emit(e)) : this._emit(e);
                            }),
                            (this._batchingQueue = []),
                            (this._sendingQueue = []),
                            (this._receivingQueue = []),
                            (this._sending = !1);
                    }
                    on(e, t) {
                        const n = async (...n) => {
                            try {
                                await t(...n);
                            } catch (r) {
                                console.error(
                                    `[Bridge] Error in listener for event ${e.toString()} with args:`,
                                    n
                                ),
                                    console.error(r);
                            }
                        };
                        return super.on(e, n);
                    }
                    send(e, t) {
                        this._batchingQueue.push({ event: e, payload: t }),
                            null == this._timer &&
                                (this._timer = setTimeout(() => this._flush(), i));
                    }
                    log(e) {
                        this.send('log', e);
                    }
                    _flush() {
                        this._batchingQueue.length && this._send(this._batchingQueue),
                            clearTimeout(this._timer),
                            (this._timer = null),
                            (this._batchingQueue = []);
                    }
                    _emit(e) {
                        'string' === typeof e
                            ? this.emit(e)
                            : e._chunk
                              ? (this._receivingQueue.push(e._chunk),
                                e.last &&
                                    (this.emit(e.event, this._receivingQueue),
                                    (this._receivingQueue = [])))
                              : e.event && this.emit(e.event, e.payload);
                    }
                    _send(e) {
                        this._sendingQueue.push(e), this._nextSend();
                    }
                    _nextSend() {
                        if (!this._sendingQueue.length || this._sending) return;
                        this._sending = !0;
                        const e = this._sendingQueue.shift();
                        try {
                            this.wall.send(e);
                        } catch (t) {
                            'Message length exceeded maximum allowed length.' === t.message &&
                                this._sendingQueue.splice(
                                    0,
                                    0,
                                    e.map((e) => [e])
                                );
                        }
                        (this._sending = !1), (0, o.raf)(() => this._nextSend());
                    }
                }
                t.Bridge = s;
            },
            79410: (e, t) => {
                Object.defineProperty(t, '__esModule', { value: !0 }),
                    (t.HookEvents =
                        t.BridgeSubscriptions =
                        t.BridgeEvents =
                        t.BuiltinTabs =
                            void 0),
                    (function (e) {
                        (e['COMPONENTS'] = 'components'),
                            (e['TIMELINE'] = 'timeline'),
                            (e['PLUGINS'] = 'plugins'),
                            (e['SETTINGS'] = 'settings');
                    })(t.BuiltinTabs || (t.BuiltinTabs = {})),
                    (function (e) {
                        (e['TO_BACK_SUBSCRIBE'] = 'b:subscribe'),
                            (e['TO_BACK_UNSUBSCRIBE'] = 'b:unsubscribe'),
                            (e['TO_FRONT_READY'] = 'f:ready'),
                            (e['TO_BACK_LOG_DETECTED_VUE'] = 'b:log-detected-vue'),
                            (e['TO_BACK_REFRESH'] = 'b:refresh'),
                            (e['TO_BACK_TAB_SWITCH'] = 'b:tab:switch'),
                            (e['TO_BACK_LOG'] = 'b:log'),
                            (e['TO_FRONT_RECONNECTED'] = 'f:reconnected'),
                            (e['TO_FRONT_TITLE'] = 'f:title'),
                            (e['TO_FRONT_APP_ADD'] = 'f:app:add'),
                            (e['TO_BACK_APP_LIST'] = 'b:app:list'),
                            (e['TO_FRONT_APP_LIST'] = 'f:app:list'),
                            (e['TO_FRONT_APP_REMOVE'] = 'f:app:remove'),
                            (e['TO_BACK_APP_SELECT'] = 'b:app:select'),
                            (e['TO_FRONT_APP_SELECTED'] = 'f:app:selected'),
                            (e['TO_BACK_SCAN_LEGACY_APPS'] = 'b:app:scan-legacy'),
                            (e['TO_BACK_COMPONENT_TREE'] = 'b:component:tree'),
                            (e['TO_FRONT_COMPONENT_TREE'] = 'f:component:tree'),
                            (e['TO_BACK_COMPONENT_SELECTED_DATA'] = 'b:component:selected-data'),
                            (e['TO_FRONT_COMPONENT_SELECTED_DATA'] = 'f:component:selected-data'),
                            (e['TO_BACK_COMPONENT_EXPAND'] = 'b:component:expand'),
                            (e['TO_FRONT_COMPONENT_EXPAND'] = 'f:component:expand'),
                            (e['TO_BACK_COMPONENT_SCROLL_TO'] = 'b:component:scroll-to'),
                            (e['TO_BACK_COMPONENT_FILTER'] = 'b:component:filter'),
                            (e['TO_BACK_COMPONENT_MOUSE_OVER'] = 'b:component:mouse-over'),
                            (e['TO_BACK_COMPONENT_MOUSE_OUT'] = 'b:component:mouse-out'),
                            (e['TO_BACK_COMPONENT_CONTEXT_MENU_TARGET'] =
                                'b:component:context-menu-target'),
                            (e['TO_BACK_COMPONENT_EDIT_STATE'] = 'b:component:edit-state'),
                            (e['TO_BACK_COMPONENT_PICK'] = 'b:component:pick'),
                            (e['TO_FRONT_COMPONENT_PICK'] = 'f:component:pick'),
                            (e['TO_BACK_COMPONENT_PICK_CANCELED'] = 'b:component:pick-canceled'),
                            (e['TO_FRONT_COMPONENT_PICK_CANCELED'] = 'f:component:pick-canceled'),
                            (e['TO_BACK_COMPONENT_INSPECT_DOM'] = 'b:component:inspect-dom'),
                            (e['TO_FRONT_COMPONENT_INSPECT_DOM'] = 'f:component:inspect-dom'),
                            (e['TO_BACK_COMPONENT_RENDER_CODE'] = 'b:component:render-code'),
                            (e['TO_FRONT_COMPONENT_RENDER_CODE'] = 'f:component:render-code'),
                            (e['TO_FRONT_COMPONENT_UPDATED'] = 'f:component:updated'),
                            (e['TO_FRONT_TIMELINE_EVENT'] = 'f:timeline:event'),
                            (e['TO_BACK_TIMELINE_LAYER_LIST'] = 'b:timeline:layer-list'),
                            (e['TO_FRONT_TIMELINE_LAYER_LIST'] = 'f:timeline:layer-list'),
                            (e['TO_FRONT_TIMELINE_LAYER_ADD'] = 'f:timeline:layer-add'),
                            (e['TO_BACK_TIMELINE_SHOW_SCREENSHOT'] = 'b:timeline:show-screenshot'),
                            (e['TO_BACK_TIMELINE_CLEAR'] = 'b:timeline:clear'),
                            (e['TO_BACK_TIMELINE_EVENT_DATA'] = 'b:timeline:event-data'),
                            (e['TO_FRONT_TIMELINE_EVENT_DATA'] = 'f:timeline:event-data'),
                            (e['TO_BACK_TIMELINE_LAYER_LOAD_EVENTS'] =
                                'b:timeline:layer-load-events'),
                            (e['TO_FRONT_TIMELINE_LAYER_LOAD_EVENTS'] =
                                'f:timeline:layer-load-events'),
                            (e['TO_BACK_TIMELINE_LOAD_MARKERS'] = 'b:timeline:load-markers'),
                            (e['TO_FRONT_TIMELINE_LOAD_MARKERS'] = 'f:timeline:load-markers'),
                            (e['TO_FRONT_TIMELINE_MARKER'] = 'f:timeline:marker'),
                            (e['TO_BACK_DEVTOOLS_PLUGIN_LIST'] = 'b:devtools-plugin:list'),
                            (e['TO_FRONT_DEVTOOLS_PLUGIN_LIST'] = 'f:devtools-plugin:list'),
                            (e['TO_FRONT_DEVTOOLS_PLUGIN_ADD'] = 'f:devtools-plugin:add'),
                            (e['TO_BACK_DEVTOOLS_PLUGIN_SETTING_UPDATED'] =
                                'b:devtools-plugin:setting-updated'),
                            (e['TO_BACK_CUSTOM_INSPECTOR_LIST'] = 'b:custom-inspector:list'),
                            (e['TO_FRONT_CUSTOM_INSPECTOR_LIST'] = 'f:custom-inspector:list'),
                            (e['TO_FRONT_CUSTOM_INSPECTOR_ADD'] = 'f:custom-inspector:add'),
                            (e['TO_BACK_CUSTOM_INSPECTOR_TREE'] = 'b:custom-inspector:tree'),
                            (e['TO_FRONT_CUSTOM_INSPECTOR_TREE'] = 'f:custom-inspector:tree'),
                            (e['TO_BACK_CUSTOM_INSPECTOR_STATE'] = 'b:custom-inspector:state'),
                            (e['TO_FRONT_CUSTOM_INSPECTOR_STATE'] = 'f:custom-inspector:state'),
                            (e['TO_BACK_CUSTOM_INSPECTOR_EDIT_STATE'] =
                                'b:custom-inspector:edit-state'),
                            (e['TO_BACK_CUSTOM_INSPECTOR_ACTION'] = 'b:custom-inspector:action'),
                            (e['TO_BACK_CUSTOM_INSPECTOR_NODE_ACTION'] =
                                'b:custom-inspector:node-action'),
                            (e['TO_FRONT_CUSTOM_INSPECTOR_SELECT_NODE'] =
                                'f:custom-inspector:select-node'),
                            (e['TO_BACK_CUSTOM_STATE_ACTION'] = 'b:custom-state:action');
                    })(t.BridgeEvents || (t.BridgeEvents = {})),
                    (function (e) {
                        (e['SELECTED_COMPONENT_DATA'] = 'component:selected-data'),
                            (e['COMPONENT_TREE'] = 'component:tree');
                    })(t.BridgeSubscriptions || (t.BridgeSubscriptions = {})),
                    (function (e) {
                        (e['INIT'] = 'init'),
                            (e['APP_INIT'] = 'app:init'),
                            (e['APP_ADD'] = 'app:add'),
                            (e['APP_UNMOUNT'] = 'app:unmount'),
                            (e['COMPONENT_UPDATED'] = 'component:updated'),
                            (e['COMPONENT_ADDED'] = 'component:added'),
                            (e['COMPONENT_REMOVED'] = 'component:removed'),
                            (e['COMPONENT_EMIT'] = 'component:emit'),
                            (e['COMPONENT_HIGHLIGHT'] = 'component:highlight'),
                            (e['COMPONENT_UNHIGHLIGHT'] = 'component:unhighlight'),
                            (e['SETUP_DEVTOOLS_PLUGIN'] = 'devtools-plugin:setup'),
                            (e['TIMELINE_LAYER_ADDED'] = 'timeline:layer-added'),
                            (e['TIMELINE_EVENT_ADDED'] = 'timeline:event-added'),
                            (e['CUSTOM_INSPECTOR_ADD'] = 'custom-inspector:add'),
                            (e['CUSTOM_INSPECTOR_SEND_TREE'] = 'custom-inspector:send-tree'),
                            (e['CUSTOM_INSPECTOR_SEND_STATE'] = 'custom-inspector:send-state'),
                            (e['CUSTOM_INSPECTOR_SELECT_NODE'] = 'custom-inspector:select-node'),
                            (e['PERFORMANCE_START'] = 'perf:start'),
                            (e['PERFORMANCE_END'] = 'perf:end'),
                            (e['PLUGIN_SETTINGS_SET'] = 'plugin:settings:set'),
                            (e['FLUSH'] = 'flush'),
                            (e['TRACK_UPDATE'] = '_track-update'),
                            (e['FLASH_UPDATE'] = '_flash-update');
                    })(t.HookEvents || (t.HookEvents = {}));
            },
            38158: (e, t) => {
                Object.defineProperty(t, '__esModule', { value: !0 }), (t.StateEditor = void 0);
                class n {
                    set(e, t, n, r = null) {
                        const o = Array.isArray(t) ? t : t.split('.');
                        while (o.length > 1)
                            (e = e[o.shift()]), this.isRef(e) && (e = this.getRefValue(e));
                        const i = o[0];
                        r ? r(e, i, n) : this.isRef(e[i]) ? this.setRefValue(e[i], n) : (e[i] = n);
                    }
                    get(e, t) {
                        const n = Array.isArray(t) ? t : t.split('.');
                        for (let r = 0; r < n.length; r++)
                            if (((e = e[n[r]]), this.isRef(e) && (e = this.getRefValue(e)), !e))
                                return;
                        return e;
                    }
                    has(e, t, n = !1) {
                        if ('undefined' === typeof e) return !1;
                        const r = Array.isArray(t) ? t.slice() : t.split('.'),
                            o = n ? 2 : 1;
                        while (e && r.length > o)
                            (e = e[r.shift()]), this.isRef(e) && (e = this.getRefValue(e));
                        return null != e && Object.prototype.hasOwnProperty.call(e, r[0]);
                    }
                    createDefaultSetCallback(e) {
                        return (t, n, r) => {
                            if (
                                ((e.remove || e.newKey) &&
                                    (Array.isArray(t) ? t.splice(n, 1) : delete t[n]),
                                !e.remove)
                            ) {
                                const o = t[e.newKey || n];
                                this.isRef(o) ? this.setRefValue(o, r) : (t[e.newKey || n] = r);
                            }
                        };
                    }
                    isRef(e) {
                        return !1;
                    }
                    setRefValue(e, t) {}
                    getRefValue(e) {
                        return e;
                    }
                }
                t.StateEditor = n;
            },
            66210: (e, t, n) => {
                function r(e) {
                    e.prototype.hasOwnProperty('$isChrome') ||
                        (Object.defineProperties(e.prototype, {
                            $isChrome: { get: () => t.isChrome },
                            $isFirefox: { get: () => t.isFirefox },
                            $isWindows: { get: () => t.isWindows },
                            $isMac: { get: () => t.isMac },
                            $isLinux: { get: () => t.isLinux },
                            $keys: { get: () => t.keys }
                        }),
                        t.isWindows && document.body.classList.add('platform-windows'),
                        t.isMac && document.body.classList.add('platform-mac'),
                        t.isLinux && document.body.classList.add('platform-linux'));
                }
                Object.defineProperty(t, '__esModule', { value: !0 }),
                    (t.initEnv =
                        t.keys =
                        t.isLinux =
                        t.isMac =
                        t.isWindows =
                        t.isFirefox =
                        t.isChrome =
                        t.target =
                        t.isBrowser =
                            void 0),
                    (t.isBrowser = 'undefined' !== typeof navigator),
                    (t.target = t.isBrowser ? window : 'undefined' !== typeof n.g ? n.g : {}),
                    (t.isChrome =
                        'undefined' !== typeof t.target.chrome && !!t.target.chrome.devtools),
                    (t.isFirefox = t.isBrowser && navigator.userAgent.indexOf('Firefox') > -1),
                    (t.isWindows = t.isBrowser && 0 === navigator.platform.indexOf('Win')),
                    (t.isMac = t.isBrowser && 'MacIntel' === navigator.platform),
                    (t.isLinux = t.isBrowser && 0 === navigator.platform.indexOf('Linux')),
                    (t.keys = {
                        ctrl: t.isMac ? '&#8984;' : 'Ctrl',
                        shift: 'Shift',
                        alt: t.isMac ? '&#8997;' : 'Alt',
                        del: 'Del',
                        enter: 'Enter',
                        esc: 'Esc'
                    }),
                    (t.initEnv = r);
            },
            27146: function (e, t, n) {
                var r =
                        (this && this.__createBinding) ||
                        (Object.create
                            ? function (e, t, n, r) {
                                  void 0 === r && (r = n);
                                  var o = Object.getOwnPropertyDescriptor(t, n);
                                  (o &&
                                      !('get' in o
                                          ? !t.__esModule
                                          : o.writable || o.configurable)) ||
                                      (o = {
                                          enumerable: !0,
                                          get: function () {
                                              return t[n];
                                          }
                                      }),
                                      Object.defineProperty(e, r, o);
                              }
                            : function (e, t, n, r) {
                                  void 0 === r && (r = n), (e[r] = t[n]);
                              }),
                    o =
                        (this && this.__exportStar) ||
                        function (e, t) {
                            for (var n in e)
                                'default' === n ||
                                    Object.prototype.hasOwnProperty.call(t, n) ||
                                    r(t, e, n);
                        };
                Object.defineProperty(t, '__esModule', { value: !0 }),
                    o(n(79310), t),
                    o(n(47294), t),
                    o(n(79410), t),
                    o(n(38158), t),
                    o(n(66210), t),
                    o(n(12074), t),
                    o(n(86798), t),
                    o(n(29556), t),
                    o(n(423), t),
                    o(n(58561), t),
                    o(n(34723), t),
                    o(n(76203), t),
                    o(n(86283), t);
            },
            12074: (e, t, n) => {
                Object.defineProperty(t, '__esModule', { value: !0 }),
                    (t.setPluginPermission = t.hasPluginPermission = t.PluginPermission = void 0);
                const r = n(29556);
                function o(e, t) {
                    const n = r.SharedData.pluginPermissions[`${e}:${t}`];
                    return null == n || !!n;
                }
                function i(e, t, n) {
                    r.SharedData.pluginPermissions = {
                        ...r.SharedData.pluginPermissions,
                        [`${e}:${t}`]: n
                    };
                }
                (function (e) {
                    (e['ENABLED'] = 'enabled'),
                        (e['COMPONENTS'] = 'components'),
                        (e['CUSTOM_INSPECTOR'] = 'custom-inspector'),
                        (e['TIMELINE'] = 'timeline');
                })(t.PluginPermission || (t.PluginPermission = {})),
                    (t.hasPluginPermission = o),
                    (t.setPluginPermission = i);
            },
            86798: (e, t, n) => {
                Object.defineProperty(t, '__esModule', { value: !0 }),
                    (t.getPluginDefaultSettings =
                        t.setPluginSettings =
                        t.getPluginSettings =
                            void 0);
                const r = n(29556);
                function o(e, t) {
                    var n;
                    return {
                        ...(null !== t && void 0 !== t ? t : {}),
                        ...(null !== (n = r.SharedData.pluginSettings[e]) && void 0 !== n ? n : {})
                    };
                }
                function i(e, t) {
                    r.SharedData.pluginSettings = { ...r.SharedData.pluginSettings, [e]: t };
                }
                function s(e) {
                    const t = {};
                    if (e)
                        for (const n in e) {
                            const r = e[n];
                            t[n] = r.defaultValue;
                        }
                    return t;
                }
                (t.getPluginSettings = o),
                    (t.setPluginSettings = i),
                    (t.getPluginDefaultSettings = s);
            },
            86283: (e, t) => {
                Object.defineProperty(t, '__esModule', { value: !0 }), (t.raf = void 0);
                let n = [];
                t.raf =
                    'function' === typeof requestAnimationFrame
                        ? requestAnimationFrame
                        : (e) => {
                              n.length ||
                                  setImmediate(() => {
                                      const e = performance.now(),
                                          t = n;
                                      (n = []), t.forEach((t) => t(e));
                                  }),
                                  n.push(e);
                          };
            },
            29556: (e, t, n) => {
                Object.defineProperty(t, '__esModule', { value: !0 }),
                    (t.SharedData =
                        t.watchSharedData =
                        t.destroySharedData =
                        t.onSharedDataInit =
                        t.initSharedData =
                            void 0);
                const r = n(58561),
                    o = n(66210),
                    i = {
                        openInEditorHost: '/',
                        componentNameStyle: 'class',
                        theme: 'auto',
                        displayDensity: 'low',
                        timeFormat: 'default',
                        recordVuex: !0,
                        cacheVuexSnapshotsEvery: 50,
                        cacheVuexSnapshotsLimit: 10,
                        snapshotLoading: !1,
                        componentEventsEnabled: !0,
                        performanceMonitoringEnabled: !0,
                        editableProps: !1,
                        logDetected: !0,
                        vuexNewBackend: !1,
                        vuexAutoload: !1,
                        vuexGroupGettersByModule: !0,
                        showMenuScrollTip: !0,
                        timelineTimeGrid: !0,
                        timelineScreenshots: !1,
                        menuStepScrolling: o.isMac,
                        pluginPermissions: {},
                        pluginSettings: {},
                        pageConfig: {},
                        legacyApps: !1,
                        trackUpdates: !0,
                        flashUpdates: !1,
                        debugInfo: !1,
                        isBrowser: o.isBrowser
                    },
                    s = [
                        'componentNameStyle',
                        'theme',
                        'displayDensity',
                        'recordVuex',
                        'editableProps',
                        'logDetected',
                        'vuexNewBackend',
                        'vuexAutoload',
                        'vuexGroupGettersByModule',
                        'timeFormat',
                        'showMenuScrollTip',
                        'timelineTimeGrid',
                        'timelineScreenshots',
                        'menuStepScrolling',
                        'pluginPermissions',
                        'pluginSettings',
                        'performanceMonitoringEnabled',
                        'componentEventsEnabled',
                        'trackUpdates',
                        'flashUpdates',
                        'debugInfo'
                    ],
                    a = '6.0.0-alpha.1';
                let c,
                    l,
                    u,
                    p = !1,
                    f = 0;
                const _ = [];
                function d(e) {
                    return new Promise((t) => {
                        (c = e.bridge),
                            (p = !!e.persist),
                            p
                                ? (s.forEach((e) => {
                                      const t = (0, r.getStorage)(
                                          `vue-devtools-${a}:shared-data:${e}`
                                      );
                                      null !== t && (i[e] = t);
                                  }),
                                  c.on('shared-data:load', () => {
                                      Object.keys(i).forEach((e) => {
                                          O(e, i[e]);
                                      }),
                                          c.send('shared-data:load-complete');
                                  }),
                                  c.on('shared-data:init-complete', () => {
                                      clearInterval(u), t();
                                  }),
                                  c.send('shared-data:master-init-waiting'),
                                  c.on('shared-data:minion-init-waiting', () => {
                                      c.send('shared-data:master-init-waiting');
                                  }),
                                  (f = 0),
                                  clearInterval(u),
                                  (u = setInterval(() => {
                                      c.send('shared-data:master-init-waiting'),
                                          f++,
                                          f > 30 &&
                                              (clearInterval(u),
                                              console.error('[shared data] Master init failed'));
                                  }, 2e3)))
                                : (c.on('shared-data:master-init-waiting', () => {
                                      c.send('shared-data:load'),
                                          c.once('shared-data:load-complete', () => {
                                              c.send('shared-data:init-complete'), t();
                                          });
                                  }),
                                  c.send('shared-data:minion-init-waiting')),
                            (l = { ...i }),
                            e.Vue && (l = e.Vue.observable(l)),
                            c.on('shared-data:set', ({ key: e, value: t }) => {
                                E(e, t);
                            }),
                            _.forEach((e) => e());
                    });
                }
                function h(e) {
                    return (
                        _.push(e),
                        () => {
                            const t = _.indexOf(e);
                            -1 !== t && _.splice(t, 1);
                        }
                    );
                }
                function g() {
                    c.removeAllListeners('shared-data:set'), (m = {});
                }
                (t.initSharedData = d), (t.onSharedDataInit = h), (t.destroySharedData = g);
                let m = {};
                function E(e, t) {
                    p &&
                        s.includes(e) &&
                        (0, r.setStorage)(`vue-devtools-${a}:shared-data:${e}`, t);
                    const n = l[e];
                    l[e] = t;
                    const o = m[e];
                    return o && o.forEach((e) => e(t, n)), !0;
                }
                function O(e, t) {
                    c && c.send('shared-data:set', { key: e, value: t });
                }
                function v(e, t) {
                    const n = m[e] || (m[e] = []);
                    return (
                        n.push(t),
                        () => {
                            const e = n.indexOf(t);
                            -1 !== e && n.splice(e, 1);
                        }
                    );
                }
                t.watchSharedData = v;
                const T = {};
                Object.keys(i).forEach((e) => {
                    Object.defineProperty(T, e, {
                        configurable: !1,
                        get: () => l[e],
                        set: (t) => {
                            O(e, t), E(e, t);
                        }
                    });
                }),
                    (t.SharedData = T);
            },
            423: (e, t) => {
                Object.defineProperty(t, '__esModule', { value: !0 });
            },
            58561: (e, t, n) => {
                Object.defineProperty(t, '__esModule', { value: !0 }),
                    (t.clearStorage =
                        t.removeStorage =
                        t.setStorage =
                        t.getStorage =
                        t.initStorage =
                            void 0);
                const r = n(66210),
                    o =
                        'undefined' !== typeof r.target.chrome &&
                        'undefined' !== typeof r.target.chrome.storage;
                let i = null;
                function s() {
                    return new Promise((e) => {
                        o
                            ? r.target.chrome.storage.local.get(null, (t) => {
                                  (i = t), e();
                              })
                            : ((i = {}), e());
                    });
                }
                function a(e, t = null) {
                    if ((p(), o)) return f(i[e], t);
                    try {
                        return f(JSON.parse(localStorage.getItem(e)), t);
                    } catch (n) {}
                }
                function c(e, t) {
                    if ((p(), o)) (i[e] = t), r.target.chrome.storage.local.set({ [e]: t });
                    else
                        try {
                            localStorage.setItem(e, JSON.stringify(t));
                        } catch (n) {}
                }
                function l(e) {
                    if ((p(), o)) delete i[e], r.target.chrome.storage.local.remove([e]);
                    else
                        try {
                            localStorage.removeItem(e);
                        } catch (t) {}
                }
                function u() {
                    if ((p(), o)) (i = {}), r.target.chrome.storage.local.clear();
                    else
                        try {
                            localStorage.clear();
                        } catch (e) {}
                }
                function p() {
                    if (!i) throw new Error("Storage wasn't initialized with 'init()'");
                }
                function f(e, t) {
                    return null == e ? t : e;
                }
                (t.initStorage = s),
                    (t.getStorage = a),
                    (t.setStorage = c),
                    (t.removeStorage = l),
                    (t.clearStorage = u);
            },
            34723: (e, t) => {
                Object.defineProperty(t, '__esModule', { value: !0 }),
                    (t.stringifyStrictCircularAutoChunks =
                        t.parseCircularAutoChunks =
                        t.stringifyCircularAutoChunks =
                            void 0);
                const n = 524288;
                function r(e, t, n, o) {
                    let i, s, a, c, l;
                    const u = o.get(e);
                    if (null != u) return u;
                    const p = n.length,
                        f = Object.prototype.toString.call(e);
                    if ('[object Object]' === f) {
                        (i = {}), o.set(e, p), n.push(i);
                        const u = Object.keys(e);
                        for (c = 0, l = u.length; c < l; c++) {
                            s = u[c];
                            try {
                                (a = e[s]), t && (a = t.call(e, s, a));
                            } catch (_) {
                                a = _;
                            }
                            i[s] = r(a, t, n, o);
                        }
                    } else if ('[object Array]' === f)
                        for (i = [], o.set(e, p), n.push(i), c = 0, l = e.length; c < l; c++) {
                            try {
                                (a = e[c]), t && (a = t.call(e, c, a));
                            } catch (_) {
                                a = _;
                            }
                            i[c] = r(a, t, n, o);
                        }
                    else n.push(e);
                    return p;
                }
                function o(e, t) {
                    let n,
                        r,
                        o,
                        i,
                        s,
                        a,
                        c = e.length;
                    while (c--)
                        if (
                            ((o = e[c]),
                            (a = Object.prototype.toString.call(o)),
                            '[object Object]' === a)
                        ) {
                            const a = Object.keys(o);
                            for (n = 0, r = a.length; n < r; n++)
                                (i = a[n]), (s = e[o[i]]), t && (s = t.call(o, i, s)), (o[i] = s);
                        } else if ('[object Array]' === a)
                            for (n = 0, r = o.length; n < r; n++)
                                (s = e[o[n]]), t && (s = t.call(o, n, s)), (o[n] = s);
                }
                function i(e, t = null, r = null) {
                    let o;
                    try {
                        o = 1 === arguments.length ? JSON.stringify(e) : JSON.stringify(e, t, r);
                    } catch (i) {
                        o = a(e, t, r);
                    }
                    if (o.length > n) {
                        const e = Math.ceil(o.length / n),
                            t = [];
                        for (let r = 0; r < e; r++) t.push(o.slice(r * n, (r + 1) * n));
                        return t;
                    }
                    return o;
                }
                function s(e, t = null) {
                    Array.isArray(e) && (e = e.join(''));
                    const n = /^\s/.test(e);
                    if (n) {
                        const n = JSON.parse(e);
                        return o(n, t), n[0];
                    }
                    return 1 === arguments.length ? JSON.parse(e) : JSON.parse(e, t);
                }
                function a(e, t = null, n = null) {
                    const o = [];
                    return (
                        r(e, t, o, new Map()),
                        n ? ' ' + JSON.stringify(o, null, n) : ' ' + JSON.stringify(o)
                    );
                }
                (t.stringifyCircularAutoChunks = i),
                    (t.parseCircularAutoChunks = s),
                    (t.stringifyStrictCircularAutoChunks = a);
            },
            76203: function (__unused_webpack_module, exports, __webpack_require__) {
                var __importDefault =
                    (this && this.__importDefault) ||
                    function (e) {
                        return e && e.__esModule ? e : { default: e };
                    };
                Object.defineProperty(exports, '__esModule', { value: !0 }),
                    (exports.isEmptyObject =
                        exports.copyToClipboard =
                        exports.escape =
                        exports.openInEditor =
                        exports.focusInput =
                        exports.simpleGet =
                        exports.sortByKey =
                        exports.searchDeepInObject =
                        exports.isPlainObject =
                        exports.revive =
                        exports.parse =
                        exports.getCustomRefDetails =
                        exports.getCustomHTMLElementDetails =
                        exports.getCustomFunctionDetails =
                        exports.getCustomComponentDefinitionDetails =
                        exports.getComponentName =
                        exports.getCustomBigIntDetails =
                        exports.reviveSet =
                        exports.getCustomSetDetails =
                        exports.reviveMap =
                        exports.getCustomMapDetails =
                        exports.stringify =
                        exports.specialTokenToString =
                        exports.MAX_ARRAY_SIZE =
                        exports.MAX_STRING_SIZE =
                        exports.SPECIAL_TOKENS =
                        exports.NAN =
                        exports.NEGATIVE_INFINITY =
                        exports.INFINITY =
                        exports.UNDEFINED =
                        exports.inDoc =
                        exports.getComponentDisplayName =
                        exports.kebabize =
                        exports.camelize =
                        exports.classify =
                            void 0);
                const path_1 = __importDefault(__webpack_require__(21023)),
                    transfer_1 = __webpack_require__(34723),
                    backend_1 = __webpack_require__(79310),
                    shared_data_1 = __webpack_require__(29556),
                    env_1 = __webpack_require__(66210);
                function cached(e) {
                    const t = Object.create(null);
                    return function (n) {
                        const r = t[n];
                        return r || (t[n] = e(n));
                    };
                }
                const classifyRE = /(?:^|[-_/])(\w)/g;
                exports.classify = cached((e) => e && ('' + e).replace(classifyRE, toUpper));
                const camelizeRE = /-(\w)/g;
                exports.camelize = cached((e) => e && e.replace(camelizeRE, toUpper));
                const kebabizeRE = /([a-z0-9])([A-Z])/g;
                function toUpper(e, t) {
                    return t ? t.toUpperCase() : '';
                }
                function getComponentDisplayName(e, t = 'class') {
                    switch (t) {
                        case 'class':
                            return (0, exports.classify)(e);
                        case 'kebab':
                            return (0, exports.kebabize)(e);
                        case 'original':
                        default:
                            return e;
                    }
                }
                function inDoc(e) {
                    if (!e) return !1;
                    const t = e.ownerDocument.documentElement,
                        n = e.parentNode;
                    return t === e || t === n || !(!n || 1 !== n.nodeType || !t.contains(n));
                }
                function specialTokenToString(e) {
                    return null === e
                        ? 'null'
                        : e === exports.UNDEFINED
                          ? 'undefined'
                          : e === exports.NAN
                            ? 'NaN'
                            : e === exports.INFINITY
                              ? 'Infinity'
                              : e === exports.NEGATIVE_INFINITY && '-Infinity';
                }
                (exports.kebabize = cached(
                    (e) => e && e.replace(kebabizeRE, (e, t, n) => `${t}-${n}`).toLowerCase()
                )),
                    (exports.getComponentDisplayName = getComponentDisplayName),
                    (exports.inDoc = inDoc),
                    (exports.UNDEFINED = '__vue_devtool_undefined__'),
                    (exports.INFINITY = '__vue_devtool_infinity__'),
                    (exports.NEGATIVE_INFINITY = '__vue_devtool_negative_infinity__'),
                    (exports.NAN = '__vue_devtool_nan__'),
                    (exports.SPECIAL_TOKENS = {
                        true: !0,
                        false: !1,
                        undefined: exports.UNDEFINED,
                        null: null,
                        '-Infinity': exports.NEGATIVE_INFINITY,
                        Infinity: exports.INFINITY,
                        NaN: exports.NAN
                    }),
                    (exports.MAX_STRING_SIZE = 1e4),
                    (exports.MAX_ARRAY_SIZE = 5e3),
                    (exports.specialTokenToString = specialTokenToString);
                class EncodeCache {
                    constructor() {
                        this.map = new Map();
                    }
                    cache(e, t) {
                        const n = this.map.get(e);
                        if (n) return n;
                        {
                            const n = t(e);
                            return this.map.set(e, n), n;
                        }
                    }
                    clear() {
                        this.map.clear();
                    }
                }
                const encodeCache = new EncodeCache();
                class ReviveCache {
                    constructor(e) {
                        (this.maxSize = e),
                            (this.map = new Map()),
                            (this.index = 0),
                            (this.size = 0);
                    }
                    cache(e) {
                        const t = this.index;
                        return (
                            this.map.set(t, e),
                            this.size++,
                            this.size > this.maxSize &&
                                (this.map.delete(t - this.size), this.size--),
                            this.index++,
                            t
                        );
                    }
                    read(e) {
                        return this.map.get(e);
                    }
                }
                const reviveCache = new ReviveCache(1e3),
                    replacers = { internal: replacerForInternal, user: replaceForUser };
                function stringify(e, t = 'internal') {
                    return (
                        encodeCache.clear(),
                        (0, transfer_1.stringifyCircularAutoChunks)(e, replacers[t])
                    );
                }
                function replacerForInternal(e) {
                    var t;
                    const n = this[e],
                        r = typeof n;
                    if (Array.isArray(n)) {
                        const e = n.length;
                        return e > exports.MAX_ARRAY_SIZE
                            ? { _isArray: !0, length: e, items: n.slice(0, exports.MAX_ARRAY_SIZE) }
                            : n;
                    }
                    if ('string' === typeof n)
                        return n.length > exports.MAX_STRING_SIZE
                            ? n.substring(0, exports.MAX_STRING_SIZE) +
                                  `... (${n.length} total length)`
                            : n;
                    if ('undefined' === r) return exports.UNDEFINED;
                    if (n === 1 / 0) return exports.INFINITY;
                    if (n === -1 / 0) return exports.NEGATIVE_INFINITY;
                    if ('function' === r) return getCustomFunctionDetails(n);
                    if ('symbol' === r)
                        return `[native Symbol ${Symbol.prototype.toString.call(n)}]`;
                    if ('bigint' === r) return getCustomBigIntDetails(n);
                    if (null !== n && 'object' === r) {
                        const e = Object.prototype.toString.call(n);
                        if ('[object Map]' === e)
                            return encodeCache.cache(n, () => getCustomMapDetails(n));
                        if ('[object Set]' === e)
                            return encodeCache.cache(n, () => getCustomSetDetails(n));
                        if ('[object RegExp]' === e)
                            return `[native RegExp ${RegExp.prototype.toString.call(n)}]`;
                        if ('[object Date]' === e)
                            return `[native Date ${Date.prototype.toString.call(n)}]`;
                        if ('[object Error]' === e)
                            return `[native Error ${n.message}<>${n.stack}]`;
                        if (n.state && n._vm)
                            return encodeCache.cache(n, () =>
                                (0, backend_1.getCustomStoreDetails)(n)
                            );
                        if (n.constructor && 'VueRouter' === n.constructor.name)
                            return encodeCache.cache(n, () =>
                                (0, backend_1.getCustomRouterDetails)(n)
                            );
                        if ((0, backend_1.isVueInstance)(n))
                            return encodeCache.cache(n, () =>
                                (0, backend_1.getCustomInstanceDetails)(n)
                            );
                        if ('function' === typeof n.render)
                            return encodeCache.cache(n, () =>
                                getCustomComponentDefinitionDetails(n)
                            );
                        if (n.constructor && 'VNode' === n.constructor.name)
                            return `[native VNode <${n.tag}>]`;
                        if ('undefined' !== typeof HTMLElement && n instanceof HTMLElement)
                            return encodeCache.cache(n, () => getCustomHTMLElementDetails(n));
                        if (
                            'Store' ===
                                (null === (t = n.constructor) || void 0 === t ? void 0 : t.name) &&
                            n._wrappedGetters
                        )
                            return '[object Store]';
                        if (n.currentRoute) return '[object Router]';
                        const r = (0, backend_1.getCustomObjectDetails)(n, e);
                        if (null != r) return r;
                    } else if (Number.isNaN(n)) return exports.NAN;
                    return sanitize(n);
                }
                function replaceForUser(e) {
                    let t = this[e];
                    const n = typeof t;
                    if (
                        ((null === t || void 0 === t ? void 0 : t._custom) &&
                            'value' in t._custom &&
                            (t = t._custom.value),
                        'object' !== n)
                    ) {
                        if (t === exports.UNDEFINED) return;
                        return t === exports.INFINITY
                            ? 1 / 0
                            : t === exports.NEGATIVE_INFINITY
                              ? -1 / 0
                              : t === exports.NAN
                                ? NaN
                                : t;
                    }
                    return sanitize(t);
                }
                function getCustomMapDetails(e) {
                    const t = [];
                    return (
                        e.forEach((e, n) => t.push({ key: n, value: e })),
                        {
                            _custom: {
                                type: 'map',
                                display: 'Map',
                                value: t,
                                readOnly: !0,
                                fields: { abstract: !0 }
                            }
                        }
                    );
                }
                function reviveMap(e) {
                    const t = new Map(),
                        n = e._custom.value;
                    for (let r = 0; r < n.length; r++) {
                        const { key: e, value: o } = n[r];
                        t.set(e, revive(o));
                    }
                    return t;
                }
                function getCustomSetDetails(e) {
                    const t = Array.from(e);
                    return {
                        _custom: {
                            type: 'set',
                            display: `Set[${t.length}]`,
                            value: t,
                            readOnly: !0
                        }
                    };
                }
                function reviveSet(e) {
                    const t = new Set(),
                        n = e._custom.value;
                    for (let r = 0; r < n.length; r++) {
                        const e = n[r];
                        t.add(revive(e));
                    }
                    return t;
                }
                function getCustomBigIntDetails(e) {
                    const t = BigInt.prototype.toString.call(e);
                    return { _custom: { type: 'bigint', display: `BigInt(${t})`, value: t } };
                }
                function basename(e, t) {
                    return path_1.default.basename(
                        e.replace(/^[a-zA-Z]:/, '').replace(/\\/g, '/'),
                        t
                    );
                }
                function getComponentName(e) {
                    const t = e.displayName || e.name || e._componentTag;
                    if (t) return t;
                    const n = e.__file;
                    return n ? (0, exports.classify)(basename(n, '.vue')) : void 0;
                }
                function getCustomComponentDefinitionDetails(e) {
                    let t = getComponentName(e);
                    return (
                        t
                            ? e.name && e.__file && (t += ` <span>(${e.__file})</span>`)
                            : (t = '<i>Unknown Component</i>'),
                        {
                            _custom: {
                                type: 'component-definition',
                                display: t,
                                tooltip: 'Component definition',
                                ...(e.__file ? { file: e.__file } : {})
                            }
                        }
                    );
                }
                function getCustomFunctionDetails(e) {
                    let t = '',
                        n = null;
                    try {
                        (t = Function.prototype.toString.call(e)),
                            (n = String.prototype.match.call(t, /\([\s\S]*?\)/));
                    } catch (s) {}
                    const r = n && n[0],
                        o = 'string' === typeof r ? r : '(?)',
                        i = 'string' === typeof e.name ? e.name : '';
                    return {
                        _custom: {
                            type: 'function',
                            display: `<span style="opacity:.5;">function</span> ${escape(i)}${o}`,
                            tooltip: t.trim() ? `<pre>${t}</pre>` : null,
                            _reviveId: reviveCache.cache(e)
                        }
                    };
                }
                function getCustomHTMLElementDetails(e) {
                    try {
                        return {
                            _custom: {
                                type: 'HTMLElement',
                                display: `<span class="opacity-30">&lt;</span><span class="text-blue-500">${e.tagName.toLowerCase()}</span><span class="opacity-30">&gt;</span>`,
                                value: namedNodeMapToObject(e.attributes),
                                actions: [
                                    {
                                        icon: 'input',
                                        tooltip: 'Log element to console',
                                        action: () => {
                                            console.log(e);
                                        }
                                    }
                                ]
                            }
                        };
                    } catch (t) {
                        return {
                            _custom: {
                                type: 'HTMLElement',
                                display: `<span class="text-blue-500">${String(e)}</span>`
                            }
                        };
                    }
                }
                function namedNodeMapToObject(e) {
                    const t = {},
                        n = e.length;
                    for (let r = 0; r < n; r++) {
                        const n = e.item(r);
                        t[n.name] = n.value;
                    }
                    return t;
                }
                function getCustomRefDetails(e, t, n) {
                    let r;
                    if (Array.isArray(n))
                        r = n.map((n) => getCustomRefDetails(e, t, n)).map((e) => e.value);
                    else {
                        let t;
                        (t = n._isVue ? getComponentName(n.$options) : n.tagName.toLowerCase()),
                            (r = {
                                _custom: {
                                    display:
                                        `&lt;${t}` +
                                        (n.id
                                            ? ` <span class="attr-title">id</span>="${n.id}"`
                                            : '') +
                                        (n.className
                                            ? ` <span class="attr-title">class</span>="${n.className}"`
                                            : '') +
                                        '&gt;',
                                    uid: e.__VUE_DEVTOOLS_UID__,
                                    type: 'reference'
                                }
                            });
                    }
                    return { type: '$refs', key: t, value: r, editable: !1 };
                }
                function parse(e, t = !1) {
                    return t
                        ? (0, transfer_1.parseCircularAutoChunks)(e, reviver)
                        : (0, transfer_1.parseCircularAutoChunks)(e);
                }
                (exports.stringify = stringify),
                    (exports.getCustomMapDetails = getCustomMapDetails),
                    (exports.reviveMap = reviveMap),
                    (exports.getCustomSetDetails = getCustomSetDetails),
                    (exports.reviveSet = reviveSet),
                    (exports.getCustomBigIntDetails = getCustomBigIntDetails),
                    (exports.getComponentName = getComponentName),
                    (exports.getCustomComponentDefinitionDetails =
                        getCustomComponentDefinitionDetails),
                    (exports.getCustomFunctionDetails = getCustomFunctionDetails),
                    (exports.getCustomHTMLElementDetails = getCustomHTMLElementDetails),
                    (exports.getCustomRefDetails = getCustomRefDetails),
                    (exports.parse = parse);
                const specialTypeRE = /^\[native (\w+) (.*?)(<>((.|\s)*))?\]$/,
                    symbolRE = /^\[native Symbol Symbol\((.*)\)\]$/;
                function reviver(e, t) {
                    return revive(t);
                }
                function revive(e) {
                    if (e !== exports.UNDEFINED) {
                        if (e === exports.INFINITY) return 1 / 0;
                        if (e === exports.NEGATIVE_INFINITY) return -1 / 0;
                        if (e === exports.NAN) return NaN;
                        if (e && e._custom) {
                            const { _custom: t } = e;
                            return 'component' === t.type
                                ? (0, backend_1.getInstanceMap)().get(t.id)
                                : 'map' === t.type
                                  ? reviveMap(e)
                                  : 'set' === t.type
                                    ? reviveSet(e)
                                    : 'bigint' === t.type
                                      ? BigInt(t.value)
                                      : t._reviveId
                                        ? reviveCache.read(t._reviveId)
                                        : revive(t.value);
                        }
                        if (symbolRE.test(e)) {
                            const [, t] = symbolRE.exec(e);
                            return Symbol.for(t);
                        }
                        if (specialTypeRE.test(e)) {
                            const [, t, n, , r] = specialTypeRE.exec(e),
                                o = new env_1.target[t](n);
                            return 'Error' === t && r && (o.stack = r), o;
                        }
                        return e;
                    }
                }
                function sanitize(e) {
                    return isPrimitive(e) || Array.isArray(e) || isPlainObject(e)
                        ? e
                        : Object.prototype.toString.call(e);
                }
                function isPlainObject(e) {
                    return '[object Object]' === Object.prototype.toString.call(e);
                }
                function isPrimitive(e) {
                    if (null == e) return !0;
                    const t = typeof e;
                    return 'string' === t || 'number' === t || 'boolean' === t;
                }
                function searchDeepInObject(e, t) {
                    const n = new Map(),
                        r = internalSearchObject(e, t.toLowerCase(), n, 0);
                    return n.clear(), r;
                }
                (exports.revive = revive),
                    (exports.isPlainObject = isPlainObject),
                    (exports.searchDeepInObject = searchDeepInObject);
                const SEARCH_MAX_DEPTH = 10;
                function internalSearchObject(e, t, n, r) {
                    if (r > SEARCH_MAX_DEPTH) return !1;
                    let o = !1;
                    const i = Object.keys(e);
                    let s, a;
                    for (let c = 0; c < i.length; c++)
                        if (
                            ((s = i[c]),
                            (a = e[s]),
                            (o = internalSearchCheck(t, s, a, n, r + 1)),
                            o)
                        )
                            break;
                    return o;
                }
                function internalSearchArray(e, t, n, r) {
                    if (r > SEARCH_MAX_DEPTH) return !1;
                    let o,
                        i = !1;
                    for (let s = 0; s < e.length; s++)
                        if (((o = e[s]), (i = internalSearchCheck(t, null, o, n, r + 1)), i)) break;
                    return i;
                }
                function internalSearchCheck(e, t, n, r, o) {
                    let i,
                        s = !1;
                    return (
                        '_custom' === t && ((t = n.display), (n = n.value)),
                        (i = specialTokenToString(n)) && (n = i),
                        t && compare(t, e)
                            ? ((s = !0), r.set(n, !0))
                            : r.has(n)
                              ? (s = r.get(n))
                              : Array.isArray(n)
                                ? (r.set(n, null),
                                  (s = internalSearchArray(n, e, r, o)),
                                  r.set(n, s))
                                : isPlainObject(n)
                                  ? (r.set(n, null),
                                    (s = internalSearchObject(n, e, r, o)),
                                    r.set(n, s))
                                  : compare(n, e) && ((s = !0), r.set(n, !0)),
                        s
                    );
                }
                function compare(e, t) {
                    return -1 !== ('' + e).toLowerCase().indexOf(t);
                }
                function sortByKey(e) {
                    return (
                        e && e.slice().sort((e, t) => (e.key < t.key ? -1 : e.key > t.key ? 1 : 0))
                    );
                }
                function simpleGet(e, t) {
                    const n = Array.isArray(t) ? t : t.split('.');
                    for (let r = 0; r < n.length; r++) if (((e = e[n[r]]), !e)) return;
                    return e;
                }
                function focusInput(e) {
                    e.focus(), e.setSelectionRange(0, e.value.length);
                }
                function openInEditor(file) {
                    const fileName = file.replace(/\\/g, '\\\\'),
                        src = `fetch('${shared_data_1.SharedData.openInEditorHost}__open-in-editor?file=${encodeURI(file)}').then(response => {\n    if (response.ok) {\n      console.log('File ${fileName} opened in editor')\n    } else {\n      const msg = 'Opening component ${fileName} failed'\n      const target = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {}\n      if (target.__VUE_DEVTOOLS_TOAST__) {\n        target.__VUE_DEVTOOLS_TOAST__(msg, 'error')\n      } else {\n        console.log('%c' + msg, 'color:red')\n      }\n      console.log('Check the setup of your project, see https://devtools.vuejs.org/guide/open-in-editor.html')\n    }\n  })`;
                    env_1.isChrome
                        ? env_1.target.chrome.devtools.inspectedWindow.eval(src)
                        : eval(src);
                }
                (exports.sortByKey = sortByKey),
                    (exports.simpleGet = simpleGet),
                    (exports.focusInput = focusInput),
                    (exports.openInEditor = openInEditor);
                const ESC = { '<': '&lt;', '>': '&gt;', '"': '&quot;', '&': '&amp;' };
                function escape(e) {
                    return e.replace(/[<>"&]/g, escapeChar);
                }
                function escapeChar(e) {
                    return ESC[e] || e;
                }
                function copyToClipboard(e) {
                    let t;
                    if (
                        ((t = 'object' !== typeof e ? String(e) : stringify(e, 'user')),
                        'undefined' === typeof document)
                    )
                        return;
                    const n = document.createElement('textarea');
                    (n.textContent = t),
                        document.body.appendChild(n),
                        n.select(),
                        document.execCommand('copy'),
                        document.body.removeChild(n);
                }
                function isEmptyObject(e) {
                    return e === exports.UNDEFINED || !e || 0 === Object.keys(e).length;
                }
                (exports.escape = escape),
                    (exports.copyToClipboard = copyToClipboard),
                    (exports.isEmptyObject = isEmptyObject);
            },
            22699: (e) => {
                var t,
                    n = 'object' === typeof Reflect ? Reflect : null,
                    r =
                        n && 'function' === typeof n.apply
                            ? n.apply
                            : function (e, t, n) {
                                  return Function.prototype.apply.call(e, t, n);
                              };
                function o(e) {
                    console && console.warn && console.warn(e);
                }
                t =
                    n && 'function' === typeof n.ownKeys
                        ? n.ownKeys
                        : Object.getOwnPropertySymbols
                          ? function (e) {
                                return Object.getOwnPropertyNames(e).concat(
                                    Object.getOwnPropertySymbols(e)
                                );
                            }
                          : function (e) {
                                return Object.getOwnPropertyNames(e);
                            };
                var i =
                    Number.isNaN ||
                    function (e) {
                        return e !== e;
                    };
                function s() {
                    s.init.call(this);
                }
                (e.exports = s),
                    (e.exports.once = E),
                    (s.EventEmitter = s),
                    (s.prototype._events = void 0),
                    (s.prototype._eventsCount = 0),
                    (s.prototype._maxListeners = void 0);
                var a = 10;
                function c(e) {
                    if ('function' !== typeof e)
                        throw new TypeError(
                            'The "listener" argument must be of type Function. Received type ' +
                                typeof e
                        );
                }
                function l(e) {
                    return void 0 === e._maxListeners ? s.defaultMaxListeners : e._maxListeners;
                }
                function u(e, t, n, r) {
                    var i, s, a;
                    if (
                        (c(n),
                        (s = e._events),
                        void 0 === s
                            ? ((s = e._events = Object.create(null)), (e._eventsCount = 0))
                            : (void 0 !== s.newListener &&
                                  (e.emit('newListener', t, n.listener ? n.listener : n),
                                  (s = e._events)),
                              (a = s[t])),
                        void 0 === a)
                    )
                        (a = s[t] = n), ++e._eventsCount;
                    else if (
                        ('function' === typeof a
                            ? (a = s[t] = r ? [n, a] : [a, n])
                            : r
                              ? a.unshift(n)
                              : a.push(n),
                        (i = l(e)),
                        i > 0 && a.length > i && !a.warned)
                    ) {
                        a.warned = !0;
                        var u = new Error(
                            'Possible EventEmitter memory leak detected. ' +
                                a.length +
                                ' ' +
                                String(t) +
                                ' listeners added. Use emitter.setMaxListeners() to increase limit'
                        );
                        (u.name = 'MaxListenersExceededWarning'),
                            (u.emitter = e),
                            (u.type = t),
                            (u.count = a.length),
                            o(u);
                    }
                    return e;
                }
                function p() {
                    if (!this.fired)
                        return (
                            this.target.removeListener(this.type, this.wrapFn),
                            (this.fired = !0),
                            0 === arguments.length
                                ? this.listener.call(this.target)
                                : this.listener.apply(this.target, arguments)
                        );
                }
                function f(e, t, n) {
                    var r = { fired: !1, wrapFn: void 0, target: e, type: t, listener: n },
                        o = p.bind(r);
                    return (o.listener = n), (r.wrapFn = o), o;
                }
                function _(e, t, n) {
                    var r = e._events;
                    if (void 0 === r) return [];
                    var o = r[t];
                    return void 0 === o
                        ? []
                        : 'function' === typeof o
                          ? n
                              ? [o.listener || o]
                              : [o]
                          : n
                            ? m(o)
                            : h(o, o.length);
                }
                function d(e) {
                    var t = this._events;
                    if (void 0 !== t) {
                        var n = t[e];
                        if ('function' === typeof n) return 1;
                        if (void 0 !== n) return n.length;
                    }
                    return 0;
                }
                function h(e, t) {
                    for (var n = new Array(t), r = 0; r < t; ++r) n[r] = e[r];
                    return n;
                }
                function g(e, t) {
                    for (; t + 1 < e.length; t++) e[t] = e[t + 1];
                    e.pop();
                }
                function m(e) {
                    for (var t = new Array(e.length), n = 0; n < t.length; ++n)
                        t[n] = e[n].listener || e[n];
                    return t;
                }
                function E(e, t) {
                    return new Promise(function (n, r) {
                        function o(n) {
                            e.removeListener(t, i), r(n);
                        }
                        function i() {
                            'function' === typeof e.removeListener && e.removeListener('error', o),
                                n([].slice.call(arguments));
                        }
                        v(e, t, i, { once: !0 }), 'error' !== t && O(e, o, { once: !0 });
                    });
                }
                function O(e, t, n) {
                    'function' === typeof e.on && v(e, 'error', t, n);
                }
                function v(e, t, n, r) {
                    if ('function' === typeof e.on) r.once ? e.once(t, n) : e.on(t, n);
                    else {
                        if ('function' !== typeof e.addEventListener)
                            throw new TypeError(
                                'The "emitter" argument must be of type EventEmitter. Received type ' +
                                    typeof e
                            );
                        e.addEventListener(t, function o(i) {
                            r.once && e.removeEventListener(t, o), n(i);
                        });
                    }
                }
                Object.defineProperty(s, 'defaultMaxListeners', {
                    enumerable: !0,
                    get: function () {
                        return a;
                    },
                    set: function (e) {
                        if ('number' !== typeof e || e < 0 || i(e))
                            throw new RangeError(
                                'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
                                    e +
                                    '.'
                            );
                        a = e;
                    }
                }),
                    (s.init = function () {
                        (void 0 !== this._events &&
                            this._events !== Object.getPrototypeOf(this)._events) ||
                            ((this._events = Object.create(null)), (this._eventsCount = 0)),
                            (this._maxListeners = this._maxListeners || void 0);
                    }),
                    (s.prototype.setMaxListeners = function (e) {
                        if ('number' !== typeof e || e < 0 || i(e))
                            throw new RangeError(
                                'The value of "n" is out of range. It must be a non-negative number. Received ' +
                                    e +
                                    '.'
                            );
                        return (this._maxListeners = e), this;
                    }),
                    (s.prototype.getMaxListeners = function () {
                        return l(this);
                    }),
                    (s.prototype.emit = function (e) {
                        for (var t = [], n = 1; n < arguments.length; n++) t.push(arguments[n]);
                        var o = 'error' === e,
                            i = this._events;
                        if (void 0 !== i) o = o && void 0 === i.error;
                        else if (!o) return !1;
                        if (o) {
                            var s;
                            if ((t.length > 0 && (s = t[0]), s instanceof Error)) throw s;
                            var a = new Error(
                                'Unhandled error.' + (s ? ' (' + s.message + ')' : '')
                            );
                            throw ((a.context = s), a);
                        }
                        var c = i[e];
                        if (void 0 === c) return !1;
                        if ('function' === typeof c) r(c, this, t);
                        else {
                            var l = c.length,
                                u = h(c, l);
                            for (n = 0; n < l; ++n) r(u[n], this, t);
                        }
                        return !0;
                    }),
                    (s.prototype.addListener = function (e, t) {
                        return u(this, e, t, !1);
                    }),
                    (s.prototype.on = s.prototype.addListener),
                    (s.prototype.prependListener = function (e, t) {
                        return u(this, e, t, !0);
                    }),
                    (s.prototype.once = function (e, t) {
                        return c(t), this.on(e, f(this, e, t)), this;
                    }),
                    (s.prototype.prependOnceListener = function (e, t) {
                        return c(t), this.prependListener(e, f(this, e, t)), this;
                    }),
                    (s.prototype.removeListener = function (e, t) {
                        var n, r, o, i, s;
                        if ((c(t), (r = this._events), void 0 === r)) return this;
                        if (((n = r[e]), void 0 === n)) return this;
                        if (n === t || n.listener === t)
                            0 === --this._eventsCount
                                ? (this._events = Object.create(null))
                                : (delete r[e],
                                  r.removeListener &&
                                      this.emit('removeListener', e, n.listener || t));
                        else if ('function' !== typeof n) {
                            for (o = -1, i = n.length - 1; i >= 0; i--)
                                if (n[i] === t || n[i].listener === t) {
                                    (s = n[i].listener), (o = i);
                                    break;
                                }
                            if (o < 0) return this;
                            0 === o ? n.shift() : g(n, o),
                                1 === n.length && (r[e] = n[0]),
                                void 0 !== r.removeListener &&
                                    this.emit('removeListener', e, s || t);
                        }
                        return this;
                    }),
                    (s.prototype.off = s.prototype.removeListener),
                    (s.prototype.removeAllListeners = function (e) {
                        var t, n, r;
                        if (((n = this._events), void 0 === n)) return this;
                        if (void 0 === n.removeListener)
                            return (
                                0 === arguments.length
                                    ? ((this._events = Object.create(null)),
                                      (this._eventsCount = 0))
                                    : void 0 !== n[e] &&
                                      (0 === --this._eventsCount
                                          ? (this._events = Object.create(null))
                                          : delete n[e]),
                                this
                            );
                        if (0 === arguments.length) {
                            var o,
                                i = Object.keys(n);
                            for (r = 0; r < i.length; ++r)
                                (o = i[r]), 'removeListener' !== o && this.removeAllListeners(o);
                            return (
                                this.removeAllListeners('removeListener'),
                                (this._events = Object.create(null)),
                                (this._eventsCount = 0),
                                this
                            );
                        }
                        if (((t = n[e]), 'function' === typeof t)) this.removeListener(e, t);
                        else if (void 0 !== t)
                            for (r = t.length - 1; r >= 0; r--) this.removeListener(e, t[r]);
                        return this;
                    }),
                    (s.prototype.listeners = function (e) {
                        return _(this, e, !0);
                    }),
                    (s.prototype.rawListeners = function (e) {
                        return _(this, e, !1);
                    }),
                    (s.listenerCount = function (e, t) {
                        return 'function' === typeof e.listenerCount
                            ? e.listenerCount(t)
                            : d.call(e, t);
                    }),
                    (s.prototype.listenerCount = d),
                    (s.prototype.eventNames = function () {
                        return this._eventsCount > 0 ? t(this._events) : [];
                    });
            },
            21023: (e) => {
                function t(e) {
                    if ('string' !== typeof e)
                        throw new TypeError('Path must be a string. Received ' + JSON.stringify(e));
                }
                function n(e, t) {
                    for (var n, r = '', o = 0, i = -1, s = 0, a = 0; a <= e.length; ++a) {
                        if (a < e.length) n = e.charCodeAt(a);
                        else {
                            if (47 === n) break;
                            n = 47;
                        }
                        if (47 === n) {
                            if (i === a - 1 || 1 === s);
                            else if (i !== a - 1 && 2 === s) {
                                if (
                                    r.length < 2 ||
                                    2 !== o ||
                                    46 !== r.charCodeAt(r.length - 1) ||
                                    46 !== r.charCodeAt(r.length - 2)
                                )
                                    if (r.length > 2) {
                                        var c = r.lastIndexOf('/');
                                        if (c !== r.length - 1) {
                                            -1 === c
                                                ? ((r = ''), (o = 0))
                                                : ((r = r.slice(0, c)),
                                                  (o = r.length - 1 - r.lastIndexOf('/'))),
                                                (i = a),
                                                (s = 0);
                                            continue;
                                        }
                                    } else if (2 === r.length || 1 === r.length) {
                                        (r = ''), (o = 0), (i = a), (s = 0);
                                        continue;
                                    }
                                t && (r.length > 0 ? (r += '/..') : (r = '..'), (o = 2));
                            } else
                                r.length > 0
                                    ? (r += '/' + e.slice(i + 1, a))
                                    : (r = e.slice(i + 1, a)),
                                    (o = a - i - 1);
                            (i = a), (s = 0);
                        } else 46 === n && -1 !== s ? ++s : (s = -1);
                    }
                    return r;
                }
                function r(e, t) {
                    var n = t.dir || t.root,
                        r = t.base || (t.name || '') + (t.ext || '');
                    return n ? (n === t.root ? n + r : n + e + r) : r;
                }
                var o = {
                    resolve: function () {
                        for (var e, r = '', o = !1, i = arguments.length - 1; i >= -1 && !o; i--) {
                            var s;
                            i >= 0
                                ? (s = arguments[i])
                                : (void 0 === e && (e = process.cwd()), (s = e)),
                                t(s),
                                0 !== s.length && ((r = s + '/' + r), (o = 47 === s.charCodeAt(0)));
                        }
                        return (
                            (r = n(r, !o)),
                            o ? (r.length > 0 ? '/' + r : '/') : r.length > 0 ? r : '.'
                        );
                    },
                    normalize: function (e) {
                        if ((t(e), 0 === e.length)) return '.';
                        var r = 47 === e.charCodeAt(0),
                            o = 47 === e.charCodeAt(e.length - 1);
                        return (
                            (e = n(e, !r)),
                            0 !== e.length || r || (e = '.'),
                            e.length > 0 && o && (e += '/'),
                            r ? '/' + e : e
                        );
                    },
                    isAbsolute: function (e) {
                        return t(e), e.length > 0 && 47 === e.charCodeAt(0);
                    },
                    join: function () {
                        if (0 === arguments.length) return '.';
                        for (var e, n = 0; n < arguments.length; ++n) {
                            var r = arguments[n];
                            t(r), r.length > 0 && (void 0 === e ? (e = r) : (e += '/' + r));
                        }
                        return void 0 === e ? '.' : o.normalize(e);
                    },
                    relative: function (e, n) {
                        if ((t(e), t(n), e === n)) return '';
                        if (((e = o.resolve(e)), (n = o.resolve(n)), e === n)) return '';
                        for (var r = 1; r < e.length; ++r) if (47 !== e.charCodeAt(r)) break;
                        for (var i = e.length, s = i - r, a = 1; a < n.length; ++a)
                            if (47 !== n.charCodeAt(a)) break;
                        for (
                            var c = n.length, l = c - a, u = s < l ? s : l, p = -1, f = 0;
                            f <= u;
                            ++f
                        ) {
                            if (f === u) {
                                if (l > u) {
                                    if (47 === n.charCodeAt(a + f)) return n.slice(a + f + 1);
                                    if (0 === f) return n.slice(a + f);
                                } else
                                    s > u &&
                                        (47 === e.charCodeAt(r + f) ? (p = f) : 0 === f && (p = 0));
                                break;
                            }
                            var _ = e.charCodeAt(r + f),
                                d = n.charCodeAt(a + f);
                            if (_ !== d) break;
                            47 === _ && (p = f);
                        }
                        var h = '';
                        for (f = r + p + 1; f <= i; ++f)
                            (f !== i && 47 !== e.charCodeAt(f)) ||
                                (0 === h.length ? (h += '..') : (h += '/..'));
                        return h.length > 0
                            ? h + n.slice(a + p)
                            : ((a += p), 47 === n.charCodeAt(a) && ++a, n.slice(a));
                    },
                    _makeLong: function (e) {
                        return e;
                    },
                    dirname: function (e) {
                        if ((t(e), 0 === e.length)) return '.';
                        for (
                            var n = e.charCodeAt(0), r = 47 === n, o = -1, i = !0, s = e.length - 1;
                            s >= 1;
                            --s
                        )
                            if (((n = e.charCodeAt(s)), 47 === n)) {
                                if (!i) {
                                    o = s;
                                    break;
                                }
                            } else i = !1;
                        return -1 === o ? (r ? '/' : '.') : r && 1 === o ? '//' : e.slice(0, o);
                    },
                    basename: function (e, n) {
                        if (void 0 !== n && 'string' !== typeof n)
                            throw new TypeError('"ext" argument must be a string');
                        t(e);
                        var r,
                            o = 0,
                            i = -1,
                            s = !0;
                        if (void 0 !== n && n.length > 0 && n.length <= e.length) {
                            if (n.length === e.length && n === e) return '';
                            var a = n.length - 1,
                                c = -1;
                            for (r = e.length - 1; r >= 0; --r) {
                                var l = e.charCodeAt(r);
                                if (47 === l) {
                                    if (!s) {
                                        o = r + 1;
                                        break;
                                    }
                                } else
                                    -1 === c && ((s = !1), (c = r + 1)),
                                        a >= 0 &&
                                            (l === n.charCodeAt(a)
                                                ? -1 === --a && (i = r)
                                                : ((a = -1), (i = c)));
                            }
                            return o === i ? (i = c) : -1 === i && (i = e.length), e.slice(o, i);
                        }
                        for (r = e.length - 1; r >= 0; --r)
                            if (47 === e.charCodeAt(r)) {
                                if (!s) {
                                    o = r + 1;
                                    break;
                                }
                            } else -1 === i && ((s = !1), (i = r + 1));
                        return -1 === i ? '' : e.slice(o, i);
                    },
                    extname: function (e) {
                        t(e);
                        for (
                            var n = -1, r = 0, o = -1, i = !0, s = 0, a = e.length - 1;
                            a >= 0;
                            --a
                        ) {
                            var c = e.charCodeAt(a);
                            if (47 !== c)
                                -1 === o && ((i = !1), (o = a + 1)),
                                    46 === c
                                        ? -1 === n
                                            ? (n = a)
                                            : 1 !== s && (s = 1)
                                        : -1 !== n && (s = -1);
                            else if (!i) {
                                r = a + 1;
                                break;
                            }
                        }
                        return -1 === n ||
                            -1 === o ||
                            0 === s ||
                            (1 === s && n === o - 1 && n === r + 1)
                            ? ''
                            : e.slice(n, o);
                    },
                    format: function (e) {
                        if (null === e || 'object' !== typeof e)
                            throw new TypeError(
                                'The "pathObject" argument must be of type Object. Received type ' +
                                    typeof e
                            );
                        return r('/', e);
                    },
                    parse: function (e) {
                        t(e);
                        var n = { root: '', dir: '', base: '', ext: '', name: '' };
                        if (0 === e.length) return n;
                        var r,
                            o = e.charCodeAt(0),
                            i = 47 === o;
                        i ? ((n.root = '/'), (r = 1)) : (r = 0);
                        for (
                            var s = -1, a = 0, c = -1, l = !0, u = e.length - 1, p = 0;
                            u >= r;
                            --u
                        )
                            if (((o = e.charCodeAt(u)), 47 !== o))
                                -1 === c && ((l = !1), (c = u + 1)),
                                    46 === o
                                        ? -1 === s
                                            ? (s = u)
                                            : 1 !== p && (p = 1)
                                        : -1 !== s && (p = -1);
                            else if (!l) {
                                a = u + 1;
                                break;
                            }
                        return (
                            -1 === s ||
                            -1 === c ||
                            0 === p ||
                            (1 === p && s === c - 1 && s === a + 1)
                                ? -1 !== c &&
                                  (n.base = n.name = 0 === a && i ? e.slice(1, c) : e.slice(a, c))
                                : (0 === a && i
                                      ? ((n.name = e.slice(1, s)), (n.base = e.slice(1, c)))
                                      : ((n.name = e.slice(a, s)), (n.base = e.slice(a, c))),
                                  (n.ext = e.slice(s, c))),
                            a > 0 ? (n.dir = e.slice(0, a - 1)) : i && (n.dir = '/'),
                            n
                        );
                    },
                    sep: '/',
                    delimiter: ':',
                    win32: null,
                    posix: null
                };
                (o.posix = o), (e.exports = o);
            }
        },
        __webpack_module_cache__ = {};
    function __webpack_require__(e) {
        var t = __webpack_module_cache__[e];
        if (void 0 !== t) return t.exports;
        var n = (__webpack_module_cache__[e] = { exports: {} });
        return __webpack_modules__[e].call(n.exports, n, n.exports, __webpack_require__), n.exports;
    }
    (() => {
        __webpack_require__.n = (e) => {
            var t = e && e.__esModule ? () => e['default'] : () => e;
            return __webpack_require__.d(t, { a: t }), t;
        };
    })(),
        (() => {
            __webpack_require__.d = (e, t) => {
                for (var n in t)
                    __webpack_require__.o(t, n) &&
                        !__webpack_require__.o(e, n) &&
                        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
            };
        })(),
        (() => {
            __webpack_require__.g = (function () {
                if ('object' === typeof globalThis) return globalThis;
                try {
                    return this || new Function('return this')();
                } catch (e) {
                    if ('object' === typeof window) return window;
                }
            })();
        })(),
        (() => {
            __webpack_require__.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
        })();
    var __webpack_exports__ = {};
    (() => {
        var e = __webpack_require__(6793),
            t = __webpack_require__(27146);
        if (document instanceof HTMLDocument) {
            const n = ';(' + e.U.toString() + ')(window)';
            if (t.isFirefox) window.eval(n);
            else {
                const e = document.createElement('script');
                (e.textContent = n),
                    document.documentElement.appendChild(e),
                    e.parentNode.removeChild(e);
            }
        }
    })();
})();
