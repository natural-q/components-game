/* 
   Function:    期末设计  12306验证码
   Authur  ：   骆金参（2014211116）
   Build_Date:  2015-12-22    
*/

//[1]定义区.................................................
//..........................................................

/*Part1 获取id值*/
var ctx = document.getElementById('canvas').getContext('2d'),  //获取canvas元素
    offscreenCanvas = document.createElement('canvas'),
    offscreenContext = offscreenCanvas.getContext('2d'),       //离屏canvas
    //know1 =  document.getElementById('know1'),
    //know2 =  document.getElementById('know2'),
    //know3 =  document.getElementById('know3'),
    //know4 =  document.getElementById('know4'),    //明星科普
    //submit = document.getElementById('submit'),   //提交按钮
    //scaleSlider = document.getElementById('scaleSlider'),  //滑杆
 	//scaleOutput = document.getElementById('scaleOutput'),  //滑杆文字
    //video = document.getElementById('video'),     //视频
    controlButton = document.getElementById('controlButton');  //播放按钮
 

/*Part2 图片与音频声名*/
var knowBbh = new Image(),    knowWld = new Image(),        
    knowWzl = new Image(),    knowJx  = new Image(),  //明星资料卡             
    question1 = new Image(), question2 = new Image(), question3 = new Image(), //验证码图片      
    background= new Image(), background2= new Image(), background3 = new Image(),  //背景图
    right = new Image(),                //红对勾   
    spritesheet = new Image();   //精灵表
var card0 = new Image(),  card1 = new Image(),
    card2 = new Image(),  card3 = new Image(),
    card4 = new Image(),  card5 = new Image(),
    card6 = new Image(),  card7 = new Image(),
    cardBack = new Image(); //卡片及卡片的背面
var food1 = new Image(),  food2 = new Image(),
    food3 = new Image(),  food4 = new Image();  //食物
var music1 = new Audio('audio/11.mp3'),    
    music2 = new Audio('audio/22.mp3'),
    music3 = new Audio('audio/33.mp3'),    
    music4 = new Audio('audio/44.mp3');


/*Part3 公共变量声名*/
var scale=1,      //验证码题目
    brainHole=1,  //游戏关卡
    drawGleam,    //闪烁字调用的id
    rightX = 0,  rightY = 0,  //红对勾的横纵坐标
    movieCheck = 1,
          //干一件事时锁住其他事情，1是开，0是闭
	flag1=flag2=flag3=flag4=flag5=flag6=flag7=flag8=0;  
	                          //各区域鼠标点击次数记录
var num0=-1,num1=-1,num2=-1,num3=-1,
    num4=-1,num5=-1,num6=-1,num7=-1,
    num=-1;     //记录随机数，与牌的位置有关
    clickNum=0, //第二关翻牌游戏的鼠标点击次数  
    posCheck=new Array(1,1,1,1,1,1,1,1),
    pic0_Check=0, pic1_Check=0, pic2_Check=0, pic3_Check=0,
    pic4_Check=0, pic5_Check=0, pic6_Check=0, pic7_Check=0;
    //图片确认锁，对应图片被点击就变1，及时变0，两个1消掉一组图 
var length = 13,     //蛇的初始长度
    foodX,  foodY,   //食物位置点（*width） 
    food,            //食物变量(保存food.x,food.y)       
    width = 50,      //格子的长宽（正方形）
    snake = [],      //蛇用数组保存
    foodRandomNum=0, 
    food3Check=0,  food4Check=0,
           //食物毒性标志,变1就快死了
    deathCheck=0,   //死亡证明，死亡就变1
    move,    //控制蛇的随时间强制性移动的id    
    pause;   //控制贪吃蛇的动静（true与false）
var hue = 0,                        //色调
    phrase = '你打败了92%的用户成功抢到了票',  //闪烁字内容
    letterSpacing = 4,               //闪烁字间距
    initialXPos = 140,   yPos = 88;  //闪烁字的位置，后者不变所以这么命名


