
/**
 * 本工具依赖jquery,crypto，适用于浏览器环境
 */
;(function(context){

	function Util(){};
	
	var prototype = {

		BAIDU_AK:"YrXSCjgAt3Qu06crwUcX7TIGtjjywlw8",
		KEYS:{
			"esc":27,
			'enter':13,
		},

		// 页面滚动到指定元素位置
		scrollToEle:function(selector,diff){
			if($){
				var topOffset = $(selector).offset().top;
				$("body,html").animate({
					scrollTop:Number(diff)?topOffset-diff:topOffset
				});
			}
		},

		// 页面滚动到顶部，可以加延时
		scrollToTop:function(time){
			if($){
				if(time){
					$("body,html").animate({
						scrollTop:0
					},time);
				}else{
					$("body,html").animate({
						scrollTop:0
					});
				}
			}
		},

		// 监听按键
		listenkey:function(name,callback){
			var thiz = this;
			if($){
				$(document).keyup(function(e){
					if(e.keyCode==thiz.KEYS[name]){
						if(callback){callback();}
					}
				});
			}
		},

		// 获取指定query参数值
		getWebParam:function(name){
			var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		    var r = window.location.search.substr(1).match(reg);
		    if (r != null) {
		        return unescape(r[2]);
		    }
		    return null;
		},

		// 获取日期
		getCurDate:function(){
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth()+1;
			var day = date.getDate();
			var dateInfo = {
				year:year,
				month:month,
				day:day
			};
			return dateInfo;
		},

		// 根据ip获取地理位置信息
		getLocation:function(callback){
			if($){
				$.ajax({
					method:"get",
					url:"http://api.map.baidu.com/location/ip",
					data:{
						ak:this.BAIDU_AK,
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
			}
		},

		// 判断浏览器类型
		getSystemType:function(){
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
		    if(ag.toLowerCase().indexOf("micromessenger") > -1){// 微信内置浏览器
		    	return "WX";
		    }
		    if(ag.indexOf(' qq') > -1 && ag.indexOf('mqqbrowser') < 0){
	            return "QQInner";
	        }
	        if(ag.indexOf('mqqbrowser') > -1 && ag.indexOf(" qq") < 0){
	            return "QQ";
	        }

		    // 默认返回其他浏览器
		    return "Other";
		},

		// aes对称加密，统一使用CBC加密模式，data是任意字符串，key是16进制字符串，iv是16进制字符串
		// 返回16进制字符串
		aesEncrypt(data,key,iv) {
			var encrypted = null;
			if(CryptoJS){
				var pdata = CryptoJS.enc.Utf8.parse(data);

				var pkey = CryptoJS.enc.Hex.parse(key);
				var piv = CryptoJS.enc.Hex.parse(iv);

	        	encrypted = CryptoJS.AES.encrypt(pdata, pkey, {iv: piv, mode: CryptoJS.mode.CBC});
			}
	        return encrypted.ciphertext.toString();
	    },

	    // aes解密，统一使用CBC加密模式，data是16进制字符串，key是16进制字符串，iv是16进制字符串
	    // 返回普通字符串
	    aesDecrypt(data,key,iv) {
	    	var decrypted = null;
	    	if(CryptoJS){
	    		var darr = CryptoJS.enc.Hex.parse(data);
	        	var pdata = CryptoJS.enc.Base64.stringify(darr);

	        	var pkey = CryptoJS.enc.Hex.parse(key);
				var piv = CryptoJS.enc.Hex.parse(iv);
				
	        	decrypted = CryptoJS.AES.decrypt(pdata, pkey, {iv: piv, mode: CryptoJS.mode.CBC});
	    	}
	        
	        return decrypted.toString(CryptoJS.enc.Utf8);
	    },

	    

	};

	Util.prototype = prototype;

	Object.freeze(Util);
	context.Util = Util;

	var instance = new Util();
	Object.freeze(instance);
	context.util = instance;

})(window);

