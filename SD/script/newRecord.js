//新增记录

var NRindexi,
	NRindexj;
function newRecordPanel(){
	removeDirList();
	getUIMNames();//更新号簿名

	var inputHtml='<div id="#addList class="newTab"><span class="hideBtn">X</span><ul><li class="tip">↓请输入姓名和号码。</li><li class="directories"><input id="name" type="text"></input><span class="lable" href="javascript:;">姓名</span></li><li class="directories"><input id="phoneNum" type="text"></input><span class="lable" href="javascript:;">号码</span></li><li class="addBtn"><a href="javascript:;">添加记录</a></li></ul></div>';
	showDirList(5,inputHtml);

	$(".directories").animate({
		"width":"65%",
		"height":"50px",
		"line-height":"50px",
		"text-align":"left"
	},50);

	$(".addBtn").bind("click",function(){
		var name = $("#name").val();
		var phoneNum = $("#phoneNum").val();
		var charLen;//存放字符长度
			//判断是否汉字，计算字符长度
		var reg=/^[\d]{3,16}$/;

		if(phoneNum == ""){
			alert("请输入号码！");
			return;
		}else{
			if(name){
				for(var q=0,charLen=0;q < name.length;q++){
					if(ischinese(name[q])){
						charLen+=2;
					}else{
						charLen+=1;
					}
				}
				if(!(1<= charLen && charLen < 7)){
					alert("姓名请输入1-6个字符！");
					return;
				}
			}

			if(!reg.test(phoneNum)){
				alert("号码请输入3-16位数字！");
				return;
			}
			phoneNum=parseInt(phoneNum);

			removeDirList();
			var html='<div id="#scanList" class="newTab"><span class="hideBtn">X</span><ul>';
			for(var i=0,len=UIM.length;i<len;i++){
				if(directory[i][1].length < 250 && UIM[i] != currentDirName){
					html+='<li class="directories">'+UIM[i]+'</li>';
				}
			}
			html+='<li class="tip">↑请选择要添加的号簿。</li></ul></div>';
			showDirList(5,html);

			var btnHtml='<div class="newTab btnList"><ul><li class="tip">←请选择完成返回或加入群组。→</li><li class="chooseBtnWrap"><a class="chooseBtn btnBack" id="backBtn" href="javascript:;">完成返回</a><a class="chooseBtn btnGroup"  id="groupBtn"href="javascript:;">加入群组</a></li></ul></div>';

			$(".hideBtn").bind("click",function(){
				removeDirList();
			});

			$(".directories").bind("click",function(){

				for(var i=0,ilen=directory.length;i<ilen;i++){
					if(directory[i][0] == $(this).html()){
						directory[i][1].push([name,phoneNum,"",[]]);
							NRindexi=i,//
							NRindexj=directory[i][1].length-1;
					}
				}

				removeDirList();
				showDirList(5,btnHtml);
				
				$(".options").unbind("click");
				$(".options").bind("click",function(){
					$(".chooseBtn").css("background","#f00");
					setTimeout(function(){
						$(".chooseBtn").css("background","orange");
					},300)
					setTimeout(function(){
						$(".chooseBtn").css("background","#505050");
					},500)
				});
				$(".chooseBtn").bind("click",function(){
					if($(this).attr("id") == "backBtn"){//完成返回
						alert("添加成功");
						updateDB();
						
						initPanel();
					}else{//加入群组
						removeDirList();
						groupManagePanel(5,NRindexi,NRindexj);
						
					}
				});

			});
		}//else结束

	});


	$(".hideBtn").bind("click",function(){
		removeDirList();
	});





}