/*Part4  精灵表动画变量声名*/
var runnerCells = [
      { left: 0,    top: 0, width: 146, height: 220 },
      { left: 146,  top: 0, width: 146, height: 220 },
      { left: 292,  top: 0, width: 146, height: 220 },
      { left: 438,  top: 0, width: 146, height: 220 },
      { left: 584,  top: 0, width: 146, height: 220 },
      { left: 750,  top: 0, width: 146, height: 220 },
      { left: 876,  top: 0, width: 146, height: 220 },
      { left: 1022, top: 0, width: 146, height: 220 },
      { left: 1168, top: 0, width: 146, height: 220 },
      { left: 1314, top: 0, width: 146, height: 220 },
    ],                           //精灵表图片位置信息

runInPlace = {
    lastAdvance: 0,
    PAGEFLIP_INTERVAL: 100,
    execute: function (sprite, ctx, time) {  //执行
        if (time - this.lastAdvance > this.PAGEFLIP_INTERVAL) {
            sprite.painter.advance();
            this.lastAdvance = time;
        }
    }
},

moveLeftToRight = {            //精灵移动设置
    lastMove: 0,
    execute: function (sprite, ctx, time) {
        if (this.lastMove !== 0) {
            sprite.left -= sprite.velocityX *
                 ((time - this.lastMove) / 300);
                        //图片水平移动的速度 
            //sprite.left -= 0;  //在原地跑
            if (sprite.left < 0) {
                sprite.left = canvas.width;
            }           //精灵跑出canvas左侧就从右侧再跑出来
        }
        this.lastMove = time; 
    }
},         

sprite = new Sprite('runner',
    new SpriteSheetPainter(runnerCells),
       [ runInPlace, moveLeftToRight ]);  //绘制器


/*Part5 炸弹动画变量声名*/
var BOMB_LEFT = 400,    BOMB_TOP = 280,
    BOMB_WIDTH = 100,   BOMB_HEIGHT = 100, //炸弹的位置，大小
    NUM_EXPLOSION_PAINTERS = 10,
    NUM_FUSE_PAINTERS = 10,     //图片数

    bombPainter = new ImagePainter('image/bomb.png'),
    bombNoFusePainter = new ImagePainter('image/bomb-no-fuse.png'),
    fuseBurningPainters = [],
    explosionPainters = [],
    fuseBurningAnimator = new SpriteAnimator(
              fuseBurningPainters,
              function () { bomb.painter = bombNoFusePainter; });
    explosionAnimator = new SpriteAnimator(
              explosionPainters,
              function () { bomb.painter = bombNoFusePainter; });
    bomb = new Sprite('bomb', bombPainter);      //精灵绘制器


//[2]函数区................................................
//.........................................................

/*Part1 鼠标点击*/
function windowToCanvas(x, y) {   //函数功能：获取鼠标点击的坐标
   var bbox = canvas.getBoundingClientRect();
   return { x: x - bbox.left * (canvas.width  / bbox.width),
            y: y - bbox.top  * (canvas.height / bbox.height) };
}


/*Part2 12306验证码*/
function cancelCheckMark() {  //函数功能：取消对勾
    if(flag1%2==0)  ctx.clearRect(0,   100, 200, 200);     
    if(flag2%2==0)  ctx.clearRect(200, 100, 200, 200);
    if(flag3%2==0)  ctx.clearRect(400, 100, 200, 200);
    if(flag4%2==0)  ctx.clearRect(600, 100, 200, 200);
    if(flag5%2==0)  ctx.clearRect(0,   300, 200, 200);
    if(flag6%2==0)  ctx.clearRect(200, 300, 200, 200);
    if(flag7%2==0)  ctx.clearRect(400, 300, 200, 200);
    if(flag8%2==0)  ctx.clearRect(600, 300, 200, 200);
    if(scale==1)        question1.src = 'image/question1.png';
    else if(scale==2)   question2.src = 'image/question2.png';
    else if(scale==3)   question3.src = 'image/question3.png';
    drawSeparationLine();  //加载图片会擦掉分隔线
}


/*Part3 精灵表动画*/
function animate2(time) {
    if(movieCheck) {  //放视频时不会出现动画
   	   //ctx.clearRect(0,0,canvas.width,canvas.height); //不擦有重影
   	   background3.src = 'image/background3.png';  //帮挡住重影
   	   sprite.update(ctx, time);
       sprite.paint(ctx);
       window.requestNextAnimationFrame(animate2);
    }  
}

