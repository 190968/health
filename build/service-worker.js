"use strict";var precacheConfig=[["/static/myapp/index.html","1f41085098e16cd827816e2d63f51d4c"],["/static/myapp/static/css/main.9b7caed1.css","6aa8bd7ee263514330e26bc331a2ec63"],["/static/myapp/static/js/10.f3f05409.chunk.js","e2097ffb4b88df1be994a558f98bd478"],["/static/myapp/static/js/11.7f59b266.chunk.js","cdca47218a6fa0bfeccca1fd0465d069"],["/static/myapp/static/js/12.a2e35ec2.chunk.js","1fedd02918e4a8b2e83054819237a7ee"],["/static/myapp/static/js/13.6ab0ce39.chunk.js","0e05739688f8065d5581c2bcb64df0b7"],["/static/myapp/static/js/14.1f209ad5.chunk.js","b9b0a8fabbcd6df2e3c9c1189a5fcc8c"],["/static/myapp/static/js/15.d5fd898c.chunk.js","d22dda45592b330d2f44edc34b96eadc"],["/static/myapp/static/js/16.ffa6769b.chunk.js","10f3e83ae254254faa38e7a8414308ce"],["/static/myapp/static/js/17.6bd94154.chunk.js","ed7ee6152a0da40432597a374a9e53ea"],["/static/myapp/static/js/18.76cbe9f8.chunk.js","dcbbb9e3bf189f63f54fe64bcec89368"],["/static/myapp/static/js/19.6e5b6ae7.chunk.js","1940c21ead1233f099785e68669ff933"],["/static/myapp/static/js/21.79c6405e.chunk.js","9d2478cf9cb91a7e6d8b8fa060c6a5ed"],["/static/myapp/static/js/22.a90e7c48.chunk.js","a3fe84f10fe90dd1bfef671e26fb05c3"],["/static/myapp/static/js/23.c1994180.chunk.js","68c0ffdcde9f9329f387812c7a4ba4ea"],["/static/myapp/static/js/24.ceefcd10.chunk.js","27bab4d5c73e87d242b0dd62d1347c31"],["/static/myapp/static/js/25.a5cbbc13.chunk.js","79c013b8a2e5709167baea2235e42a8d"],["/static/myapp/static/js/26.7430cfd7.chunk.js","126cd87ae59e288e80e916efdb2f0388"],["/static/myapp/static/js/27.5798fc73.chunk.js","ebba697553a4b525b7f6f53d86fdd0d6"],["/static/myapp/static/js/28.9a52a628.chunk.js","8976fd427ef412e7f9cc231924ffd966"],["/static/myapp/static/js/29.f35262bb.chunk.js","67bfbaa5ebe7fed72ccff36389b1cd11"],["/static/myapp/static/js/30.31c8de8a.chunk.js","550a35fdf460e6229e112a533b1544cf"],["/static/myapp/static/js/31.c8de22a9.chunk.js","4088109abd4221ee0e16caea5d8155a3"],["/static/myapp/static/js/32.99af25c8.chunk.js","2000cbb5cb37915ca7a0d8196ed12a66"],["/static/myapp/static/js/33.10894e2f.chunk.js","ddb8ae81c1176e0a17a6542d87144a1d"],["/static/myapp/static/js/34.fa6680df.chunk.js","40e10b9d0c5567d0426c16643fa7faef"],["/static/myapp/static/js/35.fe80e47e.chunk.js","8252b3c215575f7a545d15e2e282cf84"],["/static/myapp/static/js/4.15561d0b.chunk.js","738ff6c4898903a953122464b47291c7"],["/static/myapp/static/js/5.e2d31b9a.chunk.js","37857c032d6f6bd29d091e13eb890d3e"],["/static/myapp/static/js/6.16be9a0e.chunk.js","0797a75b8b392f09355876a43698eea7"],["/static/myapp/static/js/7.9a658c0b.chunk.js","fbdffe34dd3ed8a9383f9f29927323d9"],["/static/myapp/static/js/8.daff4dfc.chunk.js","d90699b85a39814d7dc110b64c8c8d79"],["/static/myapp/static/js/9.b00f4c5f.chunk.js","9ca272f2cb7dbf6adacfa809c6c22854"],["/static/myapp/static/js/loginChunk.f8124128.chunk.js","7e7518eb7106ecec9b688ce7c7b533e7"],["/static/myapp/static/js/main.2d7795b4.js","b92854c57d9428a6d5278f2f9dd923cd"],["/static/myapp/static/media/fitango-moo.1fd463a1.svg","1fd463a12765880d928b4392049f83c7"],["/static/myapp/static/media/fitango-moo.4afb0d18.eot","4afb0d187847509d64b628a0914ffd8c"],["/static/myapp/static/media/fitango-moo.71937595.ttf","7193759588d6d68bc21f262c8e3802ec"],["/static/myapp/static/media/fitango-moo.92db3f6b.woff","92db3f6bb0014c9143c08f56a9e85629"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,c){var s=new URL(e);return c&&s.pathname.match(c)||(s.search+=(s.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),s.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],c=new URL(t,self.location),s=createCacheKey(c,hashParamName,a,/\.\w{8}\./);return[c.toString(),s]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(c){return setOfCachedUrls(c).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return c.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),c="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,c),e=urlsToCacheKeys.has(a));var s="/static/myapp/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(s,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});