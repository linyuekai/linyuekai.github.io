//短信群发
function groupMessageing(){
	clear();
	createbackBtn("init");

	var html='<div id="header" class="layout"><div class="tit"><h1>短信群发</h1><h2>Group Messaging</h2></div></div><div class="main layout"><div id="SNM" class="options layout">发送新短信</div><div id="M" class="options layout">已有短信</div><div id="MS" class="options layout">短信签名</div></div><div id="footer" class="layout">Copyright © By.林粤凯</div>';
	$(html).appendTo(document.body);
	mouseAction();


	//响应点击事件
	$(".options").bind("click",function(){
		switch($(this).attr("id")){
			case "SNM": sendNewMessages();
					   break;
			case "M":  theMessages();
					   break;
			case "MS": messageSign();
					   break;
			
			default : alertPanel("出现错误，请刷新重试！");
		}
	});


}

//发送新短信
function sendNewMessages(){
	removeDirList();
	getUIMNames();//更新号簿名

	var html='<div id="#addList class="newTab"><span class="hideBtn">X</span><ul><li class="tip">↓请输入短信内容（只能输入1-140字节）。</li><li class="directories"><textarea id="message" class="message"></textarea></li><li class="messageBtn"><a href="javascript:;">提交短信</a></li></ul></div>';

	showDirList(0,html);

	$(".directories").animate({
		"width":"303px",
		"height":"113px"
	},50);

	$(".hideBtn").bind("click",function(){
		removeDirList();
	});

	$(".message").focus();
	$(".messageBtn").bind("click",function(){

		if($(".message").val() == ""){
			alert("请输入短信内容！");
			return;
		}else{
			var messageContent = $(".message").val();
			var charLen;//存放字符长度
			//判断是否汉字，计算字符长度
			if(messageContent){
				for(var q=0,charLen=0;q < messageContent.length;q++){
					if(ischinese(messageContent[q])){
						charLen+=2;
					}else{
						charLen+=1;
					}
				}
			}
			if(!(0 < charLen && charLen <=140)){
				alert("请输入1-140字节的内容！");
				return;
			}
			selectMember(messageContent);//跳转到5级菜单
		}
	});

}


//5级菜单，选择短信接收人
function selectMember(messageContent){
	clear();
	createbackBtn("groupMessageing");

	var html='<div id="header" class="layout"><div class="tit"><h1>短信接收人</h1><h2>Message Recipient</h2></div></div><div class="main layout"><div id="SG" class="options layout">选择群组</div><div id="SN" class="options layout">选择号码</div><div id="IN" class="options layout">输入号码</div></div><div id="footer" class="layout">Copyright © By.林粤凯</div>';
	$(html).appendTo(document.body);
	mouseAction();


	//响应点击事件
	$(".options").bind("click",function(){
		switch($(this).attr("id")){
			case "SG": selectGroup(messageContent);
					   break;
			case "SN":  selectNumber(messageContent);
					   break;
			case "IN": inputNumber(messageContent);
					   break;
			
			default : alertPanel("出现错误，请刷新重试！");
		}
	});

}

