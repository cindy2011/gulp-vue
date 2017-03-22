let Vue = require('vue')
let App = require('../../vue-tempate/tcxt/app.vue')

new Vue({
  el: '#page',  
  render: function (createElement) { 
    return createElement(App) 
  }
})