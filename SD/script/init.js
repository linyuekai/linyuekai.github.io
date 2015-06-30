var listFlag=true;//控制列表动画显隐-true表示此时无展开
var scrollFlag=true;//控制滚动条是否禁止滚动


//鼠标hover和点击时的动画
	function mouseAction(){
		$(".options").hover(function(){
				$(this).css({
					"box-shadow": "2px 2px 6px #999",
					"height": "90px",
					"line-height": "90px",
					"border":"1px solid #666"
				});
			},function(){
				$(this).css({
					"box-shadow": "1px 1px 2px #999",
					"height": "80px",
					"line-height": "80px",
					"border":"1px solid #ccc"
				});
			}).mousedown(function(){
				$(this).css("height","80px");
			}).mouseup(function(){
				$(this).css("height","90px");
			});
	}


function stopScroll(e){
	e=EventUtil.getEvent(e);
	EventUtil.preventDefault(e);
}
//禁止滚动条滚动
function toggleScroll(){

	if(scrollFlag){
		$(document).bind("mousewheel",stopScroll);	
		scrollFlag=false;
	}else if(!scrollFlag){
		$(document).unbind("mousewheel",stopScroll);
		scrollFlag=true;
	}
}

	//显示列表	
function showDirList(i,listhtml){
		//listhtml是要展示的列表的html字符串,需要具有directories类名的元素
	if(listFlag){
		$(listhtml).insertAfter($(".options").eq(i));
		$(".directories").animate({
			height:"30px"
		},300);	
		listFlag=false;
	}
};

	//隐藏列表
function removeDirList(){
	$(".chooseBtn").unbind("click");
	$(".chooseBtn").closest("div").remove();
	$(".directories").unbind("click");
	$(".directories").animate({
							height:0,
							"font-size":0,
							"border":0
						},300,function(){
							$(this).closest("div").remove();
						});
	listFlag=true;
}


//检查是否中文汉字
 	function ischinese(strword){   
  		var newPar = /[^\u4E00-\u9FA5]/g   
	    return !newPar.test(strword);   
	}



//返回初始菜单
function createbackBtn(gowhere,index){

	//返回上一层按钮
	$('<div id="back"></div>').appendTo(document.body).css({
				"width":0,
				"height":0,
				"position":"fixed",
				"left":"10%",
				"top":"50%",
				"margin-top":"-60px",
				"border":"60px solid transparent",
				"border-right":"60px solid #025",
				"cursor":"pointer",
				"box-shadow":"5px 0 0 #333"
			}).click(function(){
				switch(gowhere){
					case "init": initPanel();
								 break;
					case "groupMenu": groupMenu(index);
							 	 break;
		 			case "groupMessageing": groupMessageing();
			 					 break;	 
			 		case "selectMember": selectMember();
			 					 break;
					default :   ;
				}
			}).hover(function(){
				$(this).css("border-right","60px solid #e2e");
			},function(){
				$(this).css("border-right","60px solid #025");
			});
}



//清空内容，移除options事件
	function clear(){
		$("*").unbind("click");
		$(document.body).html("");	
	}

//弹窗功能
	//为了弹窗创建遮罩层
	function createMask(){
		$('<div id="mask"></div>').css({
					"width":"100%",
					"height":"100%",
					"position":"fixed",
					"top":0,
					"left":0,
					"z-index":5
				}).appendTo(document.body);

		return $("#mask");
	}
	//创建弹窗，接受弹窗id字符串,并返回弹窗按钮的jquery对象
	function createPanel(idstr){
		$("#"+idstr).css({
				"height":"120px",
				"width":"220px",
				"position":"fixed",
				"top":"50%",
				"left":"50%",
				"box-shadow":"8px 8px 4px #999",
				"z-index":9,
				"margin-left":"-110px",
				"margin-top":"-60px",
				"background":"#eee",
				"text-align":"center",
				"line-height":"1.2em",
				"font-size":"16px",
				"border-radius":"15px"
		});
		$("#"+idstr+" p").css({
			"padding":"10px",
			"height":"55px"
		});
		$("#"+idstr+" a").css({
			"display":"inline-block",
			"width":"70px",
			"height":"30px",
			"background":"#f00",
			"margin":"5px auto",
			"border-radius":"12px",
			"text-decoration":"none",
			"text-align":"center",
			"color":"#fff",
			"line-height":"30px"
		}).hover(function(){
			$(this).css("background","#00f");
		},function(){
			$(this).css("background","#f00");
		});

		return $("#"+idstr+" a");
	}

	//移除弹窗遮罩
	function removePanel(){
			$("#mask a").unbind("click");
			$("#mask a").closest("div").add($("#mask")).remove();
	}

	//代替alert事件
	function alertPanel(str){
		createMask().append('<div id="alertPanel"><p>'+str+'</p><a href="javascript:;">确定</a></div>');;
		toggleScroll();//禁止滚动条滚动
		createPanel("alertPanel").bind("click",function(){
			toggleScroll();//恢复滚动条滚动
			removePanel();
		});
		$(document).bind("keypress",function(event){
			event=EventUtil.getEvent(event);
			var keycode=EventUtil.getCharCode(event);
			if(keycode == 13){
				toggleScroll();
				removePanel();
			}
		});
	}

//代替confirm事件----------未完成！///////////
	/*var confirmFlag;
		function confirmPanel(str){
			createMask().append('<div id="confirmPanel"><p>'+str+'</p><a href="javascript:;">确定</a><a href="javascript:;">取消</a></div>');
			$(document.documentElement).css("overflow-y","hidden");
			createPanel("confirmPanel").css("margin","5px").eq(0).bind("click",function(){
				confirmFlag=true;
			});
			$("#confirmPanel a").eq(1).bind("click",function(){
				confirmFlag=false;
			});

		}*/
		
//设置默认当前号簿为UIM1,并取得当前号簿名
	currentDir=directory[0];
	currentDirName=directory[0][0];
	//取得所有号簿名分别为UIM[0]，UIM[1]，UIM[2]，UIM[3]，UIM[4]
	var UIM=[];
	function getUIMNames(){
		for(var i=0,len=directory.length;i<len;i++){
			UIM[i]=directory[i][0];
		}
	}
	//取得所有群组名分别为GP[0]，GP[1]，GP[2]，GP[3]，GP[4]
	var GP=[];
	function getGroupNames(){
		for(var i=0,len=group.length;i<len;i++){
			GP[i]=group[i][0];
		}
	}


$(function(){
	updateDB();

	initPanel();

});