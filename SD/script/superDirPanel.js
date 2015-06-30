
	//初始化一级菜单面板
	function initPanel(){
		removeDirList();//移除本面板列表，控制好标志变量的值以控制显隐
		clear();
		var html='<div id="header" class="layout"><div class="tit"><h1>超级号簿</h1><h2>Super Directory</h2></div></div><div class="main layout"><div id="DM" class="options layout">号簿管理</div><div id="PQ" class="options layout">拼音查询</div><div id="NQ" class="options layout">姓名查询</div><div id="SD" class="options layout">号簿浏览</div><div id="GM" class="options layout">群组管理</div><div id="NR" class="options layout">新增记录</div><div id="MG" class="options layout">短信群发</div></div><div id="footer" class="layout">Copyright © By.林粤凯</div>';
		$(html).appendTo(document.body);
		mouseAction();

		//响应点击事件
		$(".options").bind("click",function(){
			switch($(this).attr("id")){
				case "DM": dirManagePanel();
						   break;
				case "PQ": pinyinQueryPanel();
						   break;
				case "NQ": nameQueryPanel();
						   break;
				case "SD": scanDires();
						   break;
				case "GM": groupManagePanel();
						   break;
				case "NR": newRecordPanel();
						   break;
				case "MG": groupMessageing();
						   break; 
				default : alertPanel("出现错误，请刷新重试！");
			}
		});
	}


	









































