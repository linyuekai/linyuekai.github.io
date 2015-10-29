;(function(window,document,$,undefined){
	// v0.1
	// 最初版只支持同一时间对一个对象的轮播图初始化，具备基础功能，随后会逐步完善
	// 作者：林粤凯
	// 2015/10/29/ 

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
			height : _this.height,
			autoplay : true
		};

		_this.settings = $.extend({},defaults,options);

		var prevBtn = $("<spann class='focus-btn prevBtn'>&lt;</span>"),
			nextBtn = $("<span class='focus-btn nextBtn'>&gt;</span>");//左右按钮


		_this.init = function(){
			_this.find(".focus-img-box>img").css("float","left");//去除图片空隙

			//初始化内外盒子
			$(this).children(".focus-img-box").width(_this.settings.width * len).height(_this.settings.height)
			.end().css({"overflow":"hidden","position":"relative"}).width(_this.settings.width).height(_this.settings.height);

			//约束所有图片宽高以设置为准
			_this.find(".focus-img-box>img").width(_this.settings.width).height(_this.settings.height);

			$(this).append(prevBtn.add(nextBtn));

			_this.find(".focus-btn").css({
				"position":"absolute",
				"background":"#666",
				"opacity":"0.3",
				"width":"100px",
				"height":"11%",
				"text-align":"center",
				"top":"48%",
				"cursor":"pointer",
				"font-size":"30px",
				"font-weight":"blod",
				"color":"#fff",
				"display":"none",
				"box-shadow":"0px 1px 15px #777, 0px -1px 15px #777"
			});
			nextBtn.css({
				"right":0
			});
			var lineheight = prevBtn.height();

			_this.find(".focus-btn").css("line-height",lineheight+"px").hover(function(){
				$(this).animate({"opacity":"0.5"},100);
			},function(){
				$(this).animate({"opacity":"0.3"},100);
			});

			$(this).hover(function(){
				_this.find(".focus-btn").stop().fadeIn(50);
			},function(){
				_this.find(".focus-btn").stop().fadeOut(50);
			});

			prevBtn.click(_this.btnClick);
			nextBtn.click(_this.btnClick);//绑定按钮点击事件
		}

		_this.btnClick = function(){
			if($(this).hasClass("prevBtn")){
				console.log(1);
			}else{
				console.log(2)
			}
		};

		_this.init();
		return this;
	};
})(window,document,jQuery);