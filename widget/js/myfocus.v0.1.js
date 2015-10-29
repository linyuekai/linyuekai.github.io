;(function(window,$,undefined){

	$.fn.myfocus = function(options){
		_this = this;
		_this.options = options;

		var len = _this.find(".focus-img-box>img").length;

		if(_this.options){
			//未设置宽高情况下以第一张图片宽高为准
			_this.width = _this.options.width ? _this.options.width : _this.find(".focus-img-box>img:first").width();
			_this.height = _this.options.height ? _this.options.height : _this.find(".focus-img-box>img:first").height();//若无宽高参数以第一张图片大小为准
		}else{
			_this.width = _this.find(".focus-img-box>img:first").width();
			_this.height = _this.find(".focus-img-box>img:first").height();
		}

		var defaults = {
			width : _this.width,
			height : _this.height
		};

		_this.settings = $.extend({},defaults,options);

		_this.init = function(){
			_this.find(".focus-img-box>img").css("float","left");//去除图片空隙

			//初始化内外盒子
			$(this).children(".focus-img-box").width(_this.settings.width * len).height(_this.settings.height)
			.end().css("overflow","hidden").width(_this.settings.width).height(_this.settings.height);

			//约束所有图片宽高以设置为准
			$(this).find(".focus-img-box>img").width(_this.settings.width).height(_this.settings.height);

		}
		_this.init();



		return this;
	};
})(window,jQuery);