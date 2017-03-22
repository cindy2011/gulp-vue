<template>
	<div id="page">
		<div id="header">
			<div class="btns clear">
				<img src="http://www.shengli.com/Public/Home/five/pic03/images/mygiftbtn.png"  class="fl show-bonuses" @click="goGiftCenter">
				<img src="http://www.shengli.com/Public/Home/five/pic03/images/gzbtn.png"  class="fr show-rules" @click="showRules">
			</div>
		</div>
		<div id="pt">
			<ul>
				<li v-show="piece[0]"><img src="http://www.shengli.com/Public/Home/five/pic03/images/1.png" ></li>
				<li v-show="piece[1]"><img src="http://www.shengli.com/Public/Home/five/pic03/images/2.png" ></li>
				<li v-show="piece[2]"><img src="http://www.shengli.com/Public/Home/five/pic03/images/3.png" ></li>
				<li v-show="piece[3]"><img src="http://www.shengli.com/Public/Home/five/pic03/images/4.png" ></li>
				<li v-show="piece[4]"><img src="http://www.shengli.com/Public/Home/five/pic03/images/5.png" ></li>
				<li v-show="piece[5]"><img src="http://www.shengli.com/Public/Home/five/pic03/images/6.png" ></li>
				<li v-show="piece[6]"><img src="http://www.shengli.com/Public/Home/five/pic03/images/7.png" ></li>
				<li v-show="piece[7]"><img src="http://www.shengli.com/Public/Home/five/pic03/images/8.png" ></li>
				<li v-show="piece[8]"><img src="http://www.shengli.com/Public/Home/five/pic03/images/9.png" ></li>
			</ul>
		</div>
		<img src="http://www.shengli.com/Public/Home/five/pic03/images/kq.png" id="kqbtn" @click="openSP">
		<div id="sp" class="btns clear">
			<div class="fl">剩余碎片：{{ lastSP }}</div>
			<div class="fr" @click="getMore">获得更多碎片>></div>
		</div>
			<div id="draw">
				<ul id="three-btns" class="clear">
					<li class="fl">
						<img src="http://www.shengli.com/Public/Home/five/pic03/images/draw1.jpg" >
						<div class="btn" :class="{  'ylq' : treeBtns[0]['ylq'],'active':treeBtns[0]['active']  }" @click="gets('getlb')"></div>
					</li> 
					<li class="fl">
						<img src="http://www.shengli.com/Public/Home/five/pic03/images/draw2.jpg" >
						<div id="draw-btn" class="btn" :class="{  'ylq' : treeBtns[1]['ylq'],'active':treeBtns[1]['active']  }" @click="gets('gethfk')"></div>
					</li>
					<li class="fr">
						<img src="http://www.shengli.com/Public/Home/five/pic03/images/draw3.jpg" >
						<div class="btn" :class="{  'ylq' : treeBtns[2]['ylq'],'active':treeBtns[2]['active']  }" @click="gets('gettclb')"></div>
					</li>
				</ul>
				<ol id="text-info">
					<li>集齐任意3张，可领取<span>暖春礼包*1</span></li>
					<li>集齐任意6张，可抽取<span>京东卡及话费卡</span></li>
					<li>集齐全部9张，可领取<span>踏青礼包*1</span></li>
				</ol>
			</div>
			<img src="http://www.shengli.com/Public/Home/five/pic03/images/title1.png" class="title t1">

			<div id="step-one" class="step-page clear">

				<img src="http://www.shengli.com/Public/Home/five/pic03/images/step1.png"  class="step-title">
				<div class="clear">
					<div class="fl">
						<p>每日：完成官网签到({{gofinishOnOff}}/1）</p>
						<p>奖励：拼图碎片*1</p>
					</div>
					<div class="fr" id="go-finish">
						<img @click="gofinish" :src="'http://www.shengli.com/Public/Home/five/pic03/images/'+gofinishImg" >
					</div>
				</div>
				
				<p class="tc">VIP额外获得一张碎片拼图</p>

			</div>
			<div class="step-page" id="step-two">
				<img src="http://www.shengli.com/Public/Home/five/pic03/images/step2.png"  class="step-title">
				<a class="check-vip" href="http://www.shengli.com/wap/vip">查看VIP特权>></a>
				<div class="clear">
					<div class="fl">
						<img class="zs" src="http://www.shengli.com/Public/Home/five/pic03/images/zs.png" >
					</div>
					<div class="fr kt-vip">
						<img src="http://www.shengli.com/Public/Home/five/pic03/images/kt-vip.png" @click="gokt">
						<p>已获赠送碎片：{{zssp}}</p>
					</div>
				</div>
				<p class="tc">活动期间每开通一个月VIP赠送2张拼图碎片</p>
				<p class="tc">（最多赠送6张）</p>
			</div>
			<div class="step-page" id="step-tree">
				<img src="http://www.shengli.com/Public/Home/five/pic03/images/step3.png"  class="step-title">
				<div class="clear dh">
					<div class="fl"><img src="http://www.shengli.com/Public/Home/five/pic03/images/1-1.png" ></div>
					<div class="fr">
						<p>剩余积分：{{points}}</p>
						<img src="http://www.shengli.com/Public/Home/five/pic03/images/duihuan.png" @click="dhbtn">
						<p>10积分/次</p>
						<p>活动期间限2次</p>
					</div>
				</div>
			</div>
			<div class="step-page" id="step-four">
				<img src="http://www.shengli.com/Public/Home/five/pic03/images/step4.png"  class="step-title">
				<a href="http://www.shengli.com/Gift/jifen" class="dh-link">积分兑换礼包</a>
				<img src="http://www.shengli.com/Public/Home/five/pic03/images/zsjf.png" class="step-zsjf">
				<div class="clear" id="dh-btns">
					<div class="fl">
						<p>赠送1张拼图碎片</p>
						<img src="http://www.shengli.com/Public/Home/five/pic03/images/gm1.png" @click="buyfn(20)">
						<p class="sp">（<span>20积分</span>/2元）</p>
					</div>
					<div class="fr">
						<p>赠送5张拼图碎片</p>
						<img src="http://www.shengli.com/Public/Home/five/pic03/images/gm5.png" @click="buyfn(100)">
						<p class="sp">（<span>100积分</span>/9元）</p>
					</div>
				</div>
				<p class="tc">每购买5次额外赠送1张拼图碎片</p>
				<div class="clear" id="has">
					<p class="fl">已购买次数：{{buytimes}}</p>
					<p class="fr">已赠送拼图碎片：{{giveNum}}</p>
				</div>
			</div>
			
			<!-- 弹窗 -->
			<div id="models" v-show="modelsShow['model']">  <!--  style="display: block;" -->
				
				<!-- 活动规则 -->
				<div class="models-pages rule" v-show="modelsShow['rule']">
					<img src="http://www.shengli.com/Public/Home/five/pic03/images/cloesbtn.png" class="closebtn">
					<h4>活动规则</h4>
					<p class="rules">1.活动时间：3月23日~4月3日；</p>
					<p class="rules">2.活动期间，玩家可收集拼图碎片并打开，集齐对应拼图，即可领取或抽取对应奖品；</p>
					<p class="rules">3.每次打开拼图随机获得9张拼图中的一张，拼图可能重复获得，重复获得以后，补偿1点官网积分；</p>
					<p class="rules">4.拼图碎片页面下方所述途径中获得，活动结束后，所有活动道具过期作废；</p>
					<p class="rules">5.本次活动最终解释权归胜利俱乐部所有；</p>
				</div>
				<!-- 开启碎片 成功 -->
				<div class="models-pages kq-success"  v-show="modelsShow['kqSuccess']">
					<img src="http://www.shengli.com/Public/Home/five/pic03/images/cloesbtn.png" class="closebtn">
					<h4>恭喜您</h4>
					<p class="tc">您点亮了这张拼图</p>
					<img :src="'http://www.shengli.com/Public/Home/five/pic03/images/'+spImg+'.png'" alt="" class="model-imgs">
					<img src="http://www.shengli.com/Public/Home/five/pic03/images/kq-agin.png" @click="openSP" alt="" class="model-btns">
				</div>
				<!-- 开启碎片 已开启过 -->
				<div class="models-pages kqed"  v-show="modelsShow['kqEd']">
					<img src="http://www.shengli.com/Public/Home/five/pic03/images/cloesbtn.png" class="closebtn">
					<h4>您获得了该张拼图</h4>
					<img src="http://www.shengli.com/Public/Home/five/pic03/images/1-1.png" alt="" class="model-imgs">
					<p class="tc">由于您已经获得了该拼图，赠送积分*1</p>
					<img src="http://www.shengli.com/Public/Home/five/pic03/images/kq-agin.png" @click="openSP" alt="" class="model-btns">
				</div>
				<!-- 开启碎片 失败 -->
				<div class="models-pages kq-faild"  v-show="modelsShow['kqFaild']">
					<img src="http://www.shengli.com/Public/Home/five/pic03/images/cloesbtn.png" class="closebtn">
					<h4>对不起</h4>
					<p class="tc">剩余碎片不足</p>
					<img src="http://www.shengli.com/Public/Home/five/pic03/images/faildimg.png" alt="" class="model-imgs">
					<img src="http://www.shengli.com/Public/Home/five/pic03/images/keep-sj.png" alt="" class="model-btns" @click="getMore('closeModel')">
				</div>
				<!-- 领取成功 -->
				<div class="models-pages get-success"  v-show="modelsShow['getSuccess']">
					<img src="http://www.shengli.com/Public/Home/five/pic03/images/cloesbtn.png" class="closebtn">
					<h4>领取成功</h4>
					<p class="tc">{{giftText}}</p>
					<img :src="'http://www.shengli.com/Public/Home/five/pic03/images/'+gift" alt="" class="model-imgs">
					<img src="http://www.shengli.com/Public/Home/five/pic03/images/surebtn.png" alt="" class="model-btns closebtn2">
				</div>
				<!-- 抽奖成功 --> 
				<div class="models-pages draw-success"  v-show="modelsShow['drawSuccess']">
					<img src="http://www.shengli.com/Public/Home/five/pic03/images/cloesbtn.png" class="closebtn">
					<h4>运气真好</h4>
					<p class="tc">{{drawText}}</p>
					<img :src="'http://www.shengli.com/Public/Home/five/pic03/images/'+drawImg" alt="" class="model-imgs">
					<img src="http://www.shengli.com/Public/Home/five/pic03/images/surebtn.png" alt="" class="model-btns closebtn2">
				</div>
				<!-- 抽奖失败 -->
				<div class="models-pages draw-faild"  v-show="modelsShow['drawFaild']">
					<img src="http://www.shengli.com/Public/Home/five/pic03/images/cloesbtn.png" class="closebtn">
					<h4>很遗憾</h4>
					<p class="tc">没有抽中大奖</p>
					<img src="http://www.shengli.com/Public/Home/five/pic03/images/faildimg.png" alt="" class="model-imgs">
					<img src="http://www.shengli.com/Public/Home/five/pic03/images/keep-sj.png" alt="" class="model-btns" @click="getMore('closeModel')">
				</div>
				<!-- 兑换碎片成功 -->
				<div class="models-pages dh-success"  v-show="modelsShow['dhSuccess']">
					<img src="http://www.shengli.com/Public/Home/five/pic03/images/cloesbtn.png" class="closebtn">
					<h4>兑换成功</h4>
					<p class="tc">获得1张拼图碎片</p>
					<img src="http://www.shengli.com/Public/Home/five/pic03/images/1-1.png" alt="" class="model-imgs">
					<img src="http://www.shengli.com/Public/Home/five/pic03/images/surebtn.png" alt="" class="model-btns closebtn2">
				</div>
				<!-- 兑换碎片失败 -->
				<div class="models-pages dh-faild"  v-show="modelsShow['dhFaild']">
					<img src="http://www.shengli.com/Public/Home/five/pic03/images/cloesbtn.png" class="closebtn">
					<h4>对不起，积分不足</h4>
					<img src="http://www.shengli.com/Public/Home/five/pic03/images/faildimg.png" alt="" class="model-imgs">
					<p class="tc">前往个人中心，获取更多积分</p>
					<img src="http://www.shengli.com/Public/Home/five/pic03/images/surebtn.png" alt="" class="model-btns closebtn2">
				</div>
				<!-- 购买积分 -->
				<div class="models-pages buy-tips"  v-show="modelsShow['buyTips']">
					<img src="http://www.shengli.com/Public/Home/five/pic03/images/cloesbtn.png" class="closebtn">
					<h4>{{buyText}}</h4>
					<p class="tc">是否继续？</p>
					<img src="http://www.shengli.com/Public/Home/five/pic03/images/jf.jpg" alt="" class="model-imgs">
					<img src="http://www.shengli.com/Public/Home/five/pic03/images/surebtn.png" alt="" class="model-btns" @click="buy">
				</div>
				<!-- 请先关注 -->
				<div class="models-pages follow"  v-show="modelsShow['follow']">
					<img src="http://www.shengli.com/Public/Home/five/pic03/images/cloesbtn.png"  class="closebtn">
					<img src="http://www.shengli.com/Public/Home/five/yxj/images/gwqrcode.png" class="model-imgs" id="follow-qrcode">
					<h4>请关注后参与活动</h4>
				</div>
				<!-- 请先绑定胜利俱乐部账号 -->
				<div class="models-pages go-login"  v-show="modelsShow['goLogin']">
					<img src="http://www.shengli.com/Public/Home/five/pic03/images/cloesbtn.png"  class="closebtn">
					<h4>请先绑定胜利俱乐部账号</h4>
					<img src="http://www.shengli.com/Public/Home/five/pic03/images/go-bd.png" class="model-imgs">
					<img src="http://www.shengli.com/Public/Home/five/pic03/images/go-reg.png" class="model-imgs">
				</div>
			</div>
	</div>
</template>

<script>
	let A = require('../../js/common/agility.js')
	export default{
		data(){
			return {
				// 弹窗绑定
				modelsShow : {
					model : false,
					rule : false,
					kqSuccess : false,
					kqEd : false,
					kqFaild : false,
					getSuccess : false,
					drawSuccess : false,
					drawFaild : false,
					dhSuccess : false,
					dhFaild : false,
					buyTips : false,
					follow : false,
					goLogin : false
				},
				// 碎片显示
				piece:[
					false,
					false,
					false,
					false,
					false,
					false,
					false,
					false,
					false
				],
				// 当前积分,
				points : 0,
				// 赠送的碎片
				zssp : 0,
				// 当前碎片
				lastSP : 0,
				// 已购买次数
				buytimes : 0,
				buyText : '',
				// 去完成动作判断
				gofinishOnOff : 0,
				// 去完成img
				gofinishImg : 'gofinish.png',
				// 开启碎片弹窗的图
				spImg : 1,
				// 领取物品弹窗的图
				gift : 'draw1.jpg',
				// 领取物品弹窗文案
				giftText : '',
				// 抽奖物品弹窗文案
				drawText: '',
				// 抽奖物品弹窗的图
				drawImg : 'hfk.jpg',
				// 三个按钮
				treeBtns : [
					{
						ylq : false,
						active : false
					},
					{
						ylq : false,
						active : false
					},
					{
						ylq : false,
						active : false
					}
				],
				// 要购买的金额
				buyNum : 0,
				// 已赠送碎片
				giveNum : 0
			}
		},
		methods : {
			// 购买1次
			buyfn : function(num){
				num == 20 ? this.buyText = '您将花费2元购买20积分' : this.buyText = '您将花费9元购买100积分'
				this.buyNum = num
				this.modelsShow['model'] = true
				this.modelsShow['buyTips']  = true
			},
			// 确定购买
			buy : function(){

				var num = this.buyNum == 20 ? 2 : 9

				location.href = '/Picture03/buy/amount/'+ num

			},
			// 兑换一张碎片
			dhbtn : function(){

				let that = this

				if(this.points){

					$.ajax({
						url : '/Picture03/exchange',
						dataType : 'json',
						type : 'get',
						success : function(data){
							if(data.status){
								that.modelsShow['model'] = true
								that.modelsShow['dhSuccess']  = true
							}else{
								alert(data.msg)
							}
						},
						error : function(err){alert('网络错误')}
					})

				}else{
					that.modelsShow['model'] = true
					that.modelsShow['dhFaild']  = true
				}

			},
			goGiftCenter : function(){
				location.href = "/Picture03/prize"
			},
			gokt : function(){
				location.href = "http://www.shengli.com/wap/vipRecharge"
			},
			gofinish : function(){
				!this.gofinishOnOff ? location.href = 'http://www.shengli.com/wap/personalSign' : alert('可以领取')
			},
			showRules : function(){
				this.modelsShow['model'] = true
				this.modelsShow['rule']  = true
			},
			// 开启碎片
			openSP : function(){
				let that = this 
				$.ajax({
					url : '/Picture03/getPiece',
					dataType : 'json',
					type : 'get',
					success : function(data){
						if( data.status == 1 ){
							if(data.exist == 0){
								// 如果第一次开启
								that.spImg = data.piece + 1
								that.piece[data.piece] = true
								that.modelsShow['model'] = true
								that.modelsShow['kqSuccess'] = true
								that.lastSP--
							}else{
								// 如果得到过
								that.modelsShow['model'] = true
								that.modelsShow['kqEd'] = true
								that.lastSP--
							}
						}else{
							// 如果开启失败
							that.modelsShow['model'] = true
							that.modelsShow['kqFaild'] = true
						}
					},
					error : function(err){ alert('网络错误') }
				})
			},
			// 三个领取按钮 
			gets : function(names){

				let that = this
				
				let fns = {
					getlb : function(){
						// 领取暖春礼包
						if(this.treeBtns[0]['active'] == true){

							$.ajax({
								url : '/Picture03/getPrize',
								data : { sn:1 },
								dataType : 'json',
								type : 'post',
								success : function(data){
									if(data.status == 1){
										that.modelsShow['model'] = true
										that.modelsShow['getSuccess'] = true
										that.gift = 'draw1.jpg'
										that.giftText = '暖春礼包'
									}else{
										alert(data.msg)
									}
								},
								error : function(err){ alert('网络错误') }
							})
							
						}
					},
					gethfk : function(){

						if( this.treeBtns[1]['active']  == true ){

							$.ajax({
								url : '/Picture03/getPrize',
								data : { sn : 2 },
								dataType : 'json',
								type : 'post',
								success : function(data){
									if( data.status ){
										// 中了
										if(data.card == 1){
											that.drawImg = 'jdk.jpg'
											that.drawText = '恭喜你获得30元话费卡'
										}else{
											that.drawImg = 'hfk.jpg'
											that.drawText = '恭喜你获得30元话费卡'
										}
										that.modelsShow['model'] = true
										that.modelsShow['drawSuccess'] = true
									}else{
										// no 
										that.modelsShow['model'] = true
										that.modelsShow['drawFaild'] = true
									}
								},
								error : function(err){ alert('网络错误') }
							})
							
						}
						
					},
					gettclb : function(){

						if(this.treeBtns[2]['active'] == true){

							$.ajax({
								url : '/Picture03/getPrize',
								data : { sn:3 },
								dataType : 'json',
								type : 'post',
								success : function(data){
									if(data.status){
										that.modelsShow['model'] = true
										that.modelsShow['getSuccess'] = true
										that.gift = 'draw3.jpg'
									}else{
										alert(data.msg)
									}
								},
								error : function(err){ alert('网络错误') }
							})

						}
						

					}
				}

				fns[names].call(this)
			},
			getMore : function(toDo){
				
				A('html').animate({
					scrollTop : A('.t1')[0].offsetTop
				},200,'linear')

				if(toDo == 'closeModel'){
					for( var attr in this.modelsShow ){
						this.modelsShow[attr] = false
					}
				}

			}
		},
		created : function(){
			
			// 数据初始化

			for( var i =0;i<window.piece.length;i++ ){
				this.piece[window.piece[i]] = true
			}
			
			this.lastSP = window.data['piece']
			this.gofinishOnOff = window.data['isSign']
			this.zssp = window.data['vipPiece']
			this.points = window.data['score']
			this.buytimes = window.data['buy']
			this.giveNum = window.data['give']

			// 初始化 三个按钮领取状态
			for(var i = 0;i<window.gift.length;i++){
				
				this.treeBtns[parseInt(window.gift[i])-1]['ylq'] = true
				
			}
			
		},
		mounted : function(){

			// 关闭弹窗 按钮

			let that = this

			A('.closebtn').add(A('.closebtn2')).on('click',function(){
				for( var attr in that.modelsShow ){
					that.modelsShow[attr] = false
				}
			})
			
			// 初始化 3个领取按钮
			
			let pieceNum = 0

			for( var i = 0;i<window.piece.length;i++ ){
				pieceNum ++
			}

			if( pieceNum < 3 ){
				
				for( var i = 0;i<this.piece.length;i++ ){

					for( var attr in this.treeBtns[i] ){
						if( this.treeBtns[i]['ylq'] !== true ){
							this.treeBtns[i]['active'] = false
						}
					}

				}
				
			}else if( pieceNum >= 9 ){

				for( var i = 0;i<this.piece.length;i++ ){
					for( var attr in this.treeBtns[i] ){
						if( this.treeBtns[i]['ylq'] !== true ){
							this.treeBtns[i]['active'] = true
						}
					}
				}

			}else if( pieceNum >= 6 ){

				for( var i = 0;i<this.treeBtns.length - 1;i++ ){
					
					for( var attr in this.treeBtns[i] ){
						if( this.treeBtns[i]['ylq'] !== true ){
							this.treeBtns[i]['active'] = true
						}
					}

				}

			}else if( pieceNum >= 3 ){
				
				if( this.treeBtns[0]['ylq'] !== true ){
					this.treeBtns[0]['active'] = true
				}

			}

		}
	}
</script>