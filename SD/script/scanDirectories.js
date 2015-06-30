//号簿浏览
function scanDires(insertIndex,index){
	searchResults=[[],[],[],[],[]];
	dir=[];
	if(insertIndex == undefined){
		insertIndex = 3; 
	}
	removeDirList();
	getUIMNames();//更新号簿名
	var html='<div id="#scanList" class="newTab"><span class="hideBtn">X</span><ul><li class="directories">'+UIM[0]+'</li><li class="directories">'+UIM[1]+'</li><li class="directories">'+UIM[2]+'</li><li class="directories">'+UIM[3]+'</li><li class="directories">'+UIM[4]+'</li><li class="directories">---全部---</li><li class="tip">↑请选择要浏览的号簿。</li></ul></div>';
	showDirList(insertIndex,html);

	$(".hideBtn").bind("click",function(){
		removeDirList();
	});


	for(var i=0,ilen=directory.length;i<ilen;i++){
		for(var j=0,jlen=directory[i][1].length;j<jlen;j++){
				//此处的i,j是为了后面传递directory记录的引用
				searchResults[i].push([directory[i][1][j],i,j]);
				dir[i] = directory[i][0];
			}
		}

	$(".directories").bind("click",function(){
			//检索对应号簿
			for(var i=0,len=directory.length;i<len;i++){
				if(directory[i][0] == $(this).html()){
					if(searchResults[i].toString() == ""){
						alert("该群组为空！");
						return;
					}
					createNameList(searchResults[i],dir[i],index);
				}
			}

			if($(this).html() == "---全部---"){
				if(searchResults[0].toString() == "" && searchResults[1].toString() == "" && searchResults[2].toString() == ""&& searchResults[3].toString() == ""&& searchResults[4].toString() == ""){
						alert("所有群组均为空！");
						return;
				}
				createNameList(searchResults,index);
			}
	});
}