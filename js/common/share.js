function shares(eventName,TextData){
	
	// class name
	// sina_share
	// qq_share
	// qq_kongjian_share
	// doubai_share
	// renrenwang_share
	// onclick="javascript:window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent('http://www.riseofdarknessgame.com/Appointment')+'&ampt='+encodeURIComponent(document.title), 'newWindow', 'width=800, height=400','center')void(0)"  class="facebook_share"
	// <!-- facebook share -->
	// <meta property="og:url" content="http://www.riseofdarknessgame.com/Appointment">
	// <meta property="og:type" content="Binding email can get Rewards">
	// <meta property="og:title" content="Binding email can get Rewards">
	// <meta property="og:description" content="Binding email can get gems and big prize!">
	// <meta property="og:image" content="images/favicon.png">
	
	//分享；
	$(".sina_share").click(function() {
		// pc 
		var _uri = "http://service.weibo.com/share/share.php?c=nie&content=utf-8&source=nie&title=" + encodeURIComponent(TextData.shareTxt) + "&url=" + encodeURIComponent(TextData.shareUrl) + "&pic=" + encodeURIComponent(TextData.sharePic)
		// wap
		//var _uri = "http://service.weibo.com/share/mobile.php?c=nie&content=utf-8&source=nie&title=" + encodeURIComponent(TextData.shareTxt) + "&url=" + encodeURIComponent(TextData.shareUrl) + "&pic=" + encodeURIComponent(TextData.sharePic)
		window.open(_uri)
	})
	$(".qq_share").click(function() {
		var _uri = "http://v.t.qq.com/share/share.php?&url=" + encodeURIComponent(TextData.shareUrl) + "&title=" + encodeURIComponent(TextData.shareTxt) + "&desc=" + encodeURIComponent(TextData.shareTxt) + "&pic=" + encodeURIComponent(TextData.sharePic)
		window.location.href = _uri
	})
	$('.qq_kongjian_share').click(function(){
		var _uri = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + encodeURIComponent(TextData.shareUrl) + "&title=" + encodeURIComponent(TextData.shareTxt) + "&desc=" + encodeURIComponent(TextData.shareTxt) + "&pics=" + encodeURIComponent(TextData.sharePic)
		window.open(_uri)
	})
	$('.doubai_share').click(function(){
		var _uri = "http://shuo.douban.com/!service/share?href=" + encodeURIComponent(TextData.shareUrl) + "&name=" + encodeURIComponent(TextData.shareTitle) + "&text=" + encodeURIComponent(TextData.shareTxt) + "&image=" + encodeURIComponent(TextData.sharePic)
		window.open(_uri)
	})
	$('.renrenwang_share').click(function(){
		var _uri = "http://widget.renren.com/dialog/share?resourceUrl=" + encodeURIComponent(TextData.shareUrl) + "&title=" + encodeURIComponent(TextData.shareTitle) + "&description=" + encodeURIComponent(TextData.shareTxt) + "&pic=" + encodeURIComponent(TextData.sharePic)
		window.open(_uri)
	})
	
}

if( typeof  module == 'object' ){
    module.exports = shares
}
