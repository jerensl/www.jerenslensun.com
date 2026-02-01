module.exports = [
"[project]/src/mocks/db.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "status",
    ()=>status
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$msw$2f$data__$5b$external$5d$__$2840$msw$2f$data$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$msw$2f$data$29$__ = __turbopack_context__.i("[externals]/@msw/data [external] (@msw/data, esm_import, [project]/node_modules/@msw/data)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$zod$29$__ = __turbopack_context__.i("[externals]/zod [external] (zod, esm_import, [project]/node_modules/zod)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$msw$2f$data__$5b$external$5d$__$2840$msw$2f$data$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$msw$2f$data$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$zod$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$msw$2f$data__$5b$external$5d$__$2840$msw$2f$data$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$msw$2f$data$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$zod$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const status = new __TURBOPACK__imported__module__$5b$externals$5d2f40$msw$2f$data__$5b$external$5d$__$2840$msw$2f$data$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$msw$2f$data$29$__["Collection"]({
    schema: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$zod$29$__["default"].object({
        tokenID: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$zod$29$__["default"].string(),
        isActive: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$zod$29$__["default"].boolean(),
        updatedAt: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$zod$29$__["default"].number()
    })
});
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/mocks/handlers.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "handlers",
    ()=>handlers
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$msw__$5b$external$5d$__$28$msw$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$msw$29$__ = __turbopack_context__.i("[externals]/msw [external] (msw, esm_import, [project]/node_modules/msw)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$db$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/mocks/db.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$msw__$5b$external$5d$__$28$msw$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$msw$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$db$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$msw__$5b$external$5d$__$28$msw$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$msw$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$db$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const handlers = [
    __TURBOPACK__imported__module__$5b$externals$5d2f$msw__$5b$external$5d$__$28$msw$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$msw$29$__["http"].post(`${("TURBOPACK compile-time value", "http://api.jerensl.com")}/api/notification/status`, async ()=>{
        const data = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$db$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["status"].findFirst((q)=>q.where({
                tokenID: '1234'
            }));
        const isEmpty = data === undefined || data === null;
        const isActive = false;
        const updatedAt = new Date().getTime();
        if (isEmpty) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$db$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["status"].create({
                tokenID: '1234',
                isActive: isActive,
                updatedAt: updatedAt
            });
        }
        return __TURBOPACK__imported__module__$5b$externals$5d2f$msw__$5b$external$5d$__$28$msw$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$msw$29$__["HttpResponse"].json({
            isActive: isEmpty ? isActive : data?.isActive,
            updatedAt: isEmpty ? updatedAt : data?.updatedAt
        });
    }),
    __TURBOPACK__imported__module__$5b$externals$5d2f$msw__$5b$external$5d$__$28$msw$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$msw$29$__["http"].post(`${("TURBOPACK compile-time value", "http://api.jerensl.com")}/api/notification/subscribe`, async ()=>{
        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$db$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["status"].update((q)=>q.where({
                tokenID: '1234'
            }), {
            data (user) {
                user.isActive = true;
                user.updatedAt = new Date().getTime();
            }
        });
        return __TURBOPACK__imported__module__$5b$externals$5d2f$msw__$5b$external$5d$__$28$msw$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$msw$29$__["HttpResponse"].json({
            isActive: data?.isActive,
            updatedAt: data?.updatedAt
        });
    }),
    __TURBOPACK__imported__module__$5b$externals$5d2f$msw__$5b$external$5d$__$28$msw$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$msw$29$__["http"].post(`${("TURBOPACK compile-time value", "http://api.jerensl.com")}/api/notification/unsubscribe`, async ()=>{
        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$db$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["status"].update((q)=>q.where({
                tokenID: '1234'
            }), {
            data (user) {
                user.isActive = false;
                user.updatedAt = new Date().getTime();
            }
        });
        return __TURBOPACK__imported__module__$5b$externals$5d2f$msw__$5b$external$5d$__$28$msw$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$msw$29$__["HttpResponse"].json({
            isActive: data?.isActive,
            updatedAt: data?.updatedAt
        });
    })
];
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/mocks/server.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "server",
    ()=>server
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$msw$2f$node__$5b$external$5d$__$28$msw$2f$node$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$msw$29$__ = __turbopack_context__.i("[externals]/msw/node [external] (msw/node, esm_import, [project]/node_modules/msw)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$handlers$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/mocks/handlers.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$msw$2f$node__$5b$external$5d$__$28$msw$2f$node$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$msw$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$handlers$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$msw$2f$node__$5b$external$5d$__$28$msw$2f$node$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$msw$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$handlers$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const server = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$msw$2f$node__$5b$external$5d$__$28$msw$2f$node$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$msw$29$__["setupServer"])(...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$handlers$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["handlers"]);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/msw/node [external] (msw/node, esm_import, [project]/node_modules/msw)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("msw-fa18b6cdc7241a2e/node");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/msw [external] (msw, esm_import, [project]/node_modules/msw)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("msw-fa18b6cdc7241a2e");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/@msw/data [external] (@msw/data, esm_import, [project]/node_modules/@msw/data)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("@msw/data-74d1e02aaf2c5f13");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/zod [external] (zod, esm_import, [project]/node_modules/zod)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("zod-dcb22c6336e0bc69");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ae7d7340._.js.map