(function () {
    var l = document.getElementsByClassName("l"),
        bottom_box = document.getElementsByClassName("bottom_box");
    for (var i = 0, len = l.length; i < len; i++) {
        l[i].style.backgroundPosition = "" + -i * 49 + "px -48px";

        bottom_box[i].onmouseover = (function (index, obj) {
            return function () {
                obj.style.backgroundPosition = "" + -index * 49 + "px 0px";
            }
        })(i, l[i]);

        bottom_box[i].onmouseout = (function (index, obj) {
            return function () {
                obj.style.backgroundPosition = "" + -index * 49 + "px -48px";
            }
        })(i, l[i]);

    }
})();
// 注册点击事件
(function () {
    var iphone = getClassNmae("iphone")[0],
        duanxin = getClassNmae("duanxin")[0],
        p = getClassNmae("pass")[0],
        p1 = getClassNmae("pass")[1],
        u = document.getElementsByTagName("u")[0],
        u1 = document.getElementsByTagName("u")[1],
        arr = [iphone, duanxin, p, p1];
    arr.forEach(function (index) {
        var flag = index.value; // 用来存储原始的值
        index.onfocus = function () {
            if (this.value == flag) {
                this.value = "";
                this.style.color = "black";
                if (this.nextElementSibling == null) {
                    console.log(null)
                }
                this.nextElementSibling.innerHTML = "";
            }
        }

        // 因为下面还要用到这个事件 所以用监听的方式避免覆盖
        addEventHandler(index, "blur", function () {
            if (this.value == "") {
                this.value = flag;
                this.style.color = "#818181";
                p.nextElementSibling.innerHTML = "密码";
                p1.nextElementSibling.innerHTML = "重置密码";
            }
        });


    });
    getClassNmae("terms")[0].onclick = function () {
        var sty = getStyle(getFirstElementChild(this), "backgroundPosition");
        if (sty == "12px -20px") {
            getFirstElementChild(this).style.backgroundPosition = "12px 0px";
        } else if (sty == "12px 0px") {
            getFirstElementChild(this).style.backgroundPosition = "12px -20px";
        }
        // 禁止选中文本
        noSelectText();
    }
})();

// 正则判断验证表单
(function () {
    var regArr = ["phone", "yzm", "password", "passwordTo"],
        domArr = [my$("phone"), my$("yzm"), my$("password"), my$("passwordTo")];

    for (var i = 0; i < regArr.length; i++) {
        // 清除文本框的历史记录
        domArr[i].autocomplete = "off";


        domArr[i].onkeyup = (function (index) {
            return function () {
                // 正则判断
                var flag = domArr[index].value,
                    prev = domArr[index].previousElementSibling;
                if (regExp(regArr[index], flag) == false) {
                    prev.style.opacity = 1;
                } else {
                    prev.style.opacity = 0;
                }
                if (domArr[domArr.length - 1].value != domArr[domArr.length - 2].value) {
                    domArr[domArr.length - 1].previousElementSibling.innerHTML = "两次密码不一致";
                    domArr[domArr.length - 1].previousElementSibling.style.opacity = 1;
                } else {
                    domArr[domArr.length - 1].previousElementSibling.style.opacity = 0;
                }
                if (flag == "") {
                    prev.style.opacity = 0;
                }
            }
        })(i);
    }

})();

// 输入手机号失焦的时候发送ajax请求
my$("phone").onblur = function () {
    ajaxByPromise({
        url: "php/blur.php",
        param:"phone="+my$("phone").value,
        method: "get",
        isAsync: true,
    }).then(function (data) {
        console.info(data);
        if (data == 1) {
            console.log("恭喜您，该用户没有人用，赶紧注册吧");
        } else  if (data == 0) {
            console.log("亲,不好意思，用户被别人用了，清重新思考好呗?");
        }else{
            console.log("报错");
        }
    });
};

// 点击注册按钮的时候发送ajax请求
my$("zhuce").onclick = function () {
    ajaxByPromise({
        url: "php/reg.php",
        method: "get",
        param: "username=" + my$("phone").value + "&userpass=" + my$("password").value,
        isAsync: true
    }).then(function (data) {
        alert(123);
        if (data == 1) {
            alert("注册成功 即将为您跳转到登录页面");
            location.href = "login.html";
        } else if (data == -1) {
            alert("注册失败，用户名已存在");
        } else {
            alert("注册失败，服务器出错了");
        }
    });
};







