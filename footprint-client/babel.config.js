module.exports = {
  presets: [
    '@vue/app'
  ],
  // vue-cli脚手架解决跨域
  // proxyTable: {
  //   '/api': {
  //     target: 'http://xxxxxx.com', // 接口的域名
  //     // secure: false,  // 如果是https接口，需要配置这个参数
  //     changeOrigin: true, // 如果接口跨域，需要进行这个参数配置，为true的话，请求的header将会设置为匹配目标服务器的规则（Access-Control-Allow-Origin）
  //     pathRewrite: { 
  //       '^/api': '' //本身的接口地址没有 '/api' 这种通用前缀，所以要重写，如果本身有则去掉 
  //     } 
  //   } 
  // }, 
}
