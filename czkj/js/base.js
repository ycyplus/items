// ps:目录 {
// 1、class类的封装
// 2、client().width/height的封装
// 3、scrollTop/Left的封装
// 4、getStyle获取样式的封装
// 5、Math.random四位随机数的封装
// 6、随机颜色的封装
// 7、tab栏(闭包节流)的封装
// 8、stopPropagation阻止冒泡的封装
// 9、addEventHandler事件监听的绑定以及移除的封装
// 10、封装id函数
// 11、cookie的设置、获取、删除以及模拟检测封装
// 12、正则表达式的封装
// 13、有效检测字符串长度(包含汉字以及复杂汉字4字节的)
// 14、淡入效果封装
// 15、淡出效果封装
// 16、淡入淡出效果同时封装
// 17、购物车效果(抛物线运动)的封装
// 18、针对IE6-8之间对forEach的兼容性
// 19、针对IE6-8之间对数组方法.map的兼容性写法
// 20、阻止浏览器默认行为的兼容写法封装
// 21、加速运动封装
// 22、缓动运动框架 IE678有点问题
// 23、匀速运动封装
// 24、设置和获取标签中间的文本内容(纯文本)
// 25、获取任意一个父元素的第一个子元素和最后一个子元素 
// 26、封装requestAnimationFream (兼容ie6-9) 效果类似于setTimeOut 优于它
// 27、倒计时的封装 
// 参数示例："2019/2/15 00:00:00"
// 参数二 回调函数，使用的时候遍历赋值就可以
// 28、显示和隐藏
// 29、防止拖动选中的内容
// 30、事件中禁止选中文本
// 31、ajax的封装  (回调用Promise处理)





// 1、获取带有id属性的class节点的封装
function getClassNmae(classname, id) {	//浏览器支持
    if (document.getElementsByClassName) {	//有id的情况下
        if (id) {
            var xxid = document.getElementById(id);
            return xxid.getElementsByClassName(classname);
        }
        else //没有id的情况下
        {
            return document.getElementsByClassName(classname);
        }
    }
    //浏览器不支持
    if (id) {
        var xxid = document.getElementById(id);
        var dom = xxid.getElementsByTagName("*");
    }
    else {
        var dom = document.getElementsByTagName("*");
    }
    var arr = [];
    for (var i = 0; i < dom.length; i++) {
        var txtarr = dom[i].className.split(" ");
        for (var j = 0; j < txtarr.length; j++) {
            if (txtarr[j] == classname) {
                arr.push(dom[i]);
            }
        }

    }
    return arr;
}

// 2、clien().width/height函数的封装,浏览器可视区域
// client的封装 使用client伴随着改变窗口大小事件window.onresise=function(){};
function client() {
    if (window.innerWidth != null)  // ie9 +  最新浏览器
    {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }
    else if (document.compatMode === "CSS1Compat")  // 标准浏览器
    {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }
    return {   // 怪异浏览器
        width: document.body.clientWidth,
        height: document.body.clientHeight
    }
}

// 3、scroll().top,left函数的封装,页面卷动(被卷去的区域)
// scroll的封装，使用伴随着window.onscroll=function(){}页面卷动事件
function scroll() {
    if (window.pageYOffset != null)  //  ie9+ 和其他浏览器
    {
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    }
    else if (document.compatMode == "CSS1Compat")  // 声明的了 DTD
    // 检测是不是怪异模式的浏览器 -- 就是没有 声明<!DOCTYPE html>
    {
        return {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        }
    }
    return { //  剩下的肯定是怪异模式的
        left: document.body.scrollLeft,
        top: document.body.scrollTop
    }
}

// 4、获取css样式的属性及属性值函数
function getStyle(obj, attr) {  //  谁的    哪个属性
    if (obj.currentStyle)  // ie 等
    {
        return obj.currentStyle[attr];
    }
    else {
        return window.getComputedStyle(obj, null)[attr];  // w3c 浏览器
    }
}

