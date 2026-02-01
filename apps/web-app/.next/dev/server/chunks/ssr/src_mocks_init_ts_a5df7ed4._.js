module.exports = [
"[project]/src/mocks/init.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initMocks",
    ()=>initMocks
]);
async function initMocks() {
    if ("TURBOPACK compile-time truthy", 1) {
        const { server } = await __turbopack_context__.A("[project]/src/mocks/server.ts [ssr] (ecmascript, async loader)");
        server.listen();
    } else //TURBOPACK unreachable
    ;
}
;
}),
];

//# sourceMappingURL=src_mocks_init_ts_a5df7ed4._.js.map