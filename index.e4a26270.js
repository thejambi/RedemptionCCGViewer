// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"4Kihc":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "a0c473d2e4a26270";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && ![
        'localhost',
        '127.0.0.1',
        '0.0.0.0'
    ].includes(hostname) ? 'wss' : 'ws';
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        disposedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === 'reload') fullReload();
        else if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
                await hmrApplyUpdates(assets);
                hmrDisposeQueue();
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                let processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ('reload' in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"8Cb0M":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "cardDataUrl", ()=>cardDataUrl);
parcelHelpers.export(exports, "cardImageBaseUrl", ()=>cardImageBaseUrl);
parcelHelpers.export(exports, "nameOnlyClass", ()=>nameOnlyClass);
parcelHelpers.export(exports, "copyTextToClipboard", ()=>(0, _rvDataJs.copyTextToClipboard));
var _lzString = require("lz-string");
var _cardJs = require("./Card.js");
var _localStorageJs = require("./LocalStorage.js");
var _rvDataJs = require("./rvData.js");
var cardDataUrl = "https://raw.githubusercontent.com/thejambi/RedemptionLackeyCCG/latest/RedemptionQuick/sets/carddata.txt";
var cardImageBaseUrl = "https://raw.githubusercontent.com/thejambi/RedemptionLackeyCCG/latest/RedemptionQuick/sets/setimages/general/";
/* For Testing: */ var cardDataUrlPrev = "file:///Users/zach/Programming/GitHub/RedemptionLackeyCCG/RedemptionQuick/sets/carddata.txt";
var cardImageBaseUrlPrev = "file:///Users/zach/Programming/GitHub/RedemptionLackeyCCG/RedemptionQuick/sets/setimages/general/";
var nameOnlyClass = "nameOnly";
var cardListText = "";
var cardFilterTextBox;
var filterEchoDiv;
var resultList;
var baseUrl;
var localStorage;
var cardList = [];
var currentlyFiltering = false;
var cardsPerPage = 20; // Number of cards to load per scroll
var loadedCards = 0; // Counter to track how many cards are loaded so far
var copyLinkButton;
var searchLinkUrl;
window.requestAnimationFrame(function() {
    cardFilterTextBox = document.getElementById("cardFilterTextBox");
    resultList = document.getElementById("resultList");
    filterEchoDiv = document.getElementById("filterEcho");
    localStorage = new (0, _localStorageJs.LocalStorage)().storage;
    setBaseUrl();
    loadCardListText();
    prepareCardFilterTextBox();
    if ((0, _rvDataJs.QueryString).f) cardFilterTextBox.value = (0, _rvDataJs.QueryString).f;
    document.getElementById("siteHeading").onclick = function(e) {
        window.location.href = baseUrl;
    };
    copyLinkButton = document.getElementById("copyLinkButton");
    copyLinkButton.onclick = function() {
        copyTextToClipboard(searchLinkUrl, copyLinkButton);
    };
    cardFilterChanged();
});
function setBaseUrl() {
    baseUrl = window.location.href.split(/[?#]/)[0];
}
function prepareCardFilterTextBox() {
    cardFilterTextBox.oninput = function(e) {
        cardFilterChanged();
    };
    cardFilterTextBox.onkeypress = function(e) {
        var code = e.keyCode ? e.keyCode : e.which;
        if (code == 13) cardFilterChanged();
    };
}
function loadCardListText() {
    (0, _rvDataJs.debug)("Loading card list text...");
    fetch(cardDataUrl).then((response)=>response.text()).then((data)=>{
        cardListText = data;
        processCardList();
    }).catch((error)=>{
        console.error('Error fetching card data:', error);
    });
}
function processCardList() {
    (0, _rvDataJs.debug)("Processing card list...");
    var lines = cardListText.split("\n");
    cardList = [];
    for(var i in lines){
        var line = lines[i];
        if (i > 0 && line && line.trim() !== "") cardList.push(new (0, _cardJs.Card)(line));
    }
    if (applyDeckSort) applyDeckSortToCardsList(cardList);
    else if (applyAlphaSort) applyAlphaSortToCardsList(cardList);
}
var timeoutId;
var filterTimeoutWait = 600;
function cardFilterChanged() {
    clearTimeout(timeoutId);
    (0, _rvDataJs.debug)("timeout cleared");
    timeoutId = setTimeout(function() {
        if (!currentlyFiltering) {
            updateSearchLinkUrl();
            filterCards();
        }
    }, filterTimeoutWait);
}
function updateSearchLinkUrl() {
    var urlParams = "f=" + encodeURIComponent(cardFilterTextBox.value.trim());
    if (0, _rvDataJs.compressSearchForShareLink) urlParams = (0, _lzString.compressToEncodedURIComponent)(urlParams);
    searchLinkUrl = baseUrl + "?" + urlParams;
}
var requiredFilterLength = 3;
var applyDeckSort = true;
function filterCards() {
    var filterTextOrig = cardFilterTextBox.value.trim();
    var filterTextFull = cardFilterTextBox.value.trim().toUpperCase();
    filterEchoDiv.innerText = filterTextFull;
    var filterTextList = filterTextFull.split(";");
    (0, _rvDataJs.debug)(filterTextList);
    var resultCards = [];
    /* Text Box Commands */ for(var filterTextIndex in filterTextList){
        var filterText = filterTextList[filterTextIndex];
        if ("SORT:DECK" === filterText) {
            applyDeckSort = true;
            applyAlphaSort = false;
            processCardList();
        }
        if ("SORT:ALPHA" === filterText) {
            applyAlphaSort = true;
            applyDeckSort = false;
            processCardList();
        }
        if ("SORT:OFF" === filterText) {
            applyDeckSort = false;
            applyAlphaSort = false;
            processCardList();
        }
        if ("DEBUG:ON" === filterText) (0, _rvDataJs.setDebugOn)(true);
        else if ("DEBUG:OFF" === filterText) (0, _rvDataJs.setDebugOn)(false);
        if (filterText.includes("CARDDATA:")) {
            var newCardDataUrl = filterTextOrig.substring(filterTextOrig.indexOf(":") + 1);
            setCardDataLocation(newCardDataUrl);
        }
    }
    for(var i in cardList){
        var card = cardList[i];
        if (!resultCards.includes(card)) for(var filterTextIndex in filterTextList){
            var filterText = filterTextList[filterTextIndex];
            if (filterText.length >= requiredFilterLength && cardMatchesFilterText(card, filterText)) {
                resultCards.push(card);
                break; // Break out of filters loop, skip to next card
            }
        }
    }
    // Initialize the scroll loading
    loadedCards = 0;
    resultList.innerHTML = ''; // Clear the current list
    loadMoreCards(resultCards);
    // Set up infinite scrolling
    window.onscroll = function() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) loadMoreCards(resultCards);
    };
}
// Function to load more cards
function loadMoreCards(resultCards) {
    var end = loadedCards + cardsPerPage;
    for(var i = loadedCards; i < end && i < resultCards.length; i++){
        var card = resultCards[i];
        resultList.appendChild(card.getResultListDiv(true));
    }
    loadedCards += cardsPerPage;
    // Stop scroll event listener if all cards are loaded
    if (loadedCards >= resultCards.length) window.onscroll = null;
    // Show about text when no search results
    if (resultCards.length === 0) resultList.appendChild(getAboutDiv());
}
// Define custom orders for .type within .set and .brigade
const typeOrderWithinSet = [
    "Dominant",
    "Artifact",
    "Covenant",
    "Curse",
    "City",
    "Fortress",
    "Site",
    "Lost Soul",
    "DAC",
    "Hero/Evil Character",
    "DAE",
    "GE/EE",
    "Hero/GE"
];
const typeOrderWithinBrigade = [
    "Hero",
    "GE",
    "Evil Character",
    "EE"
];
const goodTypes = [
    "Hero",
    "GE"
];
const evilTypes = [
    "Evil Character",
    "EE"
];
function applyDeckSortToCardsList(cardList) {
    (0, _rvDataJs.debug)("SORTING!");
    // Sorting function
    cardList.sort((a, b)=>{
        // Sort rotation cards to top
        if (a.legality > b.legality) return -1;
        if (a.legality < b.legality) return 1;
        // 1. Sort by .set (alphabetical)
        if (a.set < b.set) return -1;
        if (a.set > b.set) return 1;
        // 2. Sort by .type within .set (based on custom priority)
        let aTypeSetOrder = typeOrderWithinSet.indexOf(a.type);
        let bTypeSetOrder = typeOrderWithinSet.indexOf(b.type);
        if (aTypeSetOrder === -1) aTypeSetOrder = 99;
        if (bTypeSetOrder === -1) bTypeSetOrder = 99;
        if (aTypeSetOrder !== bTypeSetOrder) // Sort according to the custom order
        return aTypeSetOrder - bTypeSetOrder;
        // Next sort Good before bad
        let aGood = goodTypes.indexOf(a.type) >= 0 ? 1 : 2;
        let bGood = goodTypes.indexOf(b.type) >= 0 ? 1 : 2;
        if (aGood !== bGood) return aGood - bGood;
        // 3. Sort by .brigade (alphabetical)
        if (a.brigade < b.brigade) return -1;
        if (a.brigade > b.brigade) return 1;
        // 4. Sort by .type within .brigade (based on custom priority)
        const aTypeBrigadeOrder = typeOrderWithinBrigade.indexOf(a.type);
        const bTypeBrigadeOrder = typeOrderWithinBrigade.indexOf(b.type);
        if (aTypeBrigadeOrder !== bTypeBrigadeOrder) // If either is not in the custom order, they will be treated as having lower priority
        return aTypeBrigadeOrder - bTypeBrigadeOrder;
        // Sort by name last
        if (a.name < b.name) return -1;
        if (b.name < a.name) return 1;
        return 0;
    });
}
function applyAlphaSortToCardsList(cardList) {
    (0, _rvDataJs.debug)("SORTING!");
    // Sorting function
    cardList.sort((a, b)=>{
        // Sort by name
        if (a.name < b.name) return -1;
        if (b.name < a.name) return 1;
        return 0;
    });
}
function cardMatchesFilterText(card, filterText) {
    var filterTextChunks = filterText.trim().split(",");
    var chunkFound = false;
    for(var chunkIndex in filterTextChunks){
        var filterTextChunk = filterTextChunks[chunkIndex].trim();
        if (filterTextChunk.includes(":")) {
            var colonIndex = filterTextChunk.indexOf(":");
            var cardPartStr = filterTextChunk.slice(0, colonIndex);
            if (filterTextChunk.length > colonIndex) {
                var matchValueStr = filterTextChunk.slice(colonIndex + 1);
                var cardPartValue = card.dataLine;
                switch(cardPartStr.toUpperCase()){
                    case "NAME":
                    case "N":
                        cardPartValue = card.name;
                        break;
                    case "SET":
                    case "S":
                        cardPartValue = card.set;
                        break;
                    case "IMGFILE":
                    case "IF":
                        cardPartValue = card.imgFile;
                        break;
                    case "TYPE":
                    case "T":
                        cardPartValue = card.type;
                        break;
                    case "BRIGADE":
                    case "B":
                        cardPartValue = card.brigade;
                        break;
                    case "STRENGTH":
                    case "X/":
                        cardPartValue = card.strength;
                        break;
                    case "TOUGHNESS":
                    case "/X":
                        cardPartValue = card.toughness;
                        break;
                    case "CLASS":
                    case "C":
                        cardPartValue = card.class;
                        break;
                    case "IDENTIFIER":
                    case "I":
                        cardPartValue = card.identifier;
                        break;
                    case "ABILITY":
                    case "A":
                        cardPartValue = card.specialAbility;
                        break;
                    case "RARITY":
                    case "R":
                        cardPartValue = card.rarity;
                        break;
                    case "REFERENCE":
                    case "REF":
                        cardPartValue = card.reference;
                        break;
                    case "TESTAMENT":
                    case "TST":
                    case "TEST":
                        cardPartValue = card.testament;
                        break;
                    case "ALIGNMENT":
                        cardPartValue = card.alignment;
                        break;
                    case "LEGALITY":
                    case "L":
                        cardPartValue = card.legality;
                        if (matchValueStr === "R") matchValueStr = "ROTATION";
                        else if (matchValueStr === "B") matchValueStr = "BANNED";
                        break;
                    default:
                        break;
                }
                if (cardPartValue === undefined) {
                    (0, _rvDataJs.debug)("No value to match on for card: ");
                    (0, _rvDataJs.debug)(card);
                } else chunkFound = cardPartValue.toUpperCase().includes(matchValueStr);
            }
        } else chunkFound = card.dataLine.toUpperCase().includes(filterTextChunk);
        if (!chunkFound) return false;
    }
    return chunkFound;
}
function getAboutDiv() {
    var theDiv = document.createElement("div");
    theDiv.innerHTML = 'Search for cards based on name, set, ability, and more. Use <strong>,</strong> to add another criteria (so, search for <strong>Adam,Fall of Man</strong> to find cards that match both "Fall of Man" and "Adam"). Use <strong>;</strong> to add another search.<br /><p>You can also search certain parts of cards. Begin a part of your search with any of the following to search in that part of the card.</p><p>Name: (or N:) <br />Set: (or S:) <br />Type: (or T:) <br />Brigade: (or B:) <br />Strength: (or X/:) <br />Toughness: (or /X:) <br />Class: (or C:) <br />Identifier: (or I:) <br />Ability: (or A:) <br />Rarity: (or R:) <br />Reference: (or Ref:) <br />Alignment: <br />Legality (or L:) (r, rotation, b, banned) - see rotation legal cards with l:r<br />[Special filter] Testament: (or tst:) <i>OT</i> or <i>NT</i> ';
    // + "<br />[Special sort] Sort:deck (Sort cards by type for a deck listing) "
    NaN;
    NaN;
    return theDiv;
}
function toggleLocalTesting() {
    (0, _rvDataJs.setDebugOn)(true);
    var newCardDataUrl = cardDataUrlPrev;
    cardDataUrlPrev = cardDataUrl;
    cardDataUrl = newCardDataUrl;
    var newImageUrl1 = cardImageBaseUrlPrev;
    cardImageBaseUrlPrev = cardImageBaseUrl;
    cardImageBaseUrl = newImageUrl1;
    (0, _rvDataJs.debug)("Card Data Url: " + cardDataUrl);
    (0, _rvDataJs.debug)("Card Image Url: " + cardImageBaseUrl);
    loadCardListText();
}
function setCardDataLocation(newCardDataUrl) {
    currentlyFiltering = true;
    if (newCardDataUrl.endsWith('carddata.txt') && cardDataUrl !== newCardDataUrl) {
        (0, _rvDataJs.debug)("Loading new card data...");
        cardDataUrlPrev = cardDataUrl;
        cardDataUrl = newCardDataUrl;
        newImageUrl = newCardDataUrl.replace('carddata.txt', 'setimages/general/');
        cardImageBaseUrlPrev = cardImageBaseUrl;
        cardImageBaseUrl = newImageUrl;
        loadCardListText();
    }
    currentlyFiltering = false;
} // function revealMoreCards() {
 // 	var moreCards = resultList.children;
 // 	var numRevealed = 0;
 // 	for (var i = 0; i < moreCards.length && numRevealed < 5; i++) {
 // 		if (moreCards[i].classList.contains(nameOnlyClass)) {
 // 			moreCards[i].click();
 // 			numRevealed++;
 // 		}
 // 	}
 // }

},{"lz-string":"caYjK","./Card.js":"cEaPA","./LocalStorage.js":"7XGIw","./rvData.js":"jqzVh","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"caYjK":[function(require,module,exports,__globalThis) {
// Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
// This work is free. You can redistribute it and/or modify it
// under the terms of the WTFPL, Version 2
// For more information see LICENSE.txt or http://www.wtfpl.net/
//
// For more information, the home page:
// http://pieroxy.net/blog/pages/lz-string/testing.html
//
// LZ-based compression algorithm, version 1.4.5
var LZString = function() {
    // private property
    var f = String.fromCharCode;
    var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
    var baseReverseDic = {};
    function getBaseValue(alphabet, character) {
        if (!baseReverseDic[alphabet]) {
            baseReverseDic[alphabet] = {};
            for(var i = 0; i < alphabet.length; i++)baseReverseDic[alphabet][alphabet.charAt(i)] = i;
        }
        return baseReverseDic[alphabet][character];
    }
    var LZString = {
        compressToBase64: function(input) {
            if (input == null) return "";
            var res = LZString._compress(input, 6, function(a) {
                return keyStrBase64.charAt(a);
            });
            switch(res.length % 4){
                default:
                case 0:
                    return res;
                case 1:
                    return res + "===";
                case 2:
                    return res + "==";
                case 3:
                    return res + "=";
            }
        },
        decompressFromBase64: function(input) {
            if (input == null) return "";
            if (input == "") return null;
            return LZString._decompress(input.length, 32, function(index) {
                return getBaseValue(keyStrBase64, input.charAt(index));
            });
        },
        compressToUTF16: function(input) {
            if (input == null) return "";
            return LZString._compress(input, 15, function(a) {
                return f(a + 32);
            }) + " ";
        },
        decompressFromUTF16: function(compressed) {
            if (compressed == null) return "";
            if (compressed == "") return null;
            return LZString._decompress(compressed.length, 16384, function(index) {
                return compressed.charCodeAt(index) - 32;
            });
        },
        //compress into uint8array (UCS-2 big endian format)
        compressToUint8Array: function(uncompressed) {
            var compressed = LZString.compress(uncompressed);
            var buf = new Uint8Array(compressed.length * 2); // 2 bytes per character
            for(var i = 0, TotalLen = compressed.length; i < TotalLen; i++){
                var current_value = compressed.charCodeAt(i);
                buf[i * 2] = current_value >>> 8;
                buf[i * 2 + 1] = current_value % 256;
            }
            return buf;
        },
        //decompress from uint8array (UCS-2 big endian format)
        decompressFromUint8Array: function(compressed) {
            if (compressed === null || compressed === undefined) return LZString.decompress(compressed);
            else {
                var buf = new Array(compressed.length / 2); // 2 bytes per character
                for(var i = 0, TotalLen = buf.length; i < TotalLen; i++)buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];
                var result = [];
                buf.forEach(function(c) {
                    result.push(f(c));
                });
                return LZString.decompress(result.join(''));
            }
        },
        //compress into a string that is already URI encoded
        compressToEncodedURIComponent: function(input) {
            if (input == null) return "";
            return LZString._compress(input, 6, function(a) {
                return keyStrUriSafe.charAt(a);
            });
        },
        //decompress from an output of compressToEncodedURIComponent
        decompressFromEncodedURIComponent: function(input) {
            if (input == null) return "";
            if (input == "") return null;
            input = input.replace(/ /g, "+");
            return LZString._decompress(input.length, 32, function(index) {
                return getBaseValue(keyStrUriSafe, input.charAt(index));
            });
        },
        compress: function(uncompressed) {
            return LZString._compress(uncompressed, 16, function(a) {
                return f(a);
            });
        },
        _compress: function(uncompressed, bitsPerChar, getCharFromInt) {
            if (uncompressed == null) return "";
            var i, value, context_dictionary = {}, context_dictionaryToCreate = {}, context_c = "", context_wc = "", context_w = "", context_enlargeIn = 2, context_dictSize = 3, context_numBits = 2, context_data = [], context_data_val = 0, context_data_position = 0, ii;
            for(ii = 0; ii < uncompressed.length; ii += 1){
                context_c = uncompressed.charAt(ii);
                if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
                    context_dictionary[context_c] = context_dictSize++;
                    context_dictionaryToCreate[context_c] = true;
                }
                context_wc = context_w + context_c;
                if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) context_w = context_wc;
                else {
                    if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                        if (context_w.charCodeAt(0) < 256) {
                            for(i = 0; i < context_numBits; i++){
                                context_data_val = context_data_val << 1;
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else context_data_position++;
                            }
                            value = context_w.charCodeAt(0);
                            for(i = 0; i < 8; i++){
                                context_data_val = context_data_val << 1 | value & 1;
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else context_data_position++;
                                value = value >> 1;
                            }
                        } else {
                            value = 1;
                            for(i = 0; i < context_numBits; i++){
                                context_data_val = context_data_val << 1 | value;
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else context_data_position++;
                                value = 0;
                            }
                            value = context_w.charCodeAt(0);
                            for(i = 0; i < 16; i++){
                                context_data_val = context_data_val << 1 | value & 1;
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else context_data_position++;
                                value = value >> 1;
                            }
                        }
                        context_enlargeIn--;
                        if (context_enlargeIn == 0) {
                            context_enlargeIn = Math.pow(2, context_numBits);
                            context_numBits++;
                        }
                        delete context_dictionaryToCreate[context_w];
                    } else {
                        value = context_dictionary[context_w];
                        for(i = 0; i < context_numBits; i++){
                            context_data_val = context_data_val << 1 | value & 1;
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else context_data_position++;
                            value = value >> 1;
                        }
                    }
                    context_enlargeIn--;
                    if (context_enlargeIn == 0) {
                        context_enlargeIn = Math.pow(2, context_numBits);
                        context_numBits++;
                    }
                    // Add wc to the dictionary.
                    context_dictionary[context_wc] = context_dictSize++;
                    context_w = String(context_c);
                }
            }
            // Output the code for w.
            if (context_w !== "") {
                if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                    if (context_w.charCodeAt(0) < 256) {
                        for(i = 0; i < context_numBits; i++){
                            context_data_val = context_data_val << 1;
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else context_data_position++;
                        }
                        value = context_w.charCodeAt(0);
                        for(i = 0; i < 8; i++){
                            context_data_val = context_data_val << 1 | value & 1;
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else context_data_position++;
                            value = value >> 1;
                        }
                    } else {
                        value = 1;
                        for(i = 0; i < context_numBits; i++){
                            context_data_val = context_data_val << 1 | value;
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else context_data_position++;
                            value = 0;
                        }
                        value = context_w.charCodeAt(0);
                        for(i = 0; i < 16; i++){
                            context_data_val = context_data_val << 1 | value & 1;
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else context_data_position++;
                            value = value >> 1;
                        }
                    }
                    context_enlargeIn--;
                    if (context_enlargeIn == 0) {
                        context_enlargeIn = Math.pow(2, context_numBits);
                        context_numBits++;
                    }
                    delete context_dictionaryToCreate[context_w];
                } else {
                    value = context_dictionary[context_w];
                    for(i = 0; i < context_numBits; i++){
                        context_data_val = context_data_val << 1 | value & 1;
                        if (context_data_position == bitsPerChar - 1) {
                            context_data_position = 0;
                            context_data.push(getCharFromInt(context_data_val));
                            context_data_val = 0;
                        } else context_data_position++;
                        value = value >> 1;
                    }
                }
                context_enlargeIn--;
                if (context_enlargeIn == 0) {
                    context_enlargeIn = Math.pow(2, context_numBits);
                    context_numBits++;
                }
            }
            // Mark the end of the stream
            value = 2;
            for(i = 0; i < context_numBits; i++){
                context_data_val = context_data_val << 1 | value & 1;
                if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                } else context_data_position++;
                value = value >> 1;
            }
            // Flush the last char
            while(true){
                context_data_val = context_data_val << 1;
                if (context_data_position == bitsPerChar - 1) {
                    context_data.push(getCharFromInt(context_data_val));
                    break;
                } else context_data_position++;
            }
            return context_data.join('');
        },
        decompress: function(compressed) {
            if (compressed == null) return "";
            if (compressed == "") return null;
            return LZString._decompress(compressed.length, 32768, function(index) {
                return compressed.charCodeAt(index);
            });
        },
        _decompress: function(length, resetValue, getNextValue) {
            var dictionary = [], next, enlargeIn = 4, dictSize = 4, numBits = 3, entry = "", result = [], i, w, bits, resb, maxpower, power, c, data = {
                val: getNextValue(0),
                position: resetValue,
                index: 1
            };
            for(i = 0; i < 3; i += 1)dictionary[i] = i;
            bits = 0;
            maxpower = Math.pow(2, 2);
            power = 1;
            while(power != maxpower){
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
            }
            switch(next = bits){
                case 0:
                    bits = 0;
                    maxpower = Math.pow(2, 8);
                    power = 1;
                    while(power != maxpower){
                        resb = data.val & data.position;
                        data.position >>= 1;
                        if (data.position == 0) {
                            data.position = resetValue;
                            data.val = getNextValue(data.index++);
                        }
                        bits |= (resb > 0 ? 1 : 0) * power;
                        power <<= 1;
                    }
                    c = f(bits);
                    break;
                case 1:
                    bits = 0;
                    maxpower = Math.pow(2, 16);
                    power = 1;
                    while(power != maxpower){
                        resb = data.val & data.position;
                        data.position >>= 1;
                        if (data.position == 0) {
                            data.position = resetValue;
                            data.val = getNextValue(data.index++);
                        }
                        bits |= (resb > 0 ? 1 : 0) * power;
                        power <<= 1;
                    }
                    c = f(bits);
                    break;
                case 2:
                    return "";
            }
            dictionary[3] = c;
            w = c;
            result.push(c);
            while(true){
                if (data.index > length) return "";
                bits = 0;
                maxpower = Math.pow(2, numBits);
                power = 1;
                while(power != maxpower){
                    resb = data.val & data.position;
                    data.position >>= 1;
                    if (data.position == 0) {
                        data.position = resetValue;
                        data.val = getNextValue(data.index++);
                    }
                    bits |= (resb > 0 ? 1 : 0) * power;
                    power <<= 1;
                }
                switch(c = bits){
                    case 0:
                        bits = 0;
                        maxpower = Math.pow(2, 8);
                        power = 1;
                        while(power != maxpower){
                            resb = data.val & data.position;
                            data.position >>= 1;
                            if (data.position == 0) {
                                data.position = resetValue;
                                data.val = getNextValue(data.index++);
                            }
                            bits |= (resb > 0 ? 1 : 0) * power;
                            power <<= 1;
                        }
                        dictionary[dictSize++] = f(bits);
                        c = dictSize - 1;
                        enlargeIn--;
                        break;
                    case 1:
                        bits = 0;
                        maxpower = Math.pow(2, 16);
                        power = 1;
                        while(power != maxpower){
                            resb = data.val & data.position;
                            data.position >>= 1;
                            if (data.position == 0) {
                                data.position = resetValue;
                                data.val = getNextValue(data.index++);
                            }
                            bits |= (resb > 0 ? 1 : 0) * power;
                            power <<= 1;
                        }
                        dictionary[dictSize++] = f(bits);
                        c = dictSize - 1;
                        enlargeIn--;
                        break;
                    case 2:
                        return result.join('');
                }
                if (enlargeIn == 0) {
                    enlargeIn = Math.pow(2, numBits);
                    numBits++;
                }
                if (dictionary[c]) entry = dictionary[c];
                else {
                    if (c === dictSize) entry = w + w.charAt(0);
                    else return null;
                }
                result.push(entry);
                // Add w+entry[0] to the dictionary.
                dictionary[dictSize++] = w + entry.charAt(0);
                enlargeIn--;
                w = entry;
                if (enlargeIn == 0) {
                    enlargeIn = Math.pow(2, numBits);
                    numBits++;
                }
            }
        }
    };
    return LZString;
}();
if (typeof define === 'function' && define.amd) define(function() {
    return LZString;
});
else if (module != null) module.exports = LZString;
else if (typeof angular !== 'undefined' && angular != null) angular.module('LZString', []).factory('LZString', function() {
    return LZString;
});

},{}],"cEaPA":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Card", ()=>Card);
parcelHelpers.export(exports, "otBooks", ()=>otBooks);
parcelHelpers.export(exports, "ntBooks", ()=>ntBooks);
var _rvMainJs = require("./rvMain.js");
var _rvData = require("./rvData");
function Card(dataLine) {
    this.name = "";
    this.dataLine = dataLine;
    this.dataParts = dataLine.split("\t");
    if (this.dataParts.length !== 15 && this.dataParts.length !== 16) {
        debug("Card definition not complete: ");
        debug(this.dataLine);
    }
    this.includeOfficialSetField = false;
    if (this.dataParts.length === 16) this.includeOfficialSetField = true;
    var i = 0;
    this.name = this.dataParts[i++];
    this.set = this.dataParts[i++];
    this.imgFile = this.dataParts[i++];
    if (this.includeOfficialSetField) this.officialSet = this.dataParts[i++];
    this.type = this.dataParts[i++];
    this.brigade = this.dataParts[i++];
    this.strength = this.dataParts[i++];
    this.toughness = this.dataParts[i++];
    this.class = this.dataParts[i++];
    this.identifier = this.dataParts[i++];
    this.specialAbility = this.dataParts[i++];
    this.rarity = this.dataParts[i++];
    this.reference = this.dataParts[i++];
    this.unknownValue = this.dataParts[i++];
    this.alignment = this.dataParts[i++];
    this.legality = this.dataParts[i++];
    if (this.imgFile.includes(".jpg")) this.imgFile = this.imgFile.replace(".jpg", "");
    this.decideTestament();
}
var otBooks = [
    'genesis',
    'exodus',
    'leviticus',
    'numbers',
    'deuteronomy',
    'joshua',
    'judges',
    'ruth',
    'samuel',
    'kings',
    'chronicles',
    'ezra',
    'nehemiah',
    'esther',
    'job',
    'psalms',
    'proverbs',
    'ecclesiastes',
    'song of solomon',
    'isaiah',
    'jeremiah',
    'lamentations',
    'ezekiel',
    'daniel',
    'hosea',
    'joel',
    'amos',
    'obadiah',
    'jonah',
    'micah',
    'nahum',
    'habakkuk',
    'zephaniah',
    'haggai',
    'zechariah',
    'malachi'
];
var ntBooks = [
    'matthew',
    'mark',
    'luke',
    'john',
    'acts',
    'romans',
    'corinthians',
    'galatians',
    'ephesians',
    'philippians',
    'colossians',
    'thessalonians',
    'timothy',
    'titus',
    'philemon',
    'hebrews',
    'james',
    'peter',
    'jude',
    'revelation'
];
Card.prototype.decideTestament = function() {
    this.testament = "";
    /** Assuming that a O.T. or N.T. reference in identifier text
	 * also matches the card's given testament identity.
	 * This seems to be the case currently but may not be future-proof.
	 */ if (this.identifier.includes("O.T.")) this.testament += " OT ";
    if (this.identifier.includes("N.T.")) this.testament += " NT ";
    if (this.testament === "") {
        var ref = this.reference.toLowerCase();
        for(var i in otBooks){
            var otBook = otBooks[i];
            if (ref.includes(otBook)) {
                this.testament += " OT ";
                break;
            }
        }
        for(var i in ntBooks){
            var ntBook = ntBooks[i];
            if (ref.includes(ntBook)) {
                this.testament += " NT ";
                yepped = true;
                break;
            }
        }
    }
};
Card.prototype.getResultListDiv = function(shouldBuildImageNow) {
    var imageUrl = (0, _rvMainJs.cardImageBaseUrl) + this.imgFile + ".jpg";
    var theDiv = document.createElement("div");
    theDiv.classList.add("resultCard");
    if (!shouldBuildImageNow) theDiv.classList.add((0, _rvMainJs.nameOnlyClass));
    var nameDiv = document.createElement("div");
    if (0, _rvData.debugOn) nameDiv.style["font-weight"] = "bold";
    nameDiv.style["width"] = "95%";
    nameDiv.style["max-width"] = "346px";
    nameDiv.innerText = this.name;
    var copyImageLinkButton = document.createElement("button");
    copyImageLinkButton.style["float"] = "right";
    copyImageLinkButton.style["display"] = "none";
    copyImageLinkButton.innerText = "Copy Image Link";
    copyImageLinkButton.onclick = (e)=>{
        (0, _rvMainJs.copyTextToClipboard)(imageUrl, copyImageLinkButton);
    };
    nameDiv.appendChild(copyImageLinkButton);
    theDiv.appendChild(nameDiv);
    if (shouldBuildImageNow) {
        var theImg = this.buildImageElement(imageUrl, copyImageLinkButton);
        theDiv.appendChild(theImg);
    } else theDiv.onclick = (e)=>{
        var theImg = this.buildImageElement(imageUrl, copyImageLinkButton);
        theDiv.appendChild(theImg);
        if (0, _rvData.debugOn) theDiv.appendChild(this.buildCardInfoElement());
        theDiv.onclick = null;
        theDiv.classList.remove((0, _rvMainJs.nameOnlyClass));
    };
    if ((0, _rvData.debugOn) && shouldBuildImageNow) theDiv.appendChild(this.buildCardInfoElement());
    // this.addDoubleClickToCardDiv(theDiv);
    return theDiv;
};
Card.prototype.buildImageElement = function(imageUrl, copyImageLinkButton) {
    var theImg = document.createElement("img");
    theImg.src = imageUrl;
    theImg.alt = this.name;
    theImg.title = this.name;
    theImg.onclick = (e)=>{
        copyImageLinkButton.style["display"] = "";
    };
    return theImg;
};
Card.prototype.buildCardInfoElement = function() {
    var cardInfo = document.createElement("div");
    cardInfo.style["font-style"] = "italic";
    cardInfo.innerHTML = this.allPropertiesStringForDisplay();
    return cardInfo;
};
// Card.prototype.addDoubleClickToCardDiv = function(theDiv) {
// 	theDiv.ondblclick = function(e) {
// 		revealMoreCards();
// 	};
// };
Card.prototype.toString = function() {
    return JSON.stringify(this);
};
Card.prototype.allPropertiesString = function() {
    return this.name + this.set + this.imgFile + this.includeOfficialSetField ? this.officialSet : '' + this.type + this.brigade + this.strength + this.toughness + this.class + this.identifier + this.specialAbility + this.rarity + this.reference;
};
Card.prototype.allPropertiesStringForDisplay = function() {
    return "<strong>Name:</strong> " + this.name + " | " + "<strong>Set:</strong> " + this.set + " | " + "<strong>Image Name:</strong> " + this.imgFile + " | " + "<strong>Set Name:</strong> " + this.officialSet + " | " + "<strong>Type:</strong> " + this.type + " | " + "<strong>Brigade:</strong> " + this.brigade + " | " + "<strong>Strength:</strong> " + this.strength + " | " + "<strong>Toughness:</strong> " + this.toughness + " | " + "<strong>Class:</strong> " + this.class + " | " + "<strong>Identifier:</strong> " + this.identifier + " | " + "<strong>Special Ability:</strong> " + this.specialAbility + " | " + "<strong>Rarity:</strong> " + this.rarity + " | " + "<strong>Reference:</strong> " + this.reference + " | " + "<strong>Legality:</strong> " + this.legality;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./rvMain.js":"8Cb0M","./rvData":"jqzVh"}],"gkKU3":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"jqzVh":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "QueryString", ()=>QueryString);
parcelHelpers.export(exports, "debugOn", ()=>debugOn);
parcelHelpers.export(exports, "ios", ()=>ios);
parcelHelpers.export(exports, "runningOnAndroid", ()=>runningOnAndroid);
parcelHelpers.export(exports, "compressSearchForShareLink", ()=>compressSearchForShareLink);
/* --- */ parcelHelpers.export(exports, "debug", ()=>debug);
/* Clipboard */ parcelHelpers.export(exports, "copyTextToClipboard", ()=>copyTextToClipboard);
parcelHelpers.export(exports, "arrayIncludesAll", ()=>arrayIncludesAll);
parcelHelpers.export(exports, "copyArray", ()=>copyArray);
// Array shuffle
parcelHelpers.export(exports, "shuffleArray", ()=>shuffleArray);
parcelHelpers.export(exports, "setDebugOn", ()=>setDebugOn);
var QueryString = function() {
    var query_string = {};
    var query = window.location.search.substring(1);
    if (query.length > 0 && !(query.includes("appType=") || query.includes("f="))) // Decompress first
    query = LZString.decompressFromEncodedURIComponent(query);
    var vars = query.split("&");
    if (query.includes("&amp;")) vars = query.split("&amp;");
    for(var i = 0; i < vars.length; i++){
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") query_string[pair[0]] = decodeURIComponent(pair[1]);
        else if (typeof query_string[pair[0]] === "string") {
            var arr = [
                query_string[pair[0]],
                decodeURIComponent(pair[1])
            ];
            query_string[pair[0]] = arr;
        // If third or later entry with this name
        } else query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
    return query_string;
}();
var debugOn = false;
var ios = false;
var runningOnAndroid = false;
var compressSearchForShareLink = true;
function debug(str) {
    if (debugOn) {
        if (ios || QueryString.appType === 'ios') try {
            webkit.messageHandlers.callbackHandler.postMessage("{debugMessage:" + str + "}");
        } catch (err) {
            console.log('error');
        }
        console.log(str);
    }
}
async function copyTextToClipboard(theText, triggerButton) {
    if (!navigator.clipboard) // Clipboard API not available
    return;
    try {
        await navigator.clipboard.writeText(theText);
        if (triggerButton) {
            var btnText = triggerButton.innerText;
            triggerButton.innerText = "Copied!";
            setTimeout(()=>{
                triggerButton.innerText = btnText;
            }, 3000);
        }
    } catch (err) {
        console.error('Failed to copy!', err);
    }
}
function arrayIncludesAll(array1, array2) {
    for(var i = 0; i < array2.length; i++){
        if (!array1.includes(array2[i])) return false;
    }
    return true;
}
function copyArray(arr) {
    var copyArr = [];
    for(var i = 0; i < arr.length; i++)copyArr.push(arr[i].getCopy());
    return copyArr;
}
function shuffleArray(array) {
    var i = 0, j = 0, temp = null;
    for(i = array.length - 1; i > 0; i -= 1){
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
// polyfill
if (!String.prototype.includes) String.prototype.includes = function(search, start) {
    'use strict';
    if (typeof start !== 'number') start = 0;
    if (start + search.length > this.length) return false;
    else return this.indexOf(search, start) !== -1;
};
if (!Array.prototype.includes) Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
    'use strict';
    if (this == null) throw new TypeError('Array.prototype.includes called on null or undefined');
    var O = Object(this);
    var len = parseInt(O.length, 10) || 0;
    if (len === 0) return false;
    var n = parseInt(arguments[1], 10) || 0;
    var k;
    if (n >= 0) k = n;
    else {
        k = len + n;
        if (k < 0) k = 0;
    }
    var currentElement;
    while(k < len){
        currentElement = O[k];
        if (searchElement === currentElement || searchElement !== searchElement && currentElement !== currentElement) return true;
        k++;
    }
    return false;
};
if (!String.prototype.startsWith) String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
};
if (!String.prototype.endsWith) String.prototype.endsWith = function(searchString, position) {
    var subjectString = this.toString();
    if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) position = subjectString.length;
    position -= searchString.length;
    var lastIndex = subjectString.lastIndexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
};
// Warn if overriding existing method
if (Array.prototype.equals) console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function(array) {
    // if the other array is a falsy value, return
    if (!array) return false;
    // compare lengths - can save a lot of time 
    if (this.length != array.length) return false;
    for(var i = 0, l = this.length; i < l; i++){
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i])) return false;
        } else if (this[i] != array[i]) // Warning - two different object instances will never be equal: {x:20} != {x:20}
        return false;
    }
    return true;
};
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {
    enumerable: false
});
function setDebugOn(value) {
    debugOn = value;
    debug(`Debug mode is now ${debugOn ? 'ON' : 'OFF'}`);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7XGIw":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "LocalStorage", ()=>LocalStorage);
window.fakeStorage = {
    _data: {},
    setItem: function(id, val) {
        return this._data[id] = String(val);
    },
    getItem: function(id) {
        return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
    },
    removeItem: function(id) {
        return delete this._data[id];
    },
    clear: function() {
        return this._data = {};
    }
};
function LocalStorage() {
    var supported = this.localStorageSupported();
    this.storage = supported ? window.localStorage : window.fakeStorage;
}
LocalStorage.prototype.localStorageSupported = function() {
    var testKey = "testRedemptionViewer";
    var storage = window.localStorage;
    try {
        storage.setItem(testKey, "1");
        storage.removeItem(testKey);
        return true;
    } catch (error) {
        return false;
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["4Kihc","8Cb0M"], "8Cb0M", "parcelRequire94c2")

//# sourceMappingURL=index.e4a26270.js.map
