function toggleElement(elementId, displayStyle)
{
    var current = getStyle(elementId, 'display');
    document.getElementById(elementId).style.display = (current == 'none' ? displayStyle : 'none');
}


function getStyle(elementId, property)
{
    var element = document.getElementById(elementId);
    return element.currentStyle ? element.currentStyle[property]
           : document.defaultView.getComputedStyle(element, null).getPropertyValue(property);
}


function toggle(toggleId)
{
    var toggle;
    if (document.getElementById)
    {
        toggle = document.getElementById(toggleId);
    }
    else if (document.all)
    {
        toggle = document.all[toggleId];
    }
    toggle.textContent = toggle.innerHTML == '\u25b6' ? '\u25bc' : '\u25b6';
}


function $(element){
return element = document.getElementById(element);
}


function setHeight(obj,hei){
		var objHeight = document.getElementById('content').style.height;
		objHeight = objHeight.substr(0,objHeight.length-2);
		objHeight = parseInt(objHeight);
		if(obj.style.display==''){
			document.getElementById('content').style.height =objHeight+hei+"px";
		}else{
			document.getElementById('content').style.height =objHeight-hei+"px";
		}
	}



function $D(content){
var d=content;
var h=d.offsetHeight;
var maxh=300;
function dmove(){
h+=50; //层展开速度
if(h>=maxh){
d.style.height='300px';
clearInterval(iIntervalId);
}else{
d.style.display='block';
d.style.height=h+'px';
}
}
iIntervalId=setInterval(dmove,2);
}


function $D2(content){
var d=content;
var h=d.offsetHeight;
var maxh=300;
function dmove(){
h-=50;//层收缩速度
if(h<=0){
d.style.display='none';
clearInterval(iIntervalId);
}else{
d.style.height=h+'px';
}
}
iIntervalId=setInterval(dmove,2);
}

function $use(var content ){
var d=content;
var sb=$('stateBut');
if(d.style.display=='none'){
	$D(content);
sb.innerHTML='点击收缩';
}else{

$D2(content);
sb.innerHTML='点击展开';

}
}


