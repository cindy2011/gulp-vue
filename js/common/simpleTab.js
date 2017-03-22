/**
 * 选项卡插件
 * 支持：静态，带ajax分页
 * 事件：mousemove click
 */
function Tab(options){
    //默认参数
    this.settings={
       event:'click',
       childTitle:'',
       childCon :'',
       btnClass :'active',
       parent : ''
    }
    A.copy(options,this.settings)
    this.init()
}

Tab.prototype.init=function(){
    
    this.iNum=0
    this.timer=null
    this.index=null
    this.oParent=A(this.settings.parent)
    this.aTitBtn=this.oParent.find(this.settings.childTitle)
    this.aTabCon=this.oParent.find(this.settings.childCon)
    this.btnClass= this.settings.btnClass
    
    this.tochange()
}

Tab.prototype.tochange=function(){
   
    var _this=this

    this.aTitBtn.on(this.settings.event,function(){
       _this.show(A(this))
    })
    
}

Tab.prototype.show = function(obj){
    obj.addClass(this.btnClass).siblings().removeClass(this.btnClass)
    this.aTabCon.eq(obj.index()).show().siblings().hide()
}

if( typeof  module == 'object' ){
    var A = require('./agility.js')
    module.exports = Tab
}else if(!A){
    console.log('请引入agility!')
}
    