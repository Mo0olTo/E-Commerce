
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/E-Commerce/',
  locale: undefined,
  routes: [
  {
    "renderMode": 0,
    "redirectTo": "/E-Commerce/home",
    "route": "/E-Commerce"
  },
  {
    "renderMode": 0,
    "route": "/E-Commerce/login"
  },
  {
    "renderMode": 0,
    "route": "/E-Commerce/register"
  },
  {
    "renderMode": 0,
    "route": "/E-Commerce/forgot"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-CE5WSIQL.js",
      "chunk-7CQX76C4.js",
      "chunk-GQRRME47.js",
      "chunk-G4YDC7QW.js",
      "chunk-ALIPOMMY.js"
    ],
    "route": "/E-Commerce/home"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-EJAEMIRX.js"
    ],
    "route": "/E-Commerce/cart"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-2AIHA65S.js",
      "chunk-GQRRME47.js",
      "chunk-G4YDC7QW.js"
    ],
    "route": "/E-Commerce/products"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-SMTTAWNB.js",
      "chunk-T43G3RZP.js"
    ],
    "route": "/E-Commerce/brands"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-7NSBGB4C.js",
      "chunk-H7OSJTZK.js"
    ],
    "route": "/E-Commerce/allorders"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-D6IW4N6E.js",
      "chunk-ALIPOMMY.js"
    ],
    "route": "/E-Commerce/categories"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-TY6QJ52Q.js",
      "chunk-H7OSJTZK.js"
    ],
    "route": "/E-Commerce/checkout/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-BWDEDLRS.js",
      "chunk-7CQX76C4.js"
    ],
    "route": "/E-Commerce/wishlist"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-U6S6SIQC.js",
      "chunk-G4YDC7QW.js",
      "chunk-T43G3RZP.js",
      "chunk-ALIPOMMY.js"
    ],
    "route": "/E-Commerce/details/*"
  },
  {
    "renderMode": 0,
    "route": "/E-Commerce/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 3859, hash: '110ff2867fc866104a099af93c75403de16f8a0b09deb37354db7efd904ab600', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1543, hash: 'dfaf22f949bb84f6d3852128b370833d4604284e344e5c7d9cb759409e4158cd', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-2HY7HJ7C.css': {size: 141064, hash: '7Izw0grvoUc', text: () => import('./assets-chunks/styles-2HY7HJ7C_css.mjs').then(m => m.default)}
  },
};
