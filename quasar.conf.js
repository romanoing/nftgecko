const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

// Configuration for your app

/* eslint no-undef: "off" */
module.exports = function(ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: ["i18n", "polyfill", "sync", "web3"],

    css: ["app.styl"],

    extras: [
      "roboto-font",
      "material-icons" // optional, you are not bound to it
      // 'ionicons-v4',
      // 'mdi-v3',
      // 'fontawesome-v5',
      // 'eva-icons'
    ],

    // framework: 'all', // --- includes everything; for dev only!
    framework: {
      components: [
        "QLayout",
        "QHeader",
        "QDrawer",
        "QPageContainer",
        "QPage",
        "QToolbar",
        "QToolbarTitle",
        "QBtn",
        "QIcon",
        "QList",
        "QItem",
        "QItemSection",
        "QItemLabel",
        "QInnerLoading",
        "QSpinnerGears",
        "QCard",
        "QCardSection",
        "QSeparator",
        "QTable",
        "QTr",
        "QTd",
        "QInput",
        "QAvatar",
        "QBadge",
        "QFooter",
        "QSpace",
        "QTabs",
        "QTab",
      ],

      directives: ["Ripple"],

      // Quasar plugins
      plugins: ["Notify"]

      // iconSet: 'ionicons-v4'
      // lang: 'de' // Quasar language
    },

    supportIE: false,

    build: {
      scopeHoisting: true,
      vueRouterMode: "history",
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack(cfg) {
        cfg.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /node_modules/,
          options: {
            cache: true
          }
        });
        cfg.plugins.push(
          new CopyWebpackPlugin([
            {
              from: path.resolve(__dirname, "src/contracts/assets/abi"),
              to: "abi"
            },
            {
              from: path.resolve(__dirname, "src/contracts/assets/img"),
              to: "img/contract"
            }
          ])
        );
      }
    },

    devServer: {
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },

    // animations: 'all' --- includes all animations
    animations: [],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: "InjectManifest",
      // workboxOptions: {},
      manifest: {
        name: "CoinGecko NFT Manager",
        short_name: "CoinGecko NFT Manager",
        theme_color: "#8bc53f",
        background_color: "#8bc53f",
        display: "standalone",
        orientation: "portrait",
        Scope: "/",
        start_url: "/",
        icons: [
          {
            src: "statics/images/icons/icon-72x72.png",
            sizes: "72x72",
            type: "image/png"
          },
          {
            src: "statics/images/icons/icon-96x96.png",
            sizes: "96x96",
            type: "image/png"
          },
          {
            src: "statics/images/icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png"
          },
          {
            src: "statics/images/icons/icon-144x144.png",
            sizes: "144x144",
            type: "image/png"
          },
          {
            src: "statics/images/icons/icon-152x152.png",
            sizes: "152x152",
            type: "image/png"
          },
          {
            src: "statics/images/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "statics/images/icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "statics/images/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    },

    cordova: {
      // id: 'org.cordova.quasar.app'
    },

    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack(cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration
        // appId: 'quasar-app'
      }
    }
  };
};
