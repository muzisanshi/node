
;(function(context){

	function app(){};

	app.DATA = {
		videos:[
			{
				poster:"./image/home/chuanzhang2.png",
				mp4:"https://blz-videos.nosdn.127.net/1/OverWatch/OVR-S03_E03_McCree_REUNION_zhCN_1080P_mb78.mp4",
				webm:"./image/test.webm",
				title:"韩船长漂流记",
				fans:"78w",
				douyin:"2183599946",
				content:"《韩船长漂流记》是我们打造的优质互联网内容IP。主人公韩船长卖房买船，以环球航海为主题，从瑞典的斯德哥尔摩出发，驾船探寻世界各地的生活，创造与年龄无关的青春。"
			},
			{
				poster:"./image/home/baoli2.png",
				mp4:"https://blz-videos.nosdn.127.net/1/OverWatch/OVR-S03_E03_McCree_REUNION_zhCN_1080P_mb78.mp4",
				webm:"./image/test.webm",
				title:"保利物业集团",
				content:"品牌是企业的衍生，传达的是企业的文化、经营理念、价值观等，我们为保利物业股份有限公司打造融合美学、创意、传播价值于一身的企业形象，定制保利物业品牌形象广告片，将客户价值完美释放，得到了商业及技术方面的广泛认可。",
			},
			{
				poster:"./image/home/shenlan2.png",
				mp4:"https://blz-videos.nosdn.127.net/1/OverWatch/OVR-S03_E03_McCree_REUNION_zhCN_1080P_mb78.mp4",
				webm:"./image/test.webm",
				title:"深蓝行者",
				content:"《深蓝行者》是由成都幻月传媒有限公司联手本土80后环球旅行家海啸，共同打造的环球航海真人秀纪录片。节目将于2019年底在各大互联网平台上线播出。主人公韩啸，将用真实的镜头记录他的人生梦想，展示航海路途上的酸甜苦辣。",
			}
		],
		keys:{
			"esc":27
		},
		baiduAk:"YrXSCjgAt3Qu06crwUcX7TIGtjjywlw8"
	};

	app.prototype.toTop = function(time){
		if(time){
			$("body,html").animate({
				scrollTop:0
			},time);
		}else{
			$("body,html").animate({
				scrollTop:0
			});
		}
		// 解决在IE10中动画不执行的问题
		$("body,html").scrollTop(0);
		window.scrollTo(0,0);
	};

	app.prototype.scrollTo = function(selector,diff){
		var topOffset = $(selector).offset().top;
		$("body,html").animate({
			scrollTop:Number(diff)?topOffset-diff:topOffset
		});
		// 解决在IE10中动画不执行的问题
		$("body,html").scrollTop(Number(diff)?topOffset-diff:topOffset);
		window.scrollTo(0,Number(diff)?topOffset-diff:topOffset);
	};
	
	app.prototype.showLauncher = function(){
		$(".launcher").show().find(".launcher-content").fadeIn();
	};
	
	app.prototype.hideLauncher = function(){
		$(".launcher").fadeOut();
	};

	app.prototype.switchTabs = function(selector,clazz,callback){
		var thiz = this;
		var eles = $(selector);
		eles.click(function(){
			var href = $(this).data("href");
			var tab = $(this).data("tab");
			if(href){
				window.location = href;
				return;
			}
			eles.removeClass(clazz);
			$(this).addClass(clazz);
			if(tab){
				thiz.scrollTo("."+tab,50);
			}
			if(callback){callback($(this).index())}
		})
	};

	app.prototype.handleHeader = function(selector){
		$(document).scroll(function(){
			if($("html").scrollTop()>=100){
				$(selector).css({
					"backgroundColor":"#131111"
				})
			}else{
				$(selector).css({
					"backgroundColor":"transparent"
				})
			}
		});
	};

	app.prototype.onScroll = function(callback){
		$(document).scroll(function(){
			if(callback){callback();}
		});
	}

	app.prototype.showVideo = function(index){
		var videoHtml = '<video poster="" style="width: 640px;height: 370px;" preload="auto" controls="controls" autoplay="autoplay">'+
							'<source src="'+app.DATA.videos[index].mp4+'">'+
							'<source src="'+app.DATA.videos[index].webm+'">'+
						'</video>';
		$(".video-play .video-player").append(videoHtml);
		$(".video-play").fadeIn();
	};

	app.prototype.closeVideo = function(){
		$(".video-play").fadeOut();
		$(".video-play .video-player>video").remove();
	}

	app.prototype.switchVideo = function(index){
		$(".poster #poster").attr("src",app.DATA.videos[index].poster);
		$(".v-title").find("#title").text(app.DATA.videos[index].title);
		if(app.DATA.videos[index].fans){
			$(".v-fans").show();
			$(".v-fans").find("#fans").text(app.DATA.videos[index].fans);
			$(".v-fans").find("#douyin").text(app.DATA.videos[index].douyin);
		}else{
			$(".v-fans").hide();
		}
		$(".v-content").text(app.DATA.videos[index].content);
	}

	app.prototype.listenKey = function(name,callback){
		$(document).keyup(function(e){
			if(e.keyCode==app.DATA.keys[name]){
				if(callback){callback();}
			}
		});
	}

	app.prototype.getWebParam = function(name){
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) {
	        return unescape(r[2]);
	    }
	    return null;
	};

	app.prototype.getCurDate = function(callback){
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth()+1;
		var day = date.getDate();
		var dateInfo = {
			year:year,
			month:month,
			day:day
		};
		if(callback){
			callback(dateInfo);
		}
		return dateInfo;
	};

	app.prototype.getLocation = function(callback){
		$.ajax({
			method:"get",
			url:"http://api.map.baidu.com/location/ip",
			data:{
				ak:app.DATA.baiduAk,
				coor:"bd09ll"
			},
			dataType: "jsonp",
			jsonpCallback:"locationCallback",
			success:function(ret){
				if(ret){
					callback(ret);		
				}
			},
			error:function(err){}
		});
	};

	app.prototype.isSafiri = function(){
		var ag = navigator.userAgent;
		return ag.indexOf("Safari")>-1;
	};

	app.prototype.getSystemType = function(){
		var ag = navigator.userAgent;
	    var isOpera = ag.indexOf("Opera") > -1;
	    if(isOpera){
	        return "Opera";
	    }
	    if (ag.indexOf("Firefox") > -1) {
	        return "Firefox";
	    }
	    if (ag.indexOf("Chrome") > -1){
		  return "Chrome";
		}
	    if (ag.indexOf("Safari") > -1) {
	        return "Safari";
	    }
	    if (ag.indexOf("compatible") > -1 && ag.indexOf("MSIE") > -1 && !isOpera) {
	        return "IE";
	    }
	    if (ag.toLowerCase().indexOf("edge") > -1) {
	        return "IE";
	    }
	    if(ag.toLowerCase().indexOf("trident") > -1){
	    	return "IE";
	    }

	    // 默认返回其他浏览器
	    return "Other";
	};

	app.prototype.init = function(){
		if(!this.isSafiri()){
			$("html").css({
				fontFamily:"微软雅黑"
			});	
		}
	};

	context.app = app;
	context.APP = new app();


})(window);