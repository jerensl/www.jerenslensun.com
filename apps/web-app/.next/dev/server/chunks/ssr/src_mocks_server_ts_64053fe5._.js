module.exports = [
"[project]/src/mocks/server.ts [ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/[root-of-the-server]__ae7d7340._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/mocks/server.ts [ssr] (ecmascript)");
    });
});
}),
];