//短信群发之短信签名
function messageSign(){
	$(".wrap").remove();

	var html='<div class="wrap"><textarea class="sign" id="sign" >'+mesSign+'</textarea><div class="save">保存签名</div><div>';
	$(html).insertAfter($("#MS"));
	$(".sign").css({
		"margin-top":"15px",
		"width":"300px",
		"height":"100px",
		"overflow":"hidden",
		"resize":"none",
		"font-size":"20px"
	});
	$(".save").css({
		"width":"100px",
		"height":"50px",
		"line-height":"45px",
		"border-radius":"10px",
		"background":"#376",
		"margin":"5px auto",
		"color":"#fff",
		"cursor":"pointer"
	}).hover(function(){
		$(this).css("background","#736");
	},function(){
		$(this).css("background","#376");

	}).bind("click",function(){
		mesSign=$(".sign").val();
		alert("短信签名保存成功");
		$(".wrap").remove();
		messageSign();
		return;
	});

}