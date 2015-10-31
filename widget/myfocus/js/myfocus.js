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
			_this.width = _this.options.width ? _this.options.width : 800;
			_this.height = _this.options.height ? _this.options.height : 350;

		}else{
			_this.width = 800;
			_this.height = 350;

		}

		var defaults = {
			width: _this.width,
			height: _this.height,
			autoplay: true,
			speed: 1500
		};

		_this.settings = $.extend({},defaults,options);

		var prevBtn = $("<spann class='focus-btn prevBtn'>&lt;</span>"),
			nextBtn = $("<span class='focus-btn nextBtn'>&gt;</span>");//左右按钮

		_this.init = function(){
			_this.find(".focus-img-box>img").css("float","left");//去除图片空隙
			//初始化内外盒子
			$(this).children(".focus-img-box").css({"position":"absolute","left":"0px"}).width(_this.settings.width * len).height(_this.settings.height)
			.end().css({"overflow":"hidden","position":"relative"}).width(_this.settings.width).height(_this.settings.height);

			//约束所有图片宽高以设置为准
			_this.find(".focus-img-box>img").width(_this.settings.width).height(_this.settings.height);

			$(this).append(prevBtn.add(nextBtn));

			_this.find(".focus-btn").css({
				"position":"absolute",
				"background":"#333",
				"opacity":"0.5",
				"width":"100px",
				"height":"11%",
				"text-align":"center",
				"top":"48%",
				"cursor":"pointer",
				"font-size":"30px",
				"font-weight":"blod",
				"color":"#fff",
				"display":"none",
				"box-shadow":"0px 1px 15px #777, 0px -1px 15px #777",
				"z-index":2
			});
			prevBtn.css({
				"left":"0px"
			});
			nextBtn.css({
				"right":"0px"
			});
			var lineheight = prevBtn.height();
			_this.find(".focus-btn").css("line-height",lineheight+"px").hover(function(){
				$(this).animate({"opacity":"0.8"},100);
			},function(){
				$(this).animate({"opacity":"0.5"},100);
			});

			$(this).hover(function(){
				_this.find(".focus-btn").stop().fadeIn(50).css("display","block");
			},function(){
				_this.find(".focus-btn").stop().fadeOut(50);
			});

			prevBtn.click(_this.btnClick);
			nextBtn.click(_this.btnClick);//绑定按钮点击事件

			//play
			if(_this.settings.autoplay){
				_this.play();
			}
		}

		_this.btnClick = function(){

			if($(this).hasClass("prevBtn")){
				if(parseFloat($(".focus-img-box")[0].style.left)/parseFloat(_this.settings.width) > -1){
					_this.find(".focus-img-box").animate({
						"left": (-4) * _this.settings.width + "px"
					},300);
					return;
				}

				_this.find(".focus-img-box").animate({
					"left": parseFloat(_this.find(".focus-img-box")[0].style.left) + _this.settings.width + "px"
				},300);
			}else{
				if(parseFloat($(".focus-img-box")[0].style.left)/parseFloat(_this.settings.width) < -3){
					_this.find(".focus-img-box").animate({
						"left": "0px"
					},300);
					return;
				}

				_this.find(".focus-img-box").animate({
					"left": parseFloat(_this.find(".focus-img-box")[0].style.left) + (-1) * _this.settings.width + "px"
				},300);
			}

		};

		_this.loading = function(){// 图片预加载显示loading

		}

		if(_this.settings.autoplay){
			var timeworker;

			_this.play = function(){
				timeworker = setInterval(function(){
					_this.find(".nextBtn").click();
				},_this.settings.speed);
			}

			_this.pause = function(){
				clearInterval(timeworker);
			}

			_this.hover(function(){
				_this.pause();
			},function(){
				_this.play();
			});
		}



		_this.init();
		return this;
	};
})(window,document,jQuery);