// 5、四位验证码随机数封装
// id是哪个id下面，tagName是标签 意思哪个id下面的哪几个标签，四位随机数需要4个span,因为牵扯到颜色各不同；
// 如果要四个颜色一致 每次点击切换不同那样效果 可以放一个span来拼接实现;
function suijiNum(id, tagName) {
    var arr = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var inner = '';
    var id = document.getElementById(id);
    var target = id.getElementsByTagName(tagName);
    //要产生几个随机数，就循环几次
    for (var i = 0; i < 4; i++) {
        // 产生了的四个随机数
        var num = parseInt(Math.random() * arr.length);
        target[i].innerHTML = arr[num];
        target[i].style.color = suijiColor();
        inner += arr[num];
    }
    return inner;
}

// 6、配合四位随机数，四个数字随机颜色的函数封装
function suijiColor() {
    var r = parseInt(Math.random() * 256);
    var g = parseInt(Math.random() * 256);
    var b = parseInt(Math.random() * 256);
    var rgb = "rgb(" + r + "," + g + "," + b + ")";
    return rgb;
}

// 7、tab切换的封装,可以多个同时实现(闭包节流的方法)
function tab(id, tagName1, tagName2) {
    var id = document.getElementById(id);
    var target = id.getElementsByTagName(tagName1);
    var target2 = id.getElementsByTagName(tagName2);
    for (var i = 0; i < target.length; i++) {
        var timer = null;
        //  spans[i].index = i;  这个在下面的函数里面用num来实现
        target[i].onmouseover = function (num) {
            return function () {
                clearTimeout(timer);  // 使用定时器之前先清除之前的定时器
                timer = setTimeout(function () {
                    for (var j = 0; j < target.length; j++) {
                        target[j].className = "";
                        target2[j].className = "";
                    }
                    // 在使用这个函数的时候，切记给小盒子的颜色类名为current
                    // 具体样式根据需求再改 
                    target[num].className = "current";
                    // 大盒子内容切记是display:block; 让显示
                    target2[num].className = "show";
                }, 300)
            }
        }(i);
        target[i].onmouseout = function () {
            clearTimeout(timer);
        }
    }
}

// 8、阻止冒泡的兼容性写法封装
// 为什么阻止冒泡？因为如果有多层嵌套，子与祖元素都有同一个事件，点击子元素就会往上冒泡执行，所以需要阻止冒泡；
// 谁需要阻止冒泡 就在当前的事件函数里面阻止就好
function stopPropagation() {
    var event = event || window.event;   //event  --- 事件兼容
    if (event && event.stopPropagation) {
        event.stopPropagation();     //标准浏览器
    }
    else {
        event.cancelBubble = true;   //IE678
    }
}

// 9、事件监听的绑定和移除的封装
// 注意：三个形参分别是事件源.事件类型比如click、mouseouver等等，最后是事件处理函数;
// 注意 第二个参数 事件类型 是一个字符串类型(String) 需要带双引号"";
// 绑定监听事件
function addEventHandler(target, type, fn) {
    if (target.addEventListener) {
        target.addEventListener(type, fn);
    } else {
        target.attachEvent("on" + type, fn);
    }
}

// 移除监听事件的封装
//移除监听事件
function removeEventHandler(target, type, fn) {
    if (target.removeEventListener) {
        target.removeEventListener(type, fn);
    } else {
        target.detachEvent("on" + type, fn);
    }
}

// 10、封装的id函数
function my$(id) {
    return document.getElementById(id);
}

// 11、简易封装cookie的设置、获取、检测以及删除
// 
// 设置cookie的封装
// 第一个参数key 可以自己定义，设置时候是啥 获取就是啥 这个参数类型是字符串类型 带双引号""
// 第二个参数 是获取id为啥的那个表单的value值,第三个是天数
function setCookie(key, values, days) {
    // 先得到时间
    var d = new Date();
    // 设置一个存储有效时间
    d.setDate(d.getDate() + days);
    document.cookie = key + "=" + values + ";expires=" + d.toGMTString();
}

