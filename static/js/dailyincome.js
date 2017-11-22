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


gettest = function(datas){
    var result = {
        color:['#13B5FF','#f30311','#ddd'],
    //backgroundColor:'#000',
    title: {
        text: datas.spotname+ "每日各收入类型金额走势",
        textStyle: {
            fontSize:18,
            fontWeight:'bold',

        },
    },
    legend:{
        right:'50%',
        textStyle: {
            color: '#666',
            fontSize: 12,
        },
        bottom:'22',
        data:['会员卡充值','消费金额','总金额'],
    },
    tooltip:{
        show:true,
        trigger: 'axis',
        axisPointer: {
            type:'cross',
            crossStyle:{
               color:'#ddd',

           },

        },
    },

    toolbox:{
        right:20,
        feature:{
            saveAsImage: {},
            restore: {},
            dataView: {},
            dataZoom: {},
            magicType: {
                type:['line','bar']
            },
            // brush: {},
        }
    },

    grid:{
        left:5,
        right:20,
        top:80,
        bottom:50,
        containLabel:true,
    },xAxis: {
      show:true,


      axisTick:{
          alignWithLabel:true,
          lineStyle:{

          },
      },
      data:datas.xdata,
    },
        yAxis: [
        {
            type:'value',
            name:'(金额)',
            nameTextStyle:{
            },
            axisLabel:{
             textStyle:{
             },
            },
            axisTick:{
              alignWithLabel:true,
              lineStyle:{

              },
            },
            splitLine:{
                show:false,
            },
        },
        {
            type:'value',
            name:'总金额',
            nameTextStyle:{
            },
            axisLabel:{
             textStyle:{
             },
            },
            axisTick:{
              alignWithLabel:true,
              lineStyle:{

              },
            },
            splitLine:{
                show:false,
            },
        },
    ],
        dataZoom: [{
        show: true,
        height:20,
        bottom:0,
        start: 10,
        end: 60,
        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
        handleSize: '110%',
        handleStyle:{color:"#7c8ca4",},
        textStyle:{color:"#060606"},
            borderColor:"#90979c",
        },
        { type: "inside"}
    ],
        series: [
        {
            type: 'bar',
            name:'消费金额',
            stack:'金额',
            data:datas.xfmoney,
            label: {
                normal: {
                    show:true,
                    position: 'insideTop',
                    offset:[0,20],
                    textStyle:{
                       color:'#000',
                    },
                },
                emphasis: {
                     textStyle:{
                       color:'#fff',
                    },
                },
            },
        },
        {
            type: 'bar',
            name:'会员卡充值',
            stack:'金额',
            data:datas.vipmoney,
            label: {
                normal: {
                    show:true,
                    position: 'insideTop',
                    offset:[0,20],
                    textStyle:{
                       color:'#000',
                    },
                },
                emphasis: {
                   textStyle:{
                       color:'#fff',
                    },
                },
            },
        },
        {
            type: 'line',
            name:'总金额',
            yAxisIndex:1,
            stack:'金额',
            data:datas.totalmoney,
            label: {
                normal: {
                    show:true,
                    position: 'insideTop',
                    offset: [0,-30],
                     textStyle:{
                       color:'#666',
                    },
                },
                emphasis: {
                    textStyle:{
                       color:'#fff',
                    },
                },
            },
            // symbol:'image://../imgs/point1.png',
            symbolSize:8,
            itemStyle: {
                    normal: {
                        // "color": "#01B3D7",
                        barBorderRadius: 0,
                        label: {
                            show:false,
                            position: "top",
                            formatter: function(p) {
                                return p.value > 0 ? (p.value) : '';
                            }
                        }
                    }
                },
            lineStyle: {
                    normal: {
                    color: '#01B3D7',
                    width: 1,

                    },
                },
        },
    ]
    }
    return result;
}




 