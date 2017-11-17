/**
 * 每日各收入类型金额走势
 */
getdailydata = function(datas){
    var result = {
    		title: {
    			text:datas.spotname+ "每日各收入类型金额走势",
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
    		        	 data:datas.xfmoney,
                         itemStyle: {
                             normal: {
                                 color: '#13b5ff'
                             }
                        }
    		         },
    		         {
    		        	 name:'消费金额',
    		        	 type:'bar',
    		        	 stack: 'true',
    		        	 data:datas.vipmoney,
                         itemStyle: {
                             normal: {
                                 color: '#f32a33'
                             }
                        }
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
            max: mtd.mtdtotal2,
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
                formatter:parseInt((mtd.mtdnow2/mtd.mtdtotal2)*100)+"%",
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
            data: [{value: mtd.mtdnow2, name: mtd.mtdname2+'销售额'}]
        },
                {
                    name: 'MTD销售额',
                    max: mtd.mtdtotal1,
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
                        formatter:parseInt((mtd.mtdnow1/mtd.mtdtotal1)*100)+"%",
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
                        value: mtd.mtdnow1,
                        name:mtd.mtdname1+'销售额'
                    }]
                }
			]
    };
    return result;
}




 