function drawTheSheet() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    spritesheet.src = 'image/running-sprite-sheet.png';
    sprite.velocityX = 50;   
    sprite.left = 350;
    sprite.top = 200;
    window.requestNextAnimationFrame(animate2);
}


/*Part4 炸弹动画*/
function animate3(now) {
   if(movieCheck) {
   	   ctx.clearRect(400,280,100,100);
       bomb.paint(ctx);
       background2.src = 'image/background2.png'; 
       window.requestNextAnimationFrame(animate3);
   }
}

function drawTheBomb() {
    ctx.clearRect(0,0,canvas.width,canvas.height); 
    for (var i=0; i < NUM_FUSE_PAINTERS; ++i) {
        fuseBurningPainters.push(new ImagePainter('image/fuse-0' + i + '.png'));
    }
    for (var i=0; i < NUM_EXPLOSION_PAINTERS; ++i) {
        explosionPainters.push(new ImagePainter('image/explosion-0' + i + '.png'));
    }
    ctx.font = '20pt Arial';
    ctx.strokeStyle = 'lightgrey';
    ctx.lineWidth = 0.5;
    drawGleam = setInterval(gleam, 500);
    drawBomb = window.requestNextAnimationFrame(animate3);
    drawColoredRibbon(50,100,160,"pink");
    drawText('杭州东->宁波',65,118);
    setShadow("T",'grey',4,4,0.8);
    drawLoveHeart(50,200,'red');
    drawLoveHeart(730,260,'blue');
    drawLoveHeart(160,400,'green');
    setShadow("F");
    
    if (bomb.animating)   return;
    fuseBurningAnimator.start(bomb, 2000); 
    setTimeout(function () {
        explosionAnimator.start(bomb, 1000); 
        setTimeout(function () {
            bomb.painter = bombPainter;
        }, 2000);
    }, 3000);
}


/*Part5 视频播放*/
function nextVideoFrame() {
    if (video.ended) {
        controlButton.value = '播放';
        window.location.reload(); 
        movieCheck=1;
    }
    else {
        offscreenContext.drawImage(video, 0, 0);
        ctx.drawImage(offscreenCanvas, 0, 0);
        requestNextAnimationFrame(nextVideoFrame);
    }
}

function startPlaying() {  
	requestNextAnimationFrame(nextVideoFrame);  
	video.play(); 
}

function stopPlaying() {   
	video.pause(); 
}


/*Part6 翻牌*/
function getRandomNum() {  //函数功能：产生1-8的随机数
  while(1){
    num=parseInt(Math.random()*8);
    if(num!=num0 && num!=num1 && num!=num2 && num!=num3
       &&num!=num4 && num!=num5 && num!=num6 && num!=num7)  break;
  }
  return num;
}

function getDifRandomNum() {  //函数功能：产生互不相同的8个随机数
    num0=num1=num2=num3=-1;
    num4=num5=num6=num7=-1;
    num=-1;
    num0=getRandomNum();  num1=getRandomNum();
    num2=getRandomNum();  num3=getRandomNum();
    num4=getRandomNum();  num5=getRandomNum();
    num6=getRandomNum();  num7=getRandomNum();
}

function judgeThePic() {
    if(num0==judgeNum)       { card0.src = 'image/card0.png';  pic0_Check++; }
    else if(num1==judgeNum)  { card1.src = 'image/card1.png';  pic1_Check++; }
    else if(num2==judgeNum)  { card2.src = 'image/card2.png';  pic2_Check++; }
    else if(num3==judgeNum)  { card3.src = 'image/card3.png';  pic3_Check++; }
    else if(num4==judgeNum)  { card4.src = 'image/card0.png';  pic4_Check++; }
    else if(num5==judgeNum)  { card5.src = 'image/card1.png';  pic5_Check++; }
    else if(num6==judgeNum)  { card6.src = 'image/card2.png';  pic6_Check++; }
    else if(num7==judgeNum)  { card7.src = 'image/card3.png';  pic7_Check++; }
}