//选择短信接收人---选择群组
function selectGroup(messageContent){
	removeDirList();
	getGroupNames();//更新群组名
	var html='<div id="#scanList" class="newTab"><span class="hideBtn">X</span><ul><li class="tip">请选择群组。↓</li><li class="directories">'+GP[0]+'</li><li class="directories">'+GP[1]+'</li><li class="directories">'+GP[2]+'</li><li class="directories">'+GP[3]+'</li><li class="directories">'+GP[4]+'</li><li class="directories">'+GP[5]+'</li><li class="directories">'+GP[6]+'</li><li class="directories">'+GP[7]+'</li></ul></div>';
	showDirList(0,html);
	
	$(".hideBtn").bind("click",function(){
		removeDirList();
	});

	$(".directories").bind("click",function(){
		for(var i=0;i<group.length;i++){
			if(group[i][0] == $(this).html()){
				var index=i;//选择的群组的索引

				removeDirList();
				getGroupNames();//更新群组名
				var html='<div id="#scanList" class="newTab"><span class="hideBtn">X</span><ul><li class="directories" id="select">选择发送</li><li class="directories" id="all">全部发送</li></ul></div>';
				showDirList(0,html);
				$(".hideBtn").bind("click",function(){
					removeDirList();
				});

				$(".directories").bind("click",function(){
					var searchResults=[[],[],[],[],[],[],[],[]];
					var dir=[];
					// var tempGroup=[];
					if($(this).attr("id") == "select"){
						//选择发送

							mutiSelectMember(messageContent,index);

					}else{//全部发送

						for(var j=0;j<group[index][1].length;j++){
							// tempGoup.push(group[index][1][j]);
							searchResults[index].push([group[index][1][j][0][0],group[index][1][j][1],group[index][1][j][2]]);
							dir.push(directory[group[index][1][j][1]][0]);
						}
						// console.log(searchResults[index]);
						ifSendPanel(messageContent,searchResults[index],dir,index);
						// ReceiverList(searchResults[index],dir,index);
					}
				});	
			}
		}
	});
}

//选择短信接收人---选择号码
function selectNumber(messageContent){

	if(!listFlag){//listFlag为false则删除列表
		removeDirList();
	}
	var html='<div id="#dirList" class="newTab"><span class="hideBtn">X</span><ul><li class="tip">↓请选择查找成员的方式</li><li class="directories" id="pinyin">拼音检索</li><li class="directories" id="name">姓名查找</li><li class="directories" id="scan">号簿浏览</li></ul></div>';
	showDirList(1,html);

	$(".hideBtn").bind("click",function(){
		removeDirList();
	});

	$(".directories").bind("click",function(){
		switch($(this).attr("id")){
			case "pinyin": pinyinQueryPanel(1,messageContent);//1表示一个插入位置insertIndex
							break;
			case "name":   nameQueryPanel(1,messageContent);
							break;
			case "scan":   scanDires(1,messageContent);
							break;
		}
		

	});


}

//选择短信接收人---输入号码
function inputNumber(messageContent){
		if(!listFlag){//false表示展开，如果展开列表则删除列表
		removeDirList();
	}
	var html='<div id="#dirList" class="newTab"><span class="hideBtn">X</span><ul><li class="directories"><input id="numSearch" type="text"></input><a class="searchBtn" href="javascript:;">确定</a></li><li class="tip">↑请输入要接收短信的号码。</li></ul></div>';
	showDirList(2,html);
	//调输入框及查询按钮样式
	//input容器li
	$(".directories").animate({
		"width":"65%",
		"height":"50px",
		"line-height":"50px",
		"text-align":"left"
	},50);
	$("#numSearch").focus();	

	$(".hideBtn").bind("click",function(){
		removeDirList();
	});

	$(".searchBtn").bind("click",function(event){
		event=EventUtil.getEvent(event);
		EventUtil.stopPropagation(event);


		var numStr = $("#numSearch").val();
		if(numStr == ""){//如果无输入则直接进入号簿浏览
			alert("你要把短信发给谁！！");
			return;
		}else{

			var reg=/^[\d]{3,16}$/;
			if(!reg.test(numStr)){
				alert("请输入3-16个数字！");
				return;
			}		

			var arr=[];
			var dir=[];
			var gpindex=[];
			arr.push([["无",parseInt(numStr),"",[]],-1,-1]);
			
			ifSendPanel(messageContent,arr,dir,gpindex);
	
		}
	});

}

