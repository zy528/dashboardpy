/**
 * 
 */
getpvuvdatas = function(datas){
    var xdata = new Array();
	var data1 = new Array();
	var data2 = new Array();
	var data3 = new Array();
	var data4 = new Array();
	var data5 = new Array();
	var data6 = new Array();
	var data7 = new Array();
	var data8 = new Array();
    var result = {
    		title: {
    			text: '生长曲线pvuv'
    		},
    		tooltip: {
    			trigger: 'axis'
    		},
    		legend: {
    			data:['个人主页PV','个人主页UV','宝宝信息页面PV','宝宝信息页面UV','录入数据页面PV','录入数据页面UV','生长曲线页面PV','生长曲线页面UV'],
    			type:'plain'
    		},
    		grid: {
    			left: '3%',
    			right: '4%',
    			bottom: '3%',
    			containLabel: true
    		},
    		toolbox: {
    			feature: {
    				saveAsImage: {},
    				magicType: {type: ['line', 'bar']}
    			}
    		},
    		yAxis: {
    			type: 'value'
    		},

    		xAxis:{
    			type: 'category',
    			boundaryGap: false,
    			data:datas.tjtime
    		},
    		series: [
    		         {
    		        	 name:'个人主页PV',
    		        	 type:'line',
    		        	 data:data1
    		         },
    		         {
    		        	 name:'个人主页UV',
    		        	 type:'line',
    		        	 data:data2
    		         },
    		         {
    		        	 name:'宝宝信息页面PV',
    		        	 type:'line',
    		        	 data:data3
    		         },
    		         {
    		        	 name:'宝宝信息页面UV',
    		        	 type:'line',
    		        	 data:data4
    		         },
    		         {
    		        	 name:'录入数据页面PV',
    		        	 type:'line',
    		        	 data:data5
    		         },
    		         {
    		        	 name:'录入数据页面UV',
    		        	 type:'line',
    		        	 data:data6
    		         },
    		         {
    		        	 name:'生长曲线页面PV',
    		        	 type:'line',
    		        	 data:data7
    		         },
    		         {
    		        	 name:'生长曲线页面UV',
    		        	 type:'line',
    		        	 data:data8
    		         }
    		         ]

    };
     
    
  
    
    return result;
} 




 