function repaint() {                  //函数功能：偶数次翻牌后重新绘制
    if(pic0_Check&&pic4_Check)        posCheck[num0]=posCheck[num4]=0; 
    else if(pic1_Check&&pic5_Check)   posCheck[num1]=posCheck[num5]=0;
    else if(pic2_Check&&pic6_Check)   posCheck[num2]=posCheck[num6]=0;
    else if(pic3_Check&&pic7_Check)   posCheck[num3]=posCheck[num7]=0;
    ctx.clearRect(0,100,800,400);
    cardBack.src = 'image/cardBack.png';
    if(posCheck[0]==0&&posCheck[1]==0&&posCheck[2]==0&&posCheck[3]==0
        &&posCheck[4]==0&&posCheck[5]==0&&posCheck[6]==0&&posCheck[7]==0) {
        ctx.clearRect(0,100,800,400);
          drawTextExtended("恭喜你成功挑战了新版12306验证码",200,300,"T","black","T","purple");
          drawTextExtended("击败了全球98%以上的用户",350,320,"T","balck","T","purple");
          setTimeout(function () { window.location.reload();} ,1000);  
        }
    pic0_Check=pic1_Check=pic2_Check=pic3_Check=0;
    pic4_Check=pic5_Check=pic6_Check=pic4_Check=0;
}


/*Part7  贪吃蛇*/
function Food(x,y){   //函数功能：创建食物格子
	this.x = x;
	this.y = y;
	return this;  
}
	
function Cell(x,y,f){  //函数功能：创建新蛇头格子
	this.x = x;
	this.y = y;
	this.f = f;   //表示方向的数字
	return this;
}

function foodRepaint() {
    ctx.clearRect(food.x*width, food.y*width, 50, 50);
    foodRandomNum = parseInt(Math.random()*3.99);
	getFood();
	food = new Food(foodX,foodY);
    if(foodRandomNum==0)       food1.src = 'image/food1.png';
	else if(foodRandomNum==1)  food2.src = 'image/food2.png';
    else if(foodRandomNum==2&& deathCheck==0&&brainHole==3)  {
    	food3.src = 'image/food3.png';
    	setTimeout(foodRepaint,3000);
    }
    else if(foodRandomNum==3&& deathCheck==0&&brainHole==3)  {
    	food4.src = 'image/food4.png';
    	setTimeout(foodRepaint,3000);
    }
}

function drawSnake() {  //函数功能：绘制贪吃蛇
	ctx.strokeStyle="black"; 
	for(var i = 0 ; i<snake.length;i++){
		ctx.fillStyle="black";
		if(i==snake.length-1){
			if(snake.length < 20)       ctx.fillStyle = "green";
			else if(snake.length < 30)  ctx.fillStyle = "red";
			else if(snake.length < 40)  ctx.fillStyle = "purple";
	    }
	    ctx.beginPath();
		ctx.rect(snake[i].x*width,snake[i].y*width,50,50);
		ctx.closePath();		
		ctx.fill();
		ctx.stroke();
	}

	var head = snake[snake.length-1];

	if(eatFood()){
		getFood();
		food = new Food(foodX,foodY);
			
		var newCell =new Cell(head.x,head.y,head.f);
		switch(head.f){
			case 2:newCell.y--; break;
			case -1:newCell.x++; break;
			case -2:newCell.y++; break;
			case 1:newCell.x--; break;
		}
		snake[snake.length] =newCell;

        if(foodRandomNum==0)       food1.src = 'image/food1.png';
	    else if(foodRandomNum==1)  food2.src = 'image/food2.png';
        else if(foodRandomNum==2 && deathCheck==0&&brainHole==3)  {
    	    food3.src = 'image/food3.png';
    	    setTimeout(foodRepaint,3000);
        }
        else if(foodRandomNum==3 && deathCheck==0&&brainHole==3)  {
    	    food4.src = 'image/food4.png';
    	    setTimeout(foodRepaint,3000);
        }

	}
}

function eatFood(){
	var flag = false;
	var head = snake[snake.length-1];
	if(head.x==food.x&&head.y==food.y&&foodRandomNum!=2 && foodRandomNum!=3){
		flag = true;
		foodRandomNum = parseInt(Math.random()*3.99);
	}
	else if(head.x==food.x&&head.y==food.y&&foodRandomNum==2) {
		food3Check=1;
	}
	else if(head.x==food.x&&head.y==food.y&&foodRandomNum==3) {
		food4Check=1;
	}
	return flag;
}