// 获取cookie的封装
function getCookie(key) {
    // 假设用户输入的值：因为输入的肯定是字符串类型
    var str = document.cookie;// name = "张三李四"; pass = "123";
    // 针对输入的字符串 进行分割成数组 split()
    var arr = str.split("; ");
    // 数组我们可以用for循环，但是for in 更直观简单
    for (var i in arr) {
        // 分割成数组遍历完以后，我们需要对需要找到的内容进行判断是否存在
        if (arr[i].indexOf(key + "=") != -1) {
            // 如果它存在 我们进行截取需要的部分
            return arr[i].substring((key + "=").length);
        }
        // else可以省略 这里就不写了
        // 如果不存在 那么返回不存在false 就可以
        return false;
    }
}

// 删除cookie的封装
// 删除cookie的思路 理论上说是无法删除，但是我们可以取巧使时间提前到过去达到删除的目的
// 直接调用设置cookie的函数，相当于什么都没输入为空字符串。时间为过去;
function removeCookie(key) {
    setCookie(key, "", -1);
}

// 检测cookie的封装 注意：这只是一个简单的测试仅供参考
// 相当于检测获取到的值是否存在 如果存在就欢迎一下？ 不存在让它该干啥干啥提示下
function testCookie(key) {
    if (arr.search(key) != -1) {
        var name = getCookie(key);
        alert("欢迎您回家" + name);
    }
    if (key != null) {
        alert("欢迎您回家");
    } else {
        prompt("先生您好，您是什么东西");
    }
}

// 12、正则的封装
// 注意：第一个参数 写当前的id名即可，不用再次获取
// 第二个参数：是当前表单的this.value
function regExp(Id, val) {  //第一个形参为id通过id找不同的元素,第二个是要操作元素的值
    switch (Id) {
        // 用户名
        case "username":
            var reg = /^[\D]/;
            // var reg = /^[\u4E00-\u9FA5]{2,}$/  // 输入必须是两位以上中文
            break;
        // 密码包含数字 字母大小写 标点符号 但是不能包含空格
        case "password":
            var reg = /^[\w][\S]{5,20}$/;
//                var reg = /^(\w){6,20}$/gi;
//                密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
//                  var reg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
            break;
        // 确认密码
        case "passwordTo":
            var reg = /^[\w][\S]{5,20}$/;
            break;

        // 邮箱
        case "email":
            var reg = /^\w+@\w+\.\w+$/;
            // 下面的方法更严谨 都可以用
//                var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            break;
        // 11位手机号码
        case "phone":
            var reg = /^(13[0-9]|15[012356789]|18[0-9]|17[6789]|14[57])[0-9]{8}$/;   // 注意：前面可以不写中括号
            break;
        // 身份证号码
        case "idCard":
//                var reg = /^[1-9][0-9]{16}\X?$/;
            var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
            break;
        //URL正则
        case "URL":
            var reg = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
            break;
        //IPV4 地址正则
        case"iP":
            var reg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            break;
        // 日期正则
        case"date":
//                var reg = /^\d{4}(\-)\d{1,2}\1\d{1,2}$/; // 简单判定
            //复杂判定
            var reg = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;
            break;
        // QQ号码正则 5位到11位
        case "QQ":
            var reg = /^[1-9][0-9]{4,10}$/;
            break;
        // 微信号正则，6至20位，以字母开头，字母，数字，减号，下划线
        case "weixin":
            var reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
            break;
        // 车牌号正则
        case "car":
            var reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
            break;
        // 6位手机验证码
        case "yzm":
            var reg = /^\d{6}$/;
            break;
        default:
    }
    return reg.test(val);
}