//选择短信接收人---选择群组-----选择发送
function mutiSelectMember(messageContent,index){
	clear();
	var slehtml='<div id="nameResultList" class="layout"><div class="tit"><h1>接收人列表</h1><h2>The Receiver\'s List</h2></div></div><div class="namelist"><ul id="listParent"></ul></div><div id="footer" class="layout">Copyright © By.林粤凯</div>';
	$(document.body).html(slehtml);
	for(var i=0;i<group[index][1].length;i++){
		 // console.log(group[index][1][i][2]);
		$("#listParent").append('<li class="nameLi"><span><em class="charFlag"></em><strong class="name">姓名：</strong>'+group[index][1][i][0][0][0]+'</span><span><strong> 电话：</strong>'+group[index][1][i][0][0][1]+'</span><span><strong class="belongsTo">所属号簿：'+directory[group[index][1][i][1]][0]+'</strong></span><span class="hide">'+group[index][1][i][1]+'</span><span class="hide">'+group[index][1][i][2]+'</span><span class="gpflag">群组：'+group[index][0]+'</span><input class="checkBtn" type="checkbox" name="'+i+'" ></input></li>');
	}

	addCheckBoxes(messageContent,index);
}

function addCheckBoxes(messageContent,index){
	var checkboxes=$("input");
	createbackBtn("groupMessageing");
	$("#back").css({
		"left":"4%"
	});	
	$(".checkBtn").css({
		"width":"30px",
		"height":"30px",
		"float":"right"
	});

	$('<div class="btn">确定已选名单</div>').appendTo(document.body).css({
		"width":"100px",
		"height":"40px",
		"position":"fixed",
		"font-size":"16px",
		"line-height":"40px",
		"text-align":"center",
		"background":"#c1c",
		"color":"#fff",
		"right":"4%",
		"top":"50%",
		"margin-top":"-20px",
		"cursor":"pointer",
		"box-shadow":"5px 0 0 #333"
	}).hover(function(){
		$(this).css("background","#e2e");
	},function(){
		$(this).css("background","#c1c");
	});

		$(".btn").bind("click",function(){

			var searchResults=[[],[],[],[],[],[],[],[]];
			var dir=[];
			var gpindex=[];
		// console.log(checkboxes.length);

			for(var i = 0;i<checkboxes.length;i++){
				if(checkboxes.eq(i)[0].checked==true){
					if(index != undefined){

						// console.log(group[index][1][i][0][0]);
					
						searchResults[index].push([group[index][1][i][0][0],group[index][1][i][1],group[index][1][i][2]]);
						dir.push(directory[group[index][1][i][1]][0]);

		
					}else{
					
						searchResults[0].push([directory[checkboxes.eq(i).attr("name")][1][checkboxes.eq(i).attr("name2")],checkboxes.eq(i).attr("name"),checkboxes.eq(i).attr("name2")]);
						dir.push(directory[checkboxes.eq(i).attr("name")][0]);
						gpindex.push(directory[checkboxes.eq(i).attr("name")][1][checkboxes.eq(i).attr("name2")][3]);

					}


				}

			}
			if(index != undefined){
				gpindex=index;
				
				
				ifSendPanel(messageContent,searchResults[index],dir,gpindex);

			}else{
				ifSendPanel(messageContent,searchResults[0],dir,gpindex);
			}

		});


}



//是否继续添加询问列表
function ifSendPanel(messageContent,arr,dir,index){
	clear();

	var html='<div id="header" class="layout"><div class="tit"><h1>确认列表</h1><h2>Confirm The List</h2></div></div><div class="main layout"><div id="SM" class="options layout">发送短信</div><div id="CA" class="options layout">继续添加</div><div id="CRL" class="options layout">查看接收人列表</div><div id="CMC" class="options layout">查看短信内容</div><div id="EXIT" class="options layout">退出</div></div><div id="footer" class="layout">Copyright © By.林粤凯</div>';
	$(html).appendTo(document.body);
	mouseAction();


	//响应点击事件
	$(".options").bind("click",function(){
		switch($(this).attr("id")){
			case "SM": sendMessages(messageContent);
					    break;
			case "CA":  continueAdd(messageContent,arr,dir,index);
					    break;
			case "CRL":  ReceiverList(messageContent,arr,dir,index);
					    break;
		    case "CMC":  checkMessageContent(messageContent);
		  				break;
		    case "EXIT":  ifExit();
		  				break;
			
			default : alertPanel("出现错误，请刷新重试！");
		}
	});
}