function getFood(){
	foodX = Math.ceil(Math.random()*14)+1;
	foodY = Math.ceil(Math.random()*8)+1;
	for(var i = 0;i<snake.length;i++){
		if(snake[i].x==foodX && snake[i].y==foodY){
			getFood();
		}
	}
}

function moveSnake(direction){
	var newSnake = [];
	var head = snake[snake.length-1];
	var newCell = new Cell(head.x,head.y,head.f);
    ctx.clearRect(snake[0].x*width-1,snake[0].y*width-1,52,52);
	for(var i = 1;i<snake.length;i++){
		newSnake[i-1] = snake[i];
	}
	newSnake[snake.length-1] = newCell;
    newCell.f = direction;
	switch(direction){
		case 2:newCell.y--; break;
		case -1:newCell.x++; break;
		case -2:newCell.y++; break;
		case 1:newCell.x--; break;
	}
	snake = newSnake;
    if(checkDeath()) {
	    drawSnake();
	    if(deathCheck==1) {
	    	pause = true;
	    	ctx.clearRect(0,0,800,500);
	    	clearInterval(move);
	    	setTimeout(drawEnding,3100);
	    }
    }
}

function checkDeath(){
	var head = snake[snake.length-1];
	if(head.x>=16||head.y>=10||head.x<0||head.y<0){
		pause = true;
		deathCheck=1;
	}
	for(var i = 0;i<snake.length-1;i++){
		if(head.x==snake[i].x&&head.y==snake[i].y){	
			pause = true;
			deathCheck=1;
		}
	}
	if(food3Check==1||food4Check==1) {
		pause = true;
		deathCheck=1;
	}
	return true;
}

function moveClock(){
	if(!pause){
		var head = snake[snake.length-1];
		moveSnake(head.f);
	}
}

function drawEnding() {
    ctx.clearRect(0,0,800,500);
    ctx.font = '16pt Arial';
    drawTextExtended("[1]12306提示:很遗憾，验证码输入错误！",50,150,"T","black","T","black");
    drawTextExtended("[2]10086提示:贪吃蛇的遗照将以短信形式发送到您的手机上，请注意查收。",50,200,"T","black","T","black");
    setTimeout(function () { window.location.reload();} ,2000);
}


//[3]注册区.................................................
//..........................................................
/*Part1 明星科普按钮点击事件注册*/
know1.onclick = function(e) {
    if(movieCheck) {
        ctx.clearRect(0,0,canvas.width,canvas.height); 
        knowBbh.src = 'image/Bbh.png'; 
        background.src = 'image/background.png'; 
        music2.pause(); music3.pause(); music4.pause(); 
        music1.play();
        //setTimeout(function () { window.location.reload();} ,2000); 
    } 
}
know2.onclick = function(e) {
    if(movieCheck) {
        ctx.clearRect(0,0,canvas.width,canvas.height); 
        knowWld.src = 'image/Wld.png';
        background.src = 'image/background.png';
        music1.pause(); music3.pause(); music4.pause();
        music2.play(); 
        //setTimeout(function () { window.location.reload();} ,2000);  
    } 
}
know3.onclick = function(e) {
    if(movieCheck) { 
        ctx.clearRect(0,0,canvas.width,canvas.height); 
        knowWzl.src = 'image/Wzl.png';
        background.src = 'image/background.png';
        music1.pause(); music2.pause(); music4.pause();
        music3.play(); 
        //setTimeout(function () { window.location.reload();} ,2000); 
    }   
}
know4.onclick = function(e) {
    if(movieCheck) {
        ctx.clearRect(0,0,canvas.width,canvas.height); 
        knowJx.src = 'image/Jx.png';
        background.src = 'image/background.png';
        music1.pause(); music2.pause(); music3.pause(); 
        music4.play(); 
        //setTimeout(function () { window.location.reload();} ,2000);
    }    
}

pic.onclick = function(e) {
     window.location.href = "pic.html";
}

