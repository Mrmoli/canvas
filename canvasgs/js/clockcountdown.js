var WINDOW_WIDTH = 1024,
	WINDOW_HEIGHT = 768,
	RADIUS = 8,
	MARGIN_TOP = 60,
	MARGIN_LEFT = 30,
	curShowTimeSeconds = 0,		//现在倒计时需要多少秒
	balls = [];
//	endTime = new Date();
	
//endTime.setTime(endTime.getTime()+3600*1000);

const colors = ["#33b5e3","#0099cc","aa66cc","#9933cc","#99cc00","#669900","#ffbb33","#ff8800","#ff4444","#cc0000"];
	
window.onload = function(){
	WINDOW_WIDTH = document.body.clientWidth;
	WINDOW_HEIGHT = document.body.clientHeight;
	
	MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);
	RADIUS = Math.round(WINDOW_WIDTH*4/5/108)-1;
	MARGIN_TOP = Math.round(WINDOW_HEIGHT/5)
	
	var canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d");
	
	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;
	
	curShowTimeSeconds = getCurrentShowTimeSeconds();
	setInterval(function(){
		render(ctx);
		update();
	},50);
}

//获取现在倒计时还需要多少秒
function getCurrentShowTimeSeconds(){
	var curTime = new Date(),
		ret = curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();
	
	return ret;
}

//对当前时间,生成弹出小球等数据进行调整
function update(){
	var nextShowTimeSeconds = getCurrentShowTimeSeconds(),
	
		nextHours = parseInt(nextShowTimeSeconds/3600),
		nextMinutes = parseInt((nextShowTimeSeconds-nextHours*3600)/60),
		nextSeconds = nextShowTimeSeconds%60,
		
		curHours = parseInt(curShowTimeSeconds/3600),
		curMinutes = parseInt((curShowTimeSeconds-curHours*3600)/60),
		curSeconds = curShowTimeSeconds%60;
		
	if(nextSeconds!=curSeconds){
		if(parseInt(curHours/10)!=parseInt(nextHours/10)){
			addBalls(MARGIN_LEFT+0,MARGIN_TOP,parseInt(curHours/10));
		}
		if(parseInt(curHours%10)!=parseInt(nextHours%10)){
			addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curHours/10));
		}
		if(parseInt(curMinutes/10)!=parseInt(nextMinutes/10)){
			addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes/10));
		}
		if(parseInt(curMinutes%10)!=parseInt(nextMinutes%10)){
			addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes/10));
		}
		if(parseInt(curSeconds/10)!=parseInt(nextSeconds/10)){
			addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds/10));
		}
		if(parseInt(curSeconds%10)!=parseInt(nextSeconds%10)){
			addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds/10));
		}
		curShowTimeSeconds=nextShowTimeSeconds;
	}
	
	updateBalls();
}

//小球运动
function updateBalls(){
	for(var i=0;i<balls.length;i++){
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;
		
		//小球跳到画布底端弹起
		if(balls[i].y>=WINDOW_HEIGHT-RADIUS){
			balls[i].y = WINDOW_HEIGHT-RADIUS;
			balls[i].vy = -balls[i].vy*0.65;
		}
	}
	
	//判断小球是否在画面里,超出画面，从小球数组中pop掉
	var cnt=0;
	for(var i=0;i<balls.length;i++){
		if(balls[i].x+RADIUS>0&&balls[i].x-RADIUS<WINDOW_WIDTH){
			balls[cnt++] = balls[i]
		}
	}
	while(balls.length>Math.min(300,cnt)){
		balls.pop();
	}
}

//时间改变生成小球数据
function addBalls(x,y,num){
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[i].length;j++){
			if(digit[num][i][j]==1){
				var aBall = {
					x:x+j*2*(RADIUS+1)+(RADIUS+1),
					y:y+i*2*(RADIUS+1)+(RADIUS+1),
					g:1.5+Math.random(),			//1.5-2.5
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,//取值为正负4,pow()次方
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aBall);
			}
		}
	}
}

//绘制canvas画布
function render(ctx){
	ctx.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	
	var hours = parseInt(curShowTimeSeconds/3600),
		minutes = parseInt((curShowTimeSeconds-hours*3600)/60),
		seconds = curShowTimeSeconds%60;
	
	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),ctx);
	renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),ctx);
	renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,ctx);
	renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),ctx);
	renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),ctx);
	renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,ctx);
	renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),ctx);
	renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),ctx);
	
	for(var i=0;i<balls.length;i++){
		ctx.fillStyle = balls[i].color;
		ctx.beginPath();
		ctx.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
		ctx.closePath();
		ctx.fill();
	}
}

//绘制canvas画布
function renderDigit(x,y,num,ctx){
	ctx.fillStyle = "rgb(0,102,153)";
	
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[i].length;j++){
			if(digit[num][i][j]==1){
				ctx.beginPath();
				ctx.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
				ctx.closePath();
				ctx.fill();
			}
		}
	}
}