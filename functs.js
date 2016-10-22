/**
 *
 * @author Michal Bystricky
 * @version 0.1
 *
 */
var render = function (t, o, done) {
        var file = new XMLHttpRequest(),
            path = "view/"+t+".html";
        file.open("GET", path+"?r="+((new Date()).getTime()), true);
        file.onreadystatechange = function () {
            if(file.readyState === 4 && (file.status === 200 || file.status == 0)) {
                done(tmpl(file.responseText, o));
            }
        };
        file.send(null);
    },

    get = function (path, done) {
        var file = new XMLHttpRequest();
        file.open("GET", path+"?r="+((new Date()).getTime()), true);
        file.onreadystatechange = function () {
            if(file.readyState === 4 && (file.status === 200 || file.status == 0)) {
                done(file.responseText);
            }
        };
        file.send(null);
    },

    post = function (path, data, done) {
        var file = new XMLHttpRequest();
        file.open("POST", path, true);
        file.onreadystatechange = function () {
            if(file.readyState === 4 && (file.status === 200 || file.status == 0)) {
                done(file.responseText);
            }
        };
        var str = "";
        for (var key in data) {
            if (str != "") {
                str += "&";
            }
            str += key + "=" + encodeURIComponent(data[key]);
        }
        file.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        file.send(str);
    },

    Promise = function (fn, seq) {
        this.fn = fn;
        this.state = null;

        this.thenFn = null;
        var _this = this;
        this.then = function (fn) {
            this.thenFn = fn;
        };

        if (!seq) {
            setTimeout(function () {
                _this.fn(function (result) {
                    // finished
                    _this.state = "done";
                    if (_this.thenFn)
                        _this.thenFn(result);
                });
            }, 0);
        }
    },

    _depsCache = {},
    require = function (deps, cb) {

        var reqs = [],
            load = function (key, dep) {
                return new Promise(function (resolve) {
                    if (key in _depsCache) {
                        resolve(window[key]);
                    } else {
                        get(dep, function (text) {
                            _depsCache[key] = eval(text);
                            window[key] = _depsCache[key];
                            resolve(_depsCache[key]);
                        });
                    }
                }, true); // sequential
            };

        for (var key in deps) {
            reqs.push(load(key, deps[key]))
        }

        Promise.waterfall(reqs, function () {
            cb();
        });
    },

    attr = function (key) {

        var url         = window.location.href.split("#")[1];

        if (url && url.length >= 3) {
            var ctrlString  = url.split('/')[1],
                actionString  = url.split('/')[2],
                urlSplitted = url.split('/');


            for (var i = 3; i<urlSplitted.length; i+=2) {
                if (urlSplitted[i] === key) {
                    return urlSplitted[i+1];
                }
            }
        } else {
            return false;
        }
    },

    route = function () {

        var url         = window.location.href.split("#")[1];

        if (url && url.length >= 3) {
            var ctrlString  = url.split('/')[1],
                actionString  = url.split('/')[2];

        } else {

            // default
            var ctrlString  = "public",
                actionString  = "index";
        }

        require({
            ctrlString: 	"controller/"+ctrlString+".js"
        }, function () {

            var ctrl        = new window[ctrlString](),
                func        = ctrl[actionString];

            if (func) {
                func();
            }
        });

    },

    back = function () {
        history.back();
        route();
        return false;
    },

    tags = function (tags) {
        for (var name in tags) {
            switch (name) {
                case "title":
                    document.title = tags[name];
                    break;
                default:
                    var metaTag = document.getElementsByTagName('meta');
                    for (var i=0; i < metaTag.length; i++) {
                        if (metaTag[i].getAttribute("name") === name) {
                            metaTag[i].content = tags[name];
                        }
                    }
                    break;
            }
        }
    },

    stripHTML = function (html) {
        return html.replace(/<(?:.|\n)*?>/gm, '');
    },

    visibilityToggle = function (id) {
        if (document.getElementById(id).style.display === "block") {
            document.getElementById(id).style.display = "none";
        } else {
            document.getElementById(id).style.display = "block";
        }
    };

Promise.all = function (promises, cb) {
    // TODO
    // just wait for state to be "done" in all promises
};

Promise.waterfall = function (promises, cb) {
    var fn_i = 0,
        results = [],
        run = function () {
            promises[fn_i].fn(function (result) {
                results.push(result);
                if (fn_i === promises.length-1) {
                    cb(results);
                } else {
                    fn_i++;
                    run();
                }
            });
        };
    run();
};


/**
 * JavaScript Templates
 * https://github.com/blueimp/JavaScript-Templates
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 * Inspired by John Resig's JavaScript Micro-Templating:
 * http://ejohn.org/blog/javascript-micro-templating/
 */
var tmpl = function (str, data) {
        var f = !/[^\w\-\.:]/.test(str)
            ? tmpl.cache[str] = tmpl.cache[str] || tmpl(tmpl.load(str))
            : new Function(// eslint-disable-line no-new-func
            tmpl.arg + ',tmpl',
            'var _e=tmpl.encode' + tmpl.helper + ",_s='" +
            str.replace(tmpl.regexp, tmpl.func) + "';return _s;"
        );
        return data ? f(data, tmpl) : function (data) {
            return f(data, tmpl)
        };
    };
tmpl.cache = {};
tmpl.load = function (id) {
    return document.getElementById(id).innerHTML
};
tmpl.regexp = /([\s'\\])(?!(?:[^{]|\{(?!%))*%\})|(?:\{%(=|#)([\s\S]+?)%\})|(\{%)|(%\})/g;
tmpl.func = function (s, p1, p2, p3, p4, p5) {
    if (p1) { // whitespace, quote and backspace in HTML context
        return {
                '\n': '\\n',
                '\r': '\\r',
                '\t': '\\t',
                ' ': ' '
            }[p1] || '\\' + p1;
    }
    if (p2) { // interpolation: {%=prop%}, or unescaped: {%#prop%}
        if (p2 === '=') {
            return "'+_e(" + p3 + ")+'"
        }
        return "'+(" + p3 + "==null?'':" + p3 + ")+'"
    }
    if (p4) { // evaluation start tag: {%
        return "';"
    }
    if (p5) { // evaluation end tag: %}
        return "_s+='"
    }
};
tmpl.encReg = /[<>&"'\x00]/g;
tmpl.encMap = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    "'": '&#39;'
};
tmpl.encode = function (s) {
    return (s == null ? '' : '' + s).replace(
        tmpl.encReg,
        function (c) {
            return tmpl.encMap[c] || ''
        }
    )
};
tmpl.arg = 'o';
tmpl.helper = ",print=function(s,e){_s+=e?(s==null?'':s):_e(s);}" +
    ',include=function(s,d){_s+=tmpl(s,d);}';
