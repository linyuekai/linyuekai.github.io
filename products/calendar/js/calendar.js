if (!Array.prototype.indexOf)//ie7、8不存在该方法
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}


var getElementsByClassName = function (searchClass, node,tag) {
	var result = [];
  if(document.getElementsByClassName){
    var nodes =  (node || document).getElementsByClassName(searchClass);

     	return nodes;
    }else{
      node = node || document;
      tag = tag || "*";
      var classes = searchClass.split(" "),
      elements = (tag === "*" && node.all)? node.all : node.getElementsByTagName(tag),
      patterns = [],
      current,
      match;
      var i = classes.length;
      while(--i >= 0){
        patterns.push(new RegExp("(^|\\s)" + classes[i] + "(\\s|$)"));
      }
      var j = elements.length;
      while(--j >= 0){
        current = elements[j];
        match = false;
        for(var k=0, kl=patterns.length; k<kl; k++){
          match = patterns[k].test(current.className);
          if (!match)  break;
        }
        if (match)  result.push(current);
      }
      return result.reverse();
    }
  }

var EventUtil = {

	addHandler: function(element, type, handler){
		if(element.addEventListener){
			element.addEventListener(type, handler, false);
		}else if(element.attachEvent){
			element.attachEvent("on"+type, handler);
		}else{
			element["on"+type] = handler;
		}
	},

	removeHandler: function(element, type, handler){
		if(element.removeEventListener){
			element.removeEventListener(type, handler, false);
		}else if(element.detachEvent){
			element.detachEvent("on"+type, handler);
		}else{
			element["on"+type] = null;
		}
	},

	getEvent: function(event){
		return event ? event : window.event;
	},

	getTarget: function(event){
		return event.target || event.srcElement;
	},

	preventDefault: function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	},

	stopPropagation: function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	}

};

//待办
var toDoList = function(time,transaction){
	return {
		time : time,
		transaction : transaction
	}
};	/*console.log(toDoList("10:30","约会"));
	console.log(toDoList("11:40","上课"));*/