/*Part2 滑杆切换事件注册*/
scaleSlider.onchange = function(e) {
	//scaleSlider.disableKeyboardControl();
    
	e.preventDefault(); //通知浏览器不要执行关联的默认动作
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	brainHole = e.target.value;      //由滑动杆位置获取brainHole的值                              	
    scaleOutput.innerText = "[3]开脑洞"+brainHole+":"; 

    //切换第一关.............................................................
    //.......................................................................
    if(brainHole==1) {
    	drawSeparationLine();
    	flag1=flag2=flag3=flag4=flag5=flag6=flag7=flag8=0;
        question1.src = 'image/question1.png';
    }

    //切换第二关.............................................................
    //.......................................................................
    else if(brainHole==2) {
        clearInterval(move); 
        posCheck[0]=posCheck[1]=posCheck[2]=posCheck[3]=1,
        posCheck[4]=posCheck[5]=posCheck[6]=posCheck[7]=1,
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        getDifRandomNum();
        drawColoredRibbon(140,20,250,'red');
        drawText("连续翻出两张一模一样的牌,",470,42);
        drawText("就可以消掉一组牌。",600,62);
        drawTextExtended("翻牌游戏：",220,42,"T",'black','T','yellow');
        drawLine(0,99,800,100);
        cardBack.src = 'image/cardBack.png';
	}

    //切换第三关.............................................................
    //.......................................................................
    else if(brainHole==3)  {
        deathCheck=0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '16pt Arial';
        drawTextExtended("[提示]按空格键开始，WASD键控制方向，请先将墨迹擦干净，谢谢！！",50,135,"T","black","T","black");
        pause = true;  //蛇的初始状态是运动		
        move = setInterval(moveClock,400); //蛇不静止就周期move
        food = new Food(4,8);  //在（15,15）位置画食物
        for(var i = 0;i<length;i++){
	        snake[i] = new Cell(i,0,-1);
        }  
        drawSnake();   //绘制某个状态的蛇
        food1.src = 'image/food1.png';
    } 

}


onmousedown = function(e) {
	//e.preventDefault(); //通知浏览器不要执行关联的默认动作
   if(e.clientX>1100 && e.clientX<1240 && e.clientY>120 && e.clientY<320 ) 
   window.location.href = "detail.html";
}


/*Part3 鼠标点击事件注册*/
canvas.onmousedown = function (e) {      //注册鼠标点击事件
   var loc = windowToCanvas(e.clientX, e.clientY);   //获取鼠标点击的坐标
   e.preventDefault(); //通知浏览器不要执行关联的默认动作

   //第一关的鼠标点击事件.............................................................
   //.................................................................................
   if(brainHole==1) {

   if(10< loc.y && loc.y < 70 && 650< loc.x && loc.x<790) {
       flag1=flag2=flag3=flag4=flag5=flag6=flag7=flag8=0;
	   ctx.clearRect(0, 0, canvas.width, canvas.height);  
       scale = parseInt(Math.random()*3+1);                       	
       if(scale==1)       question1.src = 'image/question1.png';
       else if(scale==2)  question2.src = 'image/question2.png';
       else if(scale==3)  question3.src = 'image/question3.png';
       drawSeparationLine(); 
   }                                 //scale随机生成，刷新验证码
   else if(100< loc.y && loc.y < 300) {
       if(0< loc.x && loc.x < 200) {       flag1++;  right.src = 'image/right.png'; cancelCheckMark(); }
       else if(loc.x>200 && loc.x<400) {   flag2++;  right.src = 'image/right.png'; cancelCheckMark(); } 
       else if(loc.x>400 && loc.x<600) {   flag3++;  right.src = 'image/right.png'; cancelCheckMark(); } 
       else if(loc.x>600 && loc.x<800) {   flag4++;  right.src = 'image/right.png'; cancelCheckMark(); } 
   }
   else if(300<loc.y && loc.y<500) {
       if( 0<loc.x && loc.x<200) {         flag5++;  right.src = 'image/right.png'; cancelCheckMark(); } 
       else if(loc.x>200 && loc.x<400) {   flag6++;  right.src = 'image/right.png'; cancelCheckMark(); } 
       else if(loc.x>400 && loc.x<600) {   flag7++;  right.src = 'image/right.png'; cancelCheckMark(); } 
       else if(loc.x>600 && loc.x<800) {   flag8++;  right.src = 'image/right.png'; cancelCheckMark(); }  
   }

   }
   

   //第二关的鼠标点击事件.............................................................
   //.................................................................................
   else if(brainHole==2) {
       if(loc.y>100&&loc.y<300) {
           if(loc.x>0 && loc.x<200 &&posCheck[0])        { clickNum++; judgeNum=0;  judgeThePic(); }
           else if(loc.x>200 && loc.x<400 &&posCheck[1]) { clickNum++; judgeNum=1;  judgeThePic(); }
           else if(loc.x>400 && loc.x<600 &&posCheck[2]) { clickNum++; judgeNum=2;  judgeThePic(); }
           else if(loc.x>600 && loc.x<800 &&posCheck[3]) { clickNum++; judgeNum=3;  judgeThePic(); }
           if(clickNum%2==0) setTimeout(repaint,300);
       }
       else if(loc.y>300&&loc.y<500) {
           if(loc.x>0 && loc.x<200 &&posCheck[4])        { clickNum++; judgeNum=4;  judgeThePic(); }
           else if(loc.x>200 && loc.x<400 &&posCheck[5]) { clickNum++; judgeNum=5;  judgeThePic(); }
           else if(loc.x>400 && loc.x<600 &&posCheck[6]) { clickNum++; judgeNum=6;  judgeThePic(); }
           else if(loc.x>600 && loc.x<800 &&posCheck[7]) { clickNum++; judgeNum=7;  judgeThePic(); }
           if(clickNum%2==0) setTimeout(repaint,500);
      }
   
   }

};


