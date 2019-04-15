var canvas = document.getElementById("clock"),
	ctx = canvas.getContext('2d'),
	cWidth = ctx.canvas.width,
	cHeight = ctx.canvas.height,
	r = cWidth/2,
	rem = cWidth/200;

function drawBackground(){
	ctx.save();					//保存当前画布环境状态
	//绘制外圆
	ctx.translate(r,r);					//移动中心点
	ctx.beginPath();
	ctx.lineWidth = 10*rem;					//图形边的宽度
	ctx.arc(0,0,r-ctx.lineWidth/2,0,2*Math.PI,false);	//圆心坐标x，y，半径，开始角，结束角，false表示逆时针绘制
	ctx.stroke();						//绘制，fill()方法表示填充
	
	//绘制小时数
	hourNums=[3,4,5,6,7,8,9,10,11,12,1,2];
	ctx.font = 18*rem+"px Arial";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	//forEach遍历数组，三个参数，第一个是数组中的值，第二个为数组索引，第三个为数组本身
	hourNums.forEach(function(number,i){
		var rad = 2*Math.PI/12*i,		//弧度
			x = Math.cos(rad)*(r-30*rem),
			y = Math.sin(rad)*(r-30*rem);
		ctx.fillText(number,x,y);
	});
	
	//绘制秒刻点
	for(var i=0;i<60;i++){
		var rad = 2*Math.PI/60*i,
			x = Math.cos(rad)*(r-18*rem),
			y = Math.sin(rad)*(r-18*rem);
		ctx.beginPath();
		if(i%5===0){
			ctx.fillStyle = "#000";
			ctx.arc(x,y,2*rem,0,2*Math.PI,false);
		}else{
			ctx.fillStyle = "#ccc";
			ctx.arc(x,y,2*rem,0,2*Math.PI,false);
		}
		ctx.fill();
	}
}

//绘制时针分针秒针
function drawHour(hour,minute){
	ctx.save();					//保存当前画布环境状态
	ctx.beginPath();
	var rad = 2*Math.PI/12*hour,
		mrad = 2*Math.PI/12/60*minute;
	ctx.rotate(rad+mrad);
	ctx.lineWidth = 6*rem;
	ctx.lineCap = "round";
	ctx.moveTo(0,10*rem);			//时针会比原点远一点
	ctx.lineTo(0,-r/2);
	ctx.stroke();
	ctx.restore();				//返回之前保存过的路径状态
}
function drawMinute(minute){
	ctx.save();					//保存当前画布环境状态
	ctx.beginPath();
	var rad = 2*Math.PI/60*minute;
	ctx.rotate(rad);
	ctx.lineWidth = 3*rem;
	ctx.lineCap = "round";
	ctx.moveTo(0,10*rem);			//时针会比原点远一点
	ctx.lineTo(0,-r+30*rem);
	ctx.stroke();
	ctx.restore();				//返回之前保存过的路径状态
}
function drawSecond(second){
	ctx.save();					//保存当前画布环境状态
	ctx.beginPath();
	ctx.fillStyle = "#c14543";
	var rad = 2*Math.PI/60*second;
	ctx.rotate(rad);
	ctx.moveTo(-2*rem,20*rem);			//时针会比原点远一点
	ctx.lineTo(2*rem,20*rem);
	ctx.lineTo(1,-r+18*rem);
	ctx.lineTo(-1,-r+18*rem);
	ctx.fill();
	ctx.restore();				//返回之前保存过的路径状态
}

//绘制圆心
function drawDot(){
	ctx.beginPath();
	ctx.fillStyle = "#fff";
	ctx.arc(0,0,3*rem,0,2*Math.PI,false);
	ctx.fill();
}

function draw(){
	ctx.clearRect(0,0,cWidth,cHeight);	//清除canvas
	var now = new Date(),
		hour = now.getHours(),
		minute = now.getMinutes(),
		second = now.getSeconds();
	drawBackground();
	drawHour(hour,minute);
	drawMinute(minute);
	drawSecond(second);
	drawDot();
	ctx.restore();				//返回之前保存过的路径状态
}

draw();
setInterval(draw,1000);