//发送短信
function sendMessages(messageContent){
	alert('短信发送成功！');
	initPanel();
}

//继续添加
function continueAdd(messageContent,arr,dir,index){
	alert("待定！");
	return;
	selectMember(messageContent,arr,dir,index);
}

//查看接收人列表
function ReceiverList(messageContent,arr,dirName,gpindex){
	if(arr.toString() == ""){
		selectMember(messageContent);
		return;
	}
	clear();
	var groupName=[];
	if(typeof gpindex == "object"){
		for(var i=0;i<gpindex.length;i++){
			groupName.push([]);
			for(var j=0;j<gpindex[i].length;j++){
			groupName[i].push(group[gpindex[i][j]][0]);
			// console.log(group[gpindex[i][j]][0]);

		}}
	}


	var allhtml='<div id="nameResultList" class="layout"><div class="tit"><h1>接收人列表</h1><h2>The Receiver\'s List</h2></div></div><div class="namelist"><ul id="listParent"></ul></div><div id="footer" class="layout">Copyright © By.林粤凯</div>';
	$(document.body).html(allhtml);
	for(var i=0;i<arr.length;i++){

		if(typeof (gpindex) != "object" ){
			$("#listParent").append('<li class="nameLi"><span><em class="charFlag"></em><strong class="name">姓名：</strong>'+arr[i][0][0]+'</span><span><strong> 电话：</strong>'+arr[i][0][1]+'</span><span><strong class="belongsTo">所属号簿：'+dirName[i]+'</strong></span><span class="hide">'+arr[i][1]+'</span><span class="hide">'+arr[i][2]+'</span><span class="gpflag">群组：'+group[gpindex][0]+'</span><span id="'+i+'" class="del">X</span></li>');
		}else{

			$("#listParent").append('<li class="nameLi"><span><em class="charFlag"></em><strong class="name">姓名：</strong>'+arr[i][0][0]+'</span><span><strong> 电话：</strong>'+arr[i][0][1]+'</span><span><strong class="belongsTo">所属号簿：'+dirName[i]+'</strong></span><span class="hide">'+arr[i][1]+'</span><span class="hide">'+arr[i][2]+'</span><span class="gpflag">群组：'+groupName[i]+'</span><span id="'+i+'" class="del">X</span></li>');

		}
	}


	$(".del").css({
		"width":"40px",
		"height":"40px",
		"line-height":"40px",
		"background":"#333",
		"color":"#fff",
		"font-size":"40px",
		"float":"right",
		"border":"1px solid #666",
		"border-radius":"20px"
	}).hover(function(){
		$(this).css("background","#aaa");
	},function(){
		$(this).css("background","#333");

	}).bind("click",function(event){
		event=EventUtil.getEvent(event);
		EventUtil.stopPropagation(event);

		if(confirm("是否删除重选？")){
			alert("删除成功！");
			arr.splice($(this).attr("id"),1);
			dirName.splice($(this).attr("id"),1);
			if(typeof (gpindex) == "object" ){
				gpindex.splice($(this).attr("id"),1);
			}
			ReceiverList(messageContent,arr,dirName,gpindex);
			return;
		}else{
			return;
		}
	});
	
	$('<div class="send">发送</div>').css({
		"width":"70px",
		"height":"30px",
		"line-height":"25px",
		"background":"#737",
		"color":"#1f1",
		"font-size":"20px",
		"position":"fixed",
		"right":"4%",
		"top":"50%",
		"margin-top":"-15px",
		"border":"1px solid #666",
		"border-radius":"20px",
		"text-align":"center",
		"cursor":"pointer"
	}).appendTo(document.body).hover(function(){
		$(this).css("background","#b4b");
	},function(){
		$(this).css("background","#737");
	}).bind("click",function(){
		alert("短信发送成功！");
		initPanel();
		return;
	});


}

//查看短信内容
function checkMessageContent(messageContent){
	alert(messageContent);
}

//退出
function ifExit(){
	if(confirm("是否退出？")){
		initPanel();
	}else{
		return;
	}
}