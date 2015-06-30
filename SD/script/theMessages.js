//群发短信之已有短信
function theMessages(sendstr){
	clear();
	var html='<div id="mesList" class="layout"><div class="tit"><h1>已有短信列表</h1><h2>Messages List</h2></div></div><div class="namelist"><ul id="listParent"></ul></div><div id="footer" class="layout">Copyright © By.林粤凯</div>';
	$(document.body).html(html);

	for(var i=0;i<messages.length;i++){
		$("#listParent").append('<li class="nameLi"><span class="mesContent"><strong>短信<em class="index">'+(i+1)+'</em>：</strong><a class="content">'+messages[i][0]+'</a></span><span class="sendNum"><strong> 发送号码：</strong>'+messages[i][1]+'</span><span class="reciveNum"><strong> 接收号码：</strong>'+messages[i][2]+'</span></li>');
	}

	$(".mesContent").css({
		"width":"400px"
	});
	$(".reciveNum").css({
		"width":"auto",
		"float":"right",
		"padding-right":"10px"
	});

	$(".sendNum").css({
		"width":"auto",
		"float":"right",
		"padding-right":"10px"


	});

	createbackBtn("groupMessageing");
		$("#back").css({
		"left":"4%"
	});	

	$(".nameLi").bind("click",function(){
		if(sendstr == "send"){
			var sendStr=$(this).children(".mesContent").children("a").html();
			var newsenStr=prompt("请编辑短信：",sendStr);
			if(newsenStr){
				sendstr = newsenStr;
				alert("你的新短信内容是:“"+sendstr+"”，已发送成功！");
				initPanel();
				return;
			}else{
				return;
			}
			return;
		}


		$(".con").remove();
		removeDirList();
		$('<ul class="con"><li class="tab" id="reply">回复</li><li class="tab" id="forwarding">转发</li></ul>').insertAfter($(this));
		$(".con").css({
			"width":"100px",
			"margin":"0 auto"
		});
		$(".tab").css({
			"height":"30px",
			"margin":"8px auto",
			"background":"#354",
			"color":"#fff",
			"text-align":"center",
			"line-height":"30px",
			"cursor":"pointer"
		}).hover(function(){
			$(this).css("background","#478");
		},function(){
			$(this).css("background","#354");
		}).bind("click",function(){
			if($(this).attr("id") == "reply"){

				$(".tab").unbind("click");
				$('<div id="#addList class="newTab"><li class="directories"><textarea id="message" class="message"></textarea></li><li class="messageBtn"><a href="javascript:;">发送短信</a></li></ul></div>').insertAfter($(".con"));
				$("#addList").css({
					"width":"500px",
					"margin":"0 auto"

				});
					$(".directories").animate({
						"width":"303px",
						"height":"113px"
					},50);

				$(".message").focus();
				$(".con").remove();
				$(".messageBtn").css({
					"text-align":"center"
				}).bind("click",function(){
					if($(".message").val() == ""){
						alert("短信不能为空！");
						return;
					}
					alert("短信发送成功！");
					initPanel();
					return;
				})

			}else{
				$(".tab").unbind("click");
				$('<div id="#forList" class="asdTab"><li class="directories"><textarea id="message" class="message"></textarea></li><li class="messageBtn"><a href="javascript:;">编辑完成</a></li></ul></div>').insertAfter($(".con"));
				
				$("#addList").css({
					"width":"500px",
					"margin":"0 auto"

				});
					$(".directories").animate({
						"width":"303px",
						"height":"113px"
					},50);

				$(".message").focus();

				$(".con").remove();

				var mesStr=$(".asdTab").prev().children(".mesContent").children(".content").html();
				$(".message").val(mesStr);
				$(".messageBtn").css({
					"text-align":"center"
				}).bind("click",function(){
					if($(".message").val() == ""){
						alert("短信不能为空！");
						return;
					}
					mesStr = $(".message").val();
					selectMember(mesStr);
				})
			}
		});

	});
}