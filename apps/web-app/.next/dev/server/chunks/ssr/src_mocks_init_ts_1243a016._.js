module.exports = [
"[project]/src/mocks/init.ts [ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/src_mocks_server_ts_64053fe5._.js",
  "server/chunks/ssr/src_mocks_init_ts_a5df7ed4._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/mocks/init.ts [ssr] (ecmascript)");
    });
});
}),
];