// 13、有效检测字符串长度以及汉字长度(包括ES6复杂字符)
function strLength(str) {
    var len = 0; // 存储长度
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if (c > 0 && c < 127) {
            len++;
        } else {
            len += 2;
        }
    }
    return len;
}

// 14、淡入效果封装
function fadeIn(obj, timeLong) {
    // 数据
    var opc = 0;
    var timer = setInterval(function () {
        // 步长
        opc += 0.2;

        //边界处理
        if (opc >= 1) {
            opc = 1;
            clearInterval(timer);
        }
        //外观
        obj.style.opacity = opc;
        //
    }, timeLong);
}

// 15、淡出效果封装
function fadeOut(obj, timeLong) {
    var opc = 1; // 假设默认透明度为1
    var timer = setInterval(function () {
        // 数据
        // 设定一个步数
        opc -= 0.2;
        // 边界处理
        if (opc <= 0) {
            opc = 0;
            clearInterval(timer);
        }
        // 外观
        obj.style.opacity = opc;
    }, timeLong);
}

// 16、淡入淡出效果同时封装
function fadeInOut(startObj, endObj, timeLong) {
    var opc = 0;  //这个值根据实际情况0-1调整
    var speed = 0.2;
    var timer = setInterval(function () {
        // 判断到底是该+ 还是该-
        opc > 1 ? opc -= speed : opc += speed;
        if (opc >= 1) {
            opc = 1;
            clearInterval(timer);
        } else if (opc <= 0) {
            opc = 0;
            clearInterval(timer);
        }
        // 外观
        startObj.style.opacity = opc;
        endObj.style.opacity = 1 - opc;
    }, timeLong);
}

// 17、购物车函数
// 参数分别是：起始值的left和top值,结束值的letf和top值，要动的那个元素，目标位置的那个元素;
// 注意，调用此购物车函数的时候，一定记得在之前申明一个全局的计数器 var count = 0;否则无法计数
function Cart(startX, startY, endX, endY, sportObj, endBox) {
    // 开始
    var startBoxLeft = startX;
    var startBoxTop = startY;
    // 终点
    var endBoxLeft = endX;
    var endBoxTop = endY;

    // 原点(0,0)
    var endOffsetLeft = endBoxLeft - startBoxLeft;
    var endOffsetTop = endBoxTop - startBoxTop;

    // p值  y^2 / (2x);  
    var p = endOffsetTop * endOffsetTop / (2 * endOffsetLeft);
    var left1 = 0; //初始值
    // var top1 = -1*Math.sqrt(2*p*left1);
    var top1 = 0;
    console.log(top1);
    sportObj.style.display = "block";
    var timer = setInterval(function () {

        left1 = left1 + 2;
        top1 = -1 * Math.sqrt(2 * p * left1);

        if (left1 >= endOffsetLeft) {
            clearInterval(timer);
            left1 = endOffsetLeft; // 如果超过或者不足 回到结束位置
            top1 = -1 * Math.sqrt(2 * p * left1);
            count++;
            sportObj.style.display = "none";
        }

        // 平移
        var left11 = left1 + startBoxLeft + 10;
        var top11 = top1 + startBoxTop + 10;

        // 外观
        sportObj.style.left = left11 + "px";
        sportObj.style.top = top11 + "px";
        endBox.innerHTML = count;
    }, 10);
}

// 18、针对IE6-8之间对forEach的兼容性写法

