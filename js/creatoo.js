var appShareTitle = '';
var appShareDesc = '';
var appShareImgUrl = '';

//APP获取分享信息
function getShareInfo() {
    var shareJson = {
        title: appShareTitle,
        desc: appShareDesc,
        imgUrl: appShareImgUrl,
        link: window.location.href
    };
    return JSON.stringify(shareJson);
}

function is_weixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

(function (name, context, definition) {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = definition();
    }
    else if (typeof define === 'function' && define.amd) {
        define(definition);
    }
    else {
        context[name] = definition();
    }
})('creatoo', this, function () {
    'use strict';
    var me = {};
    me.bid = '';
    me.version = '1.0.0';
    me.proxyUrl = '/proxy';
    me.loginUrl = '{$login}';
    me.go = function (url) {
        if (!url) return window.location.href = window.location.href;
        url = trim(url);
        if (/^http[s]*:\/\/.*?$/i.test(url)) return window.location.href = url;
        var pat = new RegExp('^/' + creatoo.sp + '/web(/.*?)$', 'i');
        var m = pat.exec(url);
        if (!m || m.length < 2) {
            window.location.href = creatoo.domain + url;
        } else {
            window.location.href = creatoo.domain + m[1];
        }
    }
    me.goLogin = function (url) {
        url = url || window.location.href;
        go('/login.html?f=' + url);
    }


    me.picCenter = function (jq, el_imgs, opts) {
        // var b = {
        //     "boxWidth": 0,
        //     "boxHeight": 0,
        //     "path": "src"
        // };
        var d = opts;
        el_imgs.each(function (index, el) {
            if (d.boxWidth && d.boxHeight) {
                var g = jq(el);
                var f = d.boxWidth / d.boxHeight;
                var e = new Image();
                e.onload = function () {
                    var i = e.width;
                    var h = e.height;
                    if (i / h >= f) {
                        var l = (d.boxHeight * i) / h;
                        var k = (l - d.boxWidth) / 2 * (-1);
                        g.css({
                            "width": "auto",
                            "height": "100%",
                            "position": "absolute",
                            "top": "0",
                            "left": k
                        });
                    } else {
                        var j = (d.boxWidth * h) / i;
                        var m = (j - d.boxHeight) / 2 * (-1);
                        g.css({
                            "width": "100%",
                            "height": "auto",
                            "position": "absolute",
                            "top": m,
                            "left": "0"
                        });
                    }
                };
                e.src = g.attr(d.path);
            }
        })
    }

    function getIndexImgUrl(imgUrl, size) {
        var pos = imgUrl.lastIndexOf(".");
        var imgUrlIndex = imgUrl.substr(0, pos) + size + imgUrl.substr(pos);
        return imgUrlIndex;
    }

    me.imgMin = function (src, size) {
        var _size = size ? size : '_750_500'
        var _ailiSize = _size.split('_');
        if (!src) return ''
        if (src.indexOf('x-oss-process=') != -1) return src;
        return src.indexOf("http://culturecloud.img-cn-hangzhou.aliyuncs.com/") < 0 ? getIndexImgUrl(src, _size) : (src + "?x-oss-process=image/resize,w_" + _ailiSize[1]);
    }

    me.getBid = function () {
        return new Promise(function (resolve, reject) {
            if (me.bid) return resolve(me.bid);
            var config = util.ls.get('config');
            if (!config) {
                Fingerprint2.get(function (components) {
                    var values = components.map(function (component) {
                        return component.value
                    });
                    var murmur = Fingerprint2.x64hash128(values.join(''), 31);
                    me.bid = murmur;
                    var obj_config = {
                        bid: me.bid,
                        t: new Date().getTime()
                    }
                    obj_config = util.signObj(obj_config);
                    util.ls.set('config', obj_config);
                    resolve(me.bid);
                })
            } else {
                if (!util.checkSign(config)) {
                    util.ls.remove('config');
                    return reject(Math.pow(2, 10));
                }
                var ts = new Date().getTime() - util.toInt(config.t);
                ts = Math.abs(ts);

                if (ts > 24 * 60 * 60 * 1000) {
                    util.ls.remove('config');
                    console.log('config timeout');
                    return me.getBid().then(function (bid) {
                        resolve(bid)
                    });
                }
                me.bid = config.bid;
                return resolve(me.bid);
            }
        })

    }
    me.jsonp = function () {
        return new Promise(function (resolve, reject) {
            //console.log( me.loginUrl +url)
            $.ajax({
                type: "get",
                async: false,
                url: me.loginUrl + '/apiTerminalUser/checkLoginWithJwt.do?jwt=Y',
                dataType: "jsonp",
                jsonp: "callBackJsonp",
                success: function (data) {
                    resolve(data)
                },
                error: function (err) {
                    reject(err)
                }
            });
        })

    }
    me.proxy = function (url, data) {
        var post = function (bid) {
            return new Promise(function (resolve, reject) {
                data = data || {}
                data._url = url;
                data._time = new Date().getTime();
                data._bid = bid;
                data = {data: util.aesEncode(JSON.stringify(data))};

                //console.log('sssss',data)
                $.post(me.proxyUrl, data, function (res) {
                    resolve(res);
                }, "json");
            })
        }
        console.time('bid')
        return me.getBid().then(function (bid) {
            console.timeEnd('bid')
            return post(bid);
        })
    }
    me.login = function (url) {
        url = url || window.location.href;
        window.location.href = me.loginUrl + '/muser/login.do?type=' + url;
    }
    var b = {
        "boxWidth": 0,
        "boxHeight": 0,
        "path": "src"
    };
    $.fn.extend({
        "picFullCentered": function (c) {
            var d = $.extend({}, b, c);
            this.each(function () {
                if (d.boxWidth && d.boxHeight) {
                    var g = $(this);
                    var f = d.boxWidth / d.boxHeight;
                    var e = new Image();
                    e.onload = function () {
                        var i = e.width;
                        var h = e.height;
                        if (i / h >= f) {
                            var l = (d.boxHeight * i) / h;
                            var k = (l - d.boxWidth) / 2 * (-1);
                            g.css({
                                "width": "auto",
                                "height": "100%",
                                "position": "absolute",
                                "top": "0",
                                "left": k
                            });
                        } else {
                            var j = (d.boxWidth * h) / i;
                            var m = (j - d.boxHeight) / 2 * (-1);
                            g.css({
                                "width": "100%",
                                "height": "auto",
                                "position": "absolute",
                                "top": m,
                                "left": "0"
                            });
                        }
                    };
                    e.src = g.attr(d.path);
                }
            });
            return this;
        }
    });

    me.dialog = function (title, content) {
        //弹出框（自动消失）
        $(".ui-popup").remove();	//强制清除弹窗，防止多弹窗不关闭
        if (top.dialog) {
            dialog = top.dialog;
        }
        var d = dialog({
            width: 500,
            title: title,
            content: content,
            fixed: true
        });
        d.show();

        setTimeout(function () {
            d.removeSlow();
        }, 1500);
    }




    //公共分享方法
    me.share = function (title, desc, imgSrc) {
        appShareTitle = title;
        appShareDesc = desc;
        appShareImgUrl = imgSrc || "http://culturecloud.img-cn-hangzhou.aliyuncs.com/H5/2018227174158On0E1yhvd0bcmrx2bulKYVz0T5lyNb.png"
        var shareConfig = JSON.parse(decodeURI('{$shareConfig}'));

        if (is_weixin()) {
            wx.config({
                debug: false,
                appId: shareConfig.appId,
                timestamp: shareConfig.timestamp,
                nonceStr: shareConfig.nonceStr,
                signature: shareConfig.signature,
                jsApiList: ['previewImage', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
            });
            wx.ready(function () {
                wx.onMenuShareAppMessage({
                    title: appShareTitle,
                    desc: appShareDesc,
                    imgUrl: appShareImgUrl,
                    success: function () {

                    }
                });
                wx.onMenuShareTimeline({
                    title: appShareTitle,
                    imgUrl: appShareImgUrl,
                    success: function () {

                    }
                });
                wx.onMenuShareQQ({
                    title: appShareTitle,
                    desc: appShareDesc,
                    imgUrl: appShareImgUrl,
                    success: function () {

                    }
                });
                wx.onMenuShareWeibo({
                    title: appShareTitle,
                    desc: appShareDesc,
                    imgUrl: appShareImgUrl,
                    success: function () {

                    }
                });
                wx.onMenuShareQZone({
                    title: appShareTitle,
                    desc: appShareDesc,
                    imgUrl: appShareImgUrl,
                    success: function () {

                    }
                });
            });

        } else {
            //分享是否隐藏
            if (window.injs) {
                injs.setAppShareButtonStatus(true);
            }
        }

    }

    return me;
});


