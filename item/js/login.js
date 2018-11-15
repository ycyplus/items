(function () {
    var bob = getClassNmae("bob")[0],
        as = bob.getElementsByTagName("a"),
        _form = document.getElementById("form"),
        ipt = _form.getElementsByTagName("input")[0],
        ipt1 = _form.getElementsByTagName("input")[1],
        iptArr = [ipt, ipt1];
    for (var i = 0, len = as.length - 1; i < len; i++) {
        as[i].style.backgroundPosition = "" + i * -18 + "px 0px";
    }

    iptArr.forEach(function (index) {
        var flag = index.value;
        index.onfocus = function () {
            if (this.value == flag) {
                this.value = "";
                this.style.color = "black";
            }

        }
        index.onblur = function () {
            if (this.value == "") {
                this.value = flag;
                this.style.color = "#d5d5d5";
            }
        }
    });
})();
// 处理注册登录按钮的时候  获得cookie
my$("btn").onclick = function () {

    // 点击登录按钮的时候 设置cookie
    setCookie("username", my$("username").value, 7);

    ajaxByPromise({
        url: "php/login.php",
        method: "post",
        param: "username=" + my$("username").value + "&password=" + my$("password").value,
        isAsync: true
    }).then(function (data) {
        if (data == "0") {
            alert("登录失败，账号或密码错误");
        }else if(data == "1"){
            alert("登录成功 即将为您跳转到首页");
            location.href = "index.html";
        }else{
            alert("服务器出错了");
        }
    });
};



