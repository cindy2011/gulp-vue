/**
 * 自定义滚动条
 * 自动检测终端类型，支持x、y方向 滑轮滚动，触摸拖拽
 * nathen
 */
var SimpleScroll = function(options){
	this.type = options.type || 'pc'
	// 内容元素
	this.wrapParent = document.querySelector(options.wrapParent)
	// 被拖动的元素
	this.scrollPage = document.querySelector(options.scrollPage)
	// 自定义滚动条
	this.scrollBar  = document.querySelector(options.scrollBar)
	// 鼠标滑轮的值
	this.iNum = 0
	// scroll Y max
	this.maxTop   = this.wrapParent.clientHeight - this.scrollBar.clientHeight
	// scroll X max
	this.maxLeft   = this.wrapParent.clientWidth - this.scrollBar.clientWidth
	// target max 
	this.targetMax = this.scrollPage.clientHeight - this.wrapParent.clientHeight
	// target X max 
	this.targetMaxX = this.scrollPage.clientWidth - this.wrapParent.clientWidth
	// 横向 or 纵向
	this.way = options.way || 'y'

	// 终端类型分支
	this.typeChioce(this)
}

SimpleScroll.prototype = {
	// 修正构造函数指向
	constructor : SimpleScroll,
	typeChioce:(that)=>{
		// 检测userAgent
		if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
		    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))
		{
			that.wapScroll(that)
		}else{
			that.pcScroll(that)
		}
	},
	pcScroll:(that)=>{
		//拖拽滚动
		that.dragScroll(that)
		//鼠标滑轮滚动
		that.mouseWheel(that)
	},
	// 拖拽滚动条
	dragScroll:(that)=>{
		let wrapParent = that.wrapParent,
			scrollPage = that.scrollPage,
			scrollBar = that.scrollBar,
			maxTop = that.maxTop,
			maxLeft = that.maxLeft,
			// 移动的差值
			moveY    = 0,
			moveX    = 0,
			// 起始y
			points   = 0,
			pointsX  = 0,
			iS = 0 
		
		if( that.way == 'y' ){
			scrollBar.addEventListener('mousedown',(event)=>{
				points  = event.pageY - scrollBar.offsetTop - wrapParent.offsetTop
				document.addEventListener('mousemove',moveScroll)
				document.addEventListener('mouseup',(event)=>{
					document.removeEventListener('mousemove',moveScroll)
				})
			})
		}else{
			scrollBar.addEventListener('mousedown',(event)=>{
				pointsX  = event.pageX - scrollBar.offsetLeft - wrapParent.offsetLeft
				document.addEventListener('mousemove',moveScrollX)
				document.addEventListener('mouseup',(event)=>{
					document.removeEventListener('mousemove',moveScrollX)
				})
			})
		}
				
		var moveScroll =  (event) => {
			moveY = event.pageY - wrapParent.offsetTop - points
			// 拖动范围最大值于最小值的判断
			if( moveY <= 0 ){ moveY = 0 }
			if( moveY >= maxTop ){ moveY = maxTop }
			scrollBar.style.top = moveY+'px'
			// 比例
			iS = that.targetMax * ( moveY / maxTop)
			scrollPage.style.top = -(iS) +'px'		
			// 同步滑轮和滚轮的值
			that.iNum = moveY
		}

		var moveScrollX =  (event) => {
			moveX = event.pageX - wrapParent.offsetLeft - pointsX
			// 拖动范围最大值于最小值的判断
			if( moveX <= 0 ){ moveX = 0 }
			if( moveX >= maxLeft ){ moveX = maxLeft }
			scrollBar.style.left = moveX+'px'
			// 比例
			iS = that.targetMaxX * ( moveX / maxLeft)
			scrollPage.style.left = -(iS) +'px'		
			// 同步滑轮和滚轮的值
			that.iNum = moveX
		}

	},
	// pc鼠标滑轮事件
	mouseWheel:(that)=>{
		let wrapParent = that.wrapParent,
			scrollPage = that.scrollPage,
			scrollBar = that.scrollBar,
			moveY = 0,
			moveX = 0,
			iS = 0

		if( that.way == 'y' ){
			// chrome ie
			wrapParent.addEventListener('mousewheel',(event)=>{
				MouseScroll(event)
			})
			// FireFox
			wrapParent.addEventListener('DOMMouseScroll',(event)=>{
				MouseScroll(event)
			})
		}else{
			// chrome ie
			wrapParent.addEventListener('mousewheel',(event)=>{
				MouseScrollX(event)
			})
			// FireFox
			wrapParent.addEventListener('DOMMouseScroll',(event)=>{
				MouseScrollX(event)
			})
		}

		let MouseScroll = (event) =>{
			// 判断上下 wgeekdelta -> chrome
			let wheelData = event.wheelDelta ? -event.wheelDelta : event.detail
			if(wheelData>0){
				addFn(20,that.maxTop)
			}else{
				minusFn(20)
			}
			// 比例值
			iS = that.targetMax * ( that.iNum / that.maxTop)
			scrollPage.style.top = -(iS) +'px'
			scrollBar.style.top = that.iNum+'px'
			//同步
			moveY = that.iNum
			event.preventDefault()
		}

		let MouseScrollX = (event) =>{
			// 判断上下 wgeekdelta -> chrome
			let wheelData = event.wheelDelta ? -event.wheelDelta : event.detail
			if(wheelData>0){
				addFn(20,that.maxLeft)
			}else{
				minusFn(20)
			}
			// 比例值
			iS = that.targetMaxX * ( that.iNum / that.maxLeft)
			scrollPage.style.left = -(iS) +'px'
			scrollBar.style.left = that.iNum+'px'
			//同步
			moveX = that.iNum
			event.preventDefault()
		}

		let addFn = (speed,maxNum)=>{
			that.iNum+=speed
			if(that.iNum >= maxNum){ that.iNum = maxNum }
		}

		let minusFn = (speed)=>{
			that.iNum-=speed
			if(that.iNum <= 0 ){ that.iNum = 0 } 
		}

	},
	// 移动端
	wapScroll:(that)=>{
		
		// 移动端滚动条
		let wrapParent = that.wrapParent,
			scrollPage = that.scrollPage,
			scrollBar = that.scrollBar,
			maxTop   = wrapParent.clientHeight - scrollBar.clientHeight,
			maxLeft   = wrapParent.clientWidth - scrollBar.clientWidth,
			targetMax = scrollPage.clientHeight - wrapParent.clientHeight,
			targetMaxX = scrollPage.clientWidth - wrapParent.clientWidth,
			startY = 0,
			startX = 0,
			// 速度
			speed = 0.3,
			moveY = 0,
			moveX = 0,
			iS = 0

		if( that.way == 'y' ){
			wrapParent.addEventListener('touchstart',(event)=>{
				startY = event.changedTouches[0].pageY + scrollBar.offsetTop
				wrapParent.addEventListener('touchmove',moveScroll)
				wrapParent.addEventListener('touchend',(event)=>{
					wrapParent.removeEventListener('touchmove',moveScroll)
				})
			})
		}else{
			wrapParent.addEventListener('touchstart',(event)=>{
				startX = event.changedTouches[0].pageX + scrollBar.offsetLeft
				wrapParent.addEventListener('touchmove',moveScrollX)
				wrapParent.addEventListener('touchend',(event)=>{
					wrapParent.removeEventListener('touchmove',moveScrollX)
				})
			})
		}
		
		
		let moveScroll = (event) => {
			moveY = ( event.changedTouches[0].pageY - startY )
			if( moveY >= 0 ){ moveY = 0 }
			if( -moveY >= maxTop ){ moveY = -maxTop }
			scrollBar.style.top = -moveY+'px'
			// set scrollPage.top
			iS = targetMax * ( -moveY / maxTop)
			scrollPage.style.top = -iS +'px'
			event.preventDefault()
		}

		let moveScrollX = (event) => {
			moveX = ( event.changedTouches[0].pageX - startX )
			if( moveX >= 0 ){ moveX = 0 }
			if( -moveX >= maxLeft ){ moveX = -maxLeft; }
			scrollBar.style.left = -moveX+'px'
			// set scrollPage.left
			iS = targetMaxX * ( -moveX / maxLeft)
			scrollPage.style.left = -iS +'px'
			event.preventDefault()
		}

	}
}

if( typeof  module == 'object' ){
    module.exports = SimpleScroll
}