/*Part4 提交按钮点击事件注册*/
submit.onclick = function(e) {
    if(movieCheck&&brainHole==1) { //不是第一关或者播放视频时不能提交

	if(scale==1&& !(flag1%2) && (flag2%2) && (flag3%2) && !(flag4%2) 
		       && (flag5%2) && !(flag6%2) && !(flag7%2) && !(flag8%2)) { 
		                                                  //设置正确答案
        drawTheBomb();
        setTimeout(function () { window.location.reload();} ,4000);
	}
	else if(scale==2&& (flag1%2) && !(flag2%2) &&(flag3%2) && (flag4%2) 
		            && !(flag5%2) && (flag6%2) && (flag7%2) && !(flag8%2)) {
        drawTheBomb();
        setTimeout(function () { window.location.reload();} ,1000);
	}
	else if(scale==3&& !(flag1%2) && !(flag2%2) && !(flag3%2) && !(flag4%2) 
		            && !(flag5%2) && (flag6%2) && !(flag7%2) && (flag8%2)) {
        drawTheBomb();
        setTimeout(function () { window.location.reload();} ,1000);
	}
	else  {
		drawTheSheet();
        setTimeout(function () { window.location.reload();} ,1000);
    }

    }
}

/*Part5 视频播放控制按钮点击事件注册*/
controlButton.onclick = function(e) {
   movieCheck=0;
   if (controlButton.value === '播放') {
      startPlaying();
      controlButton.value = '暂停';
   }
   else {
      stopPlaying();
      controlButton.value = '播放';
   }
}


/*Part6 贪吃蛇的键盘事件注册*/
document.onkeydown=function(e){		
	if(brainHole==3) {	//只在第三关调用键盘注册事件

	var direction;	
	switch(e.keyCode){
		case 65: direction=1;  break;
		case 87: direction=2;  break;
		case 68: direction=-1; break;
		case 83: direction=-2; break;
		default:direction=0;
	}
	if(e.keyCode==32){
		if(pause) pause  = false;
		else      pause = true;
	}
	if(!pause){
		if(direction!=0)  moveSnake(direction);
	}

    }
}


//[4]初始化区............................................
//.......................................................