// forEach的IE6-8兼容性
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function forEach(callback, thisArg) {
        var T, k;
        if (this == null) {
            throw new TypeError("this is null or not defined");
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== "function") {
            throw new TypeError(callback + " is not a function");
        }
        if (arguments.length > 1) {
            T = thisArg;
        }
        k = 0;
        while (k < len) {
            var kValue;
            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}

// 19、针对IE6-8之间对数组方法.map的兼容性写法

//IE6-8兼容数组.map方法
if (!Array.prototype.map) {
    Array.prototype.map = function (callback, thisArg) {

        var T, A, k;

        if (this == null) {
            throw new TypeError(" this is null or not defined");
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== "function") {
            throw new TypeError(callback + " is not a function");
        }

        if (thisArg) {
            T = thisArg;
        }
        A = new Array(len);

        // 7. var k be 0
        k = 0;

        while (k < len) {

            var kValue, mappedValue;
            if (k in O) {
                kValue = O[k];
                mappedValue = callback.call(T, kValue, k, O);
                A[k] = mappedValue;
            }
            k++;
        }
        return A;
    };
}

// 20、阻止浏览器默认行为的兼容写法封装

function stopBrowserDefault(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}

//21、 加速运动封装

//  加速运动封装
function speedUpSports(obj, attr, target, step, stepInc, timeing, func) {
    // 1、数据
    var current = parseInt(getStyle(obj, attr));
    var step = (current < target) ? step : -step;
    var stepInc = (current < target) ? step + stepInc : step + (-stepInc);
    var timer = null;
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        step = step + stepInc;
        console.log(step);
        current = current + step;
        //2、 外观
        var result = target - current;
        console.log(result);
        if (Math.abs(result) >= Math.abs(step)) {
            obj.style[attr] = current + "px";
        } else {
            clearInterval(obj.timer);
            obj.style[attr] = target + "px";
            // 判断是否要执行回调 这个判断要等到之前动画都之前完以后 定时器清除以后
            if (func) {
                func && func();
            }
        }
    }, timeing);
}

// 22、缓动运动框架 (暂时兼容不了ie678)

//封装运动框架
//两个参数 谁的  哪些属性(json)
function animate(obj, json, timeing, func) {
    var timer = null;
    clearInterval(obj.timer);
    //先开启定时器
    obj.timer = setInterval(function () {
        //给一个开关 用来判断什么时候关闭定时器
        var flag = true;
        //先进行遍历多个属性
        for (attr in json) {  //attr是属性  json[attr]是目标值 相当于target
            //先得到当前样式
            var current = 0;
            if (attr == "opacity") {
                current = Math.round(parseInt(getStyle(obj, attr) * 100)) || 0;
            } else {
                current = parseInt(getStyle(obj, attr));
            }
            var step = (json[attr] - current) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);

            //特殊情况 opacity需要判断
            if (attr == "opacity") {  //如果属性是opacity
                if ("opacity" in obj.style) {  //那么opacity在obj.style是否支持
                    obj.style.opacity = (current + step) / 100;

                } else {

                    obj.style.filter = "alpha(opacity = " + (current + step) * 10 + ")";
                }

            }
            else if (attr == "zIndex") {
                obj.style.zIndex = json[attr];
            }
            else {
                obj.style[attr] = current + step + "px";
            }
            //进行判断
            if (current != json[attr]) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timer);
//                alert("定时器清除了");
            if (func) {
                func && func();
            }
        }
    }, timeing);
}

// 23、匀速运动封装
function uniformSprots(obj, attr, target, step, timeing, func) {
    var timer = null;
    var step = step;
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var current = parseInt(getStyle(obj, attr));
        var speed = current < target ? step : -step;
        var result = target - current;
        if (Math.abs(result) >= Math.abs(speed)) {
            obj.style[attr] = current + speed + "px";

        } else {
            clearInterval(obj.timer);
            obj.style[attr] = target + "px";
            if (func) {
                func && func();
            }
        }
    }, timeing)
}

// 24、设置和获取标签中间的文本内容(纯文本)
// 设置任意标签中间的文本内容
function setText(element, text) {
    if (typeof element.textContent == "undefined") {
        element.innerText = text;
    } else {
        element.textContent = text;
    }
}

// 获取任意标签中间的文本内容
function getText(element) {
    if (typeof element.textContent == "undefined") {
        return element.innerText;
    } else {
        return element.textContent;
    }
}

