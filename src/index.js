/**
 * Front-end error log report
 * version: 0.0.1
 * author: tianxin
 * date: 2017-05-23 16:30
 */

(function () {
    window.onerror = sendLog

    var url = ''

    function sendLog(error, file, row, col, msg) {
        if (typeof msg === 'object') msg = msg.stack

        var log = {
            t: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            url: location.href,
            msg: msg,
            ua: navigator.userAgent
        }
        console.log(log)

        var img = new Image()
        img.src = url + '?' + parseParams(log)
    }

    function parseParams(params) {
        var ret = ''
        for (var key in params) {
            ret += '&' + key + '=' + encodeURIComponent(params[key])
        }
        ret = ret.substr(1)
        return ret
    }

    function format(date, fmt) {
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds()
        }
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k])
                    .length)))
        return fmt
    }

    (function (xhrproto) {
        var postData
        var open = xhrproto.open
        XMLHttpRequest.prototype.open = function (method, url, async, user, pass) {
            this.addEventListener("readystatechange", function () {
                if (this.readyState == 2 && this.status >= 400) {
                    var msg = [method.toUpperCase(), this.responseURL, JSON.stringify(postData), this.status, this.statusText].join(' ')
                    sendLog(null, null, null, null, msg)
                }
            }, false)
            this.addEventListener('error', function(e){
                console.log(e)
            })

            open.call(this, method, url, async, user, pass)
        }

        var send = xhrproto.send
        XMLHttpRequest.prototype.send = function (data) {
            postData = data
            send.call(this, data)
        }

        var originFetch = fetch
        fetch = function () {
            var args = [].slice.call(arguments)
            return originFetch.apply(this, args).then(function (res) {
                if (res.status >= 400) {
                    var data = args[1] ? args[1].body : null
                    var method = args[1] ? args[1].method : 'GET'
                    var msg = [method.toUpperCase(), res.url, JSON.stringify(data), res.status, res.statusText].join(' ')
                    sendLog(null, null, null, null, msg)
                }
                return res
            })
        }

    })(XMLHttpRequest.prototype)
})()