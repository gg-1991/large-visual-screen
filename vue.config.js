// 
// web移动端缓存

const AppCachePlugin = require('appcache-webpack-plugin')
// 外部配置文件
const config = require('./config')
// 时间插件
const moment = require('moment')
//webpack中引入的path[require('path')]是node.js内置的package，用来处理路径的
const path = require('path')
// 一个浏览器调试工具，可以在保存代码的时候，浏览器自动刷新界面
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
// 引入webpack
const webpack = require('webpack');
// gzip打包压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
// 定义个数组来收集需要注入要node模块的插件
const plugins = []
// 常量
const assetsDir = 'css'
// posix兼容方式处理路径 Node.js path 模块提供了一些用于处理文件路径的小工具
const posixJoin = _path => path.posix.join(assetsDir, _path)
const isProd = process.env.NODE_ENV === 'production'
// 在生产环境上
if (process.env.NODE_ENV === 'production') {
    plugins.push(new AppCachePlugin({
        exclude: [/.*\.json$/],
        network: ['*'],
        output: 'manifest.appcache'
    }))
    // 下面是下载的插件的配置
    plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
    }))
}
// 本地开发环境
if (process.env.NODE_ENV === 'development') {
    plugins.push(new BrowserSyncPlugin(
        // BrowserSync options
        {
            // browse to http://localhost:3000/ during development
            host: 'localhost',
            port: 3000,
            // proxy the Webpack Dev Server endpoint
            // (which should be serving on http://localhost:3100/)
            // through BrowserSync
            proxy: 'http://localhost:8080/'
            // server: { baseDir: ['dist'] }
        },
        // plugin options
        {
            // prevent BrowserSync from reloading the page
            // and let Webpack Dev Server take care of this
            reload: true
        }
    ))
      // 下面是下载的插件的配置
    plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
    }))
}

/**
 * 项目发布版本信息：
 * 详情见config.js文件
 */
const date = moment().format('YYMMDDHH')
let versionNumber = ''
if (config['VERSION_NUMBER'] !== '') {
    versionNumber = config['VERSION_NUMBER'] + '.'
}
let projectAbber = ''
if (config['PROJECT_ABBRE'] !== '') {
    projectAbber = config['PROJECT_ABBRE'] + '.'
}
let versionFlag = ''
if (config['VERSION_FLAG'] !== '') {
    versionFlag = '.' + config['VERSION_FLAG']
}
const version = versionNumber + projectAbber + date + versionFlag

// 具体配置惨考文档啊
module.exports = {
    // baseUrl  type:{string} default:'/'
    // 将部署应用程序的基本URL
    // 将部署应用程序的基本URL。
    // 默认情况下，Vue CLI假设您的应用程序将部署在域的根目录下。
    // https://www.my-app.com/。如果应用程序部署在子路径上，则需要使用此选项指定子路径。例如，如果您的应用程序部署在https://www.foobar.com/my-app/，集baseUrl到'/my-app/'.
    // baseUrl: process.env.NODE_ENV === "production" ? "/board/" : "/",

    css: {
        //css预设器配置项
        loaderOptions: {
            postcss: {
                config: {
                    path: __dirname
                }
            },
            sass: {
              prependData: `@import "@/style/var.scss";`
            }
        },
        // 增加版本号
        extract: !isProd ? false : {
            filename: posixJoin(`[name].${version}.css`),
            chunkFilename: posixJoin(`[name].${version}.css`)
        }
    },
    // webpack配置，值位对象时会合并配置，为方法时会改写配置
    configureWebpack: {
        resolve: {
            symlinks: false,
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            }
        },
        // 输出重构  打包编译后的 文件名称  【模块名称.版本号】
        output: {
            filename: `[name].${version}.js`,
            chunkFilename: `[name].${version}.js`
        },
        plugins: plugins,
        name: version
    },

    // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'
    // outputDir: 'dist',

    // pages:{ type:Object,Default:undfind }
    /*
     构建多页面模式的应用程序.每个“页面”都应该有一个相应的JavaScript条目文件。该值应该是一
     个对象，其中键是条目的名称，而该值要么是指定其条目、模板和文件名的对象，要么是指定其条目
     的字符串，
     注意：请保证pages里配置的路径和文件名 在你的文档目录都存在 否则启动服务会报错的
     */
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        },
        version: 'src/version/main.js'
    },
    // when using the entry-only string format,
    // template is inferred to be `public/subpage.html`
    // and falls back to `public/index.html` if not found.
    // Output filename is inferred to be `subpage.html`.
    // subpage: 'src/subpage/main.js'
    // },

    //   lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
    lintOnSave: false,

    // productionSourceMap：{ type:Bollean,default:true } 生产源映射
    // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
    productionSourceMap: false,

    // devServer:{type:Object} 3个属性host,port,https
    // 它支持webPack-dev-server的所有选项
    publicPath: './',  //输出的根路径  默认是/ 如果你的网站是app.com/vue 这更改此配置项
    devServer: {
        port: config['SERVER_PORT'], // 端口号
        host: '0.0.0.0',
        https: false, // https:{type:Boolean}
        open: true, // 配置自动启动浏览器
        // proxy: 'http://localhost:8080' // 配置跨域处理,只有一个代理
        proxy: {
            '/api': {
                target: config['PROXY_TARGET'],
                changeOrigin: false,
                pathRewrite: {
                    '^/api': '' // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
                }
            }
        }
    }
}
