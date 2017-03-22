
function Slider(options){
	
	this.settings = {
		// 轮播图父级元素
		'parent':'',
		'autoPlay':false,
		'speed':4000,
		// 模式
		'mode' : 'default',
		// 圆点按钮
		'changebtns' : '',
		// 自动播放间隔时间
		'delay' : 3000,
		// 移动的包裹元素
		'moveUl':'',
		// 显示图片
		'viewLength':'3',
		'leftbtn':'',
		'rightbtn':''
	}
	// 浅拷贝
	A.copy(options,this.settings)
	
	this.parent = typeof this.settings.parent == 'string' ? A(this.settings.parent) : this.settings.parent
	this.moveUl = this.parent.find(this.settings.moveUl)
	this.lis = this.moveUl.find('li')
	this.liLength = this.lis.length
	this.liWidth = this.lis.css('outerWidth')
	this.viewLength = this.settings.viewLength
	this.leftbtn = this.settings.leftbtn ? this.parent.find(this.settings.leftbtn) : ''
	this.rightbtn = this.settings.rightbtn ?  this.parent.find(this.settings.rightbtn) : ''
	
	// 判断终端类型 1 -> wap 0 -> pc
	this.type = A.judgWap()
	this.eventFn = this.type == 0 ? 'click' : 'touchstart'
	this.autoNum = 0
	this.autoTimer = null
	this.speed = this.settings.speed
	this.startX = 0
	this.mode = this.settings.mode

	// 模式
	this.modeInit = {
		// 多图一次切换单张,暂不支持圆点按钮效果
		default : this.fastInit,
		// 多图一次切换多张,带圆点按钮
		train : this.train,
		// 移动端,支持触摸手势
		wap : this.wapInit
	}
	
	// mode选择 初始化   状态模式
	this.modeInit[this.mode].call(this)
	
}