/*Part1 各图片的加载方式*/
background.onload = function(e) { ctx.drawImage(background, 0 , 0, 800, 500);}
background2.onload = function(e) { ctx.drawImage(background2, 200, 90, 450, 400);}
background3.onload = function(e) { ctx.drawImage(background3, 0 , 0, 800, 500); }                                                                //资料卡背景图
knowBbh.onload = function(e) {  ctx.drawImage(knowBbh, 140 , 100, 600, 260); }
knowWld.onload = function(e) {  ctx.drawImage(knowWld, 140 , 100, 600, 260); }
knowWzl.onload = function(e) {  ctx.drawImage(knowWzl,  140, 120, 600, 225); }
knowJx.onload = function(e)  {  ctx.drawImage(knowJx,   140, 100, 600, 250); }   //资料卡
question1.onload = function(e) { ctx.drawImage(question1,0,0,800,500); }
question2.onload = function(e) { ctx.drawImage(question2,0,0,800,500); }
question3.onload = function(e) { ctx.drawImage(question3,0,0,800,500);}      //三张验证码
right.onload = function(e) { 
    if(flag1%2)  ctx.drawImage(right, 0, 260, 45,45);
    if(flag2%2)  ctx.drawImage(right, 200, 260, 45,45); 
    if(flag3%2)  ctx.drawImage(right, 400, 260, 45,45);
    if(flag4%2)  ctx.drawImage(right, 600, 260, 45,45);             
    if(flag5%2)  ctx.drawImage(right, 0,  460, 45,45);
    if(flag6%2)  ctx.drawImage(right, 200, 460, 45,45);    
    if(flag7%2)  ctx.drawImage(right, 400, 460, 45,45);
    if(flag8%2)  ctx.drawImage(right, 600, 460, 45,45); 
}                                             //红对勾

card0.onload = function(e) {  ctx.drawImage(card0,  parseInt(num0%4)*200, parseInt(num0/4)*200+100, 200, 200); }
card1.onload = function(e) {  ctx.drawImage(card1,  parseInt(num1%4)*200, parseInt(num1/4)*200+100, 200, 200); }
card2.onload = function(e) {  ctx.drawImage(card2,  parseInt(num2%4)*200, parseInt(num2/4)*200+100, 200, 200); }
card3.onload = function(e) {  ctx.drawImage(card3,  parseInt(num3%4)*200, parseInt(num3/4)*200+100, 200, 200); }
card4.onload = function(e) {  ctx.drawImage(card4,  parseInt(num4%4)*200, parseInt(num4/4)*200+100, 200, 200); }
card5.onload = function(e) {  ctx.drawImage(card5,  parseInt(num5%4)*200, parseInt(num5/4)*200+100, 200, 200); }
card6.onload = function(e) {  ctx.drawImage(card6,  parseInt(num6%4)*200, parseInt(num6/4)*200+100, 200, 200); }
card7.onload = function(e) {  ctx.drawImage(card7,  parseInt(num7%4)*200, parseInt(num7/4)*200+100, 200, 200); }
cardBack.onload = function(e) {
    if(posCheck[0])  ctx.drawImage(cardBack, 0   , 100, 200, 200);
    if(posCheck[1])  ctx.drawImage(cardBack, 200 , 100, 200, 200);
    if(posCheck[2])  ctx.drawImage(cardBack, 400 , 100, 200, 200);
    if(posCheck[3])  ctx.drawImage(cardBack, 600 , 100, 200, 200);
    if(posCheck[4])  ctx.drawImage(cardBack, 0   , 300, 200, 200);
    if(posCheck[5])  ctx.drawImage(cardBack, 200 , 300, 200, 200);
    if(posCheck[6])  ctx.drawImage(cardBack, 400 , 300, 200, 200);
    if(posCheck[7])  ctx.drawImage(cardBack, 600 , 300, 200, 200);
}                                                                       //卡片及卡片背面
                                                                       
food1.onload = function(e) {  ctx.drawImage(food1, food.x*width, food.y*width, 50, 50); }
food2.onload = function(e) {  ctx.drawImage(food2, food.x*width, food.y*width, 50, 50); }
food3.onload = function(e) {  ctx.drawImage(food3, food.x*width, food.y*width, 50, 50); }
food4.onload = function(e) {  ctx.drawImage(food4, food.x*width, food.y*width, 50, 50); }


/*Part2 视频长宽位置的初始化*/
offscreenCanvas.width = canvas.width;
offscreenCanvas.height = canvas.height;


/*Part3 炸弹动画指定长宽与位置*/
bomb.left = BOMB_LEFT;
bomb.top = BOMB_TOP;
bomb.width = BOMB_WIDTH;
bomb.height = BOMB_HEIGHT;   //炸弹动画长宽及所在的位置


/*Part4 初始界面*/
question1.src = 'image/question1.png';  
drawSeparationLine();

