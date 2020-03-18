export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: "闲云旅游网",
    meta: [{
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "//at.alicdn.com/t/font_1168872_ehvuah8v57g.css"
      }
    ] // 新增全局字体样式
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#fff"
  },
  /*
   ** Global CSS
   */
  css: [
    "element-ui/lib/theme-chalk/index.css",
    "assets/main.css" // 新增自定义的页面过渡样式（文件来自3.4.1）
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["@/plugins/element-ui",
    //这个插件只能用在浏览器，服务器端不可以使用
    //所以配置时需要使用一个对象
    {
      src: "@/plugins/localStorage",
      //强调不能在服务器使用
      ssr: false
    },
    '@/plugins/axios.js',
    {
      src: "@/plugins/vue2editor.js",
      ssr: false
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // baseURL: "http://157.122.54.189:9095" // 新增备用地址
    // baseURL:"http://localhost:1337"
    // baseURL: "http: //120.24.171.137:1337"
    baseURL: "http://liangwei.tech:1337/"
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