//日程计划数据库
try{
	if(localStorage.db){
		var db = JSON.parse(localStorage.db);
	}else{
		var db = {};
	}
}catch(e){
	var db = {}
}
/*	if(localStorage.db){
		var db = JSON.parse(localStorage.db);
	}else{
		var db = {};
	}
*/
//日历
var calendar = {

	//初始化当月时间
	init : function(o){

			var startYear = o.startYear || 2015,
			    startMonth = o.startMonth || "07";     

			_this = this;
			_this.prevBtn = document.getElementById("prev");
			_this.nextBtn = document.getElementById("next");
			_this.h_r = getElementsByClassName("h_r")[0];
			_this.year = document.getElementById("year");
			_this.month = document.getElementById("month");
			_this.cur = document.getElementById("cur");
			_this.weekView = getElementsByClassName("wview")[0];
			_this.exp = getElementsByClassName("export")[0];
			_this.newPlan = getElementsByClassName("newPlan")[0];
				
			_this.year.innerHTML = startYear;
			_this.month.innerHTML = startMonth;

			_this.y = parseInt(_this.year.innerHTML,10);
			_this.m = parseInt(_this.month.innerHTML,10);

		_this.newPlan.onclick = function(){
			alert("直接点击您要新增日程的日期就可以了哦！");
		}
		_this.exp.onclick = function(){
			alert("该功能正在开发……");
		}
		_this.weekView.onclick = function(){
			alert("该功能正在开发……");
		}



		//切换月份
		_this.h_r.onclick = function(event){
			_this.y = parseInt(_this.year.innerHTML,10);
			_this.m = parseInt(_this.month.innerHTML,10);
			var e = EventUtil.getEvent(event);
			if(EventUtil.getTarget(e).id == "prev"){
				if(_this.m == 1){
					_this.m = 12;
					_this.y -= 1;
				}else if(_this.m > 1){
					_this.m -= 1;
				}
				_this.year.innerHTML = _this.y;
				if(_this.m.toString().length == 1){
					_this.m = "0"+ _this.m;
				}
			   _this.month.innerHTML = _this.m;
			}else if(EventUtil.getTarget(e).id == "next"){
				if(_this.m == 12){
					_this.m = 1;
					_this.y += 1;
				}else if(_this.m < 12){
					_this.m = parseInt(_this.m,10) + 1;
					if(_this.m.toString().length == 1){
						_this.m = "0"+ _this.m;
					}
				}
				_this.year.innerHTML = _this.y;
			   	_this.month.innerHTML = _this.m;
			}



			//解除其他页面的事件绑定
		 	var p = getElementsByClassName("p"),
		 		edit = getElementsByClassName("edit"),
		 		del = getElementsByClassName("del");
			for(var t=0,plen=p.length;t<plen;t++){
				p[t].onclick = null;
				edit[t].onclick = null;
				del[t].onclick = null;
			}


			calendar.changeDays(_this.year,_this.month);
			calendar.showPlan();
			flag = false;
		};
		//当月
		_this.cur.onclick = function(){
			var now  = new Date(),
				curY = now.getFullYear(),
				curM = now.getMonth() + 1;
			_this.year.innerHTML = curY;
			if(curM.toString().length == 1){
				curM = "0" + curM;
			}
			_this.month.innerHTML = curM;

			calendar.changeDays(_this.year,_this.month);
			calendar.showPlan();

		};


		//添加日程
		var tds = getElementsByClassName("days");
		for(var i=0,len=tds.length;i<len;i++){
			EventUtil.addHandler(tds[i],"click",(function(i){
				return function(){
					if(tds[i].className.indexOf("disabled") > -1){
						return;
					}else{
						calendar.addPlan(i);
					}		
				}	
			})(i));
		}



		calendar.changeDays(_this.year,_this.month);
	},
	//根据当前月份改变日历
	changeDays : function(yearele,monthele){
		var yEle = yearele,//year元素
			mEle = monthele,
			y = parseInt(yEle.innerHTML),//年份
			m = parseInt(mEle.innerHTML),
			day = (new Date(y,m-1,1)).getDay(),
			tds = getElementsByClassName("days"),
			is31 = [1,3,5,7,8,10,12],
			dayLen,
			pDayLen,//上月天数
			nDayLen;//下月天数
		//判断闰年
		this.isLeap = function(year){
			if((year%4 == 0 && year%100 != 0) || 
				(year%100 == 0 && year%400 == 0)){
				return true;
			}else{
				return false;
			}
		}
		//当月天数dayLen
		if(is31.toString().indexOf(m) > -1){
			dayLen = 31;
		}else if(this.isLeap(y) && m == 2){
			dayLen = 29;
		}else if(m == 2){
			dayLen = 28;
		}else{
			dayLen = 30;
		}
		//上月天数pDayLen
		if(m-1 >= 1){
			if(is31.indexOf(m-1) > -1){
				pDayLen = 31;
			}else if(this.isLeap(y) && m-1 == 2){
				pDayLen = 29;

			}else if(m == 2){
				pDayLen = 28;
			}else{
				pDayLen = 30;
			}
		}else{
			pDayLen = 31;//当月1月m=1,则上月为12月
		}
		//下月天数nDayLen
		if(m+1 <= 12){
			if(is31.indexOf(m+1)){
				nDayLen = 31;
			}else if(this.isLeap(y) && m+1 == 2){
				nDayLen = 29;
			}else if(m == 2){
				nDayLen = 28;
			}else{
				nDayLen = 30;
			}
		}else{
			nDayLen = 31;//当月为12月，下月为1月
		}

		//当月1日星期几
		tdi = day-1;
		if(tdi == -1){
			tdi = 6;
		}
		//渲染当月日期
		for(var i=tdi,j=1,len=tds.length;i<len,j<=dayLen;i++,j++){
			if(j.toString().length == 1){
				j = "0"+j;
			}
			tds[i].getElementsByTagName("span")[0].innerHTML = j;
			j = parseInt(j,10);
			if(tds[i].className.indexOf("disabled") > -1){
				tds[i].className = "days";
			}
		}

		//渲染上月日期
		for(var k=tdi-1,l=pDayLen;k>=0;k--,l--){
			tds[k].getElementsByTagName("span")[0].innerHTML = l;
			if(tds[k].className.indexOf("disabled") == -1){
				tds[k].className += " disabled";
			}
		}
		//渲染下月日期
		for(var p=i,q=1;p<len;p++,q++){
			if(q.toString().length == 1){
				q = "0"+q;
			}
			tds[p].getElementsByTagName("span")[0].innerHTML = q;
			q = parseInt(q,10);
			if(tds[p].className.indexOf("disabled") == -1){
				tds[p].className += " disabled";
			}
		}
	},

	//添加日程
	addPlan : function(index){
		var time = prompt("请按24小时制格式输入时间(不可为空)","8:00");
		if(time){
			var reg=/^(([1-9]{1})|([0-1][0-9])|([1-2][0-3])):([0-5][0-9])$/;
			if(reg.test(time)){
				var transaction = prompt("请输入事务","开会");
				if(transaction){
					var y = parseInt(document.getElementById("year").innerHTML,10),
					 	m = parseInt(document.getElementById("month").innerHTML,10),
					 	d = parseInt(getElementsByClassName("td_head")[index].getElementsByTagName("span")[0].innerHTML,10);
					if(!db[y+"-"+m+"-"+d]){
						db[y+"-"+m+"-"+d] = [];
					} 	
					db[y+"-"+m+"-"+d].push(toDoList(time,transaction));
					calendar.showPlan(index);
				}
			}else{
				alert("请输入正确时间格式！");
				arguments.callee();
				return;
			}
		}
	},

	showPlan : function(index){
		var td_body = getElementsByClassName("td_body"),
	  		y = parseInt(document.getElementById("year").innerHTML,10),
		 	m = parseInt(document.getElementById("month").innerHTML,10),
		 	D = getElementsByClassName("td_head");
		 	if(index){//index存在表示添加日程操作
		 		td_body[index].innerHTML = "";
		 		d = parseInt(getElementsByClassName("td_head")[index].getElementsByTagName("span")[0].innerHTML,10);
				for(var j=0;j<db[y+"-"+m+"-"+d].length;j++){
					td_body[index].innerHTML += '<p class="p"><span class="time">'+db[y+"-"+m+"-"+d][j].time+'</span>'+
										'	<span class="transaction">'+db[y+"-"+m+"-"+d][j].transaction+'</span>'+
										'	<span class="del"></span>'+
										'	<span class="edit"></span>'+
										'</p>';

				}
		 	}else{//index不存在表示切换月份操作(或初始化)
		 		for(var i=0,len=D.length;i<len;i++){
		 				td_body[i].innerHTML = "";
		 			if(getElementsByClassName("days")[i].className.indexOf("disabled") > -1){
		 				continue;
		 			}
		 			var dd = parseInt(D[i].getElementsByTagName("span")[0].innerHTML,10);
		 			if(db[y+"-"+m+"-"+dd]){
			 			for(var j=0;j<db[y+"-"+m+"-"+dd].length;j++){
			 				td_body[i].innerHTML += '<p class="p"><span class="time">'+db[y+"-"+m+"-"+dd][j].time+'</span>'+
												'	<span class="transaction">'+db[y+"-"+m+"-"+dd][j].transaction+'</span>'+
												'	<span class="del"></span>'+
												'	<span class="edit"></span>'+
												'</p>';
			 			}
		 			}
		 		}
		 	}


		 	if(localStorage && !!db){

		 		data = JSON.stringify(db);
		 		localStorage.db = data;
		 	}

		 	//编辑、删除 按钮的事件绑定
		 	var p = getElementsByClassName("p"),
		 		edit = getElementsByClassName("edit"),
		 		del = getElementsByClassName("del");
			for(var t=0,plen=p.length;t<plen;t++){
				p[t].onclick = function(e){
					var e = EventUtil.getEvent(e);
					EventUtil.stopPropagation(e);
				}
				edit[t].onclick = function(){
					alert("重编辑功能正在开发……");
				}
				del[t].onclick = function(){
					alert("删除功能正在开发……");
				}
			}


	}
	
};



window.onload = function(){
	calendar.init({
		startYear  : 2015,
		startMonth : "07"
	});
calendar.showPlan();
};