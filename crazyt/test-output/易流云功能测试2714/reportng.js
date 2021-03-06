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
//����������
function methodDescriptionclick(tid){
	  $("#"+tid).toggle(500);
}
//���testoutput ID
//8 character ID (base=2) 
//uuid(8, 2)  //  "01001010" 
//// 8 character ID (base=10) 
//uuid(8, 10) // "47473046" 
//// 8 character ID (base=16) 
//uuid(8, 16) // "098F4D35" 
function uuid(len, radix) { 
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''); 
    var uuid = [], i; 
    radix = radix || chars.length; 
  
    if (len) { 
      // Compact form 
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix]; 
    } else { 
      // rfc4122, version 4 form 
      var r; 
  
      // rfc4122 requires these characters 
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'; 
      uuid[14] = '4'; 
  
      // Fill in random data.  At i==19 set the high bits of clock sequence as 
      // per rfc4122, sec. 4.1.5 
      for (i = 0; i < 36; i++) { 
        if (!uuid[i]) { 
          r = 0 | Math.random()*16; 
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r]; 
        } 
      } 
    } 
  
    return uuid.join(''); 
} 
	//图形大小
	//var r=r();
	var  test1p=10;
	var test2p=10;
	var test3p=10;
	var  test1f=10;
	var test2f=10;
	var test3f=10;
	var  test1s=10;
	var test2s=10;
	var test3s=10;
//$('#echarttestresult').width()
	var r='80';
	var centerx='50%';
    var centery='50%';
        // 路径配置
    require.config({
            paths:  {
                echarts: 'dist'
			}
	});
    
	 require(
				[
					'echarts',
					'echarts/chart/pie'// 使用柱状图就加载bar模块，按需加载
				],
     function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById('echarttestresult')); 
             
                var option = {
					
    //左边标签
	tooltip : {
        show: false,
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient : 'horizontal',
        x : 'left',
		 y:'bottom' , 
        data:['执行成功','执行失败','跳过执行']
    },
    toolbox: {
        show : true,
        feature : {
 
            dataView : {show: true, readOnly: false},
		magicType: {
        show : true,
        
        type : [ ]
    },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : false,
	//统计
    series : [
        {
            name:'执行情况汇总',
            type:'pie',
			//中心位置
            center : [centerx,centery],
			selectedMode: 'single',
			//大小
            radius : r*0.6,
            itemStyle : {
                normal : {
                    label : {
                        position : 'inner',
                        formatter : function (a,b,c,d) {return b+'\n'+(d - 0).toFixed(0)+'%'},
						textStyle: {
										 color: '#0000FF'
								   }
                    },
                    labelLine : {
                        show : false
                    }
                },
                emphasis : {
                    label : {
                        show : true,
                        formatter : "{b}\n{d}%",
						textStyle: {
										 color: '#0000FF'
								   }
                    }
                }
                
            },
            data:[
                {value:1, name:'执行成功',itemStyle : { normal : { color: '#33FF99' },emphasis : {color: '#99FF00'}} },
 {value:1, name:'执行失败',itemStyle : { normal : { color: '#33FF99' },emphasis : {color: '#99FF00'}} },
                
            ],
				markPoint : {
					symbol:'diamond'  ,
					tooltip : {
							show: true,
							formatter: "{a} <br/>{b} : {c}"
						},
					data : [
						{name : '用例总数', value : 1548, x:'10%', y:40, symbolSize:20,
						
						effect :{
									show: true, 
									loop: true, 
									period: 15, 
									scaleSize : 1, 
									color : null, 
									shadowColor : null, 
									shadowBlur : 0 
								
								},
					itemStyle : { normal : { color: '#330099'},emphasis : { label : {}}}
						}//itemStyle : { normal : { },emphasis : { label : {}}}
					]
				 }
  
				
        },
		//tests-class统计
        {
            name:'用例分组统计',
            type:'pie',
            center : [centerx, centery],
            radius : [r*0.65, r],
			 
            data:[
                {value:1, name:'test1成功数1'},
				{value:2, name:'test1成功数2'},
{value:2, name:'test1成功数3'}  ,
{value:2, name:'test1成功数4'}     
            ]
  
        },
		//class-mathds统计
		       {
            name:'用例分组统计',
            type:'pie',
            center : [centerx, centery],
            radius : [r*1.005, r*1.3],
	
			itemStyle : {
                normal : {
                    label : {
						 show : false,
                        position : 'inner',
                        formatter : function (a,b,c,d) {return (d - 0).toFixed(0) + '%'}
                    },
                    labelLine : {
                        show : false
                    }
                },
                emphasis : {
                    label : {
                        show : true,
                        formatter : "{b}\n{d}%",
						textStyle: {
							 color: '#0000FF'
								   }
                    }
                }
                
            },
            data:[
                {value:test1p, name:'test1成功数'},
                {value:test2p, name:'test2成功数'},
                {value:test3p, name:'test3成功数'},
				{value:test1f, name:'test1失败数'},
                {value:test2f, name:'test2失败数'},
                {value:test3f, name:'test3失败数'},
				{value:test1s, name:'test1跳过数'},
                {value:test2s, name:'test2跳过数'},
                {value:test3s, name:'test3跳过数'},
                
            ]
			}
		 ]// series : end
};//option end
                    
        
                // 为echarts对象加载数据 
                myChart.setOption(option); 
				window.onresize = myChart.resize 
            }//function (ec) end
        );// require end
