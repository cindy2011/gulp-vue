function SimpleAjax(){
	this.timeout = 10000
	this.dataType = 'json'
}

SimpleAjax.prototype = {
	construtor:SimpleAjax,
	timeoutCall:(NewXHR,maxTime)=>{
		NewXHR.timeout = maxTime
		NewXHR.ontimeout = ()=>{
			alert('请求超时')
		}
	},
	get:function (Options){
		
		let that   = this
		let NewXHR = new XMLHttpRequest()
		
		this.timeoutCall(NewXHR,this.timeout)

		let parms = Options.parms
		let urlString = '?'

		for(let  attr in parms){
			urlString += attr+'='+parms[attr]
			urlString += '&'
		}
		
		urlString = urlString.substring(0,urlString.length-1)

		NewXHR.open( 'get', Options.url + urlString )
		NewXHR.send()

		this.commonXHR(NewXHR,this,Options)
		
	},
	post:function(Options){
		let that   = this
		let NewXHR = new XMLHttpRequest()
		let parms = Options.parms
		let formData = new FormData()
		
		for(let  attr in parms){
			formData.append(attr,parms[attr])
		}
		
		NewXHR.open( 'post', Options.url)
		NewXHR.send(formData)
		
		this.commonXHR(NewXHR,this,Options)
	},
	upload:(Options)=>{
		
		let opt   = Options
		let inter = opt.url
		let fileIdname = opt.inputFileId
		let oProgessId = opt.progress
		let oProgessBarProId = opt.progressChild
		let oProgressNumId = opt.progressnum

		let oMyFile = document.getElementById(fileIdname)

		let NewXHR = new XMLHttpRequest()
		let oProgess = document.querySelector(oProgessId)
		let oProgessBarPro = oProgess.querySelector(oProgessBarProId)
		let oProgressNum = oProgess.querySelector(oProgressNumId)

		let oUpload = NewXHR.upload

		oUpload.onprogress=function(ev){

			var itotal = ev.total
			var iScale = ev.loaded / itotal

			oProgessBarPro.style.width = iScale * 100 + '%'
			oProgressNum.innerHTML = iScale * 100 + '%'

		}

		var oFormData = new FormData() //通过FormData来构建提交数据
		
		oFormData.append('file', oMyFile.files[0])
		NewXHR.open('post', inter)
		NewXHR.send(oFormData)

		this.commonXHR(NewXHR,this,Options)
	},
	commonXHR:(NewXHR,that,Options)=>{
				
		NewXHR.onreadystatechange = ()=>{
			
			if( NewXHR.readyState  == 4 &&  NewXHR.status == 200 ){
				let data  
				if( that.dataType.toLowerCase() == 'json' ){
					data = NewXHR.responseText !== Object ? JSON.parse(NewXHR.responseText) : NewXHR.responseText
				}
				Options.callback(data)

			}else if( NewXHR.readyState  == 4 &&  NewXHR.statusText !== 'ok'){
				 Options.error('请求错误')
			}
			
		}

	}
}

if( typeof  module == 'object' ){
    module.exports = SimpleAjax
}



