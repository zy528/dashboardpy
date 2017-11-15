/**
 * 每日各收入类型金额走势
 */
getdailydata = function(datas){
    var result = {
    		title: {
    			text: '每日各收入类型金额走势',
				x:'center'
    		},
    		tooltip: {
    			trigger: 'axis'
    		},
    		legend: {
    			data:['会员卡充值','消费金额'],
    			type:'plain',
				bottom: '0'
    		},
    		grid: {
    			left: '3%',
    			right: '4%',
    			bottom: '9%',
    			containLabel: true
    		},
    		toolbox: {
    			feature: {
    				saveAsImage: {},
    				magicType: {type: ['line', 'bar']}
    			}
    		},
    		xAxis:[
    			{
    			type: 'category',
    			//boundaryGap: false,
    			data:datas.xdata
    			}
			],
    		yAxis:[
    			 {
    				type: 'value'
    			 }
			],
    		series: [
    		         {
    		        	 name:'会员卡充值',
    		        	 type:'bar',
    		        	 stack: 'true',
    		        	 data:datas.xfmoney
    		         },
    		         {
    		        	 name:'消费金额',
    		        	 type:'bar',
    		        	 stack: 'true',
    		        	 data:datas.vipmoney
    		         }
    		         ]
    };
    return result;
}

/**
 * mtd目标值情况
 */
getmtddata = function(mtd){
    var result = {
    		title: {
    			text: '会员卡销售额MTD进度'
				//left:'35%'
    		},
    		tooltip : {
                formatter: "{a}:{c}"
    		},
    		grid: {
    			left: '3%',
    			right: '4%',
    			bottom: '-20%',
    			containLabel: true
    		},
    		toolbox: {
        		feature: {
            		restore: {},
            		saveAsImage: {}
       			}
   			 },
        series:  [{
            name: 'MTD销售额',
            max: mtd.mtdtotal,
            type: 'gauge',
            center: ['25%', '50%'],
            axisLine: {
                width: 20,
                show: true,
                lineStyle: {
                    width: 30,
                    shadowBlur: 0,
                    color: [[0.3, '#6ced91'],[0.7, '#06a8fd'],[1, '#fe6b7d']]
                }
            },
            detail: {
                formatter:parseInt((mtd.mtdnow/mtd.mtdtotal)*100)+"%",
                textStyle: {
                    fontSize: 20,
                    color: "#f30311"
                }
            },
            title : {
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    fontSize: 15
                },
                offsetCenter: [0, '-110%']
            },
            data: [{value: mtd.mtdnow, name: '深圳海德门诊销售额'}]
        },
                {
                    name: 'MTD销售额',
                    max: mtd.mtdtotal,
                    center: ['60%', '50%'],
                    type: 'gauge',
                    axisLine: {
                        width: 20,
                        show: true,
                        lineStyle: {
                            width: 30,
                            shadowBlur: 0,
                            color: [[0.3, '#6ced91'],[0.7, '#06a8fd'],[1, '#fe6b7d']]
                        }
                    },
                    detail: {
                        formatter:parseInt((mtd.mtdnow/mtd.mtdtotal)*100)+"%",
                        textStyle: {
                            fontSize: 20,
                            color: "#f30311"
                        }
                    },
                    title:{
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontWeight: 'bolder',
                            fontSize: 15
                        },
                        offsetCenter: [0, '-110%']
                    },
                    data: [{
                        value: mtd.mtdnow,
                        name: '上海丽晟门诊销售额'
                    }]
                }
			]
    };
    return result;
}




 