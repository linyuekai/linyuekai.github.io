﻿//用户代理检测-识别呈现引擎
var client = function(){

	var engine = {
		ie: 0,
		gecko: 0,
		webkit: 0,
		khtml:0 ,
		opera: 0,
		//具体版本号
		ver: null
	};

	//检测呈现引擎、平台和设备
	var ua = navigator.userAgent;

	//一、 opera引擎版本检测：
	if(window.opera){
		engine.ver = window.opera.version();
		engine.opera = parseFloat(engine.ver);
	}else if(/AppleWebKit\/(\S+)/.test(ua)){//二、webkit引擎版本检测
		engine.ver = RegExp["$1"];
		engine.webkit = parseFloat(engine.ver);
	}else if(/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)){//三、khtml引擎版本检测
		engine.ver = RegExp["$1"];
		engine.khtml = parseFloat(engine.ver);
	}else if(/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){//四、gecko引擎版本检测
		engine.ver = RegExp["$1"];
		engine.gecko = parseFloat(engine.ver);
	}else if(/MSIE ([^;]+)/.test(ua)){//五、ie引擎版本检测
		engine.ver = RegExp["$1"];
		engine.ie = parseFloat(engine.ver);
	}
	



	return {
		engine: engine
	};
}();




var EventUtil = {

	addHandler: function(element, type, handler){
		if(element.addEventListener){
			element.addEventListener(type, handler, false);
		}else if(element.attachEvent){
			element.attachEvent("on"+type, handler);
		}else{
			element["on"+type] = handler;
		}
	},

	removeHandler: function(element, type, handler){
		if(element.removeEventListener){
			element.removeEventListener(type, handler, false);
		}else if(element.detachEvent){
			element.detachEvent("on"+type, handler);
		}else{
			element["on"+type] = null;
		}
	},

	getEvent: function(event){
		return event ? event : window.event;
	},

	getTarget: function(event){
		return event.target || event.srcElement;
	},

	preventDefault: function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	},

	stopPropagation: function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	},

	getRelatedTarget: function(event){//获取mouseover、mouseout相关元素
		if(event.relatedTarget){
			return event.relatedTarget;
		}else if(event.toElement){
			return event.toElement;
		}else if(event.fromElement){
			event.fromElement;
		}else{
			return null;
		}
	},

	getButton: function(event){
		if(document.implementation.hasFeature("MouseEvents","2.0")){
			return event.button;
		}else{
			switch(event.button){
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
					return 0;
				case 2:
				case 6:
					return 2;
				case 4:
				 	return 1;

			}
		}
	},
	
	getWheelDelta: function(event){
		if(event.wheelDelta){
			return (client.engine.opera &&client.engine.opera < 9.5 ? 
					-event.wheelDelta : event.wheelDelta);
		}else{
			return -event.detail * 40;
		}
	},

	getCharCode: function(event){//keypress事件下获取键的ASCLL编码
		if(typeof event.charCode == "number"){
			return event.charCode;
		}else{
			return event.keyCode;
		}
	}


};



//获取 视口宽高
function getViewport(){
	if(document.compatMode == "BackCompat"){
		return {
			width:document.body.clientWidth,
			height:document.body.clientHeight
		};
	}else{
		return {
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		};
	}
}

//获取元素在页面上的 左偏移量
function getElementLeft(element){
	var actualLeft = element.offsetLeft;
	var current = element.offsetParent;

	while(current != null){
		actualLeft += current.offsetLeft;
		current = current.offsetParent;	
	}

	return actualLeft;
}

//获取元素在页面上的 上偏移量
function getElementTop(element){
	var actualTop = element.offsetTop;
	var current = element.offsetParent;

	while(current != null){
		actualTop += current.offsetTop;
		current = current.offsetParent;	
	}

	return actualTop;
}
