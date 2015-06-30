//2级菜单-拼音查询面板
//第一参数表示要动画列表插入的位置，第二参数（如果有的话）传递群组的索引值
function pinyinQueryPanel(insertIndex,index){//index也有可能是selectNumber传过来的，此时为
	if(!listFlag){//false表示展开，如果展开列表则删除列表
		removeDirList();
	}
	if(insertIndex == undefined){
		insertIndex = 1; 
	}
	var html='<div id="#dirList" class="newTab"><span class="hideBtn">X</span><ul><li class="directories"><input id="pinyinSearch" type="text"></input><a class="searchBtn" href="javascript:;">查找</a></li><li class="tip">↑请输入要查找人名的首字母或拼音。</li></ul></div>';
	showDirList(insertIndex,html);
	//调输入框及查询按钮样式
	//input容器li
	$(".directories").animate({
		"width":"65%",
		"height":"50px",
		"line-height":"50px",
		"text-align":"left"
	},50);
	$("#pinyinSearch").focus();	

	$(".hideBtn").bind("click",function(){
		removeDirList();
	});
	$(".searchBtn").bind("click",function(event){

		event=EventUtil.getEvent(event);
		EventUtil.stopPropagation(event);


		var pyStr = $("#pinyinSearch").val();
		if(pyStr == ""){//如果无输入则直接进入号簿浏览
			scanDires(insertIndex,index);
		}else{
			pinyinQuery(pyStr,insertIndex,index);			
		}
	});
	//允许回车搜索
	$(document).bind("keypress",function(event){
		event=EventUtil.getEvent(event);
		var keycode=EventUtil.getCharCode(event);
		if(keycode == 13){

			var pyStr = $("#pinyinSearch").val();
			if(pyStr == ""){//如果无输入则直接进入号簿浏览
				scanDires(insertIndex,index);
			}else{
				pinyinQuery(pyStr,insertIndex,index);			
			}		
		}
			$(document).unbind("keypress");

	});

	listFlag=false;

}

//拼音检索
var searchResults;//查找结果记录---在姓名查询、号簿浏览函数也可用该变量
var dir;//对应号簿名称---在姓名查询、号簿浏览函数也可用该变量
//insertIndex表示要动画列表插入的位置，index（如果有的话）传递群组的索引值
function pinyinQuery(str,insertIndex,index){//index也有可能是selectNumber传过来的，此时为
											//messageContent,可用字符串与数字类型判断

	if(insertIndex == undefined){
		insertIndex = 1; 
	}

	searchResults=[[],[],[],[],[]];
	dir=[];
	var reg=/^[A-Za-z]+$/;//验证英文字母

	if(!reg.test(str)){
		alert("请输入首字母或拼音！");
		$("#pinyinSearch").val("");
		return;
	}
	for(var i=0,ilen=directory.length;i<ilen;i++){
		for(var j=0,jlen=directory[i][1].length;j<jlen;j++){
			if( (str.length == 1 &&  str.toLowerCase() == directory[0][1][5][2].substr(0,1)) || directory[i][1][j][2].toLowerCase().indexOf(str.toLowerCase()) == 0){
				//此处的i,j是为了后面传递directory记录的引用
				searchResults[i].push([directory[i][1][j],i,j]);
				dir[i] = directory[i][0];
			}
		}
	}
	


//要查找的号簿
	removeDirList();
	getUIMNames();//更新号簿名
	var html='<div id="#dirList" class="newTab"><ul><li class="tip">↓请选择要检索的号簿</li><li class="directories">'+UIM[0]+'</li><li class="directories">'+UIM[1]+'</li><li class="directories">'+UIM[2]+'</li><li class="directories">'+UIM[3]+'</li><li class="directories">'+UIM[4]+'</li><li  class="directories">---全部---</li></ul></div>';
	showDirList(insertIndex,html);

	$(".directories").bind("click",function(){

			//检索对应号簿
			for(var i=0,len=directory.length;i<len;i++){
				if(directory[i][0] == $(this).html()){
					if(searchResults[i]==""){
						alert("未找到匹配记录！");
						return;
					}

					//选择号簿后---姓名列表取代号簿列表
					// console.log(dir[i]+":"+searchResults[i].toString());
					createNameList(searchResults[i],dir[i],index);
					//这里searchResults[i]必须是第一参数
					//传递的是searchResults数组的第一维
				}
			}

			if($(this).html() == "---全部---"){
				if(searchResults[0] == "" && searchResults[1] == "" &&searchResults[2] == "" &&searchResults[3] == "" &&searchResults[4] == "" ){
					alert("未找到匹配记录！");
					return;
				}

				//检索全部号簿
				//选择“全部”后---姓名列表取代号簿列表
				createNameList(searchResults,index);
				//传递的是整个searchResults数组，有二维
			}

			

	});
}

