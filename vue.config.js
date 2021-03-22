module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        host: '0.0.0.0',
        port: '8400',
        proxy: {
            '/api':{
                target:'http://156.234.211.62:9200',
                // target:'http://192.168.1.169:9200/',
                // target:'http://192.168.1.125:9200/',
                changeOrigin:true,
                pathRewrite:{
                    ['^'+'/api']:''
                }
            }
        }
    }
    // devServer: {
    //     host: '0.0.0.0',
    //     port: port,
    //     open: true,
    //     proxy: {
    //       // detail: https://cli.vuejs.org/config/#devserver-proxy
    //       [process.env.VUE_APP_BASE_API]: {
    //         //target: `http://192.168.1.188:9200/`,
    //         target: `http://81.71.27.180:9200/`,
    //         //target: `http://192.168.1.125:9200/`,
    //         changeOrigin: true,
    //         pathRewrite: {
    //           ['^' + 'http://192.168.1.169:9009']: ''
    //         }
    //       }
    //     },
    //     disableHostCheck: true
    // },
}