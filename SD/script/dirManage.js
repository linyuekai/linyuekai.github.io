//2级菜单-号簿管理面板

function dirManagePanel(){
	clear();//移除上一个面板的事件
	createbackBtn("init");

	//渲染号簿管理面板
	var html='<div id="header" class="layout"><div class="tit"><h1>号簿管理</h1><h2>Directory Management</h2></div></div><div class="main layout"><div id="CD" class="options layout">当前号簿：'+currentDirName+'</div><div id="SD" class="options layout">切换号簿</div><div id="CN" class="options layout">更名号簿</div><div id="ED" class="options layout">清空号簿</div><div id="MQ" class="options layout">容量查询</div></div><div id="footer" class="layout">Copyright © By.林粤凯</div>';
	$(html).appendTo(document.body);
	mouseAction();

	//响应点击事件
	$(".options").bind("click",function(){
		switch($(this).attr("id")){
			case "CD": curDir();
					   break;
			case "SD": switchDir();
					   break;
			case "CN": changeDirName();
					   break;
			case "ED": emptyDir();
					   break;
			case "MQ": capacityQuery();
					   break;
			default : alert("出现错误，请刷新重试！");
		}
	});
}


////号簿管理的3级菜单功能

//查看当前号簿
	function curDir(){
		removeDirList();
		alert("当前号簿为："+currentDirName);
	}


//切换号簿
	function switchDir(){
		removeDirList();
		getUIMNames();//更新号簿名
		var html='<div id="#dirList" class="newTab"><span class="hideBtn">X</span><ul><li class="directories">'+UIM[0]+'</li><li class="directories">'+UIM[1]+'</li><li class="directories">'+UIM[2]+'</li><li class="directories">'+UIM[3]+'</li><li class="directories">'+UIM[4]+'</li></ul></div>';
		showDirList(1,html);
	
	$(".hideBtn").bind("click",function(){
		removeDirList();
	});

		//切换号簿事件
		$(".directories").bind("click",function(){
			for(var i=0,len=directory.length;i<len;i++){
				if(directory[i][0] == $(this).html()){
					currentDir=directory[i];
					currentDirName=directory[i][0];
					$("#CD").html("当前号簿："+currentDirName);
				}
			}
			removeDirList();
			
		});

	}

//号簿改名
	function changeDirName(){
		removeDirList();
		getUIMNames();//更新号簿名
		var html='<div id="#dirList" class="newTab"><span class="hideBtn">X</span><ul><li class="directories">'+UIM[0]+'</li><li class="directories">'+UIM[1]+'</li><li class="directories">'+UIM[2]+'</li><li class="directories">'+UIM[3]+'</li><li class="directories">'+UIM[4]+'</li></ul></div>';
		showDirList(2,html);

	$(".hideBtn").bind("click",function(){
		removeDirList();
	});
		//更改号簿名事件
		$(".directories").bind("click",function(){
			var newName = prompt("请输入号簿新名称（1-6个字符）：",$(this).html());
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
			}else{
				return;
			}
			if(1<= charLen && charLen < 7){//1-6个字符

				for(var i=0,len=directory.length;i<len;i++){
					if(newName == directory[i][0]){
						alert("已有相同名称号簿，请重新输入！");
						return;
					}
					if(directory[i][0] == $(this).html()){
						directory[i][0] = newName;
						if(currentDir == directory[i]){
							currentDirName=directory[i][0];
							$("#CD").html("当前号簿："+currentDirName);
						}
					}
				}
				alert("更名成功！");
				removeDirList();
			}else{
				alert("更名失败，请注意名称长度！");
				return;
			}			
		});
	}

