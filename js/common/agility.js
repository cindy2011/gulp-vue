(function(window){

/**
 * agility是一个模仿jquery的工具库
 * 主要是封装常用底层js, 代替体积较大的jQuery
 * nathen
*/

// 构造器
function Agility(selector){
	return new Agility.fn.init(selector)
}

// 原型
Agility.fn = Agility.prototype = {
	// 修正构造函数
	constructor : Agility,
	// 选择元素  外观模式
	init : function(selector){

		// 如果是单个节点 类似  A(this)
		if( typeof selector == 'object' && !Array.isArray(selector) ){
			this[0] = selector
			this.length = 1
		}else if( typeof selector == 'object' && Array.isArray(selector) ){
		// 如果参数为一个节点数组
			
			for(var i = 0 ;i<selector.length;i++){
				this[i] = selector[i]
			}

			this.length = selector.length

		}else{
		// 如果是字符串
			
			// 单个选择器 
			if( !selector.match(' ') ){

				// 如果是id获取
				if( !selector.indexOf('#') ){
					// 获取单个元素
					this.get(selector)

				}else{
				// 单个选择器 多个元素获取
					
					this.gets(selector,null,selector)
				}
			}else{

			// 多个选择器
				var parentIndex = selector.lastIndexOf(' ')
				//如果是id获取
				if( !selector.slice(parentIndex).indexOf('#') ){
					
					this.get(selector.slice(parentIndex) , document.querySelector(selector.slice(0,parentIndex)))
					
				}else{
				//多个元素获取
					this.gets( selector.slice(parentIndex) , document.querySelector(selector.slice(0,parentIndex)),selector )
					
				}
				
			}
		}
		
		return this

	},
	selector:'',
	length : 0,
	size : function(){
		return this.length
	},
	// 获取单个元素
	get : function(selector,context){
		context = context || document

		this[0] = context.querySelector(selector)
		this.selector = selector
		this.length = 1
	},
	// 获取多个元素
	gets : function(selector,context,sourceSelector){
		
		context = context || document

		var doms = context.querySelectorAll(selector)
		var len  = doms.length
		var i = 0	

		for(;i<len;i++){
			this[i] = doms[i]
		}
		this.selector = sourceSelector
		this.length   = len

	},
	/**
	 * 加入对象进入操作队列
	 */
	add : function(addObj){
		
		var newObj = new Agility.fn.init(this.selector)
		
		for( var i = 0;i<addObj.length;i++ ){
			newObj.push(addObj[i])
		}

		return newObj
	},
	// 查找元素
	find : function(selector){
		// 需返回新一个新的实例去获取元素，切断与原this的冲突
		var newObj = new Agility.fn.init(this.selector + ' ' + selector)
			if(newObj['selector'][0] == ' '){
				newObj['selector'] = newObj['selector'].slice(1) 
			}
		return newObj
	},
	/**
	 * eq
	 * 按index获取元素
	 */
	 eq : function(Index){
	 	return new Agility.fn.init(this[Index])
	 },
	 /**
	  * 获取元素在列表中的下标
	  */
	 index : function(){
	 	
	 	var oParent  = this[0].parentNode
	 	var arr = []
	 	var Index = null

	 	for( var i =0;i<oParent.childNodes.length;i++ ){
	 		if( oParent.childNodes[i].nodeType === 1  ){
	 			arr.push(oParent.childNodes[i])
	 		}
	 	}

	 	for( var i =0;i<arr.length;i++ ){
	 		arr[i].index = i
	 		if(arr[i] == this[0]){
	 			Index = arr[i].index
	 		}
	 	}

	 	return Index

	 },
	/**
	 * 样式获取 or 设置
	 * 当前支持 string参数获取样式、json格式设置多个样式
	 * @return {获取} 样式
	 * @return {设置} 无
	 */
	css : function(){
		// 元素样式数据
		var styleData = window.getComputedStyle(this[0],false)
		var arg = arguments

		// 获取各类样式方法
		var getStyle = {
			width : function(){
				return parseInt(styleData.width)
			},
			// 内容宽 ＋ 填充 ＋ 边距 + 边框
			outerWidth : function(){
				return parseInt(styleData.width) + parseInt(styleData.marginRight) + parseInt(styleData.marginLeft) + parseInt(styleData.paddingRight) + parseInt(styleData.paddingLeft) + parseInt(styleData.borderLeftWidth) + parseInt(styleData.borderRightWidth)
			}
		}

		// 单参数 -> 获取
		if( arg.length == 1 && typeof arg[0] == 'string' ){

			return getStyle[arg[0]]()

		}else if( typeof arg[0] == 'object' ){
		// 多参数 -> 设置
			for(var attr in arg[0]){
				this[0].style[attr] = arg[0][attr]
			}
		}

	},
	/**
	 * 添加class
	 * ie9+
	 */
	addClass : function(classStr){

		var i = 0

		for(;i<this.length;i++){
			this[i].classList.add(classStr)
		}
		
		return this

	},
	/**
	 * [removeClass]
	 * 暂时支持：移除单个class
	 */
	removeClass : function(classStr){
		// maybe -> active active2 acitve3
		
		for(var i = 0 ;i<this.length;i++){
			this[i].classList.remove(classStr)
		}

		return this

	},
	/**
	 * show
	 * 显示元素
	 */
	 show : function(){
	 	for(var i = 0;i<this.length;i++){
	 		this[i].style.display = 'block'
	 	}
	 	return this
	 },
	 /**
	  * hide
	  * 隐藏元素
	  */
	 hide : function(){
	 	for(var i = 0;i<this.length;i++){
	 		this[i].style.display = 'none'
	 	}
	 	return this
	 },
	/**
	 * 选取兄弟元素
	 * 不影响原this情况下 返回新的agility对象
	 */
	siblings : function(selector){
		
		var i = 0
		var arr = []
		var that = this[0]
		var nodes   = this[0].parentNode.childNodes

		for(;i<nodes.length;i++){
			if(nodes[i].nodeType == 1){
				arr.push( nodes[i] )
			}
		}
		
		for(var i = 0;i<nodes.length;i++){
			if(arr[i] == that){
				arr.splice(i,1)
			}
		}

		// 返回筛选完之后的兄弟元素数组
		return new Agility.fn.init(arr)

	},
	/**
	 * 返回元素距离父级的指定样式的值
	 */
	position:function(){
		return {
			left : '0'
		}
	},
	/**
	 * 克隆节点
	 * 当前仅支持 agility对象的克隆
	 * 返回值 -> 原生数组对象
	 */
	clone : function(selector){

		var cloneObj = []

		for(var i = 0;i<this.length;i++){
			cloneObj[i] = (this[i])
		}

		return cloneObj
	},
	prvend : function(elements){

		var eles = elements
		var i =  0
		var len = eles.length
		// 使用文档片段提高效率
		var fragment = document.createDocumentFragment()

		for(; i < len ; i++ ){
			fragment.appendChild(eles[i].cloneNode(true))
		}
		
		this[0].insertBefore(fragment,this[0].firstChild)
		
		return this

	},
	/**
	 * 尾部添加dom节点
	 * 当前仅支持 agility对象的添加
	 * 返回值 无
	 */
	append : function(elements){
		
		var i = 0
		var eles = elements
		var len = eles.length
		// 使用文档片段提高效率
		var fragment = document.createDocumentFragment()

		for(; i<len; i++){
			// 直接添加 效果相当于转移 ；需要复制
			var ele = eles[i].cloneNode(true)
			fragment.appendChild(ele)
		}

		this[0].appendChild(fragment)
		return this
	},
	/**
	 * eventCache
	 * 用以缓存事件名及函数,以便之后移除
	 */
	eventCache : {  },
	/**
	 * 绑定事件
	 * 参数： 函数名 函数
	 * 支持命名空间
	 * 类列表元素支持index属性
	 */
	on : function(names,fn){
		
		if(this.length == 1){
	 		// 需先在dom对象缓存事件，以便之后移除
			this[0][names] = fn
			this[0].addEventListener(names,fn)
		}else{
			var i = 0
			// 多元素添加事件
			for(;i < this.length;i++ ){
				this[i].index = i
				this[i][names] = fn
				this[i].addEventListener(names,fn)
			}
		}
		
		return this
		
	},
	/**
	 * off
	 * 移除事件
	 * 参数：事件名，事件 -> 单一事件移除，性能快
	 * 无参数，移除元素身上所有事件， 方便，性能较慢
	 */
	off : function(names,fn){

		var obj    = this[0]
		var argLen = arguments.length

		if( argLen == 2 ){
			obj.removeEventListener(names,fn)
		}else if( argLen == 0 ){
			for( var j in obj ){
				obj.removeEventListener(j,obj[j])
			}
		}
		
		return this

	},
	/**
	 * animate 时间版动画
	 */
	animate : function(json,times,fx,callfn){

		let that  = this
		let timer = null
		let onOff = true

		let move = this[0] == document.documentElement ? document.body : this[0]
		
		startChange(move,json,times,fx,callfn)

		function startChange(obj,jsons,times,fx,callfn){

			if( onOff ){
				onOff = false
				var startAttr = {}

				for( var attr in jsons ){
					
					startAttr[attr] = getStyle(obj,attr)

				}
				
				var StartTime = new Date().getTime()

				clearInterval(timer)
				
				timer = setInterval(function(){
					// 从0到目标点的所需的当前时间，并且最大不超过动画总时间
					var t = times - Math.max(0, StartTime - now() + times)
					
					for( var attr in jsons ){
						var vals = Math.floor(Tween[fx](t, startAttr[attr], jsons[attr] - startAttr[attr], times) )
						
						if( attr == 'scrollTop' ){
							obj.scrollTop = vals
						}else{
							obj.style[attr] = vals + 'px'
						}

					}

					if( t ==  times){
						clearInterval(timer)
						if(callfn){ callfn();onOff = true }
					}

				},13)
			}
		}
		
		function getStyle( obj,attr){
			if(attr == 'scrollTop'){
				return document.body.scrollTop
			}else{
				return parseInt(document.defaultView.getComputedStyle(obj)[attr])
			}
			
		}

		function now(){
			return (new Date()).getTime()
		}
		
		/*
		 * Tween.js
		 * t: current time（当前时间）；
		 * b: beginning value（初始值）；路程起始值
		 * c: change in value（变化量）；总路程 － 起始值
		 * d: duration（持续时间）。 动画时间
		 * you can visit 'http://easings.net/zh-cn' to get effect
		*/
		var Tween = {
		    linear: function(t, b, c, d) { return c*t/d + b; }
		}

	},
	// 添加数组方法，让浏览器以数组形式显示返回的对象
	splice : [].splice,
	sort : [].sort,
	splice : [].splice,
	push :  [].push
}

// 选择元素具有Agility 原型的方法
Agility.fn.init.prototype = Agility.prototype

// 拓展Agility.fn 工具方法
Agility.fn.extend = Agility.extend = function(){
	var i = 0
	var j = null
	var arg = arguments[0]
	var target = this

	for( j in arg ){
		target[j] = arg[j]
	}
	return target
}

/**
 * 浅拷贝
 * 参数： 父级 继承者
 * 将父级实例所有的属性复制
 */
Agility.extend({
	copy : function (parent,inheritors){
		for( let attr in parent ){
			if(  parent.hasOwnProperty( attr ) ){
				inheritors[attr] = parent[attr]
			}
		}
	}
})

// 添加判断终端
Agility.extend({
	judgWap:function(){
		if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
		    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))
		{
			return 1
		}else{
			return 0
		}
	}
})

// 添加判断chrome
Agility.extend({
	isChrome:function(){
		if( window.navigator.userAgent.indexOf('WebKit') !== -1 ){
			return true
		}else{
			return false
		}
	}
})

// 模块引入 或 常规引入
if( typeof  module == 'object' ){
	module.exports = Agility
}else{
	window.A = window.Agility = Agility
}

})(window)

