// var mySwiper = new Swiper('.swiper-container', {
   
//     loop: true, // 循环模式选项
//     speed: 2000,
   
//     autoplay: true,
//     effect: 'coverflow',
//     slidesPerView: 1,
//     centeredSlides: true,
//     coverflow: {
//         rotate: 30,
//         stretch: 10,
//         depth: 60,
//         modifier: 2,
//         slideShadows: true
//     }
// })
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

        }
  });

var visitorInLegend = ['天安门', '天坛', '王府井', '雍和宫','南锣鼓巷', '中山公园', '孔庙', '梁启超故居',  '地坛公园', '龙潭西湖公园'];
var visitorIn = [55883, 55807, 39095, 28455, 25965, 16116, 14784, 12592, 11383, 8135];

var VisitorInOption = {
    color: ['#3398DB'],
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },

    grid: {
        left: '3%',
        bottom: '3%',
        right: '0%',
        top: '15%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        data: visitorInLegend,
        
        axisTick: {
            alignWithLabel: true
        },
        axisLine: {
            lineStyle: {
                color: '#262e80'
            }
        },
        axisLabel: {
            rotate: "20",
            textStyle: {
                fontSize: '10',
                color: '#92b5bf', //坐标值得具体的颜色
            }
        },
        // splitLine:{show: false},//去除网格线
    }],

    yAxis: [{
        type: 'value',
        axisLabel: {
          
            textStyle: {
                color: '#92b5bf', //坐标值得具体的颜色

            }
        },
        axisLine: {
            show: false
        },
        splitNumber: 4,
        splitLine: {
            show: true,
            lineStyle: {
                color: '#262e80'
            }
        },
        axisLine: {
            show: false,
            lineStyle: {
                display: 'none',
                type: 'solid',
                width: '1'
            }
        },
    }],
    series: [{
        name: '停车台次',
        type: 'bar',
        barWidth: '30%',
        itemStyle: {
            normal: {
                //每个柱子的颜色即为colorList数组里的每一项,如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color:'#267ea4' ,
            
                barBorderRadius: 2 //柱状角成椭圆形
            },

        },

        data: visitorIn
    }]
};
var chartVisitorIn = echarts.init(document.getElementById('videoRank'));
chartVisitorIn.setOption(VisitorInOption);



var dary = [];
var d = new Date();
for (var i = 6; i > 0; i--) {

    var dd = new Date(d.getTime() - i * 24 * 60 * 60 * 1000);
    dary.push((dd.getMonth() + 1) + '.' + dd.getDate())
}


var VisitorInOptionT = {
    color: ['#3398DB'],
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: "● 日期：{b}<br/>  实时人数：{c} (人)"
    },

    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '5%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        data: dary,
        boundaryGap: false,
        // data: ['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
        axisTick: {
            alignWithLabel: true
        },

        axisLine: {
            lineStyle: {
                color: '#262e80'
            }
        },
        axisLabel: {
            textStyle: {
                width: '25px',
                'font-size': '12px',
                color: '#c5c8e6'

            }
        }
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
            textStyle: {
                color: '#fff', //坐标值得具体的颜色

            }
        },
        splitNumber: 4,
        splitLine: {
            show: true,
            lineStyle: {
                color: '#262e80'
            }
        },
        axisLine: {
            show: false
        }
    }],
    series: [{
        name: '人员实时访问量',
        type: 'line',

        lineStyle: {
            color: "#ca9e2f"
        },
        smooth: true,
        areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#464c30'
            }, {
                offset: 1,
                color: 'rgba(70, 76, 51,0)'
            }])
        },

        data: [1250, 850, 900, 1160, 980, 1050, 1100]
    }]
};
var chartVisitorInT = echarts.init(document.getElementById('chartPeople'));
chartVisitorInT.setOption(VisitorInOptionT);

var carPeopleOption = {
    color: ['#3398DB'],
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: "● 日期：{b}<br/>  实时车流：{c} (辆)"
    },

    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '5%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        data: dary,
        boundaryGap: false,
        // data: ['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
        axisTick: {
            alignWithLabel: true
        },

        axisLine: {
            lineStyle: {
                color: '#262e80'
            }
        },
        axisLabel: {
            textStyle: {
                width: '25px',
                'font-size': '12px',
                color: '#c5c8e6'

            }
        }
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
            textStyle: {
                color: '#fff', //坐标值得具体的颜色

            }
        },
        splitNumber: 4,
        splitLine: {
            show: true,
            lineStyle: {
                color: '#262e80'
            }
        },
        axisLine: {
            show: false
        }
    }],
    series: [{
        name: '人员实时访问量',
        type: 'line',

        lineStyle: {
            color: "#ca9e2f"
        },
        smooth: true,
        areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#464c30'
            }, {
                offset: 1,
                color: 'rgba(70, 76, 51,0)'
            }])
        },

        data: [1150, 1050, 1054, 950, 1024, 1100, 1250]
    }]
};
var carPeople = echarts.init(document.getElementById('carPeople'));
carPeople.setOption(carPeopleOption);



$(function(){
 $('.block').append('<div class="borderTL"></div><div class="borderTR"></div><div class="borderBL"></div><div class="borderBR"></div>');
})