// 25、获取任意一个父元素的第一个子元素和最后一个子元素 
//获取任意一个父级元素的第一个子级元素
function getFirstElementChild(element) {
    if (element.firstElementChild) {//true--->支持
        return element.firstElementChild;
    } else {
        var node = element.firstChild;//第一个节点
        while (node && node.nodeType != 1) {
            node = node.nextSibling;
        }
        return node;
    }
}

//获取任意一个父级元素的最后一个子级元素
function getLastElementChild(element) {
    if (element.lastElementChild) {//true--->支持
        return element.lastElementChild;
    } else {
        var node = element.lastChild;//第一个节点
        while (node && node.nodeType != 1) {
            node = node.previousSibling;
        }
        return node;
    }
}

// 26、封装requestAnimationFream (兼容ie6-9) 效果类似于setTimeOut 优于它
(function () {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());

// 27、倒计时的封装 
// 参数示例："2019/2/15 00:00:00"
// 参数二 回调函数，使用的时候遍历赋值就可以
function countDown(endTime, fn) {
    var endTime = new Date(endTime); // 目标时间
    // 开启定时器
    setInterval(function () {
        // 获得最新的当前时间
        var nowTime = new Date(); // 当前时间
        var miao = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);
        // 然后用这个毫秒数 去求天 时 分 秒
        var d = parseInt(miao / 60 / 60 / 24); // 天数
        var h = parseInt(miao / 60 / 60 % 24); //小时数
        var m = parseInt(miao / 60 % 60); //分数
        var s = parseInt(miao % 60); //秒数
        // 三元运算符  0以字符串形式写再时间前面 不能是后面 
        d < 10 ? d = "0" + d : d;
        h < 10 ? h = "0" + h : h;
        m < 10 ? m = "0" + m : m;
        s < 10 ? s = "0" + s : s;

        // 假设有两种情况 要进行分别判断
        // 把得到的时候放入一个数组
        var arr = [d, h, m, s];
        // 用来把每一个时间暴露到外面，允许外面得到这些时间
        fn && fn(arr); //在需要得到里面值的时候调用这个函数
        //外观
    }, 1000);
}

// 28、显示和隐藏
// 显示
function show(obj) {
    obj.style.display = "block";
}

// 隐藏
function hide(obj) {
    obj.style.display = "none";
}

// 29、防止拖动选中内容
function selection() {
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
}

// 30、事件中禁止选中文本
function noSelectText() {
    if (document.all) {
        document.onselectstart = function () {
            return false;
        }; //for ie
    } else {
        document.onmousedown = function () {
            return false;
        };
        document.onmouseup = function () {
            return true;
        };
    }
    document.onselectstart = new Function('event.returnValue=false;');
}

// 31、ajax的封装(Promise方式)
function ajaxByPromise(obj){
    //默认值
    let defaultObj = {
        url:"#",
        method:"get",
        param:"",
        isAsync:true
    }
    for(let key in obj){
        defaultObj[key] = obj[key];//url
    }
    //1、创建对象
    let xhr = new XMLHttpRequest();

    //2、设置请求参数
    if(defaultObj.method.toLowerCase()=="get"){
        xhr.open(defaultObj.method,defaultObj.url+"?"+defaultObj.param,defaultObj.isAsync);
    }else{
        xhr.open(defaultObj.method,defaultObj.url,defaultObj.isAsync);
    }

    //3、设置回调函数
    let p = new Promise(function(resolve,reject){
        xhr.onreadystatechange = function(){
            if(xhr.readyState==4){
                if(xhr.status==200){
                    resolve&&resolve(xhr.responseText);
                }else{
                    reject&&reject("服务器出错了！");
                }
            }
        }
    });

    if(defaultObj.method.toLowerCase()=="get"){
        //4、发送请求
        xhr.send();
    }else if(defaultObj.method.toLowerCase()=="post"){
        //4、发送请求
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(defaultObj.param);
    }

    return p;
}