//群组管理
function groupManagePanel(insertIndex,indexi,indexj){

	var argslen=arguments.length;//取得参数个数以判断是否跳转到群组菜单
								//如参数个数为3则表示是从详细列表处调用的
								//此时应直接加入群组
	if(insertIndex == undefined){
		insertIndex = 4; 
	}

	removeDirList();
	getGroupNames();//更新群组名
	var html='<div id="#scanList" class="newTab"><span class="hideBtn">X</span><ul><li class="tip">请选择群组。↓</li><li class="directories">'+GP[0]+'</li><li class="directories">'+GP[1]+'</li><li class="directories">'+GP[2]+'</li><li class="directories">'+GP[3]+'</li><li class="directories">'+GP[4]+'</li><li class="directories">'+GP[5]+'</li><li class="directories">'+GP[6]+'</li><li class="directories">'+GP[7]+'</li></ul></div>';
	showDirList(insertIndex,html);
	
	$(".hideBtn").bind("click",function(){
		removeDirList();
	});

	$(".directories").bind("click",function(){
		for(var i=0,len=group.length;i<len;i++){
			 if(group[i][0] == $(this).html()){
			 	if(argslen == 3){
			 		//此处的1只是为了增加一个参数，以在调用函数内部判断是从哪里
			 		//调用的，从而判断调用结束后返回的界面
			 		joinGroup(indexi,indexj,i,1);
			 		return;
			 	}
				//跳转到下一级菜单
				groupMenu(i);
			}
		}
		removeDirList();
			
	});
}
//接受一个参数index索引值,index用来获取对应群组
function groupMenu(index){
	//绘制群组菜单
	removeDirList();//移除本面板列表，控制好标志变量的值以控制显隐
	clear();
	createbackBtn("init");
	var html='<div id="header" class="layout"><div class="tit"><h1>群组菜单</h1><h2>Group Menu</h2></div></div><div class="main layout"><div id="AGM" class="options layout">添加组员</div><div id="DGM" class="options layout">删除组员</div><div id="CGM" class="options layout">查看组员</div><div id="EGM" class="options layout">清空组员</div><div id="GCM" class="options layout">群组更名</div></div><div id="footer" class="layout">Copyright © By.林粤凯</div>';
	$(html).appendTo(document.body);
	mouseAction();

	//响应点击事件
	$(".options").bind("click",function(){
		switch($(this).attr("id")){
			case "AGM": addGroupMember(index);//参数传递群组的索引值
					   break;
			case "DGM": deleteGroupMember(index);
					   break;
			case "CGM": checkGroupMember(index);
					   break;
			case "EGM": emptyGroupMember(index);
					   break;
			case "GCM": changeGroupName(index);
					   break;
		
			default : alert("出现错误，请刷新重试！");
		}
	});



	function drawGroupMemberList(index){
		if(group[index][1].length == 0){
			alert("该群组为空,快去添加组员吧！↑");
			return;
		}

		removeDirList();
		getUIMNames();//更新号簿名
		getGroupNames();//更新群组名
		clear();
		var html='<div id="nameResultList" class="layout"><div class="tit"><h1>删除组员</h1><h2>The query results list</h2></div></div><div class="namelist"><ul id="listParent"></ul></div><div id="footer" class="layout">Copyright © By.林粤凯</div>';
		$(document.body).html(html);
		if(arguments.length == 2){
			$(".tit h1").html("查看组员");
		}
		createbackBtn("groupMenu",index);
		$("#back").css({
			"left":"4%"
		});	

		for(var i=0,len=group[index][1].length;i<len;i++){
			$("#listParent").append('<li class="nameLi"><span><strong class="name">姓名：</strong>'+group[index][1][i][0][0][0]+'</span><span><strong> 电话：</strong>'+group[index][1][i][0][0][1]+'</span><span><strong class="belongsTo">所属号簿：'+directory[group[index][1][i][1]][0]+'</strong></span><span class="hide">'+group[index][1][i][1]+'</span><span class="hide">'+group[index][1][i][2]+'</span><span class="gpflag">群组：'+group[index][0]+'</span></li>');
		}

	}

	//删除组员
	this.deleteGroupMember=function(index){
		drawGroupMemberList(index);//渲染该组列表

		$(".nameLi").bind("click",function(){
			indexi = $(this).children(".hide")[0].innerHTML;
			indexj = $(this).children(".hide")[1].innerHTML;;
			deleteGroup(indexi,indexj,index);
		});

	}

	//查看组员
	this.checkGroupMember=function(index){
		drawGroupMemberList(index,1);//渲染该组列表
		

				//跳转下一级菜单
		$(".nameLi").bind("click",function(){
			indexi = $(this).children(".hide")[0].innerHTML;
			indexj = $(this).children(".hide")[1].innerHTML;
			nameMenu(indexi,indexj,index,1);//此处1做变量，在调用函数内部判断
											//参数个数，当为4个时，则对html重写
											//表示组员详细

		});	
	}

	//清空本组
	this.emptyGroupMember=function(index){
		//切断群组对应的记录和号簿记录对应的群组索引
		group[index][1]=[];
		for(var i=0,ilen=directory.length;i<ilen;i++){
			for(var j=0,jlen=directory[i][1].length;j<jlen;j++){
				directory[i][1][j][3]=[];
			}
		}
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
			}).appendTo(document.body).fadeIn("fast").html("正在清空……");

				 setTimeout(function(){
					pop.html("清空完成！")
					setTimeout(function(){
						pop.add($("#mask")).remove();
					},500);
					toggleScroll();
				},500);
		}

		popWin();
		toggleScroll();
	}



	//群组更名
	this.changeGroupName=function(index){
		removeDirList();
		getGroupNames();//更新群组名

		var newGPName=prompt("请输入你要更改的名称（1-6个字符）：",GP[index]);
		var charLen;//存放字符长度
			//判断是否汉字，计算字符长度
			if(newGPName){
				for(var q=0,charLen=0;q < newGPName.length;q++){
					if(ischinese(newGPName[q])){
						charLen+=2;
					}else{
						charLen+=1;
					}
				}
			}else{
				return;
			}
		if(1<= charLen && charLen < 7){
			for(var m=0,len=group.length;m<len;m++){
				if(newGPName == group[m][0]){
					alert("已有该群组名，请换一个！");
					return;
				}
			}
			group[index][0]=newGPName;
			alert("更名成功！");
		}else{
			alert("更名失败，请注意名称长度！");
		}
	}

}


	//添加组员
	//传递参数表示群组的索引值
	function addGroupMember(index){
		if(!listFlag){//listFlag为false则删除列表
			removeDirList();
		}
		var html='<div id="#dirList" class="newTab"><span class="hideBtn">X</span><ul><li class="tip">↓请选择查找成员的方式</li><li class="directories" id="pinyin">拼音检索</li><li class="directories" id="name">姓名查找</li><li class="directories" id="scan">号簿浏览</li></ul></div>';
		showDirList(0,html);

		$(".hideBtn").bind("click",function(){
			removeDirList();
		});

		$(".directories").bind("click",function(){
			switch($(this).attr("id")){
				case "pinyin": pinyinQueryPanel(0,index);//0表示一个插入位置insertIndex
								break;
				case "name":   nameQueryPanel(0,index);//index表示群组索引
								break;
				case "scan":   scanDires(0,index);
								break;
			}
			
		});

	}



