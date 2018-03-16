
function drawLine(x1,y1,x2,y2) {          //函数功能：画直线
    ctx.beginPath(); 
    ctx.lineWidth=1.0;   ctx.strokeStyle='black'; //保护作用
    ctx.moveTo(x1, y1);  ctx.lineTo(x2, y2);                
    ctx.stroke();
}

function drawRect(x,y,width,height,isFill,color) {
         //函数功能：画长方形（指定填充方式及颜色）
    ctx.beginPath();
    ctx.lineWidth=1.0;
    if(isFill=='T') {
        ctx.fillStyle = color;
        ctx.fillRect(x,y,width,height);
        ctx.fill();
    }
    else {
        ctx.strokeStyle = color;
        ctx.strokeRect(x,y,width,height);
        ctx.stroke();
    }
}

function drawText(text,x,y) {   //函数功能：绘制文本
	ctx.font = '16pt Arial';
    ctx.fillStyle='black';
    ctx.fillText(text,x,y);
}

function drawTextExtended(text,x,y,isStroke,color1,isFill,color2) {  
                      //函数功能：绘制加强版文本（字体填充样式及其颜色）
                  //文字大小需初始化  例如ctx.font = '36pt Arial';
    if(isStroke=="T") {
        ctx.strokeStyle = color1;
        ctx.strokeText(text,x,y);
    }
    if(isFill=="T") {
        ctx.fillStyle = color2;
        ctx.fillText(text,x,y);	
    }
}

function drawLoveHeart(x,y,color) {  
             //函数功能：绘制爱心（指定凹处的坐标，颜色）
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle=color;
    ctx.translate(-100,-50);     ctx.translate(x,y); 
                       //两次抵消这样就可以指定位置了
    ctx.moveTo(100,50);  ctx.bezierCurveTo(70,20,50,70,100,100);  
    ctx.moveTo(100,50);  ctx.bezierCurveTo(130,20,150,70,100,100);
                                   //贝塞尔曲线(控制点1,2，结束点)
    ctx.stroke();   ctx.fill();
    ctx.restore();
}

function setShadow(isOpen,color,x,y,b) { 
        //函数功能：绘制阴影（指定效果的开关,颜色，偏移量，模糊度）
	if(isOpen=="T") {
        ctx.shadowColor= color;
        ctx.shadowOffsetX= x;
        ctx.shadowOffsetY= y;
        ctx.shadowBlur= b;
	}
	else {
        ctx.shadowColor= undefined;
        ctx.shadowOffsetX=0;
        ctx.shadowOffsetY=0;
        ctx.shadowBlur=0;
	}
}

function drawColoredRibbon(x,y,length,color) {  
                  //函数功能：画彩带（指定位置，大小，颜色） 
    ctx.beginPath();  
    ctx.lineWidth=0.2;
    ctx.fillStyle=color;
    ctx.fillRect(x,y,length,length*1/8);    
    ctx.strokeStyle='black';
    ctx.strokeRect(x,y,length,length/8);   //画彩带正中的长方形 

    ctx.moveTo(x,y+length/16);
    ctx.quadraticCurveTo(x-length/8,y+length*9/128,x-length/4, y+length/32);   
    ctx.lineTo(x-length*5/32, y+length*3/32);
    ctx.lineTo(x-length*5/16, y+length*5/32);
    ctx.lineTo(x-length/4, y+length*5/32);
    ctx.quadraticCurveTo(x+length/8,y+length*25/128,x+length/8, y+length/4);
    ctx.lineTo(x, y+length/8);   ctx.lineTo(x, y+length/16);
    ctx.moveTo(2*x+length-x,y+length/16);
    ctx.quadraticCurveTo(2*x+length-(x-length/8),y+length*9/128,2*x+length-(x-length/4), y+length/32);   
    ctx.lineTo(2*x+length-(x-length*5/32), y+length*3/32);
    ctx.lineTo(2*x+length-(x-length*5/16), y+length*5/32);
    ctx.lineTo(2*x+length-(x-length/4), y+length*5/32);
    ctx.quadraticCurveTo(2*x+length-(x+length/8),y+length*25/128,2*x+length-(x+length/8), y+length/4);
    ctx.lineTo(2*x+length-x, y+length/8);  ctx.lineTo(2*x+length-x, y+length/16);  
    ctx.stroke();
    ctx.fill();
    ctx.beginPath();
    ctx.lineWidth=0.4;
    ctx.moveTo(x+length/8,y+length/4);  ctx.lineTo(x+length*3/32,y+length/8);
    ctx.moveTo(2*x+length-(x+length/8),y+length/4);
    ctx.lineTo(2*x+length-(x+length*3/32),y+length/8);
    ctx.stroke();              //利用对称,画彩带的两侧
}

function drawSeparationLine() {  //函数功能：画验证码分隔线
    drawRect(650,10,140,60,"F");           //右上角的“刷新” 
	drawLine(0,100,800,100);
	drawLine(0,300,800,300);
    for(i=200;i<=800;i=i+200) {    
	    drawLine(i,100,i,500);      
    }                                
}

function gleam() {        //函数功能：画闪烁字
    eachLetter(function(letter, xPos, index) {
        setTimeout(drawGleamText.bind(null, letter, xPos, yPos), 100 * index);
    })
}

function drawGleamText(text, x, y) {   //函数功能：写短语特效
    ctx.lineWidth = 0.6;
    ctx.strokeStyle = 'grey';
    eachLetter(function(letter, xPos) {
        ctx.strokeText(letter, xPos, yPos);
    });                          //写字 
    ctx.lineWidth =1 + Math.random();  //线宽随机变化 
    hue = (hue + 10 * Math.random()) % 360; 
    ctx.strokeStyle = 'hsl(' + hue + ', 50%, 50%)';
                            //文字轮廓颜色随机变化                      
    ctx.strokeText(text, x, y);  //写短语
}

function eachLetter(callback) {   //函数功能：分解短语
    var xPos = initialXPos;
    phrase.split('').forEach(function(letter, index) {
        callback(letter, xPos, index);
        xPos += ctx.measureText(letter).width + letterSpacing;      
    })
}



