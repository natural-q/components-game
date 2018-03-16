var browse = window.navigator.appName.toLowerCase();
var MyMar;
var speed = 7; //速度，越大越慢
var spec = 1;  //每次滚动的间距, 越大滚动越快
var minOpa = 50; //滤镜最小值
var maxOpa = 100; //滤镜最大值
var spa = 2;   //缩略图区域补充数值
var w = 0;
spec = (browse.indexOf("microsoft") > -1) ? spec : ((browse.indexOf("opera") > -1) ? spec*10 : spec*20);
function $(e) {return document.getElementById(e);}
function goleft() {$('photos').scrollLeft -= spec;}
function goright() {$('photos').scrollLeft += spec;}
function setOpacity(e, n) {
    if (browse.indexOf("microsoft") > -1) e.style.filter = 'alpha(opacity=' + n + ')';
    else e.style.opacity = n/100;
}
$('goleft').style.cursor = 'pointer';
$('goright').style.cursor = 'pointer';
$('mainphoto').onmouseover = function() {setOpacity(this, maxOpa);}
$('mainphoto').onmouseout = function() {setOpacity(this, minOpa);}
$('goleft').onmouseover = function() {this.src = 'image/goleft2.jpg'; MyMar=setInterval(goleft, speed);}
$('goleft').onmouseout = function() {this.src = 'image/goleft.jpg'; clearInterval(MyMar);}
$('goright').onmouseover = function() {this.src = 'image/goright2.jpg'; MyMar=setInterval(goright,speed);}
$('goright').onmouseout = function() {this.src = 'image/goright.jpg'; clearInterval(MyMar);}
window.onload = function() {
    setOpacity($('mainphoto'), minOpa);
    var rHtml = '';
    var p = $('showArea').getElementsByTagName('img');
    for (var i=0; i<p.length; i++) {
        w += parseInt(p[i].getAttribute('width')) + spa;
        setOpacity(p[i], minOpa);
        p[i].onmouseover = function() {
            setOpacity(this, maxOpa);
            $('mainphoto').src = this.getAttribute('rel');
            setOpacity($('mainphoto'), maxOpa);
        }
        p[i].onmouseout = function() {
            setOpacity(this, minOpa);
            setOpacity($('mainphoto'), minOpa);
        }
        rHtml += '<img src="' + p[i].getAttribute('rel') + '" width="0" height="0" alt="" />';
    }
    $('showArea').style.width = parseInt(w) + 'px';
    var rLoad = document.createElement("div");
    $('photos').appendChild(rLoad);
    rLoad.style.width = "1px";
    rLoad.style.height = "1px";
    rLoad.style.overflow = "hidden";
    rLoad.innerHTML = rHtml;
}