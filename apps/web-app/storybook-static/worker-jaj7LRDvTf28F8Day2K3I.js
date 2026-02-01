;(() => {
    'use strict'
    var e = [
            ,
            (e, t, r) => {
                r.r(t),
                    r.d(t, {
                        _private: () => a._private,
                        cacheNames: () => a.cacheNames,
                        clientsClaim: () => a.clientsClaim,
                        copyResponse: () => a.copyResponse,
                        registerQuotaErrorCallback: () =>
                            a.registerQuotaErrorCallback,
                        setCacheNameDetails: () => a.setCacheNameDetails,
                        skipWaiting: () => a.skipWaiting,
                    })
                var a = r(2)
            },
            (e, t, r) => {
                r.r(t),
                    r.d(t, {
                        _private: () => s,
                        cacheNames: () => n.cacheNames,
                        clientsClaim: () => i.clientsClaim,
                        copyResponse: () => o.copyResponse,
                        registerQuotaErrorCallback: () =>
                            a.registerQuotaErrorCallback,
                        setCacheNameDetails: () => c.setCacheNameDetails,
                        skipWaiting: () => u.skipWaiting,
                    })
                var a = r(3),
                    s = r(11),
                    n = r(23),
                    o = r(24),
                    i = r(25),
                    c = r(26),
                    u = r(27)
                r(5), r(28)
            },
            (e, t, r) => {
                r.r(t), r.d(t, { registerQuotaErrorCallback: () => s })
                r(4), r(6)
                var a = r(10)
                r(5)
                function s(e) {
                    a.quotaErrorCallbacks.add(e)
                }
            },
            (e, t, r) => {
                r.r(t), r.d(t, { logger: () => a })
                r(5)
                const a = null
            },
            () => {
                try {
                    self['workbox:core:7.2.0'] && _()
                } catch (e) {}
            },
            (e, t, r) => {
                r.r(t), r.d(t, { assert: () => a })
                r(7), r(5)
                const a = null
            },
            (e, t, r) => {
                r.r(t), r.d(t, { WorkboxError: () => s })
                var a = r(8)
                r(5)
                class s extends Error {
                    constructor(e, t) {
                        super((0, a.messageGenerator)(e, t)),
                            (this.name = e),
                            (this.details = t)
                    }
                }
            },
            (e, t, r) => {
                r.r(t), r.d(t, { messageGenerator: () => a })
                r(9), r(5)
                const a = (e, ...t) => {
                    let r = e
                    return t.length > 0 && (r += ` :: ${JSON.stringify(t)}`), r
                }
            },
            (e, t, r) => {
                r.r(t), r.d(t, { messages: () => a })
                r(5)
                const a = {
                    'invalid-value': ({
                        paramName: e,
                        validValueDescription: t,
                        value: r,
                    }) => {
                        if (!e || !t)
                            throw new Error(
                                "Unexpected input to 'invalid-value' error."
                            )
                        return `The '${e}' parameter was given a value with an unexpected value. ${t} Received a value of ${JSON.stringify(r)}.`
                    },
                    'not-an-array': ({
                        moduleName: e,
                        className: t,
                        funcName: r,
                        paramName: a,
                    }) => {
                        if (!(e && t && r && a))
                            throw new Error(
                                "Unexpected input to 'not-an-array' error."
                            )
                        return `The parameter '${a}' passed into '${e}.${t}.${r}()' must be an array.`
                    },
                    'incorrect-type': ({
                        expectedType: e,
                        paramName: t,
                        moduleName: r,
                        className: a,
                        funcName: s,
                    }) => {
                        if (!(e && t && r && s))
                            throw new Error(
                                "Unexpected input to 'incorrect-type' error."
                            )
                        return `The parameter '${t}' passed into '${r}.${a ? `${a}.` : ''}${s}()' must be of type ${e}.`
                    },
                    'incorrect-class': ({
                        expectedClassName: e,
                        paramName: t,
                        moduleName: r,
                        className: a,
                        funcName: s,
                        isReturnValueProblem: n,
                    }) => {
                        if (!e || !r || !s)
                            throw new Error(
                                "Unexpected input to 'incorrect-class' error."
                            )
                        const o = a ? `${a}.` : ''
                        return n
                            ? `The return value from '${r}.${o}${s}()' must be an instance of class ${e}.`
                            : `The parameter '${t}' passed into '${r}.${o}${s}()' must be an instance of class ${e}.`
                    },
                    'missing-a-method': ({
                        expectedMethod: e,
                        paramName: t,
                        moduleName: r,
                        className: a,
                        funcName: s,
                    }) => {
                        if (!(e && t && r && a && s))
                            throw new Error(
                                "Unexpected input to 'missing-a-method' error."
                            )
                        return `${r}.${a}.${s}() expected the '${t}' parameter to expose a '${e}' method.`
                    },
                    'add-to-cache-list-unexpected-type': ({ entry: e }) =>
                        `An unexpected entry was passed to 'workbox-precaching.PrecacheController.addToCacheList()' The entry '${JSON.stringify(e)}' isn't supported. You must supply an array of strings with one or more characters, objects with a url property or Request objects.`,
                    'add-to-cache-list-conflicting-entries': ({
                        firstEntry: e,
                        secondEntry: t,
                    }) => {
                        if (!e || !t)
                            throw new Error(
                                "Unexpected input to 'add-to-cache-list-duplicate-entries' error."
                            )
                        return `Two of the entries passed to 'workbox-precaching.PrecacheController.addToCacheList()' had the URL ${e} but different revision details. Workbox is unable to cache and version the asset correctly. Please remove one of the entries.`
                    },
                    'plugin-error-request-will-fetch': ({
                        thrownErrorMessage: e,
                    }) => {
                        if (!e)
                            throw new Error(
                                "Unexpected input to 'plugin-error-request-will-fetch', error."
                            )
                        return `An error was thrown by a plugins 'requestWillFetch()' method. The thrown error message was: '${e}'.`
                    },
                    'invalid-cache-name': ({ cacheNameId: e, value: t }) => {
                        if (!e)
                            throw new Error(
                                "Expected a 'cacheNameId' for error 'invalid-cache-name'"
                            )
                        return `You must provide a name containing at least one character for setCacheDetails({${e}: '...'}). Received a value of '${JSON.stringify(t)}'`
                    },
                    'unregister-route-but-not-found-with-method': ({
                        method: e,
                    }) => {
                        if (!e)
                            throw new Error(
                                "Unexpected input to 'unregister-route-but-not-found-with-method' error."
                            )
                        return `The route you're trying to unregister was not  previously registered for the method type '${e}'.`
                    },
                    'unregister-route-route-not-registered': () =>
                        "The route you're trying to unregister was not previously registered.",
                    'queue-replay-failed': ({ name: e }) =>
                        `Replaying the background sync queue '${e}' failed.`,
                    'duplicate-queue-name': ({ name: e }) =>
                        `The Queue name '${e}' is already being used. All instances of backgroundSync.Queue must be given unique names.`,
                    'expired-test-without-max-age': ({
                        methodName: e,
                        paramName: t,
                    }) =>
                        `The '${e}()' method can only be used when the '${t}' is used in the constructor.`,
                    'unsupported-route-type': ({
                        moduleName: e,
                        className: t,
                        funcName: r,
                        paramName: a,
                    }) =>
                        `The supplied '${a}' parameter was an unsupported type. Please check the docs for ${e}.${t}.${r} for valid input types.`,
                    'not-array-of-class': ({
                        value: e,
                        expectedClass: t,
                        moduleName: r,
                        className: a,
                        funcName: s,
                        paramName: n,
                    }) =>
                        `The supplied '${n}' parameter must be an array of '${t}' objects. Received '${JSON.stringify(e)},'. Please check the call to ${r}.${a}.${s}() to fix the issue.`,
                    'max-entries-or-age-required': ({
                        moduleName: e,
                        className: t,
                        funcName: r,
                    }) =>
                        `You must define either config.maxEntries or config.maxAgeSecondsin ${e}.${t}.${r}`,
                    'statuses-or-headers-required': ({
                        moduleName: e,
                        className: t,
                        funcName: r,
                    }) =>
                        `You must define either config.statuses or config.headersin ${e}.${t}.${r}`,
                    'invalid-string': ({
                        moduleName: e,
                        funcName: t,
                        paramName: r,
                    }) => {
                        if (!r || !e || !t)
                            throw new Error(
                                "Unexpected input to 'invalid-string' error."
                            )
                        return `When using strings, the '${r}' parameter must start with 'http' (for cross-origin matches) or '/' (for same-origin matches). Please see the docs for ${e}.${t}() for more info.`
                    },
                    'channel-name-required': () =>
                        'You must provide a channelName to construct a BroadcastCacheUpdate instance.',
                    'invalid-responses-are-same-args': () =>
                        'The arguments passed into responsesAreSame() appear to be invalid. Please ensure valid Responses are used.',
                    'expire-custom-caches-only': () =>
                        "You must provide a 'cacheName' property when using the expiration plugin with a runtime caching strategy.",
                    'unit-must-be-bytes': ({ normalizedRangeHeader: e }) => {
                        if (!e)
                            throw new Error(
                                "Unexpected input to 'unit-must-be-bytes' error."
                            )
                        return `The 'unit' portion of the Range header must be set to 'bytes'. The Range header provided was "${e}"`
                    },
                    'single-range-only': ({ normalizedRangeHeader: e }) => {
                        if (!e)
                            throw new Error(
                                "Unexpected input to 'single-range-only' error."
                            )
                        return `Multiple ranges are not supported. Please use a  single start value, and optional end value. The Range header provided was "${e}"`
                    },
                    'invalid-range-values': ({ normalizedRangeHeader: e }) => {
                        if (!e)
                            throw new Error(
                                "Unexpected input to 'invalid-range-values' error."
                            )
                        return `The Range header is missing both start and end values. At least one of those values is needed. The Range header provided was "${e}"`
                    },
                    'no-range-header': () =>
                        'No Range header was found in the Request provided.',
                    'range-not-satisfiable': ({ size: e, start: t, end: r }) =>
                        `The start (${t}) and end (${r}) values in the Range are not satisfiable by the cached response, which is ${e} bytes.`,
                    'attempt-to-cache-non-get-request': ({
                        url: e,
                        method: t,
                    }) =>
                        `Unable to cache '${e}' because it is a '${t}' request and only 'GET' requests can be cached.`,
                    'cache-put-with-no-response': ({ url: e }) =>
                        `There was an attempt to cache '${e}' but the response was not defined.`,
                    'no-response': ({ url: e, error: t }) => {
                        let r = `The strategy could not generate a response for '${e}'.`
                        return t && (r += ` The underlying error is ${t}.`), r
                    },
                    'bad-precaching-response': ({ url: e, status: t }) =>
                        `The precaching request for '${e}' failed` +
                        (t ? ` with an HTTP status of ${t}.` : '.'),
                    'non-precached-url': ({ url: e }) =>
                        `createHandlerBoundToURL('${e}') was called, but that URL is not precached. Please pass in a URL that is precached instead.`,
                    'add-to-cache-list-conflicting-integrities': ({ url: e }) =>
                        `Two of the entries passed to 'workbox-precaching.PrecacheController.addToCacheList()' had the URL ${e} with different integrity values. Please remove one of them.`,
                    'missing-precache-entry': ({ cacheName: e, url: t }) =>
                        `Unable to find a precached response in ${e} for ${t}.`,
                    'cross-origin-copy-response': ({ origin: e }) =>
                        `workbox-core.copyResponse() can only be used with same-origin responses. It was passed a response with origin ${e}.`,
                    'opaque-streams-source': ({ type: e }) => {
                        const t = `One of the workbox-streams sources resulted in an '${e}' response.`
                        return 'opaqueredirect' === e
                            ? `${t} Please do not use a navigation request that results in a redirect as a source.`
                            : `${t} Please ensure your sources are CORS-enabled.`
                    },
                }
            },
            (e, t, r) => {
                r.r(t), r.d(t, { quotaErrorCallbacks: () => a })
                r(5)
                const a = new Set()
            },
            (e, t, r) => {
                r.r(t),
                    r.d(t, {
                        Deferred: () => u.Deferred,
                        WorkboxError: () => g.WorkboxError,
                        assert: () => a.assert,
                        cacheMatchIgnoreParams: () => n.cacheMatchIgnoreParams,
                        cacheNames: () => s.cacheNames,
                        canConstructReadableStream: () =>
                            o.canConstructReadableStream,
                        canConstructResponseFromBodyStream: () =>
                            i.canConstructResponseFromBodyStream,
                        dontWaitFor: () => c.dontWaitFor,
                        executeQuotaErrorCallbacks: () =>
                            l.executeQuotaErrorCallbacks,
                        getFriendlyURL: () => h.getFriendlyURL,
                        logger: () => d.logger,
                        resultingClientExists: () => p.resultingClientExists,
                        timeout: () => m.timeout,
                        waitUntil: () => f.waitUntil,
                    })
                var a = r(6),
                    s = r(12),
                    n = r(13),
                    o = r(14),
                    i = r(15),
                    c = r(16),
                    u = r(17),
                    l = r(18),
                    h = r(19),
                    d = r(4),
                    p = r(20),
                    m = r(21),
                    f = r(22),
                    g = r(7)
                r(5)
            },
            (e, t, r) => {
                r.r(t), r.d(t, { cacheNames: () => n })
                r(5)
                const a = {
                        googleAnalytics: 'googleAnalytics',
                        precache: 'precache-v2',
                        prefix: 'workbox',
                        runtime: 'runtime',
                        suffix:
                            'undefined' != typeof registration
                                ? registration.scope
                                : '',
                    },
                    s = (e) =>
                        [a.prefix, e, a.suffix]
                            .filter((e) => e && e.length > 0)
                            .join('-'),
                    n = {
                        updateDetails: (e) => {
                            ;((e) => {
                                for (const t of Object.keys(a)) e(t)
                            })((t) => {
                                'string' == typeof e[t] && (a[t] = e[t])
                            })
                        },
                        getGoogleAnalyticsName: (e) =>
                            e || s(a.googleAnalytics),
                        getPrecacheName: (e) => e || s(a.precache),
                        getPrefix: () => a.prefix,
                        getRuntimeName: (e) => e || s(a.runtime),
                        getSuffix: () => a.suffix,
                    }
            },
            (e, t, r) => {
                r.r(t), r.d(t, { cacheMatchIgnoreParams: () => s })
                r(5)
                function a(e, t) {
                    const r = new URL(e)
                    for (const e of t) r.searchParams.delete(e)
                    return r.href
                }
                async function s(e, t, r, s) {
                    const n = a(t.url, r)
                    if (t.url === n) return e.match(t, s)
                    const o = Object.assign(Object.assign({}, s), {
                            ignoreSearch: !0,
                        }),
                        i = await e.keys(t, o)
                    for (const t of i) {
                        if (n === a(t.url, r)) return e.match(t, s)
                    }
                }
            },
            (e, t, r) => {
                r.r(t), r.d(t, { canConstructReadableStream: () => s })
                r(5)
                let a
                function s() {
                    if (void 0 === a)
                        try {
                            new ReadableStream({ start() {} }), (a = !0)
                        } catch (e) {
                            a = !1
                        }
                    return a
                }
            },
            (e, t, r) => {
                r.r(t), r.d(t, { canConstructResponseFromBodyStream: () => s })
                r(5)
                let a
                function s() {
                    if (void 0 === a) {
                        const e = new Response('')
                        if ('body' in e)
                            try {
                                new Response(e.body), (a = !0)
                            } catch (e) {
                                a = !1
                            }
                        a = !1
                    }
                    return a
                }
            },
            (e, t, r) => {
                r.r(t), r.d(t, { dontWaitFor: () => a })
                r(5)
                function a(e) {
                    e.then(() => {})
                }
            },
            (e, t, r) => {
                r.r(t), r.d(t, { Deferred: () => a })
                r(5)
                class a {
                    constructor() {
                        this.promise = new Promise((e, t) => {
                            ;(this.resolve = e), (this.reject = t)
                        })
                    }
                }
            },
            (e, t, r) => {
                r.r(t), r.d(t, { executeQuotaErrorCallbacks: () => s })
                r(4)
                var a = r(10)
                r(5)
                async function s() {
                    for (const e of a.quotaErrorCallbacks) await e()
                }
            },
            (e, t, r) => {
                r.r(t), r.d(t, { getFriendlyURL: () => a })
                r(5)
                const a = (e) =>
                    new URL(String(e), location.href).href.replace(
                        new RegExp(`^${location.origin}`),
                        ''
                    )
            },
            (e, t, r) => {
                r.r(t), r.d(t, { resultingClientExists: () => n })
                var a = r(21)
                r(5)
                const s = 2e3
                async function n(e) {
                    if (!e) return
                    let t = await self.clients.matchAll({ type: 'window' })
                    const r = new Set(t.map((e) => e.id))
                    let n
                    const o = performance.now()
                    for (
                        ;
                        performance.now() - o < s &&
                        ((t = await self.clients.matchAll({ type: 'window' })),
                        (n = t.find((t) => (e ? t.id === e : !r.has(t.id)))),
                        !n);

                    )
                        await (0, a.timeout)(100)
                    return n
                }
            },
            (e, t, r) => {
                r.r(t), r.d(t, { timeout: () => a })
                r(5)
                function a(e) {
                    return new Promise((t) => setTimeout(t, e))
                }
            },
            (e, t, r) => {
                r.r(t), r.d(t, { waitUntil: () => a })
                r(5)
                function a(e, t) {
                    const r = t()
                    return e.waitUntil(r), r
                }
            },
            (e, t, r) => {
                r.r(t), r.d(t, { cacheNames: () => s })
                var a = r(12)
                r(5)
                const s = {
                    get googleAnalytics() {
                        return a.cacheNames.getGoogleAnalyticsName()
                    },
                    get precache() {
                        return a.cacheNames.getPrecacheName()
                    },
                    get prefix() {
                        return a.cacheNames.getPrefix()
                    },
                    get runtime() {
                        return a.cacheNames.getRuntimeName()
                    },
                    get suffix() {
                        return a.cacheNames.getSuffix()
                    },
                }
            },
            (e, t, r) => {
                r.r(t), r.d(t, { copyResponse: () => n })
                var a = r(15),
                    s = r(7)
                r(5)
                async function n(e, t) {
                    let r = null
                    if (e.url) {
                        r = new URL(e.url).origin
                    }
                    if (r !== self.location.origin)
                        throw new s.WorkboxError('cross-origin-copy-response', {
                            origin: r,
                        })
                    const n = e.clone(),
                        o = {
                            headers: new Headers(n.headers),
                            status: n.status,
                            statusText: n.statusText,
                        },
                        i = t ? t(o) : o,
                        c = (0, a.canConstructResponseFromBodyStream)()
                            ? n.body
                            : await n.blob()
                    return new Response(c, i)
                }
            },
            (e, t, r) => {
                r.r(t), r.d(t, { clientsClaim: () => a })
                r(5)
                function a() {
                    self.addEventListener('activate', () =>
                        self.clients.claim()
                    )
                }
            },
            (e, t, r) => {
                r.r(t), r.d(t, { setCacheNameDetails: () => s })
                r(6)
                var a = r(12)
                r(7), r(5)
                function s(e) {
                    a.cacheNames.updateDetails(e)
                }
            },
            (e, t, r) => {
                r.r(t), r.d(t, { skipWaiting: () => a })
                r(4), r(5)
                function a() {
                    self.skipWaiting()
                }
            },
            (e, t, r) => {
                r.r(t)
                r(5)
            },
            (e, t, r) => {
                r.r(t),
                    r.d(t, {
                        NavigationRoute: () => a.NavigationRoute,
                        RegExpRoute: () => a.RegExpRoute,
                        Route: () => a.Route,
                        Router: () => a.Router,
                        registerRoute: () => a.registerRoute,
                        setCatchHandler: () => a.setCatchHandler,
                        setDefaultHandler: () => a.setDefaultHandler,
                    })
                var a = r(30)
            },
            (e, t, r) => {
                r.r(t),
                    r.d(t, {
                        NavigationRoute: () => a.NavigationRoute,
                        RegExpRoute: () => s.RegExpRoute,
                        Route: () => o.Route,
                        Router: () => i.Router,
                        registerRoute: () => n.registerRoute,
                        setCatchHandler: () => c.setCatchHandler,
                        setDefaultHandler: () => u.setDefaultHandler,
                    })
                var a = r(31),
                    s = r(36),
                    n = r(37),
                    o = r(32),
                    i = r(39),
                    c = r(40),
                    u = r(41)
                r(34)
            },
            (e, t, r) => {
                r.r(t), r.d(t, { NavigationRoute: () => s })
                r(6), r(4)
                var a = r(32)
                r(34)
                class s extends a.Route {
                    constructor(
                        e,
                        { allowlist: t = [/./], denylist: r = [] } = {}
                    ) {
                        super((e) => this._match(e), e),
                            (this._allowlist = t),
                            (this._denylist = r)
                    }
                    _match({ url: e, request: t }) {
                        if (t && 'navigate' !== t.mode) return !1
                        const r = e.pathname + e.search
                        for (const e of this._denylist) if (e.test(r)) return !1
                        return !!this._allowlist.some((e) => e.test(r))
                    }
                }
            },
            (e, t, r) => {
                r.r(t), r.d(t, { Route: () => n })
                r(6)
                var a = r(33),
                    s = r(35)
                r(34)
                class n {
                    constructor(e, t, r = a.defaultMethod) {
                        ;(this.handler = (0, s.normalizeHandler)(t)),
                            (this.match = e),
                            (this.method = r)
                    }
                    setCatchHandler(e) {
                        this.catchHandler = (0, s.normalizeHandler)(e)
                    }
                }
            },
            (e, t, r) => {
                r.r(t),
                    r.d(t, { defaultMethod: () => a, validMethods: () => s })
                r(34)
                const a = 'GET',
                    s = ['DELETE', 'GET', 'HEAD', 'PATCH', 'POST', 'PUT']
            },
            () => {
                try {
                    self['workbox:routing:7.2.0'] && _()
                } catch (e) {}
            },
            (e, t, r) => {
                r.r(t), r.d(t, { normalizeHandler: () => a })
                r(6), r(34)
                const a = (e) => (e && 'object' == typeof e ? e : { handle: e })
            },
            (e, t, r) => {
                r.r(t), r.d(t, { RegExpRoute: () => s })
                r(6), r(4)
                var a = r(32)
                r(34)
                class s extends a.Route {
                    constructor(e, t, r) {
                        super(
                            ({ url: t }) => {
                                const r = e.exec(t.href)
                                if (
                                    r &&
                                    (t.origin === location.origin ||
                                        0 === r.index)
                                )
                                    return r.slice(1)
                            },
                            t,
                            r
                        )
                    }
                }
            },
            (e, t, r) => {
                r.r(t), r.d(t, { registerRoute: () => i })
                r(4)
                var a = r(7),
                    s = r(32),
                    n = r(36),
                    o = r(38)
                r(34)
                function i(e, t, r) {
                    let i
                    if ('string' == typeof e) {
                        const a = new URL(e, location.href)
                        0
                        const n = ({ url: e }) => e.href === a.href
                        i = new s.Route(n, t, r)
                    } else if (e instanceof RegExp)
                        i = new n.RegExpRoute(e, t, r)
                    else if ('function' == typeof e) i = new s.Route(e, t, r)
                    else {
                        if (!(e instanceof s.Route))
                            throw new a.WorkboxError('unsupported-route-type', {
                                moduleName: 'workbox-routing',
                                funcName: 'registerRoute',
                                paramName: 'capture',
                            })
                        i = e
                    }
                    return (0, o.getOrCreateDefaultRouter)().registerRoute(i), i
                }
            },
            (e, t, r) => {
                r.r(t), r.d(t, { getOrCreateDefaultRouter: () => n })
                var a = r(39)
                r(34)
                let s
                const n = () => (
                    s ||
                        ((s = new a.Router()),
                        s.addFetchListener(),
                        s.addCacheListener()),
                    s
                )
            },
            (e, t, r) => {
                r.r(t), r.d(t, { Router: () => o })
                r(6), r(19)
                var a = r(33),
                    s = (r(4), r(35)),
                    n = r(7)
                r(34)
                class o {
                    constructor() {
                        ;(this._routes = new Map()),
                            (this._defaultHandlerMap = new Map())
                    }
                    get routes() {
                        return this._routes
                    }
                    addFetchListener() {
                        self.addEventListener('fetch', (e) => {
                            const { request: t } = e,
                                r = this.handleRequest({ request: t, event: e })
                            r && e.respondWith(r)
                        })
                    }
                    addCacheListener() {
                        self.addEventListener('message', (e) => {
                            if (e.data && 'CACHE_URLS' === e.data.type) {
                                const { payload: t } = e.data
                                0
                                const r = Promise.all(
                                    t.urlsToCache.map((t) => {
                                        'string' == typeof t && (t = [t])
                                        const r = new Request(...t)
                                        return this.handleRequest({
                                            request: r,
                                            event: e,
                                        })
                                    })
                                )
                                e.waitUntil(r),
                                    e.ports &&
                                        e.ports[0] &&
                                        r.then(() => e.ports[0].postMessage(!0))
                            }
                        })
                    }
                    handleRequest({ request: e, event: t }) {
                        const r = new URL(e.url, location.href)
                        if (!r.protocol.startsWith('http')) return void 0
                        const a = r.origin === location.origin,
                            { params: s, route: n } = this.findMatchingRoute({
                                event: t,
                                request: e,
                                sameOrigin: a,
                                url: r,
                            })
                        let o = n && n.handler
                        const i = e.method
                        if (
                            (!o &&
                                this._defaultHandlerMap.has(i) &&
                                (o = this._defaultHandlerMap.get(i)),
                            !o)
                        )
                            return void 0
                        let c
                        try {
                            c = o.handle({
                                url: r,
                                request: e,
                                event: t,
                                params: s,
                            })
                        } catch (e) {
                            c = Promise.reject(e)
                        }
                        const u = n && n.catchHandler
                        return (
                            c instanceof Promise &&
                                (this._catchHandler || u) &&
                                (c = c.catch(async (a) => {
                                    if (u) {
                                        0
                                        try {
                                            return await u.handle({
                                                url: r,
                                                request: e,
                                                event: t,
                                                params: s,
                                            })
                                        } catch (e) {
                                            e instanceof Error && (a = e)
                                        }
                                    }
                                    if (this._catchHandler)
                                        return this._catchHandler.handle({
                                            url: r,
                                            request: e,
                                            event: t,
                                        })
                                    throw a
                                })),
                            c
                        )
                    }
                    findMatchingRoute({
                        url: e,
                        sameOrigin: t,
                        request: r,
                        event: a,
                    }) {
                        const s = this._routes.get(r.method) || []
                        for (const n of s) {
                            let s
                            const o = n.match({
                                url: e,
                                sameOrigin: t,
                                request: r,
                                event: a,
                            })
                            if (o)
                                return (
                                    (s = o),
                                    ((Array.isArray(s) && 0 === s.length) ||
                                        (o.constructor === Object &&
                                            0 === Object.keys(o).length) ||
                                        'boolean' == typeof o) &&
                                        (s = void 0),
                                    { route: n, params: s }
                                )
                        }
                        return {}
                    }
                    setDefaultHandler(e, t = a.defaultMethod) {
                        this._defaultHandlerMap.set(
                            t,
                            (0, s.normalizeHandler)(e)
                        )
                    }
                    setCatchHandler(e) {
                        this._catchHandler = (0, s.normalizeHandler)(e)
                    }
                    registerRoute(e) {
                        this._routes.has(e.method) ||
                            this._routes.set(e.method, []),
                            this._routes.get(e.method).push(e)
                    }
                    unregisterRoute(e) {
                        if (!this._routes.has(e.method))
                            throw new n.WorkboxError(
                                'unregister-route-but-not-found-with-method',
                                { method: e.method }
                            )
                        const t = this._routes.get(e.method).indexOf(e)
                        if (!(t > -1))
                            throw new n.WorkboxError(
                                'unregister-route-route-not-registered'
                            )
                        this._routes.get(e.method).splice(t, 1)
                    }
                }
            },
            (e, t, r) => {
                r.r(t), r.d(t, { setCatchHandler: () => s })
                var a = r(38)
                r(34)
                function s(e) {
                    ;(0, a.getOrCreateDefaultRouter)().setCatchHandler(e)
                }
            },
            (e, t, r) => {
                r.r(t), r.d(t, { setDefaultHandler: () => s })
                var a = r(38)
                r(34)
                function s(e) {
                    ;(0, a.getOrCreateDefaultRouter)().setDefaultHandler(e)
                }
            },
            (e, t, r) => {
                r.r(t),
                    r.d(t, {
                        CacheFirst: () => a.CacheFirst,
                        CacheOnly: () => a.CacheOnly,
                        NetworkFirst: () => a.NetworkFirst,
                        NetworkOnly: () => a.NetworkOnly,
                        StaleWhileRevalidate: () => a.StaleWhileRevalidate,
                        Strategy: () => a.Strategy,
                        StrategyHandler: () => a.StrategyHandler,
                    })
                var a = r(43)
            },
            (e, t, r) => {
                r.r(t),
                    r.d(t, {
                        CacheFirst: () => a.CacheFirst,
                        CacheOnly: () => s.CacheOnly,
                        NetworkFirst: () => n.NetworkFirst,
                        NetworkOnly: () => o.NetworkOnly,
                        StaleWhileRevalidate: () => i.StaleWhileRevalidate,
                        Strategy: () => c.Strategy,
                        StrategyHandler: () => u.StrategyHandler,
                    })
                var a = r(44),
                    s = r(49),
                    n = r(50),
                    o = r(52),
                    i = r(53),
                    c = r(45),
                    u = r(46)
                r(47)
            },
            (e, t, r) => {
                r.r(t), r.d(t, { CacheFirst: () => n })
                r(6), r(4)
                var a = r(7),
                    s = r(45)
                r(48), r(47)
                class n extends s.Strategy {
                    async _handle(e, t) {
                        let r,
                            s = await t.cacheMatch(e)
                        if (s) 0
                        else {
                            0
                            try {
                                s = await t.fetchAndCachePut(e)
                            } catch (e) {
                                e instanceof Error && (r = e)
                            }
                            0
                        }
                        if (!s)
                            throw new a.WorkboxError('no-response', {
                                url: e.url,
                                error: r,
                            })
                        return s
                    }
                }
            },
            (e, t, r) => {
                r.r(t), r.d(t, { Strategy: () => o })
                var a = r(12),
                    s = r(7),
                    n = (r(4), r(19), r(46))
                r(47)
                class o {
                    constructor(e = {}) {
                        ;(this.cacheName = a.cacheNames.getRuntimeName(
                            e.cacheName
                        )),
                            (this.plugins = e.plugins || []),
                            (this.fetchOptions = e.fetchOptions),
                            (this.matchOptions = e.matchOptions)
                    }
                    handle(e) {
                        const [t] = this.handleAll(e)
                        return t
                    }
                    handleAll(e) {
                        e instanceof FetchEvent &&
                            (e = { event: e, request: e.request })
                        const t = e.event,
                            r =
                                'string' == typeof e.request
                                    ? new Request(e.request)
                                    : e.request,
                            a = 'params' in e ? e.params : void 0,
                            s = new n.StrategyHandler(this, {
                                event: t,
                                request: r,
                                params: a,
                            }),
                            o = this._getResponse(s, r, t)
                        return [o, this._awaitComplete(o, s, r, t)]
                    }
                    async _getResponse(e, t, r) {
                        let a
                        await e.runCallbacks('handlerWillStart', {
                            event: r,
                            request: t,
                        })
                        try {
                            if (
                                ((a = await this._handle(t, e)),
                                !a || 'error' === a.type)
                            )
                                throw new s.WorkboxError('no-response', {
                                    url: t.url,
                                })
                        } catch (s) {
                            if (s instanceof Error)
                                for (const n of e.iterateCallbacks(
                                    'handlerDidError'
                                ))
                                    if (
                                        ((a = await n({
                                            error: s,
                                            event: r,
                                            request: t,
                                        })),
                                        a)
                                    )
                                        break
                            if (!a) throw s
                        }
                        for (const s of e.iterateCallbacks(
                            'handlerWillRespond'
                        ))
                            a = await s({ event: r, request: t, response: a })
                        return a
                    }
                    async _awaitComplete(e, t, r, a) {
                        let s, n
                        try {
                            s = await e
                        } catch (n) {}
                        try {
                            await t.runCallbacks('handlerDidRespond', {
                                event: a,
                                request: r,
                                response: s,
                            }),
                                await t.doneWaiting()
                        } catch (e) {
                            e instanceof Error && (n = e)
                        }
                        if (
                            (await t.runCallbacks('handlerDidComplete', {
                                event: a,
                                request: r,
                                response: s,
                                error: n,
                            }),
                            t.destroy(),
                            n)
                        )
                            throw n
                    }
                }
            },
            (e, t, r) => {
                r.r(t), r.d(t, { StrategyHandler: () => l })
                r(6)
                var a = r(13),
                    s = r(17),
                    n = r(18),
                    o = r(19),
                    i = (r(4), r(21)),
                    c = r(7)
                r(47)
                function u(e) {
                    return 'string' == typeof e ? new Request(e) : e
                }
                class l {
                    constructor(e, t) {
                        ;(this._cacheKeys = {}),
                            Object.assign(this, t),
                            (this.event = t.event),
                            (this._strategy = e),
                            (this._handlerDeferred = new s.Deferred()),
                            (this._extendLifetimePromises = []),
                            (this._plugins = [...e.plugins]),
                            (this._pluginStateMap = new Map())
                        for (const e of this._plugins)
                            this._pluginStateMap.set(e, {})
                        this.event.waitUntil(this._handlerDeferred.promise)
                    }
                    async fetch(e) {
                        const { event: t } = this
                        let r = u(e)
                        if (
                            'navigate' === r.mode &&
                            t instanceof FetchEvent &&
                            t.preloadResponse
                        ) {
                            const e = await t.preloadResponse
                            if (e) return e
                        }
                        const a = this.hasCallback('fetchDidFail')
                            ? r.clone()
                            : null
                        try {
                            for (const e of this.iterateCallbacks(
                                'requestWillFetch'
                            ))
                                r = await e({ request: r.clone(), event: t })
                        } catch (e) {
                            if (e instanceof Error)
                                throw new c.WorkboxError(
                                    'plugin-error-request-will-fetch',
                                    { thrownErrorMessage: e.message }
                                )
                        }
                        const s = r.clone()
                        try {
                            let e
                            e = await fetch(
                                r,
                                'navigate' === r.mode
                                    ? void 0
                                    : this._strategy.fetchOptions
                            )
                            for (const r of this.iterateCallbacks(
                                'fetchDidSucceed'
                            ))
                                e = await r({
                                    event: t,
                                    request: s,
                                    response: e,
                                })
                            return e
                        } catch (e) {
                            throw (
                                (a &&
                                    (await this.runCallbacks('fetchDidFail', {
                                        error: e,
                                        event: t,
                                        originalRequest: a.clone(),
                                        request: s.clone(),
                                    })),
                                e)
                            )
                        }
                    }
                    async fetchAndCachePut(e) {
                        const t = await this.fetch(e),
                            r = t.clone()
                        return this.waitUntil(this.cachePut(e, r)), t
                    }
                    async cacheMatch(e) {
                        const t = u(e)
                        let r
                        const { cacheName: a, matchOptions: s } =
                                this._strategy,
                            n = await this.getCacheKey(t, 'read'),
                            o = Object.assign(Object.assign({}, s), {
                                cacheName: a,
                            })
                        r = await caches.match(n, o)
                        for (const e of this.iterateCallbacks(
                            'cachedResponseWillBeUsed'
                        ))
                            r =
                                (await e({
                                    cacheName: a,
                                    matchOptions: s,
                                    cachedResponse: r,
                                    request: n,
                                    event: this.event,
                                })) || void 0
                        return r
                    }
                    async cachePut(e, t) {
                        const r = u(e)
                        await (0, i.timeout)(0)
                        const s = await this.getCacheKey(r, 'write')
                        if (!t)
                            throw new c.WorkboxError(
                                'cache-put-with-no-response',
                                { url: (0, o.getFriendlyURL)(s.url) }
                            )
                        const l = await this._ensureResponseSafeToCache(t)
                        if (!l) return !1
                        const { cacheName: h, matchOptions: d } =
                                this._strategy,
                            p = await self.caches.open(h),
                            m = this.hasCallback('cacheDidUpdate'),
                            f = m
                                ? await (0, a.cacheMatchIgnoreParams)(
                                      p,
                                      s.clone(),
                                      ['__WB_REVISION__'],
                                      d
                                  )
                                : null
                        try {
                            await p.put(s, m ? l.clone() : l)
                        } catch (e) {
                            if (e instanceof Error)
                                throw (
                                    ('QuotaExceededError' === e.name &&
                                        (await (0,
                                        n.executeQuotaErrorCallbacks)()),
                                    e)
                                )
                        }
                        for (const e of this.iterateCallbacks('cacheDidUpdate'))
                            await e({
                                cacheName: h,
                                oldResponse: f,
                                newResponse: l.clone(),
                                request: s,
                                event: this.event,
                            })
                        return !0
                    }
                    async getCacheKey(e, t) {
                        const r = `${e.url} | ${t}`
                        if (!this._cacheKeys[r]) {
                            let a = e
                            for (const e of this.iterateCallbacks(
                                'cacheKeyWillBeUsed'
                            ))
                                a = u(
                                    await e({
                                        mode: t,
                                        request: a,
                                        event: this.event,
                                        params: this.params,
                                    })
                                )
                            this._cacheKeys[r] = a
                        }
                        return this._cacheKeys[r]
                    }
                    hasCallback(e) {
                        for (const t of this._strategy.plugins)
                            if (e in t) return !0
                        return !1
                    }
                    async runCallbacks(e, t) {
                        for (const r of this.iterateCallbacks(e)) await r(t)
                    }
                    *iterateCallbacks(e) {
                        for (const t of this._strategy.plugins)
                            if ('function' == typeof t[e]) {
                                const r = this._pluginStateMap.get(t),
                                    a = (a) => {
                                        const s = Object.assign(
                                            Object.assign({}, a),
                                            { state: r }
                                        )
                                        return t[e](s)
                                    }
                                yield a
                            }
                    }
                    waitUntil(e) {
                        return this._extendLifetimePromises.push(e), e
                    }
                    async doneWaiting() {
                        let e
                        for (; (e = this._extendLifetimePromises.shift()); )
                            await e
                    }
                    destroy() {
                        this._handlerDeferred.resolve(null)
                    }
                    async _ensureResponseSafeToCache(e) {
                        let t = e,
                            r = !1
                        for (const e of this.iterateCallbacks(
                            'cacheWillUpdate'
                        ))
                            if (
                                ((t =
                                    (await e({
                                        request: this.request,
                                        response: t,
                                        event: this.event,
                                    })) || void 0),
                                (r = !0),
                                !t)
                            )
                                break
                        return r || (t && 200 !== t.status && (t = void 0)), t
                    }
                }
            },
            () => {
                try {
                    self['workbox:strategies:7.2.0'] && _()
                } catch (e) {}
            },
            (e, t, r) => {
                r.r(t), r.d(t, { messages: () => n })
                var a = r(4),
                    s = r(19)
                r(47)
                const n = {
                    strategyStart: (e, t) =>
                        `Using ${e} to respond to '${(0, s.getFriendlyURL)(t.url)}'`,
                    printFinalResponse: (e) => {
                        e &&
                            (a.logger.groupCollapsed(
                                'View the final response here.'
                            ),
                            a.logger.log(e || '[No response returned]'),
                            a.logger.groupEnd())
                    },
                }
            },
            (e, t, r) => {
                r.r(t), r.d(t, { CacheOnly: () => n })
                r(6), r(4)
                var a = r(7),
                    s = r(45)
                r(48), r(47)
                class n extends s.Strategy {
                    async _handle(e, t) {
                        const r = await t.cacheMatch(e)
                        if (!r)
                            throw new a.WorkboxError('no-response', {
                                url: e.url,
                            })
                        return r
                    }
                }
            },
            (e, t, r) => {
                r.r(t), r.d(t, { NetworkFirst: () => o })
                r(6), r(4)
                var a = r(7),
                    s = r(51),
                    n = r(45)
                r(48), r(47)
                class o extends n.Strategy {
                    constructor(e = {}) {
                        super(e),
                            this.plugins.some((e) => 'cacheWillUpdate' in e) ||
                                this.plugins.unshift(s.cacheOkAndOpaquePlugin),
                            (this._networkTimeoutSeconds =
                                e.networkTimeoutSeconds || 0)
                    }
                    async _handle(e, t) {
                        const r = []
                        const s = []
                        let n
                        if (this._networkTimeoutSeconds) {
                            const { id: a, promise: o } =
                                this._getTimeoutPromise({
                                    request: e,
                                    logs: r,
                                    handler: t,
                                })
                            ;(n = a), s.push(o)
                        }
                        const o = this._getNetworkPromise({
                            timeoutId: n,
                            request: e,
                            logs: r,
                            handler: t,
                        })
                        s.push(o)
                        const i = await t.waitUntil(
                            (async () =>
                                (await t.waitUntil(Promise.race(s))) ||
                                (await o))()
                        )
                        if (!i)
                            throw new a.WorkboxError('no-response', {
                                url: e.url,
                            })
                        return i
                    }
                    _getTimeoutPromise({ request: e, logs: t, handler: r }) {
                        let a
                        return {
                            promise: new Promise((t) => {
                                a = setTimeout(async () => {
                                    t(await r.cacheMatch(e))
                                }, 1e3 * this._networkTimeoutSeconds)
                            }),
                            id: a,
                        }
                    }
                    async _getNetworkPromise({
                        timeoutId: e,
                        request: t,
                        logs: r,
                        handler: a,
                    }) {
                        let s, n
                        try {
                            n = await a.fetchAndCachePut(t)
                        } catch (e) {
                            e instanceof Error && (s = e)
                        }
                        return (
                            e && clearTimeout(e),
                            (!s && n) || (n = await a.cacheMatch(t)),
                            n
                        )
                    }
                }
            },
            (e, t, r) => {
                r.r(t), r.d(t, { cacheOkAndOpaquePlugin: () => a })
                r(47)
                const a = {
                    cacheWillUpdate: async ({ response: e }) =>
                        200 === e.status || 0 === e.status ? e : null,
                }
            },
            (e, t, r) => {
                r.r(t), r.d(t, { NetworkOnly: () => o })
                r(6), r(4)
                var a = r(21),
                    s = r(7),
                    n = r(45)
                r(48), r(47)
                class o extends n.Strategy {
                    constructor(e = {}) {
                        super(e),
                            (this._networkTimeoutSeconds =
                                e.networkTimeoutSeconds || 0)
                    }
                    async _handle(e, t) {
                        let r, n
                        try {
                            const r = [t.fetch(e)]
                            if (this._networkTimeoutSeconds) {
                                const e = (0, a.timeout)(
                                    1e3 * this._networkTimeoutSeconds
                                )
                                r.push(e)
                            }
                            if (((n = await Promise.race(r)), !n))
                                throw new Error(
                                    `Timed out the network response after ${this._networkTimeoutSeconds} seconds.`
                                )
                        } catch (e) {
                            e instanceof Error && (r = e)
                        }
                        if (!n)
                            throw new s.WorkboxError('no-response', {
                                url: e.url,
                                error: r,
                            })
                        return n
                    }
                }
            },
            (e, t, r) => {
                r.r(t), r.d(t, { StaleWhileRevalidate: () => o })
                r(6), r(4)
                var a = r(7),
                    s = r(51),
                    n = r(45)
                r(48), r(47)
                class o extends n.Strategy {
                    constructor(e = {}) {
                        super(e),
                            this.plugins.some((e) => 'cacheWillUpdate' in e) ||
                                this.plugins.unshift(s.cacheOkAndOpaquePlugin)
                    }
                    async _handle(e, t) {
                        const r = t.fetchAndCachePut(e).catch(() => {})
                        t.waitUntil(r)
                        let s,
                            n = await t.cacheMatch(e)
                        if (n) 0
                        else {
                            0
                            try {
                                n = await r
                            } catch (e) {
                                e instanceof Error && (s = e)
                            }
                        }
                        if (!n)
                            throw new a.WorkboxError('no-response', {
                                url: e.url,
                                error: s,
                            })
                        return n
                    }
                }
            },
            (e, t, r) => {
                r.r(t),
                    r.d(t, {
                        CacheableResponse: () => a.CacheableResponse,
                        CacheableResponsePlugin: () =>
                            a.CacheableResponsePlugin,
                    })
                var a = r(55)
            },
            (e, t, r) => {
                r.r(t),
                    r.d(t, {
                        CacheableResponse: () => a.CacheableResponse,
                        CacheableResponsePlugin: () =>
                            s.CacheableResponsePlugin,
                    })
                var a = r(56),
                    s = r(58)
                r(57)
            },
            (e, t, r) => {
                r.r(t), r.d(t, { CacheableResponse: () => a })
                r(6), r(7), r(19), r(4), r(57)
                class a {
                    constructor(e = {}) {
                        ;(this._statuses = e.statuses),
                            (this._headers = e.headers)
                    }
                    isResponseCacheable(e) {
                        let t = !0
                        return (
                            this._statuses &&
                                (t = this._statuses.includes(e.status)),
                            this._headers &&
                                t &&
                                (t = Object.keys(this._headers).some(
                                    (t) => e.headers.get(t) === this._headers[t]
                                )),
                            t
                        )
                    }
                }
            },
            () => {
                try {
                    self['workbox:cacheable-response:7.2.0'] && _()
                } catch (e) {}
            },
            (e, t, r) => {
                r.r(t), r.d(t, { CacheableResponsePlugin: () => s })
                var a = r(56)
                r(57)
                class s {
                    constructor(e) {
                        ;(this.cacheWillUpdate = async ({ response: e }) =>
                            this._cacheableResponse.isResponseCacheable(e)
                                ? e
                                : null),
                            (this._cacheableResponse = new a.CacheableResponse(
                                e
                            ))
                    }
                }
            },
            (e, t, r) => {
                r.r(t),
                    r.d(t, {
                        CacheExpiration: () => a.CacheExpiration,
                        ExpirationPlugin: () => a.ExpirationPlugin,
                    })
                var a = r(60)
            },
            (e, t, r) => {
                r.r(t),
                    r.d(t, {
                        CacheExpiration: () => a.CacheExpiration,
                        ExpirationPlugin: () => s.ExpirationPlugin,
                    })
                var a = r(61),
                    s = r(70)
                r(69)
            },
            (e, t, r) => {
                r.r(t), r.d(t, { CacheExpiration: () => n })
                r(6)
                var a = r(16),
                    s = (r(4), r(7), r(62))
                r(69)
                class n {
                    constructor(e, t = {}) {
                        ;(this._isRunning = !1),
                            (this._rerunRequested = !1),
                            (this._maxEntries = t.maxEntries),
                            (this._maxAgeSeconds = t.maxAgeSeconds),
                            (this._matchOptions = t.matchOptions),
                            (this._cacheName = e),
                            (this._timestampModel = new s.CacheTimestampsModel(
                                e
                            ))
                    }
                    async expireEntries() {
                        if (this._isRunning)
                            return void (this._rerunRequested = !0)
                        this._isRunning = !0
                        const e = this._maxAgeSeconds
                                ? Date.now() - 1e3 * this._maxAgeSeconds
                                : 0,
                            t = await this._timestampModel.expireEntries(
                                e,
                                this._maxEntries
                            ),
                            r = await self.caches.open(this._cacheName)
                        for (const e of t) await r.delete(e, this._matchOptions)
                        ;(this._isRunning = !1),
                            this._rerunRequested &&
                                ((this._rerunRequested = !1),
                                (0, a.dontWaitFor)(this.expireEntries()))
                    }
                    async updateTimestamp(e) {
                        await this._timestampModel.setTimestamp(e, Date.now())
                    }
                    async isURLExpired(e) {
                        if (this._maxAgeSeconds) {
                            const t =
                                    await this._timestampModel.getTimestamp(e),
                                r = Date.now() - 1e3 * this._maxAgeSeconds
                            return void 0 === t || t < r
                        }
                        return !1
                    }
                    async delete() {
                        ;(this._rerunRequested = !1),
                            await this._timestampModel.expireEntries(1 / 0)
                    }
                }
            },
            (e, t, r) => {
                r.r(t), r.d(t, { CacheTimestampsModel: () => o })
                var a = r(63)
                r(69)
                const s = 'cache-entries',
                    n = (e) => {
                        const t = new URL(e, location.href)
                        return (t.hash = ''), t.href
                    }
                class o {
                    constructor(e) {
                        ;(this._db = null), (this._cacheName = e)
                    }
                    _upgradeDb(e) {
                        const t = e.createObjectStore(s, { keyPath: 'id' })
                        t.createIndex('cacheName', 'cacheName', { unique: !1 }),
                            t.createIndex('timestamp', 'timestamp', {
                                unique: !1,
                            })
                    }
                    _upgradeDbAndDeleteOldDbs(e) {
                        this._upgradeDb(e),
                            this._cacheName && (0, a.deleteDB)(this._cacheName)
                    }
                    async setTimestamp(e, t) {
                        const r = {
                                url: (e = n(e)),
                                timestamp: t,
                                cacheName: this._cacheName,
                                id: this._getId(e),
                            },
                            a = (await this.getDb()).transaction(
                                s,
                                'readwrite',
                                { durability: 'relaxed' }
                            )
                        await a.store.put(r), await a.done
                    }
                    async getTimestamp(e) {
                        const t = await this.getDb(),
                            r = await t.get(s, this._getId(e))
                        return null == r ? void 0 : r.timestamp
                    }
                    async expireEntries(e, t) {
                        const r = await this.getDb()
                        let a = await r
                            .transaction(s)
                            .store.index('timestamp')
                            .openCursor(null, 'prev')
                        const n = []
                        let o = 0
                        for (; a; ) {
                            const r = a.value
                            r.cacheName === this._cacheName &&
                                ((e && r.timestamp < e) || (t && o >= t)
                                    ? n.push(a.value)
                                    : o++),
                                (a = await a.continue())
                        }
                        const i = []
                        for (const e of n)
                            await r.delete(s, e.id), i.push(e.url)
                        return i
                    }
                    _getId(e) {
                        return this._cacheName + '|' + n(e)
                    }
                    async getDb() {
                        return (
                            this._db ||
                                (this._db = await (0, a.openDB)(
                                    'workbox-expiration',
                                    1,
                                    {
                                        upgrade:
                                            this._upgradeDbAndDeleteOldDbs.bind(
                                                this
                                            ),
                                    }
                                )),
                            this._db
                        )
                    }
                }
            },
            (e, t, r) => {
                r.r(t),
                    r.d(t, {
                        deleteDB: () => c,
                        openDB: () => i,
                        unwrap: () => s.u,
                        wrap: () => s.w,
                    })
                var a = r(64),
                    s = r(68)
                function n(e, t) {
                    var r = Object.keys(e)
                    if (Object.getOwnPropertySymbols) {
                        var a = Object.getOwnPropertySymbols(e)
                        t &&
                            (a = a.filter(function (t) {
                                return Object.getOwnPropertyDescriptor(e, t)
                                    .enumerable
                            })),
                            r.push.apply(r, a)
                    }
                    return r
                }
                function o(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = null != arguments[t] ? arguments[t] : {}
                        t % 2
                            ? n(Object(r), !0).forEach(function (t) {
                                  ;(0, a.default)(e, t, r[t])
                              })
                            : Object.getOwnPropertyDescriptors
                              ? Object.defineProperties(
                                    e,
                                    Object.getOwnPropertyDescriptors(r)
                                )
                              : n(Object(r)).forEach(function (t) {
                                    Object.defineProperty(
                                        e,
                                        t,
                                        Object.getOwnPropertyDescriptor(r, t)
                                    )
                                })
                    }
                    return e
                }
                function i(
                    e,
                    t,
                    { blocked: r, upgrade: a, blocking: n, terminated: o } = {}
                ) {
                    const i = indexedDB.open(e, t),
                        c = (0, s.w)(i)
                    return (
                        a &&
                            i.addEventListener('upgradeneeded', (e) => {
                                a(
                                    (0, s.w)(i.result),
                                    e.oldVersion,
                                    e.newVersion,
                                    (0, s.w)(i.transaction),
                                    e
                                )
                            }),
                        r &&
                            i.addEventListener('blocked', (e) =>
                                r(e.oldVersion, e.newVersion, e)
                            ),
                        c
                            .then((e) => {
                                o && e.addEventListener('close', () => o()),
                                    n &&
                                        e.addEventListener(
                                            'versionchange',
                                            (e) =>
                                                n(e.oldVersion, e.newVersion, e)
                                        )
                            })
                            .catch(() => {}),
                        c
                    )
                }
                function c(e, { blocked: t } = {}) {
                    const r = indexedDB.deleteDatabase(e)
                    return (
                        t &&
                            r.addEventListener('blocked', (e) =>
                                t(e.oldVersion, e)
                            ),
                        (0, s.w)(r).then(() => {})
                    )
                }
                const u = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
                    l = ['put', 'add', 'delete', 'clear'],
                    h = new Map()
                function d(e, t) {
                    if (
                        !(e instanceof IDBDatabase) ||
                        t in e ||
                        'string' != typeof t
                    )
                        return
                    if (h.get(t)) return h.get(t)
                    const r = t.replace(/FromIndex$/, ''),
                        a = t !== r,
                        s = l.includes(r)
                    if (
                        !(r in (a ? IDBIndex : IDBObjectStore).prototype) ||
                        (!s && !u.includes(r))
                    )
                        return
                    const n = async function (e, ...t) {
                        const n = this.transaction(
                            e,
                            s ? 'readwrite' : 'readonly'
                        )
                        let o = n.store
                        return (
                            a && (o = o.index(t.shift())),
                            (await Promise.all([o[r](...t), s && n.done]))[0]
                        )
                    }
                    return h.set(t, n), n
                }
                ;(0, s.r)((e) =>
                    o(
                        o({}, e),
                        {},
                        {
                            get: (t, r, a) => d(t, r) || e.get(t, r, a),
                            has: (t, r) => !!d(t, r) || e.has(t, r),
                        }
                    )
                )
            },
            (e, t, r) => {
                r.r(t), r.d(t, { default: () => s })
                var a = r(65)
                function s(e, t, r) {
                    return (
                        (t = (0, a.default)(t)) in e
                            ? Object.defineProperty(e, t, {
                                  value: r,
                                  enumerable: !0,
                                  configurable: !0,
                                  writable: !0,
                              })
                            : (e[t] = r),
                        e
                    )
                }
            },
            (e, t, r) => {
                r.r(t), r.d(t, { default: () => n })
                var a = r(66),
                    s = r(67)
                function n(e) {
                    var t = (0, s.default)(e, 'string')
                    return 'symbol' == (0, a.default)(t) ? t : t + ''
                }
            },
            (e, t, r) => {
                function a(e) {
                    return (
                        (a =
                            'function' == typeof Symbol &&
                            'symbol' == typeof Symbol.iterator
                                ? function (e) {
                                      return typeof e
                                  }
                                : function (e) {
                                      return e &&
                                          'function' == typeof Symbol &&
                                          e.constructor === Symbol &&
                                          e !== Symbol.prototype
                                          ? 'symbol'
                                          : typeof e
                                  }),
                        a(e)
                    )
                }
                r.r(t), r.d(t, { default: () => a })
            },
            (e, t, r) => {
                r.r(t), r.d(t, { default: () => s })
                var a = r(66)
                function s(e, t) {
                    if ('object' != (0, a.default)(e) || !e) return e
                    var r = e[Symbol.toPrimitive]
                    if (void 0 !== r) {
                        var s = r.call(e, t || 'default')
                        if ('object' != (0, a.default)(s)) return s
                        throw new TypeError(
                            '@@toPrimitive must return a primitive value.'
                        )
                    }
                    return ('string' === t ? String : Number)(e)
                }
            },
            (e, t, r) => {
                r.r(t),
                    r.d(t, {
                        a: () => l,
                        i: () => a,
                        r: () => d,
                        u: () => g,
                        w: () => f,
                    })
                const a = (e, t) => t.some((t) => e instanceof t)
                let s, n
                const o = new WeakMap(),
                    i = new WeakMap(),
                    c = new WeakMap(),
                    u = new WeakMap(),
                    l = new WeakMap()
                let h = {
                    get(e, t, r) {
                        if (e instanceof IDBTransaction) {
                            if ('done' === t) return i.get(e)
                            if ('objectStoreNames' === t)
                                return e.objectStoreNames || c.get(e)
                            if ('store' === t)
                                return r.objectStoreNames[1]
                                    ? void 0
                                    : r.objectStore(r.objectStoreNames[0])
                        }
                        return f(e[t])
                    },
                    set: (e, t, r) => ((e[t] = r), !0),
                    has: (e, t) =>
                        (e instanceof IDBTransaction &&
                            ('done' === t || 'store' === t)) ||
                        t in e,
                }
                function d(e) {
                    h = e(h)
                }
                function p(e) {
                    return e !== IDBDatabase.prototype.transaction ||
                        'objectStoreNames' in IDBTransaction.prototype
                        ? (
                              n ||
                              (n = [
                                  IDBCursor.prototype.advance,
                                  IDBCursor.prototype.continue,
                                  IDBCursor.prototype.continuePrimaryKey,
                              ])
                          ).includes(e)
                            ? function (...t) {
                                  return e.apply(g(this), t), f(o.get(this))
                              }
                            : function (...t) {
                                  return f(e.apply(g(this), t))
                              }
                        : function (t, ...r) {
                              const a = e.call(g(this), t, ...r)
                              return c.set(a, t.sort ? t.sort() : [t]), f(a)
                          }
                }
                function m(e) {
                    return 'function' == typeof e
                        ? p(e)
                        : (e instanceof IDBTransaction &&
                              (function (e) {
                                  if (i.has(e)) return
                                  const t = new Promise((t, r) => {
                                      const a = () => {
                                              e.removeEventListener(
                                                  'complete',
                                                  s
                                              ),
                                                  e.removeEventListener(
                                                      'error',
                                                      n
                                                  ),
                                                  e.removeEventListener(
                                                      'abort',
                                                      n
                                                  )
                                          },
                                          s = () => {
                                              t(), a()
                                          },
                                          n = () => {
                                              r(
                                                  e.error ||
                                                      new DOMException(
                                                          'AbortError',
                                                          'AbortError'
                                                      )
                                              ),
                                                  a()
                                          }
                                      e.addEventListener('complete', s),
                                          e.addEventListener('error', n),
                                          e.addEventListener('abort', n)
                                  })
                                  i.set(e, t)
                              })(e),
                          a(
                              e,
                              s ||
                                  (s = [
                                      IDBDatabase,
                                      IDBObjectStore,
                                      IDBIndex,
                                      IDBCursor,
                                      IDBTransaction,
                                  ])
                          )
                              ? new Proxy(e, h)
                              : e)
                }
                function f(e) {
                    if (e instanceof IDBRequest)
                        return (function (e) {
                            const t = new Promise((t, r) => {
                                const a = () => {
                                        e.removeEventListener('success', s),
                                            e.removeEventListener('error', n)
                                    },
                                    s = () => {
                                        t(f(e.result)), a()
                                    },
                                    n = () => {
                                        r(e.error), a()
                                    }
                                e.addEventListener('success', s),
                                    e.addEventListener('error', n)
                            })
                            return (
                                t
                                    .then((t) => {
                                        t instanceof IDBCursor && o.set(t, e)
                                    })
                                    .catch(() => {}),
                                l.set(t, e),
                                t
                            )
                        })(e)
                    if (u.has(e)) return u.get(e)
                    const t = m(e)
                    return t !== e && (u.set(e, t), l.set(t, e)), t
                }
                const g = (e) => l.get(e)
            },
            () => {
                try {
                    self['workbox:expiration:7.2.0'] && _()
                } catch (e) {}
            },
            (e, t, r) => {
                r.r(t), r.d(t, { ExpirationPlugin: () => c })
                r(6)
                var a = r(12),
                    s = r(16),
                    n = (r(19), r(4), r(3)),
                    o = r(7),
                    i = r(61)
                r(69)
                class c {
                    constructor(e = {}) {
                        ;(this.cachedResponseWillBeUsed = async ({
                            event: e,
                            request: t,
                            cacheName: r,
                            cachedResponse: a,
                        }) => {
                            if (!a) return null
                            const n = this._isResponseDateFresh(a),
                                o = this._getCacheExpiration(r)
                            ;(0, s.dontWaitFor)(o.expireEntries())
                            const i = o.updateTimestamp(t.url)
                            if (e)
                                try {
                                    e.waitUntil(i)
                                } catch (e) {
                                    0
                                }
                            return n ? a : null
                        }),
                            (this.cacheDidUpdate = async ({
                                cacheName: e,
                                request: t,
                            }) => {
                                const r = this._getCacheExpiration(e)
                                await r.updateTimestamp(t.url),
                                    await r.expireEntries()
                            }),
                            (this._config = e),
                            (this._maxAgeSeconds = e.maxAgeSeconds),
                            (this._cacheExpirations = new Map()),
                            e.purgeOnQuotaError &&
                                (0, n.registerQuotaErrorCallback)(() =>
                                    this.deleteCacheAndMetadata()
                                )
                    }
                    _getCacheExpiration(e) {
                        if (e === a.cacheNames.getRuntimeName())
                            throw new o.WorkboxError(
                                'expire-custom-caches-only'
                            )
                        let t = this._cacheExpirations.get(e)
                        return (
                            t ||
                                ((t = new i.CacheExpiration(e, this._config)),
                                this._cacheExpirations.set(e, t)),
                            t
                        )
                    }
                    _isResponseDateFresh(e) {
                        if (!this._maxAgeSeconds) return !0
                        const t = this._getDateHeaderTimestamp(e)
                        if (null === t) return !0
                        return t >= Date.now() - 1e3 * this._maxAgeSeconds
                    }
                    _getDateHeaderTimestamp(e) {
                        if (!e.headers.has('date')) return null
                        const t = e.headers.get('date'),
                            r = new Date(t).getTime()
                        return isNaN(r) ? null : r
                    }
                    async deleteCacheAndMetadata() {
                        for (const [e, t] of this._cacheExpirations)
                            await self.caches.delete(e), await t.delete()
                        this._cacheExpirations = new Map()
                    }
                }
            },
        ],
        t = {}
    function r(a) {
        var s = t[a]
        if (void 0 !== s) return s.exports
        var n = (t[a] = { exports: {} })
        return e[a](n, n.exports, r), n.exports
    }
    ;(r.n = (e) => {
        var t = e && e.__esModule ? () => e.default : () => e
        return r.d(t, { a: t }), t
    }),
        (r.d = (e, t) => {
            for (var a in t)
                r.o(t, a) &&
                    !r.o(e, a) &&
                    Object.defineProperty(e, a, { enumerable: !0, get: t[a] })
        }),
        (r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
        (r.r = (e) => {
            'undefined' != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(e, Symbol.toStringTag, {
                    value: 'Module',
                }),
                Object.defineProperty(e, '__esModule', { value: !0 })
        })
    var a = {}
    ;(() => {
        r.r(a)
        var e = r(1),
            t = r(29),
            s = r(42),
            n = r(54),
            o = r(59)
        ;(self.__WB_DISABLE_DEV_LOGS = !0),
            (0, e.setCacheNameDetails)({ prefix: 'jerens-app', suffix: 'v1' }),
            (0, t.registerRoute)(
                ({ request: e }) => 'navigate' === e.mode,
                new s.NetworkFirst({
                    cacheName: 'pages',
                    plugins: [
                        new n.CacheableResponsePlugin({ statuses: [200] }),
                    ],
                })
            ),
            (0, t.registerRoute)(
                ({ request: e }) =>
                    'style' === e.destination ||
                    'script' === e.destination ||
                    'worker' === e.destination,
                new s.StaleWhileRevalidate({
                    cacheName: 'static-assets',
                    plugins: [
                        new n.CacheableResponsePlugin({ statuses: [200] }),
                    ],
                })
            ),
            (0, t.registerRoute)(
                ({ request: e }) => 'image' === e.destination,
                new s.StaleWhileRevalidate({
                    cacheName: 'images',
                    plugins: [
                        new n.CacheableResponsePlugin({ statuses: [200] }),
                        new o.ExpirationPlugin({
                            maxEntries: 50,
                            maxAgeSeconds: 2592e3,
                        }),
                    ],
                })
            ),
            (0, t.registerRoute)(
                ({ url: e }) => 'https://ik.imagekit.io/jerensl/' === e.origin,
                new s.StaleWhileRevalidate({
                    cacheName: 'cdn-images',
                    plugins: [
                        new n.CacheableResponsePlugin({ statuses: [0, 200] }),
                        new o.ExpirationPlugin({
                            maxAgeSeconds: 2592e3,
                            maxEntries: 30,
                        }),
                    ],
                })
            )
    })()
})()
