define(["exports"],(function(t){"use strict";try{self["workbox:core:6.5.3"]&&_()}catch(t){}const e=(t,...e)=>{let s=t;return e.length>0&&(s+=` :: ${JSON.stringify(e)}`),s};class s extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:6.5.3"]&&_()}catch(t){}const n=t=>t&&"object"==typeof t?t:{handle:t};class r{constructor(t,e,s="GET"){this.handler=n(e),this.match=t,this.method=s}setCatchHandler(t){this.catchHandler=n(t)}}class i extends r{constructor(t,e,s){super((({url:e})=>{const s=t.exec(e.href);if(s&&(e.origin===location.origin||0===s.index))return s.slice(1)}),e,s)}}class a{constructor(){this.t=new Map,this.i=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",(t=>{const{request:e}=t,s=this.handleRequest({request:e,event:t});s&&t.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(t=>{if(t.data&&"CACHE_URLS"===t.data.type){const{payload:e}=t.data,s=Promise.all(e.urlsToCache.map((e=>{"string"==typeof e&&(e=[e]);const s=new Request(...e);return this.handleRequest({request:s,event:t})})));t.waitUntil(s),t.ports&&t.ports[0]&&s.then((()=>t.ports[0].postMessage(!0)))}}))}handleRequest({request:t,event:e}){const s=new URL(t.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:r,route:i}=this.findMatchingRoute({event:e,request:t,sameOrigin:n,url:s});let a=i&&i.handler;const o=t.method;if(!a&&this.i.has(o)&&(a=this.i.get(o)),!a)return;let c;try{c=a.handle({url:s,request:t,event:e,params:r})}catch(t){c=Promise.reject(t)}const h=i&&i.catchHandler;return c instanceof Promise&&(this.o||h)&&(c=c.catch((async n=>{if(h)try{return await h.handle({url:s,request:t,event:e,params:r})}catch(t){t instanceof Error&&(n=t)}if(this.o)return this.o.handle({url:s,request:t,event:e});throw n}))),c}findMatchingRoute({url:t,sameOrigin:e,request:s,event:n}){const r=this.t.get(s.method)||[];for(const i of r){let r;const a=i.match({url:t,sameOrigin:e,request:s,event:n});if(a)return r=a,(Array.isArray(r)&&0===r.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"==typeof a)&&(r=void 0),{route:i,params:r}}return{}}setDefaultHandler(t,e="GET"){this.i.set(e,n(t))}setCatchHandler(t){this.o=n(t)}registerRoute(t){this.t.has(t.method)||this.t.set(t.method,[]),this.t.get(t.method).push(t)}unregisterRoute(t){if(!this.t.has(t.method))throw new s("unregister-route-but-not-found-with-method",{method:t.method});const e=this.t.get(t.method).indexOf(t);if(!(e>-1))throw new s("unregister-route-route-not-registered");this.t.get(t.method).splice(e,1)}}let o;try{self["workbox:strategies:6.5.3"]&&_()}catch(t){}const c={cacheWillUpdate:async({response:t})=>200===t.status||0===t.status?t:null},h={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},u=t=>[h.prefix,t,h.suffix].filter((t=>t&&t.length>0)).join("-"),l=t=>t||u(h.runtime);function f(t,e){const s=new URL(t);for(const t of e)s.searchParams.delete(t);return s.href}class w{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}const d=new Set;function p(t){return"string"==typeof t?new Request(t):t}class y{constructor(t,e){this.h={},Object.assign(this,e),this.event=e.event,this.u=t,this.l=new w,this.p=[],this.g=[...t.plugins],this.m=new Map;for(const t of this.g)this.m.set(t,{});this.event.waitUntil(this.l.promise)}async fetch(t){const{event:e}=this;let n=p(t);if("navigate"===n.mode&&e instanceof FetchEvent&&e.preloadResponse){const t=await e.preloadResponse;if(t)return t}const r=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const t of this.iterateCallbacks("requestWillFetch"))n=await t({request:n.clone(),event:e})}catch(t){if(t instanceof Error)throw new s("plugin-error-request-will-fetch",{thrownErrorMessage:t.message})}const i=n.clone();try{let t;t=await fetch(n,"navigate"===n.mode?void 0:this.u.fetchOptions);for(const s of this.iterateCallbacks("fetchDidSucceed"))t=await s({event:e,request:i,response:t});return t}catch(t){throw r&&await this.runCallbacks("fetchDidFail",{error:t,event:e,originalRequest:r.clone(),request:i.clone()}),t}}async fetchAndCachePut(t){const e=await this.fetch(t),s=e.clone();return this.waitUntil(this.cachePut(t,s)),e}async cacheMatch(t){const e=p(t);let s;const{cacheName:n,matchOptions:r}=this.u,i=await this.getCacheKey(e,"read"),a=Object.assign(Object.assign({},r),{cacheName:n});s=await caches.match(i,a);for(const t of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await t({cacheName:n,matchOptions:r,cachedResponse:s,request:i,event:this.event})||void 0;return s}async cachePut(t,e){const n=p(t);var r;await(r=0,new Promise((t=>setTimeout(t,r))));const i=await this.getCacheKey(n,"write");if(!e)throw new s("cache-put-with-no-response",{url:(a=i.url,new URL(String(a),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var a;const o=await this.v(e);if(!o)return!1;const{cacheName:c,matchOptions:h}=this.u,u=await self.caches.open(c),l=this.hasCallback("cacheDidUpdate"),w=l?await async function(t,e,s,n){const r=f(e.url,s);if(e.url===r)return t.match(e,n);const i=Object.assign(Object.assign({},n),{ignoreSearch:!0}),a=await t.keys(e,i);for(const e of a)if(r===f(e.url,s))return t.match(e,n)}(u,i.clone(),["__WB_REVISION__"],h):null;try{await u.put(i,l?o.clone():o)}catch(t){if(t instanceof Error)throw"QuotaExceededError"===t.name&&await async function(){for(const t of d)await t()}(),t}for(const t of this.iterateCallbacks("cacheDidUpdate"))await t({cacheName:c,oldResponse:w,newResponse:o.clone(),request:i,event:this.event});return!0}async getCacheKey(t,e){const s=`${t.url} | ${e}`;if(!this.h[s]){let n=t;for(const t of this.iterateCallbacks("cacheKeyWillBeUsed"))n=p(await t({mode:e,request:n,event:this.event,params:this.params}));this.h[s]=n}return this.h[s]}hasCallback(t){for(const e of this.u.plugins)if(t in e)return!0;return!1}async runCallbacks(t,e){for(const s of this.iterateCallbacks(t))await s(e)}*iterateCallbacks(t){for(const e of this.u.plugins)if("function"==typeof e[t]){const s=this.m.get(e),n=n=>{const r=Object.assign(Object.assign({},n),{state:s});return e[t](r)};yield n}}waitUntil(t){return this.p.push(t),t}async doneWaiting(){let t;for(;t=this.p.shift();)await t}destroy(){this.l.resolve(null)}async v(t){let e=t,s=!1;for(const t of this.iterateCallbacks("cacheWillUpdate"))if(e=await t({request:this.request,response:e,event:this.event})||void 0,s=!0,!e)break;return s||e&&200!==e.status&&(e=void 0),e}}class g{constructor(t={}){this.cacheName=l(t.cacheName),this.plugins=t.plugins||[],this.fetchOptions=t.fetchOptions,this.matchOptions=t.matchOptions}handle(t){const[e]=this.handleAll(t);return e}handleAll(t){t instanceof FetchEvent&&(t={event:t,request:t.request});const e=t.event,s="string"==typeof t.request?new Request(t.request):t.request,n="params"in t?t.params:void 0,r=new y(this,{event:e,request:s,params:n}),i=this.R(r,s,e);return[i,this.q(i,r,s,e)]}async R(t,e,n){let r;await t.runCallbacks("handlerWillStart",{event:n,request:e});try{if(r=await this.D(e,t),!r||"error"===r.type)throw new s("no-response",{url:e.url})}catch(s){if(s instanceof Error)for(const i of t.iterateCallbacks("handlerDidError"))if(r=await i({error:s,event:n,request:e}),r)break;if(!r)throw s}for(const s of t.iterateCallbacks("handlerWillRespond"))r=await s({event:n,request:e,response:r});return r}async q(t,e,s,n){let r,i;try{r=await t}catch(i){}try{await e.runCallbacks("handlerDidRespond",{event:n,request:s,response:r}),await e.doneWaiting()}catch(t){t instanceof Error&&(i=t)}if(await e.runCallbacks("handlerDidComplete",{event:n,request:s,response:r,error:i}),e.destroy(),i)throw i}}function m(t){t.then((()=>{}))}function v(){return v=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n])}return t},v.apply(this,arguments)}let R,q;const b=new WeakMap,D=new WeakMap,U=new WeakMap,E=new WeakMap,x=new WeakMap;let C={get(t,e,s){if(t instanceof IDBTransaction){if("done"===e)return D.get(t);if("objectStoreNames"===e)return t.objectStoreNames||U.get(t);if("store"===e)return s.objectStoreNames[1]?void 0:s.objectStore(s.objectStoreNames[0])}return L(t[e])},set:(t,e,s)=>(t[e]=s,!0),has:(t,e)=>t instanceof IDBTransaction&&("done"===e||"store"===e)||e in t};function O(t){return t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(q||(q=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(I(this),e),L(b.get(this))}:function(...e){return L(t.apply(I(this),e))}:function(e,...s){const n=t.call(I(this),e,...s);return U.set(n,e.sort?e.sort():[e]),L(n)}}function N(t){return"function"==typeof t?O(t):(t instanceof IDBTransaction&&function(t){if(D.has(t))return;const e=new Promise(((e,s)=>{const n=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",i),t.removeEventListener("abort",i)},r=()=>{e(),n()},i=()=>{s(t.error||new DOMException("AbortError","AbortError")),n()};t.addEventListener("complete",r),t.addEventListener("error",i),t.addEventListener("abort",i)}));D.set(t,e)}(t),e=t,(R||(R=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some((t=>e instanceof t))?new Proxy(t,C):t);var e}function L(t){if(t instanceof IDBRequest)return function(t){const e=new Promise(((e,s)=>{const n=()=>{t.removeEventListener("success",r),t.removeEventListener("error",i)},r=()=>{e(L(t.result)),n()},i=()=>{s(t.error),n()};t.addEventListener("success",r),t.addEventListener("error",i)}));return e.then((e=>{e instanceof IDBCursor&&b.set(e,t)})).catch((()=>{})),x.set(e,t),e}(t);if(E.has(t))return E.get(t);const e=N(t);return e!==t&&(E.set(t,e),x.set(e,t)),e}const I=t=>x.get(t);const k=["get","getKey","getAll","getAllKeys","count"],T=["put","add","delete","clear"],P=new Map;function j(t,e){if(!(t instanceof IDBDatabase)||e in t||"string"!=typeof e)return;if(P.get(e))return P.get(e);const s=e.replace(/FromIndex$/,""),n=e!==s,r=T.includes(s);if(!(s in(n?IDBIndex:IDBObjectStore).prototype)||!r&&!k.includes(s))return;const i=async function(t,...e){const i=this.transaction(t,r?"readwrite":"readonly");let a=i.store;return n&&(a=a.index(e.shift())),(await Promise.all([a[s](...e),r&&i.done]))[0]};return P.set(e,i),i}C=(t=>v({},t,{get:(e,s,n)=>j(e,s)||t.get(e,s,n),has:(e,s)=>!!j(e,s)||t.has(e,s)}))(C);try{self["workbox:expiration:6.5.3"]&&_()}catch(t){}const B="cache-entries",W=t=>{const e=new URL(t,location.href);return e.hash="",e.href};class M{constructor(t){this.U=null,this._=t}C(t){const e=t.createObjectStore(B,{keyPath:"id"});e.createIndex("cacheName","cacheName",{unique:!1}),e.createIndex("timestamp","timestamp",{unique:!1})}O(t){this.C(t),this._&&function(t,{blocked:e}={}){const s=indexedDB.deleteDatabase(t);e&&s.addEventListener("blocked",(()=>e())),L(s).then((()=>{}))}(this._)}async setTimestamp(t,e){const s={url:t=W(t),timestamp:e,cacheName:this._,id:this.N(t)},n=(await this.getDb()).transaction(B,"readwrite",{durability:"relaxed"});await n.store.put(s),await n.done}async getTimestamp(t){const e=await this.getDb(),s=await e.get(B,this.N(t));return null==s?void 0:s.timestamp}async expireEntries(t,e){const s=await this.getDb();let n=await s.transaction(B).store.index("timestamp").openCursor(null,"prev");const r=[];let i=0;for(;n;){const s=n.value;s.cacheName===this._&&(t&&s.timestamp<t||e&&i>=e?r.push(n.value):i++),n=await n.continue()}const a=[];for(const t of r)await s.delete(B,t.id),a.push(t.url);return a}N(t){return this._+"|"+W(t)}async getDb(){return this.U||(this.U=await function(t,e,{blocked:s,upgrade:n,blocking:r,terminated:i}={}){const a=indexedDB.open(t,e),o=L(a);return n&&a.addEventListener("upgradeneeded",(t=>{n(L(a.result),t.oldVersion,t.newVersion,L(a.transaction))})),s&&a.addEventListener("blocked",(()=>s())),o.then((t=>{i&&t.addEventListener("close",(()=>i())),r&&t.addEventListener("versionchange",(()=>r()))})).catch((()=>{})),o}("workbox-expiration",1,{upgrade:this.O.bind(this)})),this.U}}class S{constructor(t,e={}){this.L=!1,this.I=!1,this.k=e.maxEntries,this.T=e.maxAgeSeconds,this.P=e.matchOptions,this._=t,this.j=new M(t)}async expireEntries(){if(this.L)return void(this.I=!0);this.L=!0;const t=this.T?Date.now()-1e3*this.T:0,e=await this.j.expireEntries(t,this.k),s=await self.caches.open(this._);for(const t of e)await s.delete(t,this.P);this.L=!1,this.I&&(this.I=!1,m(this.expireEntries()))}async updateTimestamp(t){await this.j.setTimestamp(t,Date.now())}async isURLExpired(t){if(this.T){const e=await this.j.getTimestamp(t),s=Date.now()-1e3*this.T;return void 0===e||e<s}return!1}async delete(){this.I=!1,await this.j.expireEntries(1/0)}}try{self["workbox:range-requests:6.5.3"]&&_()}catch(t){}async function A(t,e){try{if(206===e.status)return e;const n=t.headers.get("range");if(!n)throw new s("no-range-header");const r=function(t){const e=t.trim().toLowerCase();if(!e.startsWith("bytes="))throw new s("unit-must-be-bytes",{normalizedRangeHeader:e});if(e.includes(","))throw new s("single-range-only",{normalizedRangeHeader:e});const n=/(\d*)-(\d*)/.exec(e);if(!n||!n[1]&&!n[2])throw new s("invalid-range-values",{normalizedRangeHeader:e});return{start:""===n[1]?void 0:Number(n[1]),end:""===n[2]?void 0:Number(n[2])}}(n),i=await e.blob(),a=function(t,e,n){const r=t.size;if(n&&n>r||e&&e<0)throw new s("range-not-satisfiable",{size:r,end:n,start:e});let i,a;return void 0!==e&&void 0!==n?(i=e,a=n+1):void 0!==e&&void 0===n?(i=e,a=r):void 0!==n&&void 0===e&&(i=r-n,a=r),{start:i,end:a}}(i,r.start,r.end),o=i.slice(a.start,a.end),c=o.size,h=new Response(o,{status:206,statusText:"Partial Content",headers:e.headers});return h.headers.set("Content-Length",String(c)),h.headers.set("Content-Range",`bytes ${a.start}-${a.end-1}/${i.size}`),h}catch(t){return new Response("",{status:416,statusText:"Range Not Satisfiable"})}}try{self["workbox:core:6.5.3"]&&_()}catch(t){}const F=(t,...e)=>{let s=t;return e.length>0&&(s+=` :: ${JSON.stringify(e)}`),s};class K extends Error{constructor(t,e){super(F(t,e)),this.name=t,this.details=e}}try{self["workbox:routing:6.5.3"]&&_()}catch(t){}const H=t=>t&&"object"==typeof t?t:{handle:t};class ${constructor(t,e,s="GET"){this.handler=H(e),this.match=t,this.method=s}setCatchHandler(t){this.catchHandler=H(t)}}class z extends ${constructor(t,e,s){super((({url:e})=>{const s=t.exec(e.href);if(s&&(e.origin===location.origin||0===s.index))return s.slice(1)}),e,s)}}class G{constructor(){this.t=new Map,this.i=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",(t=>{const{request:e}=t,s=this.handleRequest({request:e,event:t});s&&t.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(t=>{if(t.data&&"CACHE_URLS"===t.data.type){const{payload:e}=t.data,s=Promise.all(e.urlsToCache.map((e=>{"string"==typeof e&&(e=[e]);const s=new Request(...e);return this.handleRequest({request:s,event:t})})));t.waitUntil(s),t.ports&&t.ports[0]&&s.then((()=>t.ports[0].postMessage(!0)))}}))}handleRequest({request:t,event:e}){const s=new URL(t.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:r,route:i}=this.findMatchingRoute({event:e,request:t,sameOrigin:n,url:s});let a=i&&i.handler;const o=t.method;if(!a&&this.i.has(o)&&(a=this.i.get(o)),!a)return;let c;try{c=a.handle({url:s,request:t,event:e,params:r})}catch(t){c=Promise.reject(t)}const h=i&&i.catchHandler;return c instanceof Promise&&(this.o||h)&&(c=c.catch((async n=>{if(h)try{return await h.handle({url:s,request:t,event:e,params:r})}catch(t){t instanceof Error&&(n=t)}if(this.o)return this.o.handle({url:s,request:t,event:e});throw n}))),c}findMatchingRoute({url:t,sameOrigin:e,request:s,event:n}){const r=this.t.get(s.method)||[];for(const i of r){let r;const a=i.match({url:t,sameOrigin:e,request:s,event:n});if(a)return r=a,(Array.isArray(r)&&0===r.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"==typeof a)&&(r=void 0),{route:i,params:r}}return{}}setDefaultHandler(t,e="GET"){this.i.set(e,H(t))}setCatchHandler(t){this.o=H(t)}registerRoute(t){this.t.has(t.method)||this.t.set(t.method,[]),this.t.get(t.method).push(t)}unregisterRoute(t){if(!this.t.has(t.method))throw new K("unregister-route-but-not-found-with-method",{method:t.method});const e=this.t.get(t.method).indexOf(t);if(!(e>-1))throw new K("unregister-route-route-not-registered");this.t.get(t.method).splice(e,1)}}let V;const J={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},Q=t=>[J.prefix,t,J.suffix].filter((t=>t&&t.length>0)).join("-"),X=t=>t||Q(J.precache),Y=t=>t||Q(J.runtime);function Z(t,e){const s=e();return t.waitUntil(s),s}try{self["workbox:precaching:6.5.3"]&&_()}catch(t){}function tt(t){if(!t)throw new K("add-to-cache-list-unexpected-type",{entry:t});if("string"==typeof t){const e=new URL(t,location.href);return{cacheKey:e.href,url:e.href}}const{revision:e,url:s}=t;if(!s)throw new K("add-to-cache-list-unexpected-type",{entry:t});if(!e){const t=new URL(s,location.href);return{cacheKey:t.href,url:t.href}}const n=new URL(s,location.href),r=new URL(s,location.href);return n.searchParams.set("__WB_REVISION__",e),{cacheKey:n.href,url:r.href}}class et{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:t,state:e})=>{e&&(e.originalRequest=t)},this.cachedResponseWillBeUsed=async({event:t,state:e,cachedResponse:s})=>{if("install"===t.type&&e&&e.originalRequest&&e.originalRequest instanceof Request){const t=e.originalRequest.url;s?this.notUpdatedURLs.push(t):this.updatedURLs.push(t)}return s}}}class st{constructor({precacheController:t}){this.cacheKeyWillBeUsed=async({request:t,params:e})=>{const s=(null==e?void 0:e.cacheKey)||this.B.getCacheKeyForURL(t.url);return s?new Request(s,{headers:t.headers}):t},this.B=t}}let nt;async function rt(t,e){let s=null;if(t.url){s=new URL(t.url).origin}if(s!==self.location.origin)throw new K("cross-origin-copy-response",{origin:s});const n=t.clone(),r={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},i=e?e(r):r,a=function(){if(void 0===nt){const t=new Response("");if("body"in t)try{new Response(t.body),nt=!0}catch(t){nt=!1}nt=!1}return nt}()?n.body:await n.blob();return new Response(a,i)}function it(t,e){const s=new URL(t);for(const t of e)s.searchParams.delete(t);return s.href}class at{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}const ot=new Set;try{self["workbox:strategies:6.5.3"]&&_()}catch(t){}function ct(t){return"string"==typeof t?new Request(t):t}class ht{constructor(t,e){this.h={},Object.assign(this,e),this.event=e.event,this.u=t,this.l=new at,this.p=[],this.g=[...t.plugins],this.m=new Map;for(const t of this.g)this.m.set(t,{});this.event.waitUntil(this.l.promise)}async fetch(t){const{event:e}=this;let s=ct(t);if("navigate"===s.mode&&e instanceof FetchEvent&&e.preloadResponse){const t=await e.preloadResponse;if(t)return t}const n=this.hasCallback("fetchDidFail")?s.clone():null;try{for(const t of this.iterateCallbacks("requestWillFetch"))s=await t({request:s.clone(),event:e})}catch(t){if(t instanceof Error)throw new K("plugin-error-request-will-fetch",{thrownErrorMessage:t.message})}const r=s.clone();try{let t;t=await fetch(s,"navigate"===s.mode?void 0:this.u.fetchOptions);for(const s of this.iterateCallbacks("fetchDidSucceed"))t=await s({event:e,request:r,response:t});return t}catch(t){throw n&&await this.runCallbacks("fetchDidFail",{error:t,event:e,originalRequest:n.clone(),request:r.clone()}),t}}async fetchAndCachePut(t){const e=await this.fetch(t),s=e.clone();return this.waitUntil(this.cachePut(t,s)),e}async cacheMatch(t){const e=ct(t);let s;const{cacheName:n,matchOptions:r}=this.u,i=await this.getCacheKey(e,"read"),a=Object.assign(Object.assign({},r),{cacheName:n});s=await caches.match(i,a);for(const t of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await t({cacheName:n,matchOptions:r,cachedResponse:s,request:i,event:this.event})||void 0;return s}async cachePut(t,e){const s=ct(t);var n;await(n=0,new Promise((t=>setTimeout(t,n))));const r=await this.getCacheKey(s,"write");if(!e)throw new K("cache-put-with-no-response",{url:(i=r.url,new URL(String(i),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var i;const a=await this.v(e);if(!a)return!1;const{cacheName:o,matchOptions:c}=this.u,h=await self.caches.open(o),u=this.hasCallback("cacheDidUpdate"),l=u?await async function(t,e,s,n){const r=it(e.url,s);if(e.url===r)return t.match(e,n);const i=Object.assign(Object.assign({},n),{ignoreSearch:!0}),a=await t.keys(e,i);for(const e of a)if(r===it(e.url,s))return t.match(e,n)}(h,r.clone(),["__WB_REVISION__"],c):null;try{await h.put(r,u?a.clone():a)}catch(t){if(t instanceof Error)throw"QuotaExceededError"===t.name&&await async function(){for(const t of ot)await t()}(),t}for(const t of this.iterateCallbacks("cacheDidUpdate"))await t({cacheName:o,oldResponse:l,newResponse:a.clone(),request:r,event:this.event});return!0}async getCacheKey(t,e){const s=`${t.url} | ${e}`;if(!this.h[s]){let n=t;for(const t of this.iterateCallbacks("cacheKeyWillBeUsed"))n=ct(await t({mode:e,request:n,event:this.event,params:this.params}));this.h[s]=n}return this.h[s]}hasCallback(t){for(const e of this.u.plugins)if(t in e)return!0;return!1}async runCallbacks(t,e){for(const s of this.iterateCallbacks(t))await s(e)}*iterateCallbacks(t){for(const e of this.u.plugins)if("function"==typeof e[t]){const s=this.m.get(e),n=n=>{const r=Object.assign(Object.assign({},n),{state:s});return e[t](r)};yield n}}waitUntil(t){return this.p.push(t),t}async doneWaiting(){let t;for(;t=this.p.shift();)await t}destroy(){this.l.resolve(null)}async v(t){let e=t,s=!1;for(const t of this.iterateCallbacks("cacheWillUpdate"))if(e=await t({request:this.request,response:e,event:this.event})||void 0,s=!0,!e)break;return s||e&&200!==e.status&&(e=void 0),e}}class ut extends class{constructor(t={}){this.cacheName=Y(t.cacheName),this.plugins=t.plugins||[],this.fetchOptions=t.fetchOptions,this.matchOptions=t.matchOptions}handle(t){const[e]=this.handleAll(t);return e}handleAll(t){t instanceof FetchEvent&&(t={event:t,request:t.request});const e=t.event,s="string"==typeof t.request?new Request(t.request):t.request,n="params"in t?t.params:void 0,r=new ht(this,{event:e,request:s,params:n}),i=this.R(r,s,e);return[i,this.q(i,r,s,e)]}async R(t,e,s){let n;await t.runCallbacks("handlerWillStart",{event:s,request:e});try{if(n=await this.D(e,t),!n||"error"===n.type)throw new K("no-response",{url:e.url})}catch(r){if(r instanceof Error)for(const i of t.iterateCallbacks("handlerDidError"))if(n=await i({error:r,event:s,request:e}),n)break;if(!n)throw r}for(const r of t.iterateCallbacks("handlerWillRespond"))n=await r({event:s,request:e,response:n});return n}async q(t,e,s,n){let r,i;try{r=await t}catch(i){}try{await e.runCallbacks("handlerDidRespond",{event:n,request:s,response:r}),await e.doneWaiting()}catch(t){t instanceof Error&&(i=t)}if(await e.runCallbacks("handlerDidComplete",{event:n,request:s,response:r,error:i}),e.destroy(),i)throw i}}{constructor(t={}){t.cacheName=X(t.cacheName),super(t),this.W=!1!==t.fallbackToNetwork,this.plugins.push(ut.copyRedirectedCacheableResponsesPlugin)}async D(t,e){const s=await e.cacheMatch(t);return s||(e.event&&"install"===e.event.type?await this.M(t,e):await this.S(t,e))}async S(t,e){let s;const n=e.params||{};if(!this.W)throw new K("missing-precache-entry",{cacheName:this.cacheName,url:t.url});{const r=n.integrity,i=t.integrity,a=!i||i===r;s=await e.fetch(new Request(t,{integrity:"no-cors"!==t.mode?i||r:void 0})),r&&a&&"no-cors"!==t.mode&&(this.A(),await e.cachePut(t,s.clone()))}return s}async M(t,e){this.A();const s=await e.fetch(t);if(!await e.cachePut(t,s.clone()))throw new K("bad-precaching-response",{url:t.url,status:s.status});return s}A(){let t=null,e=0;for(const[s,n]of this.plugins.entries())n!==ut.copyRedirectedCacheableResponsesPlugin&&(n===ut.defaultPrecacheCacheabilityPlugin&&(t=s),n.cacheWillUpdate&&e++);0===e?this.plugins.push(ut.defaultPrecacheCacheabilityPlugin):e>1&&null!==t&&this.plugins.splice(t,1)}}ut.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:t})=>!t||t.status>=400?null:t},ut.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:t})=>t.redirected?await rt(t):t};class lt{constructor({cacheName:t,plugins:e=[],fallbackToNetwork:s=!0}={}){this.F=new Map,this.K=new Map,this.H=new Map,this.u=new ut({cacheName:X(t),plugins:[...e,new st({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this.u}precache(t){this.addToCacheList(t),this.$||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this.$=!0)}addToCacheList(t){const e=[];for(const s of t){"string"==typeof s?e.push(s):s&&void 0===s.revision&&e.push(s.url);const{cacheKey:t,url:n}=tt(s),r="string"!=typeof s&&s.revision?"reload":"default";if(this.F.has(n)&&this.F.get(n)!==t)throw new K("add-to-cache-list-conflicting-entries",{firstEntry:this.F.get(n),secondEntry:t});if("string"!=typeof s&&s.integrity){if(this.H.has(t)&&this.H.get(t)!==s.integrity)throw new K("add-to-cache-list-conflicting-integrities",{url:n});this.H.set(t,s.integrity)}if(this.F.set(n,t),this.K.set(n,r),e.length>0){const t=`Workbox is precaching URLs without revision info: ${e.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(t)}}}install(t){return Z(t,(async()=>{const e=new et;this.strategy.plugins.push(e);for(const[e,s]of this.F){const n=this.H.get(s),r=this.K.get(e),i=new Request(e,{integrity:n,cache:r,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:i,event:t}))}const{updatedURLs:s,notUpdatedURLs:n}=e;return{updatedURLs:s,notUpdatedURLs:n}}))}activate(t){return Z(t,(async()=>{const t=await self.caches.open(this.strategy.cacheName),e=await t.keys(),s=new Set(this.F.values()),n=[];for(const r of e)s.has(r.url)||(await t.delete(r),n.push(r.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this.F}getCachedURLs(){return[...this.F.keys()]}getCacheKeyForURL(t){const e=new URL(t,location.href);return this.F.get(e.href)}getIntegrityForCacheKey(t){return this.H.get(t)}async matchPrecache(t){const e=t instanceof Request?t.url:t,s=this.getCacheKeyForURL(e);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(t){const e=this.getCacheKeyForURL(t);if(!e)throw new K("non-precached-url",{url:t});return s=>(s.request=new Request(t),s.params=Object.assign({cacheKey:e},s.params),this.strategy.handle(s))}}let ft;const wt=()=>(ft||(ft=new lt),ft);class dt extends ${constructor(t,e){super((({request:s})=>{const n=t.getURLsToCacheKeys();for(const r of function*(t,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:n=!0,urlManipulation:r}={}){const i=new URL(t,location.href);i.hash="",yield i.href;const a=function(t,e=[]){for(const s of[...t.searchParams.keys()])e.some((t=>t.test(s)))&&t.searchParams.delete(s);return t}(i,e);if(yield a.href,s&&a.pathname.endsWith("/")){const t=new URL(a.href);t.pathname+=s,yield t.href}if(n){const t=new URL(a.href);t.pathname+=".html",yield t.href}if(r){const t=r({url:i});for(const e of t)yield e.href}}(s.url,e)){const e=n.get(r);if(e){return{cacheKey:e,integrity:t.getIntegrityForCacheKey(e)}}}}),t.strategy)}}function pt(t){const e=wt();!function(t,e,s){let n;if("string"==typeof t){const r=new URL(t,location.href);n=new $((({url:t})=>t.href===r.href),e,s)}else if(t instanceof RegExp)n=new z(t,e,s);else if("function"==typeof t)n=new $(t,e,s);else{if(!(t instanceof $))throw new K("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});n=t}(V||(V=new G,V.addFetchListener(),V.addCacheListener()),V).registerRoute(n)}(new dt(e,t))}t.CacheFirst=class extends g{async D(t,e){let n,r=await e.cacheMatch(t);if(!r)try{r=await e.fetchAndCachePut(t)}catch(t){t instanceof Error&&(n=t)}if(!r)throw new s("no-response",{url:t.url,error:n});return r}},t.ExpirationPlugin=class{constructor(t={}){this.cachedResponseWillBeUsed=async({event:t,request:e,cacheName:s,cachedResponse:n})=>{if(!n)return null;const r=this.G(n),i=this.V(s);m(i.expireEntries());const a=i.updateTimestamp(e.url);if(t)try{t.waitUntil(a)}catch(t){}return r?n:null},this.cacheDidUpdate=async({cacheName:t,request:e})=>{const s=this.V(t);await s.updateTimestamp(e.url),await s.expireEntries()},this.J=t,this.T=t.maxAgeSeconds,this.X=new Map,t.purgeOnQuotaError&&function(t){d.add(t)}((()=>this.deleteCacheAndMetadata()))}V(t){if(t===l())throw new s("expire-custom-caches-only");let e=this.X.get(t);return e||(e=new S(t,this.J),this.X.set(t,e)),e}G(t){if(!this.T)return!0;const e=this.Y(t);if(null===e)return!0;return e>=Date.now()-1e3*this.T}Y(t){if(!t.headers.has("date"))return null;const e=t.headers.get("date"),s=new Date(e).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[t,e]of this.X)await self.caches.delete(t),await e.delete();this.X=new Map}},t.NetworkFirst=class extends g{constructor(t={}){super(t),this.plugins.some((t=>"cacheWillUpdate"in t))||this.plugins.unshift(c),this.Z=t.networkTimeoutSeconds||0}async D(t,e){const n=[],r=[];let i;if(this.Z){const{id:s,promise:a}=this.tt({request:t,logs:n,handler:e});i=s,r.push(a)}const a=this.et({timeoutId:i,request:t,logs:n,handler:e});r.push(a);const o=await e.waitUntil((async()=>await e.waitUntil(Promise.race(r))||await a)());if(!o)throw new s("no-response",{url:t.url});return o}tt({request:t,logs:e,handler:s}){let n;return{promise:new Promise((e=>{n=setTimeout((async()=>{e(await s.cacheMatch(t))}),1e3*this.Z)})),id:n}}async et({timeoutId:t,request:e,logs:s,handler:n}){let r,i;try{i=await n.fetchAndCachePut(e)}catch(t){t instanceof Error&&(r=t)}return t&&clearTimeout(t),!r&&i||(i=await n.cacheMatch(e)),i}},t.RangeRequestsPlugin=class{constructor(){this.cachedResponseWillBeUsed=async({request:t,cachedResponse:e})=>e&&t.headers.has("range")?await A(t,e):e}},t.StaleWhileRevalidate=class extends g{constructor(t={}){super(t),this.plugins.some((t=>"cacheWillUpdate"in t))||this.plugins.unshift(c)}async D(t,e){const n=e.fetchAndCachePut(t).catch((()=>{}));e.waitUntil(n);let r,i=await e.cacheMatch(t);if(i);else try{i=await n}catch(t){t instanceof Error&&(r=t)}if(!i)throw new s("no-response",{url:t.url,error:r});return i}},t.cleanupOutdatedCaches=function(){self.addEventListener("activate",(t=>{const e=X();t.waitUntil((async(t,e="-precache-")=>{const s=(await self.caches.keys()).filter((s=>s.includes(e)&&s.includes(self.registration.scope)&&s!==t));return await Promise.all(s.map((t=>self.caches.delete(t)))),s})(e).then((t=>{})))}))},t.clientsClaim=function(){self.addEventListener("activate",(()=>self.clients.claim()))},t.precacheAndRoute=function(t,e){!function(t){wt().precache(t)}(t),pt(e)},t.registerRoute=function(t,e,n){let c;if("string"==typeof t){const s=new URL(t,location.href);c=new r((({url:t})=>t.href===s.href),e,n)}else if(t instanceof RegExp)c=new i(t,e,n);else if("function"==typeof t)c=new r(t,e,n);else{if(!(t instanceof r))throw new s("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});c=t}return(o||(o=new a,o.addFetchListener(),o.addCacheListener()),o).registerRoute(c),c}}));