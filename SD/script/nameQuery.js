//2级菜单-姓名查询面板
//第一参数表示要动画列表插入的位置，第二参数（如果有的话）传递群组的索引值
function nameQueryPanel(insertIndex,index){
	if(!listFlag){//false表示展开，如果展开列表则删除列表
		removeDirList();
	}
	if(insertIndex == undefined){
		insertIndex = 2; 
	}
	var html='<div id="#nameList" class="newTab"><span class="hideBtn">X</span><ul><li class="directories"><input id="nameSearch" type="text"></input><a class="searchBtn" href="javascript:;">查找</a></li><li class="tip">↑请输入要查找的人名。</li></ul></div>';
	showDirList(insertIndex,html);
	//调输入框及查询按钮样式
	$(".directories").animate({//容器li
		"width":"65%",
		"height":"50px",
		"line-height":"50px",
		"text-align":"left"
	},50);
	$("#nameSearch").focus();	
	$(".hideBtn").bind("click",function(){
		removeDirList();
	});

	$(".searchBtn").bind("click",function(event){	
		event=EventUtil.getEvent(event);
		EventUtil.stopPropagation(event);

		var nameStr = $("#nameSearch").val();
		if(nameStr == ""){//如果无输入则直接进入号簿浏览
			scanDires(insertIndex,index);
		}else{
			nameQuery(nameStr,insertIndex,index);			
		}
	});
	//允许回车搜索
	$(document).bind("keypress",function(event){
		event=EventUtil.getEvent(event);
		var keycode=EventUtil.getCharCode(event);
		if(keycode == 13){

			var nameStr = $("#nameSearch").val();
			if(nameStr == ""){//如果无输入则直接进入号簿浏览
				scanDires(insertIndex,index);
			}else{
				nameQuery(nameStr,insertIndex,index);			
			}	
			$(document).unbind("keypress");
		}
	});


	listFlag=false;
}

//姓名检索
function nameQuery(str,insertIndex,index){
	if(insertIndex == undefined){
		insertIndex = 2; 
	}

	searchResults=[[],[],[],[],[]];
	dir=[];

	for(var i=0,ilen=directory.length;i<ilen;i++){
		for(var j=0,jlen=directory[i][1].length;j<jlen;j++){
			if(directory[i][1][j][0].indexOf(str) == 0){
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