//加入群组

function joinGroup(indexi,indexj,index){
	if(group[index][1].length > 99){
		alert("该群组最多只能保存100条联系人信息，添加失败！");
		return;
	}
	if(directory[indexi][1][indexj][3].toString().indexOf(index) > -1){
		alert("该成员已经是该组成员！");
		return;
	}
	if(directory[indexi][1][indexj][3].length == 4){
		alert("该成员已经所属四个群组，无法再增加群组了！");
		return;
	}
	

	//从directory的镜像groupTempRecords中取出相应的项并在镜像中删除
	group[index][1].push([groupTempRecords[indexi].splice(indexj,1),indexi,indexj]);
	//给directory对应的记录一个第三位（数组表示），标志其所属的所有群组
	directory[indexi][1][indexj][3].push(index);
	updateDB();


	alert("成功加入群组！");

	if(arguments.length == 3){//从群组菜单调用，返回群组菜单
		groupMenu(index);
	}else if(arguments.length == 4){//从详情列表调用，返回详情列表
		initPanel();
	}
}

//删除组员
function deleteGroup(indexi,indexj,index){
	for(var i=0,len=group[index][1].length;i<len;i++){
		if(group[index][1][i][1] == indexi && group[index][1][i][2] == indexj){
			group[index][1].splice(i,1);
		}
	}
	//断开号簿记录与群组记录之间的羁绊
	var indexof=directory[indexi][1][indexj][3].toString().indexOf(index);
	if(indexof > -1){
		directory[indexi][1][indexj][3].splice(indexof,1);
	}

	alert("删除成功！");
	groupMenu(index);//返回4级菜单
}