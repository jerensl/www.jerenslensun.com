(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/mocks/db.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "status",
    ()=>status
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$msw$2f$data$2f$build$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@msw/data/build/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$msw$2f$data$2f$build$2f$collection$2d$BJduKbwC$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@msw/data/build/collection-BJduKbwC.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/index.js [client] (ecmascript) <locals>");
;
;
const status = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$msw$2f$data$2f$build$2f$collection$2d$BJduKbwC$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Collection"]({
    schema: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].object({
        tokenID: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].string(),
        isActive: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].boolean(),
        updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].number()
    })
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/mocks/handlers.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "handlers",
    ()=>handlers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$msw$2f$lib$2f$core$2f$http$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/msw/lib/core/http.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$msw$2f$lib$2f$core$2f$HttpResponse$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/msw/lib/core/HttpResponse.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$db$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/mocks/db.ts [client] (ecmascript)");
;
;
const handlers = [
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$msw$2f$lib$2f$core$2f$http$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["http"].post(`${("TURBOPACK compile-time value", "http://api.jerensl.com")}/api/notification/status`, async ()=>{
        const data = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$db$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["status"].findFirst((q)=>q.where({
                tokenID: '1234'
            }));
        const isEmpty = data === undefined || data === null;
        const isActive = false;
        const updatedAt = new Date().getTime();
        if (isEmpty) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$db$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["status"].create({
                tokenID: '1234',
                isActive: isActive,
                updatedAt: updatedAt
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$msw$2f$lib$2f$core$2f$HttpResponse$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["HttpResponse"].json({
            isActive: isEmpty ? isActive : data?.isActive,
            updatedAt: isEmpty ? updatedAt : data?.updatedAt
        });
    }),
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$msw$2f$lib$2f$core$2f$http$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["http"].post(`${("TURBOPACK compile-time value", "http://api.jerensl.com")}/api/notification/subscribe`, async ()=>{
        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$db$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["status"].update((q)=>q.where({
                tokenID: '1234'
            }), {
            data (user) {
                user.isActive = true;
                user.updatedAt = new Date().getTime();
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$msw$2f$lib$2f$core$2f$HttpResponse$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["HttpResponse"].json({
            isActive: data?.isActive,
            updatedAt: data?.updatedAt
        });
    }),
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$msw$2f$lib$2f$core$2f$http$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["http"].post(`${("TURBOPACK compile-time value", "http://api.jerensl.com")}/api/notification/unsubscribe`, async ()=>{
        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$db$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["status"].update((q)=>q.where({
                tokenID: '1234'
            }), {
            data (user) {
                user.isActive = false;
                user.updatedAt = new Date().getTime();
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$msw$2f$lib$2f$core$2f$HttpResponse$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["HttpResponse"].json({
            isActive: data?.isActive,
            updatedAt: data?.updatedAt
        });
    })
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/mocks/browser.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "worker",
    ()=>worker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$msw$2f$lib$2f$browser$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/msw/lib/browser/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$handlers$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/mocks/handlers.ts [client] (ecmascript)");
;
;
const worker = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$msw$2f$lib$2f$browser$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["setupWorker"])(...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$handlers$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["handlers"]);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_mocks_97e00329._.js.map