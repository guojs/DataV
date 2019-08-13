// var mySwiper = new Swiper('.swiper-container', {
//     loop: true, // 循环模式选项
//      speed: 2000,
//      loopAdditionalSlides:0,
//      autoplay: {  delay: 5000},

// })


Highcharts.setOptions({
    global: {
            useUTC: false
    }
});
function activeLastPointToolip(chart) {
    var points = chart.series[0].points;
    chart.tooltip.refresh(points[points.length -1]);
}
var chart = Highcharts.chart('mapContainer', {
    chart: {
            type: 'spline',
            marginRight: 10,
            exporting:false,
                backgroundColor: '#092635',
                 
            
            events: {
                    load: function () {
                            var series = this.series[0],
                                    chart = this;
                            activeLastPointToolip(chart);
                            setInterval(function () {
                                    var x = (new Date()).getTime(), // 当前时间
                                            y = parseInt( Math.random()*100+100);          // 随机值
                                    series.addPoint([x, y], true, true);
                                    activeLastPointToolip(chart);
                            }, 1000);
                    }
            }
    },
    title: {
            text: ''
    },
    xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
    },
    yAxis: {
            title: {
                    text: null
            }
    },
    tooltip: {
            formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                            Highcharts.numberFormat(this.y, 2);
            }
    },
    legend: {
            enabled: false
    },
    series: [{
            name: '随机数据',
            data: (function () {
                    // 生成随机值
                    var data = [],
                            time = (new Date()).getTime(),
                            i;
                    for (i = -19; i <= 0; i += 1) {
                            data.push({
                                    x: time + i * 1000,
                                    y: parseInt( Math.random()*100+100)
                            });
                    }
                    return data;
            }())
    }]
});

$("#swiper-wrapper").slidesjs({
    width: 620,
    height: 1030,
    play: {
        active: true,
        // [boolean] 生成的播放和停止按钮.
        //不能使用自己的按键。
        effect: "slide",
        // [string] 可以是 "slide" 或者 "fade".
        interval: 15000,
        // [number] 每张幻灯片上花费的时间以毫秒为单位。
        auto: true,
        // [boolean] 加载开始播放幻灯片。
        swap: false,
        // [boolean] 显示/隐藏停止和播放按钮
        pauseOnHover: true,
        // [boolean] 鼠标经过暂停正在播放的幻灯片。
        restartDelay: 2500
        // [number] 重新启动延迟无效幻灯片。
    },
    effect: {
        slide: {
            speed: 1500
        }

    },


});

var incomOption = {
    color: ['#003366', '#006699', '#4cabce', '#e5323e'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        right: '5%',
        top: '5%',
        textStyle: {
            color: '#92b5bf', //坐标值得具体的颜色

        },
        data: ['2018年1-11月', '2018年1-12月']
    },

    grid: {
        left: '3%',
        bottom: '3%',
        right: '0%',
        top: '15%',
        containLabel: true
    },
    calculable: true,
    xAxis: [{
        type: 'category',
        axisTick: {
            show: false
        },
        data: ['路边停车类', '小区类', '停车场类'],
        axisLabel: {
            textStyle: {
                color: '#92b5bf', //坐标值得具体的颜色

            }
        },
        axisLine: {
            lineStyle: {
                color: '#0b3e73'
            }
        },
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
            textStyle: {
                color: '#2182a2', //坐标值得具体的颜色   
                fontWeight: 'bold'
            }
        },
        axisLine: {
            show: false
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: '#0b3e73'
            }
        },
    }],
    series: [{
            name: '2018年1-11月',
            type: 'bar',
            barGap: 0,
            barWidth: '15%',
            color: '#267ea4',
            data: [1268550, 12787, 197639]
        },
        {
            name: '2018年1-12月',
            type: 'bar',
            barWidth: '15%',
            color: '#cea12f',
            data: [1379846.1, 14247, 224275]
        }

    ]
};

var chartIncome = echarts.init(document.getElementById('incomSta'));
chartIncome.setOption(incomOption);


//性别组成

//性别组成
var sexValue = [{
        value: 1572,
        name: '男',
        itemStyle: {
            color: '#257ca1'
        }
    },
    {
        value: 1048,
        name: '女',
        itemStyle: {
            color: '#c89d2e'
        }
    },
];
var videoProductOption = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    title: {
        text: '路边停车',
        x: '30',
        y: '-5',
        textStyle: { //设置主标题风格
            color: '#cde8f0', //设置主标题字体颜色
            fontSize: '14',
            fontWeight:'normal'
           
        },
    },

    series: [{
        name: '',
        type: 'pie',
        radius: ['45%', '75%'],
        avoidLabelOverlap: false,
        label: {
            normal: {
                show: false,
                position: 'center'
            },
            emphasis: {
                show: true,
                textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            }
        },
        labelLine: {
            normal: {
                show: false
            }
        },
        data: sexValue
    }]
};
var videoProduct = echarts.init(document.getElementById('videoProduct'));
videoProduct.setOption(videoProductOption);


var videoTecOption = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    title: {
        text: '小区停车',
        x: '30',
        y: '-5',
        textStyle: { //设置主标题风格
            color: '#cde8f0', //设置主标题字体颜色
            fontSize: '14',
            fontWeight:'normal'
        },
    },

    series: [{
        name: '',
        type: 'pie',
        radius: ['45%', '75%'],
        avoidLabelOverlap: false,
        label: {
            normal: {
                show: false,
                position: 'center'
            },
            emphasis: {
                show: true,
                textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            }
        },
        labelLine: {
            normal: {
                show: false
            }
        },
        data: [{
                value: 648,
                name: '男',
                itemStyle: {
                    color: '#257ca1'
                }
            },
            {
                value: 162,
                name: '女',
                itemStyle: {
                    color: '#c89d2e'
                }
            },
        ]
    }]
};
var videoTec = echarts.init(document.getElementById('videoTec'));
videoTec.setOption(videoTecOption);