Slider.prototype={
	wapInit : function(){

		var $ad = this.parent
		var $Ul = this.moveUl
		var $li = $Ul.find('li')
		var $btnLi = $ad.find(this.settings.changebtns).find('li')
		var $Width = $li.eq(0).css('width')
		var downX = 0
		var step = 1/2
		var everyDis = 0
		var liIndex = 0
		var startX = 0
		var nowTx = 0
		var timer = null
		var iNow = 0
		var delay = this.settings.delay
		var speed = this.speed || '.3s'

		$Ul.css({ 'width' : $btnLi.length* $Width })

		$li.on('touchstart',function(ev){
			
			A(document).on('touchmove',prevent)

			clearInterval(timer)

			$Ul.css({ 'transition' : '' })

			var touch=ev.changedTouches[0]

			downX=touch.pageX
			liIndex=A(this).index()

			$li.on('touchmove',function(ev){
				
				var touch=ev.changedTouches[0]
				var disX=Math.abs(downX-touch.pageX)*step
				everyDis=disX
				
				if(downX<touch.pageX){ //→
					$Ul.css({ 'transform' : 'translateX('+(nowTx+disX)+'px)' })		
				}else{ //←
					$Ul.css({ 'transform' : 'translateX('+(nowTx-disX)+'px)' })
				}
				

			})
			
		})
		
		$li.on('touchend',function(ev){
			
			$li.off('touchmove')
			$Ul.css({ 'transition': speed })
			
			var touch=ev.changedTouches[0]
			
			if(everyDis<30){
				
				$Ul.css({ 'transform':'translateX('+(-liIndex*$Width)+'px)' })
				
			}else{
				
				if(downX<touch.pageX){//→
					
					if(liIndex<=0){
						liIndex=0
					}else{
						liIndex--
					}

				}else{//←
					if(liIndex==$li.length-1){
						liIndex=$li.length-1
					}else{
						liIndex++
					}

				}
				$Ul.css({ 'transform':'translateX('+(-liIndex*$Width)+'px)' })
				nowTx=-liIndex*$Width
				$btnLi.eq(liIndex).addClass('active').siblings().removeClass('active')
				iNow=liIndex
				
			}

			A(document).off('touchmove',prevent)

		})
		
		if(this.settings.autoPlay){
			timer = setInterval(bannerMove,delay)
		}

		$ad.on('touchend',function(){
			if(this.settings.autoPlay){
				timer = setInterval(bannerMove,delay)
			}
		})
		
		function bannerMove(){
			$Ul.css({'transition':speed})
			iNow++
			if(iNow==$li.length){iNow=0}

			$btnLi.eq(iNow).addClass('active').siblings().removeClass('active')
			$Ul.css({'transform':'translateX('+(-iNow*$Width)+'px)'})
			liIndex=iNow
			nowTx=-iNow*$Width
		}

		function prevent(ev){
			ev.preventDefault()
		}
	},
	fastInit:function(){
		
		var oUl = this.moveUl
		// 复制列表 辅助无缝滚动
		var aConleLi = this.lis.clone('li')

		oUl.append(aConleLi)
		var theNum = this.liWidth * aConleLi.length
		this.startX = theNum
		// 初始化 moveUl
		oUl.css({ width : 2*theNum + 'px' })
		oUl.css({ transform : 'translateX('+-(theNum)+'px)' })

		//切换函数
		this.changeFn()

		if(this.settings.autoPlay){
			this.autoPlayFn['common'].call(this)
		}

	},
	train : function(){

		var oUl = this.moveUl
		// 复制列表 辅助无缝滚动
		var aConleLi = this.lis.clone('li')
		var fistLis = []
		var preLis  = []

		var lastViewNum = aConleLi.length - this.viewLength

		for( var i = 0 ;i < this.viewLength ;i++){
			fistLis.push(aConleLi[i])
		}
		
		for(var i =  lastViewNum ;i<aConleLi.length;i++){
			preLis.push(aConleLi[i])
		}

		oUl.append(fistLis)
		oUl.prvend(preLis)

		// 初始化ul
		oUl.css({ 'width' : this.liWidth * ( aConleLi.length * 2)  + 'px' })
		oUl.css({ 'transform' : 'translateX(-'+(this.viewLength*this.liWidth)+'px)' })

		// 保存起步偏移量
		this.startOffsetX = this.viewLength*this.liWidth

		//切换函数
		this.trainChange()

		if(this.settings.autoPlay){
			this.autoPlayFn['common'].call(this)
		}
	},
	changeFn:function(){
		
		var leftbtn = this.leftbtn
		var rightbtn = this.rightbtn
		var fn = this.eventFn
		var moveUl = this.moveUl
		var iWidth = this.liWidth
		var moveUlWidth = moveUl.css('width')
		var num = 0
		var oldLength = this.liLength
		var onOff = true
		var startX = -this.startX
		var speed = this.speed
		
		var viewlength = this.viewLength
		var rightMaxVal = -(oldLength-viewlength)*iWidth
		var maxLen = this.liLength - this.viewLength
		var leftMaxVal = -oldLength*iWidth

		// 每次位移动画结束 启用按钮 ，避免连续多次点击
		var tranEndFn = function(){
			onOff = true
		}

		// 无缝位移 重置位移ul的left值
		var rightResetFn = function(){
			moveUl.off('transitionend',rightResetFn)
			moveUl.css( { transition : '' } )
			moveUl.css( { transform : 'translateX('+(rightMaxVal)+'px)' } )
			num=-viewlength
		}

		moveUl.on('transitionend',tranEndFn)
		
		rightbtn.on(fn,function(ev){
			
			if(onOff){

				onOff=false
				num++
				moveUl.css({ 'transition' : speed })
				
				if(num==maxLen){
					moveUl.on('transitionend',rightResetFn)
				}
				
				moveUl.css({ transform : 'translateX('+(-num*iWidth+startX)+'px)' })
				
				if(ev){
					ev.stopPropagation()
				}

			}
			
		})
		
		var leftResetFn = function(){
			moveUl.off('transitionend',leftResetFn)
			moveUl.css({ 'transition' : '' })
			moveUl.css({ 'transform' : 'translateX('+(leftMaxVal)+'px)' })
			num=0
		}

		leftbtn.on(fn,function(ev){

			if(onOff){

				onOff=false
				num--
				moveUl.css({ 'transition' : speed })

				if(num==-oldLength){
					moveUl.on('transitionend', leftResetFn)
				}

				moveUl.css({ 'transform' : 'translateX('+(-num*iWidth+startX)+'px)' })
				ev.stopPropagation()
			}

		})

	},
	trainChange : function(){

		var fn = this.eventFn
		var speed = this.speed
		var moveUl = this.moveUl
		var leftbtn = this.leftbtn
		var rightbtn = this.rightbtn
		var roundbtns = this.parent.find(this.settings.changebtns)
		var viewLen  = this.viewLength
		var liWidth  = this.liWidth
		var maxNum   = this.liLength / viewLen
		var onOff = true
		var num = 0
		var roundNum = 0
		var roundMaxNum = maxNum - 1
		var startX = this.startOffsetX
		// 最后一屏left值
		var lastScreenX = this.viewLength * this.liWidth * maxNum
		var eventFn = this.eventFn

		rightbtn.on(eventFn,function(){

			if(onOff){
				onOff = false
				num++
				roundNum++
				if( roundNum > roundMaxNum ){
					roundNum = 0
				}
				moveUl.css({ 'transition' : speed })
				moveUl.css({ 'transform' : 'translateX('+(-viewLen*num*liWidth-startX)+'px)' })
				roundbtns.eq(roundNum).addClass('active').siblings().removeClass('active')
			}
			
		})

		leftbtn.on(eventFn,function(){ 

			if(onOff){
				onOff = false
				num--
				roundNum--
				if( roundNum < 0 ){
					roundNum = roundMaxNum
				}
				moveUl.css({ 'transition' : speed })
				moveUl.css({ 'transform' : 'translateX('+(-viewLen*num*liWidth-startX)+'px)' })
				roundbtns.eq(roundNum).addClass('active').siblings().removeClass('active')
			}

		})

		roundbtns.on(eventFn,function(){
			moveUl.css({ 'transition' : speed })
			var Index = A(this).index()
			A(this).addClass('active').siblings().removeClass('active')
			moveUl.css({ 'transition' : '.7s' })
			moveUl.css({ 'transform' : 'translateX('+(-viewLen*Index*liWidth-startX)+'px)' })
			roundNum = Index
			num = Index
		})

		moveUl.on('transitionend',function(){
			onOff = true
			if( num == maxNum ){
				moveUl.css({ 'transition' : '' })
				moveUl.css({ 'transform' : 'translateX('+-startX+'px)' })
				num = 0
				roundNum = 0
			} 
			if( num == -1 ){
				moveUl.css({ 'transition' : '' })
				moveUl.css({ 'transform' : 'translateX('+-lastScreenX+'px)' })
				num = maxNum - 1
				roundNum = roundMaxNum
			}
		})

	},
	// 自动播放方法
	autoPlayFn : {
		common : function(){

			var timer
			var that = this
			var delay = this.settings.delay
			var oParent = this.parent

			timer = setInterval(function(){
				that.rightbtn[0].click()
			},delay)

			oParent.on('mousemove',function(){
				clearInterval(timer)
			}).on('mouseout',function(){
				timer = setInterval(function(){
					that.rightbtn[0].click()
				},delay)
			})

		}
	}

}
	

if( typeof  module == 'object' ){
    var A = require('./agility.js')
    module.exports = Slider
}else if(!A){
    console.log('请引入agility!')
}
	
	


