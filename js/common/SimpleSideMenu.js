function SimpleSideMenu(options){

	this.sideList = A(options.parent)
	this.aBtn = this.sideList.find('li')
	this.arrTop = options.arrTop
	this.init()
	
}

SimpleSideMenu.prototype = {
	constructor : SimpleSideMenu,
	init : function(){

		this.aBtn.on('mousedown', function(event){
			var index = A(this).index()
			return false
			console.log(index)
			A(window).off()
			$('html,body').animate({
				"scrollTop": arrTop[index]
			 },400,function(){
			 	aBtn.eq(index).addClass('active').siblings().removeClass('active')
			 })
			event.preventDefault()
		})

		this.aBtn.on('mouseup', function(event) {
			$(window).on('scroll',scrollFn)
			event.preventDefault()
		})

		// $(window).on('scroll',scrollFn)
		
		// function scrollFn(){
		// 	if($(window).scrollTop()<arrTop[1]){
		// 		aBtn.eq(0).addClass('active').siblings().removeClass('active')
		// 	}
		// 	if($(window).scrollTop()>arrTop[1] && $(window).scrollTop()<arrTop[2]){
		// 		aBtn.eq(1).addClass('active').siblings().removeClass('active')
		// 	}
		// 	if($(window).scrollTop()>arrTop[2] && $(window).scrollTop()<arrTop[3]){
		// 		aBtn.eq(2).addClass('active').siblings().removeClass('active')
		// 	}
		// 	if($(window).scrollTop()>arrTop[3] && $(window).scrollTop()<arrTop[4]){
		// 		aBtn.eq(3).addClass('active').siblings().removeClass('active')
		// 	}
		// 	if($(window).scrollTop()>arrTop[4] && $(window).scrollTop()<arrTop[5]){
		// 		aBtn.eq(4).addClass('active').siblings().removeClass('active')
		// 	}
		// 	if($(window).scrollTop()>arrTop[5] && $(window).scrollTop()<arrTop[6]){
		// 		aBtn.eq(5).addClass('active').siblings().removeClass('active')
		// 	}
		// 	if($(window).scrollTop()>arrTop[6] && $(window).scrollTop()<arrTop[7]){
		// 		aBtn.eq(6).addClass('active').siblings().removeClass('active')
		// 	}
		// 	if($(window).scrollTop()>arrTop[7] && $(window).scrollTop()<arrTop[8]){
		// 		aBtn.eq(7).addClass('active').siblings().removeClass('active')
		// 	}
		// 	if($(window).scrollTop()>arrTop[8] && $(window).scrollTop()<arrTop[9]){
		// 		aBtn.eq(8).addClass('active').siblings().removeClass('active')
		// 	}
		// }

	}
}

if( typeof  module == 'object' ){
    var A = require('./agility.js')
    module.exports = SimpleSideMenu
}else if(!A){
    console.log('请引入agility!')
}