var videoServiceOption = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    title: {
        text: '停车场停车',
        x: '30',
        y: '-5',
        textStyle: { //设置主标题风格
            color: '#cde8f0', //设置主标题字体颜色
            fontSize: '14',
            fontWeight:'normal'
        },
    },

    series: [{
        name: '',
        type: 'pie',
        radius: ['45%', '75%'],
        avoidLabelOverlap: false,
        label: {
            normal: {
                show: false,
                position: 'center'
            },
            emphasis: {
                show: true,
                textStyle: {
                    fontSize: '30',
                    // fontWeight: 'bold'
                }
            }
        },
        labelLine: {
            normal: {
                show: false
            }
        },
        data: [{
                value: 135,
                name: '男',
                itemStyle: {
                    color: '#257ca1'
                }
            },
            {
                value: 135,
                name: '女',
                itemStyle: {
                    color: '#c89d2e'
                }
            },
        ]
    }]
};
var videoService = echarts.init(document.getElementById('videoService'));
videoService.setOption(videoServiceOption);



var peopleStaOption = {
    color: ['#003366', '#006699', '#4cabce', '#e5323e'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        right: '2%',
        top: '2%',
        textStyle: {
            color: '#92b5bf', //坐标值得具体的颜色

        },
        data: ['新能源', '燃油']
    },

    grid: {
        left: '3%',
        bottom: '3%',
        right: '0%',
        top: '15%',
        containLabel: true
    },
    calculable: true,
    xAxis: [{
        type: 'category',
        axisTick: {
            show: false
        },
        data: ['路边停车', '小区停车', '停车场停车'],
        axisLabel: {
            textStyle: {
                color: '#92b5bf', //坐标值得具体的颜色

            }
        },
        axisLine: {
            lineStyle: {
                color: '#0b3e73'
            }
        },
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
            textStyle: {
                color: '#2182a2', //坐标值得具体的颜色   
                fontWeight: 'bold'
            }
        },
        axisLine: {
            show: false
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: '#0b3e73'
            }
        },
    }],
    series: [{
            name: '2018年',
            type: 'bar',
            barGap: 0,
            barWidth: '15%',
            color: '#267ea4',
            data: [6522, 868, 1397]
        },
        {
            name: '2017年',
            type: 'bar',
            barWidth: '15%',
            color: '#cea12f',
            data: [6224, 870, 1427]
        }

    ]
};

var peopleSta = echarts.init(document.getElementById('peopleSta'));
peopleSta.setOption(peopleStaOption);



var compStaChartOption = {
    color: ['#003366', '#006699', '#4cabce'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        right: '2%',
        top: '2%',
        textStyle: {
            color: '#92b5bf', //坐标值得具体的颜色

        },
        data: ['2018年', '2017年']
    },

    grid: {
        left: '3%',
        bottom: '3%',
        right: '0%',
        top: '15%',
        containLabel: true
    },
    calculable: true,
    xAxis: [{
        type: 'category',
        axisTick: {
            show: false
        },
        data: ['全天开放', '日间开放', '夜间开放'],
        axisLabel: {
            textStyle: {
                color: '#92b5bf', //坐标值得具体的颜色

            }
        },
        axisLine: {
            lineStyle: {
                color: '#0b3e73'
            }
        },
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
            textStyle: {
                color: '#2182a2', //坐标值得具体的颜色   
                fontWeight: 'bold'
            }
        },
        axisLine: {
            show: false
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: '#0b3e73'
            }
        },
    }],
    series: [{
            name: '规模以上企业数',
            type: 'bar',
            barGap: 0,
            barWidth: '10%',
            color: '#cea12f',
            data: [18, 4, 8]
        },
        {
            name: '中小微企业数',
            type: 'bar',
            barWidth: '10%',
            color: '#267ea4',
            data: [299, 179, 571]
        },
        {
            name: '新增企业',
            type: 'bar',
            barWidth: '10%',
            color: '#252fbb',
            data: [109, 34, 35]
        }

    ]
};

var compStaChart = echarts.init(document.getElementById('compStaChart'));
compStaChart.setOption(compStaChartOption);




var companySta = [{
        value: 1200,
        name: '地面停车场',
        
    },
    {
        value: 3100,
        name: '地下停车场',
       
    },
    {
        value: 1900,
        name: '立体停车场',
       
    }
   
];
var newCompChartOption = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        right: '2%',
        bottom: '-2%',
        textStyle: {
            color: '#92b5bf', //坐标值得具体的颜色
        },
        data: ['地面停车场', '地停车场' ,'立体停车场']
    },
    series: [{
        name: '',
        type: 'pie',
        radius: ['45%', '75%'],
        avoidLabelOverlap: false,
        label: {
            normal: {
                show: false,
                position: 'center'
            },
            emphasis: {
                show: true,
                textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            }
        },
        labelLine: {
            normal: {
                show: false
            }
        },
        data: companySta
    }]
};

var newCompChart = echarts.init(document.getElementById('newCompChart'));
newCompChart.setOption(newCompChartOption);

$(function(){
    $('.block').append('<div class="borderTL"></div><div class="borderTR"></div><div class="borderBL"></div><div class="borderBR"></div>');
   })