//清空号簿
	function emptyDir(){
		removeDirList();
		getUIMNames();//更新号簿名
		var html='<div id="#dirList" class="newTab"><span class="hideBtn">X</span><ul><li class="directories">'+UIM[0]+'</li><li class="directories">'+UIM[1]+'</li><li class="directories">'+UIM[2]+'</li><li class="directories">'+UIM[3]+'</li><li class="directories">'+UIM[4]+'</li><li id="emptyDir" class="directories">--全部清空--</li></ul></div>';
		showDirList(3,html);

	$(".hideBtn").bind("click",function(){
		removeDirList();
	});

		this.popWin=function(num){
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
			}).appendTo(document.body).fadeIn("fast").html("开始删除……");

			if(arguments[0] == null){
				setTimeout(function(){
					pop.html("清除完毕！")
					setTimeout(function(){
						pop.add($("#mask")).remove();
					},500);
				},1500);
			}
			else{
			switch(parseInt(num/50)){
				case 0:  setTimeout(function(){
							pop.html("删除完成！")
							setTimeout(function(){
								pop.add($("#mask")).remove();
							},500);
						},500);
						break;
				case 1:  setTimeout(function(){
							pop.html("已删除50条记录！")
							setTimeout(function(){
								pop.html("删除完成！")
								setTimeout(function(){
									pop.add($("#mask")).remove();
								},500);
							},500);
						},500);
						break; 
				case 2: setTimeout(function(){
							pop.html("已删除50条记录！");
							setTimeout(function(){
								pop.html("已删除100条记录！")
								setTimeout(function(){
									pop.html("删除完成！")
									setTimeout(function(){
										pop.add($("#mask")).remove();
									},500);
								},500);
							},500);
						},500);
						break; 
				case 3:  setTimeout(function(){	
							pop.html("已删除50条记录！");
							setTimeout(function(){
								pop.html("已删除100条记录！")
								setTimeout(function(){
									pop.html("已删除150条记录！")
									setTimeout(function(){
										pop.html("删除完成！")
										setTimeout(function(){
											pop.add($("#mask")).remove();
										},500);
									},500);
								},500);
							},500);
						},500);
						break; 
				case 4:  setTimeout(function(){
							pop.html("已删除50条记录！");
							setTimeout(function(){	
								pop.html("已删除100条记录！")
								setTimeout(function(){
									pop.html("已删除150条记录！")
									setTimeout(function(){
										pop.html("已删除200条记录！")
										setTimeout(function(){
											pop.html("删除完成！")
											setTimeout(function(){
												pop.add($("#mask")).remove();
												},500);
											},500);
										},500);
									},500);
								},500);
							},500);
						break; 
				case 5: setTimeout(function(){
							pop.html("已删除50条记录！");
							setTimeout(function(){
								pop.html("已删除100条记录！")
								setTimeout(function(){	
									pop.html("已删除150条记录！")
									setTimeout(function(){
										pop.html("已删除200条记录！")
										setTimeout(function(){
											pop.html("已删除250条记录！")
											setTimeout(function(){
												pop.html("删除完成！")
												setTimeout(function(){
													pop.add($("#mask")).remove();
												},500);
											},500);
										},500);
									},500);
								},500);
							},500);
						});
						break; 
				default : alert("出现错误，请刷新重试！");
			}}

		}

		//切换号簿事件
		$(".directories").bind("click",function(){
			if($(this).html() != "--全部清空--" && confirm("确认清空号簿：" + $(this).html() + "？")){		
				for(var i=0,len=directory.length;i<len;i++){
					if(directory[i][0] == $(this).html()){
						var num=directory[i][1].length;
						toggleScroll();
						popWin(num);
						directory[i][1]=[];
					}
				}
				removeDirList();
				toggleScroll();
			}else if($(this).html() == "--全部清空--" && confirm("确认全部清空？")){
				toggleScroll();
				popWin();
				for(var i=0,len=directory.length;i<len;i++){
						directory[i][1]=[];
				}
				removeDirList();
				toggleScroll();

			}
		});	
	}

//容量查询
	function capacityQuery(){
		removeDirList();
		getUIMNames();//更新号簿名
		//容量剩余空间
		var capacity=[];
		for(var i=0,len=directory.length;i<len;i++){
			if(UIM[i] == directory[i][0]){
				capacity[i] = 250-directory[i][1].length;
				//转化成三位有效字符串
				if(0 <= capacity[i] && capacity[i] < 10){
					capacity[i]="00"+capacity[i];
				}else if(10 <= capacity[i] && capacity[i]< 100){
					capacity[i]="0"+capacity[i];
				}else if(capacity[i] > 250 || capacity[i] < 0){
					alert("出现错误，请刷新重试！");
					return;
				}
			}
		}
		//创建面板
		alertPanel('<span>'+UIM[0]+'：总容量 250 条，未用 '+ capacity[0] +'条。</span><span>'+UIM[1]+'：总容量 250 条，未用 '+ capacity[1] +'条。</span><span>'+UIM[2]+'：总容量 250 条，未用 '+ capacity[2] +'条。</span><span>'+UIM[3]+'：总容量 250 条，未用 '+ capacity[3] +'条。</span><span>'+UIM[4]+'：总容量 250 条，未用 '+ capacity[4] +'条。</span>');
		//修改面板样式--容量查询专用面板
		$("#alertPanel").css({
			"width":"320px",
			"height":"180px",
			"line-height":"1.5em",
			"margin-left":"-150px",
			"margin-top":"-100px"
		});
		$("#alertPanel span").css({
			"display":"inline-block",
			"text-align":"right",
			"width":"310px"
		});
		$("#alertPanel p").css({
			"height":"115px",
			"line-height":"1.5em",
			"padding":"10px 5px 0 0"
		});
		$("#alertPanel a").css({
			"margin":"15px auto"
		});

	}	

	