//创建姓名列表-------姓名查询功能也用该函数
/*新渲染一个页面为查询结果姓名列表接受两个参数，一个为所在号簿dir，
一个为查询结果姓名数组searchResults(对应第一个参数即arguments[0]),
当只有一个参数时，表示选择从全部中查找结果
searchResults每条记录是一个数组，有三个值，分别是记录的映像、
记录在directory的i索引和记录的j索引*/

function createNameList(){
		var k=0,
		records=[],//用来存searchResults里的记录,每个记录有三个值
					//即记录映像，索引i和索引j的值
		dirName=[],//用来存记录相对应的号簿名称
		clickFlag,//记录用户点击的是一个号簿还是“全部”
		indexi,//存放索引i
		indexj,//存放索引j
		index,//存放群组索引
		gpIndex=[],
		groupName=[];//表示要增加还是删除组员的标志量,用来存放参数insertIndex

		removeDirList();
		getUIMNames();//更新号簿名
		getGroupNames();//更新群组名

		if(arguments.length > 2){
			index=arguments[2];//取得传递的群组索引或短信字符串
			//在指定号簿姓名列表中遍历记录条数k
			for(var i=0,len=arguments[0].length;i<len;i++){
				k++;
				records.push(arguments[0][i]);
				gpIndex=arguments[0][i][3];
			}
			;//是一个数组！
			dirName = arguments[1];
			clickFlag = true;//true记录用户点击了某一个号簿
		}else if(arguments.length == 2){

			index=arguments[1];//取得传递的群组索引或短信字符串

			//在全部号簿姓名列表中遍历记录条数k
			for(var i=0,k=0,len=arguments[0].length;i<len;i++){
				for(var j=0;j<arguments[0][i].length;j++){
					k++;
					dirName.push(directory[i][0]);
					records.push(arguments[0][i][j]);
					gpIndex=arguments[0][i][j][3];
				}
			}
			clickFlag = false;//false记录用户点击了全部
		}
		// console.log(k);

		clear();
		var html='<div id="nameResultList" class="layout"><div class="tit"><h1>查询结果列表</h1><h2>The query results list</h2></div></div><div class="namelist"><ul id="listParent"></ul></div><div id="footer" class="layout">Copyright © By.林粤凯</div>';
		$(document.body).html(html);


		for(var l=0;l<k;l++){//records[l]是一个记录项
			groupName=[];//此处需置空重新在下面判断是否为空且计算其值
			//判断姓名或电话号码是否为空
			if(!records[l][0][0]){
				records[l][0][0]=records[l][0][1];
			}
			if(!records[l][0][1]){
				records[l][0][1]="无";
			}
			//将对应的记录的所属群组索引数组取得
			gpIndex=directory[records[l][1]][1][records[l][2]][3];
			//判断是否有所属群组，如果有则取其群组名称
			if(gpIndex){
				for(var i=0;i<gpIndex.length;i++){
					groupName.push(group[gpIndex[i]][0]);
				}//group[directory[records[l][1]][1][records[l][2]][3][0]][0]

			}

			if(clickFlag){//通过判断用户点击的按钮来确定输出“所属”的值
				$("#listParent").append('<li class="nameLi"><span><em class="charFlag"></em><strong class="name">姓名：</strong>'+records[l][0][0]+'</span><span><strong> 电话：</strong>'+records[l][0][1]+'</span><span><strong class="belongsTo">所属号簿：'+dirName+'</strong></span><span class="hide">'+records[l][1]+'</span><span class="hide">'+records[l][2]+'</span><span class="gpflag">群组：'+groupName+'</span></li>');
			}else{
				$("#listParent").append('<li class="nameLi"><span><em class="charFlag"></em><strong class="name">姓名：</strong>'+records[l][0][0]+'</span><span><strong> 电话：</strong>'+records[l][0][1]+'</span><span><strong class="belongsTo">所属号簿：'+dirName[l]+'</strong></span><span class="hide">'+records[l][1]+'</span><span class="hide">'+records[l][2]+'</span><span class="gpflag">群组：'+groupName+'</span></li>');
			}



			$(".gpflag").css({
				"width":"auto"
			});


			if(typeof(index) == "string"){
				$(".nameLi").eq(l).append('<input class="checkBtn" type="checkbox" name="'+records[l][1]+'" name2="'+records[l][2]+'"></input>');
				// console.log($(".checkBtn").eq(l).attr("name")+" "+$(".checkBtn").eq(l).attr("name2"));
			}	
			//最好完善一个分页功能----未完成！////////////


		}
		if(typeof(index) == "string"){
				addCheckBoxes(index);//此时index实际上是messageContent
				return;

		}	

		if(index == undefined){
			createbackBtn("init");
		}else if(typeof(index) == "number"){
			createbackBtn("groupMenu");
		}
		$("#back").css({
			"left":"4%"
		});	


		//跳转下一级菜单
		$(".nameLi").bind("click",function(){
			indexi = $(this).children(".hide")[0].innerHTML;
			indexj = $(this).children(".hide")[1].innerHTML;
			if(index == undefined){
				nameMenu(indexi,indexj);

			}else if(typeof(index) == "number"){
				joinGroup(indexi,indexj,index);//如果有群组索引，则直接加入对应群组
				return;
			}
		});	

}
//电话记录下级菜单：提供查看记录、呼叫、发送短信、
//发送号码、更名、改号等可重用功能
//接收两个或三个参数，用于确定当前记录在数据库所在的位置[indexi][1][indexj]
//第三个参数（如果有的话）index表示群组索引
function nameMenu(indexi,indexj,index){

	clear();//移除上一个面板的事件
	createbackBtn("init");

	//渲染号簿管理面板
	var html='<div id="header" class="layout"><div class="tit"><h1>详情列表</h1><h2>Details list</h2></div></div><div class="main layout"><div id="CR" class="options layout"><p class="CR">查看记录</p><p class="details">姓名：'+directory[indexi][1][indexj][0]+'</p><p class="details">电话: '+directory[indexi][1][indexj][1]+'</p><p class="details">所属号簿：'+directory[indexi][0]+'</p></div><div id="CA" class="options layout">呼叫</div><div id="SM" class="options layout">发送短信</div><div id="SN" class="options layout">发送号码</div><div id="CNE" class="options layout">更名</div><div id="CNU" class="options layout">改号</div><div id="DR" class="options layout">删除记录</div><div id="JG" class="options layout">加入群组</div></div><div id="footer" class="layout">Copyright © By.林粤凯</div>';	
	if(arguments.length == 4){
		html='<div id="header" class="layout"><div class="tit"><h1>组员详细</h1><h2>Details list</h2></div></div><div class="main layout"><div id="CR" class="options layout"><p class="CR">查看记录</p><p class="details">姓名：'+directory[indexi][1][indexj][0]+'</p><p class="details">电话: '+directory[indexi][1][indexj][1]+'</p><p class="details">所属号簿：'+directory[indexi][0]+'</p></div><div id="CA" class="options layout">呼叫</div><div id="SM" class="options layout">发送短信</div><div id="SN" class="options layout">发送号码</div><div id="CNE" class="options layout">更名</div><div id="CNU" class="options layout">改号</div></div><div id="footer" class="layout">Copyright © By.林粤凯</div>';	
	}
	$(html).appendTo(document.body);
	mouseAction();

	//调第一项“查看记录”的样式
	$("#CR").css({
		"height":"115px"
	}).hover(function(){
		$(this).css({
			"height":"125px"
		});
	},function(){
		$(this).css({
			"height":"115px"
		});
	}).mousedown(function(){
		$(this).css("height","115px");
	}).mouseup(function(){
		$(this).css("height","125px");
	});

	$(".CR").css({
		"height":"50px",
		"line-height":"50px"
	});
	$(".details").css({
		"display":"block",
		"width":"200px",
		"margin":"0 auto",
		"padding-left":"100px",
		"text-align":"left",
		"font-size":"18px",
		"line-height":"21px",
		"color":"#666"
	});


//响应点击事件
	$(".options").bind("click",function(){
		switch($(this).attr("id")){
			case "CR": checkRecord();
					   break;
			case "CA": callNum();
					   break;
			case "SM": sendMessage(indexi,indexj);
					   break;
			case "SN": 	var str=directory[indexi][1][indexj][0]+"："+directory[indexi][1][indexj][1];
						sendNumber(str);
					   break;
			case "CNE":changeName();
					   break;
			case "CNU":changeNum();
					   break;
			case "DR": deleteRecord();
					   break; 
		    case "JG": groupManagePanel(7,indexi,indexj);//从此菜单进去无群组索引值可传递
		  			   break; 
			default : alert("出现错误，请刷新重试！");
		}
	});

	this.popWin=function(){
			$('<div id="mask"></div>').css({
					"width":"100%",
					"height":"100%",
					"position":"fixed",
					"top":0,
					"left":0,
					"background":"#E0E0E0",
					"filter":"alpha(opacity=10)",
					"opacity":0.1,
					"z-index":5
				}).appendTo(document.body);
			var pop=$('<div id="popWin"></div>');
			pop.css({
				"height":"50px",
				"width":"200px",
				"position":"fixed",
				"top":"50%",
				"left":"50%",
				"box-shadow":"8px 8px 4px #999",
				"z-index":9,
				"margin-left":"-100px",
				"margin-top":"-25px",
				"background":"#eee",
				"border-radius":"20px",
				"text-align":"center",
				"display":"none",
				"line-height":"50px",
				"font-size":"14px"
			}).appendTo(document.body).fadeIn("fast").html("正在呼叫……");

				 setTimeout(function(){
					pop.html("呼叫完成！")
					setTimeout(function(){
						pop.add($("#mask")).remove();
					},500);
					toggleScroll();
				},500);
		}

	//查看记录
	this.checkRecord=function(){
		alert(directory[indexi][1][indexj][0]+": "+directory[indexi][1][indexj][1]);
	}
	//呼叫。。。
	this.callNum=function(){
		toggleScroll();
		popWin();
	}

	//发送短信
	this.sendMessage=function(indexi,indexj){
		
		removeDirList();


		var html='<div id="#addList class="newTab"><span class="hideBtn">X</span><ul class="ul"><li class="directories" id="sendNew">发送新短信</li><li class="directories" id="meses">已有短信</li></ul></div>';

		showDirList(2,html);
		$(".hideBtn").bind("click",function(){
			removeDirList();
		});
		$(".directories").bind("click",function(){
			if($(this).attr("id") == "sendNew"){
				removeDirList();
				html='<div id="addList" class="newTab"><span class="hideBtn">X</span><ul><li class="liwrap"><textarea class="message"></textarea><div class="btn">发送</div></li></ul></div>';
				showDirList(2,html);
					$(".hideBtn").bind("click",function(){
						$(".newTab").remove();
					});
				$(".btn").css({
					"width":"100px",
					"height":"40px",
					"background":"#367",
					"border":"1px solid #642",
					"border-radius":"5px",
					"line-height":"40px",
					"cursor":"pointer",
					"color":"#fff",
					"text-align":"center",
					"margin":"0 auto"
				});
				$(".message").focus();
				$(".btn").bind("click",function(){
					if($(".message").val() != ""){
						alert('新短信“'+$(".message").val()+'”发送成功！');
						initPanel();
						return;
					}else{
						alert("你要发给谁啊！！？");
						return;
					}

				});

			}else{
				theMessages("send");

			}
		});


	}

	//发送号码
	this.sendNumber=function(str){
		selectMember(str);
		////////////////////////////////////////////////
		//////////////////
		///////////////////////////////////////////////////
	}

	//改名
	this.changeName=function(){
			var newName = prompt("请输入对方新名称（1-6个字符）：",directory[indexi][1][indexj][0]);
			var charLen;//存放字符长度
			//判断是否汉字，计算字符长度
			if(newName){
				for(var q=0,charLen=0;q < newName.length;q++){
					if(ischinese(newName[q])){
						charLen+=2;
					}else{
						charLen+=1;
					}
				}
				if(1<= charLen && charLen < 7){//1-6个字符
					directory[indexi][1][indexj][0] = newName;
					$(".details:eq(0)").html("姓名："+directory[indexi][1][indexj][0]);
					alert("更名成功！");
					updateDB();//更新数据库根据拼音重新排序
							//更名，删除，新增都要用到！！！
							//后面要返回主菜单！
					initPanel();
				}else{
					alert("更名失败，请注意名称长度！");
					removeDirList();
				}	
			}
	}

	//改号
	this.changeNum=function(){
			var newNum = prompt("请输入对方新号码（3-16个数字）：",directory[indexi][1][indexj][1]);
			var charLen;//存放字符长度
			//判断是否汉字，计算字符长度
			var reg=/^[\d]{3,16}$/;
			if(newNum){
				if(!reg.test(newNum)){
					alert("请正确输入！");
					return;
				}
			
				directory[indexi][1][indexj][1] = newNum;
				$(".details:eq(1)").html("电话："+directory[indexi][1][indexj][1]);
				alert("改号成功！");
				updateDB();//更新数据库根据拼音重新排序
							//更名，删除，新增都要用到！！！
							//后面要返回主菜单！
				initPanel();
			}
	}

	//删除记录
	this.deleteRecord=function(){
		//删除号簿记录时，也将删除其群组内记录
		//遍历群组内所有记录，将对应的记录给删除
		for(var i=0,ilen=group.length;i<ilen;i++){
			for(var j=0,jlen=group[i][1].length;j<jlen;j++){
				if(group[i][1][j][1] == indexi && group[i][1][j][2] == indexj){
					group[i][1].splice(j,1);

				}
			}
		}
			directory[indexi][1].splice(indexj,1);
			updateDB();//更新数据库根据拼音重新排序
					//更名，删除，新增都要用到！！！
					//后面要返回主菜单！



		alert("删除成功！");
		initPanel();		
	}



}

