//1、 首页购物车的默认滑过弹出层
$(".cart,#carts").mouseenter(function () {
    $("#carts").stop().show(300);
}).mouseleave(function () {
    $("#carts").stop().hide(300);
});

//2、 为了避免全局污染 这里用个沙箱模式(就是自运行函数)
(function () {
    // nav导航栏tab切换以及显示  分了两个步骤
    var lis = $(".nav_items").children();
    var as = $(".nav_items").children().children();
    var bigBox = $(".bigbox")[0];
    var boxChilds = document.getElementsByClassName("oky");
    for (var i = 0; i < lis.length - 3; i++) {
        lis[i].onmouseenter = fn1;
        bigBox.onmouseenter = fn1;
        lis[i].onmouseleave = fn2;
        bigBox.onmouseleave = fn2;
    }
// tab切换---这里用了一个闭包
    for (var i = 0; i < boxChilds.length; i++) {
        as[i].onmouseenter = (function (index) {
            return function () {
                for (var i = 0; i < boxChilds.length; i++) {
                    hide(boxChilds[i]);
                }
                show(boxChilds[index]);
                // 因为担心点击子元素 影响到了父元素 这里阻止一下冒泡
                stopPropagation();
            };
        })(i);
    }

// 遮罩层滑出函数
    function fn1() {
        animate(bigBox, {opacity: 100, height: 278}, 10);
    }

//  当离开的时候 收回这个弹出层
    function fn2() {
        animate(bigBox, {opacity: 0, height: 0}, 10);
    }
})();

//3、 搜索框点击效果
$("#search_ipt").click(function () {
    $(this).attr('placeholder', '请输入搜索的商品');
    $(".search_box").show();
    $(".AD").hide();
    event.stopPropagation();
});
$(document).click(function () {
    $(".search_box").hide();
    $("#search_ipt").attr('placeholder', '');
    $(".AD").show();
});


// 4、 banner轮播图 沙箱
(function () {
    // 初始化值
    var currOrd = 0;
    var timer = null;
    var dots = $(".dots");
    var banner_as = $(".imgsBox").children();
    for (var i = 0; i < banner_as.length; i++) {
        banner_as[i].style.opacity = 0;
        banner_as[0].style.opacity = 1;
        // 根据图片数量 动态生成小圆点
        var newspan = document.createElement("span");
        dots[0].appendChild(newspan);
        var spans = dots[0].children;
        spans[0].className = "current";
    }


// 自动轮播
    autoPlay();

    function autoPlay() {
        timer = setInterval(function () {
            var outOrd = currOrd;
            currOrd++;
            if (currOrd >= banner_as.length) {
                currOrd = 0;
            }
            // 显示图片
            showImg(currOrd, outOrd);
            // 显示小圆点
            showSpan();
        }, 2000);
    }

// 显示图片
    function showImg(inOrd, outOrd) {
        if (outOrd == inOrd) {
            return;
        }
        animate(banner_as[outOrd], {opacity: 0, Zindex: 0}, 30);
        animate(banner_as[inOrd], {opacity: 100, zIndex: 1}, 30);
    }

// 自动显示当前小圆点
    function showSpan() {
        for (var i = 0; i < spans.length; i++) {
            spans[i].className = "";
        }
        // 这里注意， 因为用的上一张和下一张 所以这里要跟图片一致
        spans[currOrd].className = "current";
    }

// 点击小圆点的时候要执行的函数
    function clickGoImg(transOrd) {
        // 这里要用到数据交换
        // 把第一个给下一个 然后把当前的给第一个
        var outOrd = currOrd;
        currOrd = transOrd;
        showImg(currOrd, outOrd);
        showSpan();
    }

// 进入图片容器 停止定时器 离开开启定时器
    $(".banner_box").mouseover(function () {
        clearInterval(timer);
    }).mouseout(function () {
        autoPlay();
    });

// 点击小圆点 跳转到当前的图片
    for (var i = 0; i < spans.length; i++) {
        spans[i].onclick = (function (index) {
            return function () {
                clickGoImg(index);
            }
        })(i);
    }
})();

// 5、 main 区域小圆点切换和创建思路
// 通过div预设值静态布局 给div父盒子相同的class 里面的图片有几个 就动态创建几个小圆点 然后tab切换
// tt区域图片 统一添加背景图
(function () {
    var tt_a = $(".tt").children();
    for (var i = 0; i < tt_a.length; i++) {
        tt_a[i].style.backgroundImage = "url('images/tt" + (i + 1) + ".jpg')";
    }

})();


// 6、热卖商品 小箭头点击tab切换滑动效果
(function () {
    var next = $(".next_span");
    var prev = $(".prev_span");
    var hotUls = $(".Hot_boxUl");
    var hot_box = $(".Hot_box");

    for (var i = 0; i < hotUls.length; i++) {
        next[0].onclick = function () {
            uniformSprots(hot_box[0], "left", -1 * hotUls[0].offsetWidth, 25, 5);
            for (var i = 0; i < hotUls.length; i++) {
                if (hotUls[i].offsetLeft <= 0) {
                    prev[0].style.cursor = "not-allowed";
                    this.style.cursor = "pointer";

                }
                this.style.cursor = "not-allowed";
                prev[0].style.cursor = "pointer";
                this.children[0].style.backgroundPosition = "-6px 0px";
                prev[0].children[0].style.backgroundPosition = ' 0px -10px';
            }
        }

        prev[0].onclick = function () {
            for (var i = 0; i < hotUls.length; i++) {
                if (hotUls[i].offsetLeft >= 0) {
                    uniformSprots(hot_box[0], "left", 0, 25, 5);
                    next[0].style.cursor = "pointer";
                    this.style.cursor = "not-allowedp";
                    this.children[0].style.backgroundPosition = "0px 0px";

                }

                this.style.cursor = "not-allowed";
                next[0].style.cursor = "pointer";

                next[0].children[0].style.backgroundPosition = ' -6px -10px';
            }
        }
    }
})();

// 7、最复杂的一个JS效果 动态根据图片数量生成小圆点 添加滑过事件 节流等等
(function () {
    // 这里调整数据 商品列表项 有几个图片 动态创建几个小圆点
    var imgs = document.getElementsByClassName("imgs");
    var dot = $(".dot");
    for (var i = 0; i < imgs.length; i++) {
        var imgsChild = imgs[i].children;

        imgsChildren(dot[i]);
        var spans = dot.children;
        var span = dot[i].children;

        //-------------通过下面的函数 得到每一个span的个数
        spanChild(span);
        var result = spanChild(span);


        // 调用给默认第一给span小圆点添加默认样式
        defaultSpan(span);

        //------------------ 调用切换图片和改变小圆点状态的函数
        clickSpan(result, imgsChild);

    }

// 遍历图片 创建小圆点  ---------用函数形参暴露的思路 解决了问题了 明天再优化优化
    function imgsChildren(obj) {
        for (var i = 0; i < imgsChild.length; i++) {
            var newspan = document.createElement("span");
            newspan.style.cursor = "pointer";
            newspan.style.zIndex = "1";
            newspan.style.position = "relative";
            obj.appendChild(newspan);
            var newi = document.createElement("i");
            newspan.appendChild(newi);
        }
    }

    function spanChild(obj) {
        for (var i = 0; i < obj.length; i++) {
            // console.log(obj.length)  通过这种方式得到了上面的每个span的个数 然后通过下面的函数注册滑过事件
            return obj;
        }

    }

// 滑过事件 改变小圆点状态和图片切换,为了节省请求次数，添加闭包节流
    function clickSpan(obj, target) {
        for (var i = 0; i < obj.length; i++) {
            obj[i].index = i;
            // 预设置
            target[i].style.opacity = 0;
            target[0].style.opacity = 1;
            // 开始事件
            // 滑过之前初始化延时器
            var timer = null;
            obj[i].onmouseover = (function (index) {
                return function () {
                    // 开启之前先清除上一个延时器
                    clearTimeout(timer);
                    // 在这里开启延时器
                    var _this = this;
                    timer = setTimeout(function () {
                        for (var i = 0; i < obj.length; i++) {
                            obj[i].style.border = "1px solid #e7e7e7";
                            obj[i].children[0].style.backgroundColor = "#ebebeb";
                            animate(target[i], {opacity: 0}, 30);
                        }
                        _this.style.border = "2px solid #d6d6d6";
                        _this.children[0].style.backgroundColor = "black";
                        animate(target[index], {opacity: 100}, 20);
                    }, 300);
                }
            })(i)
        }
    }

// 动态给小圆点默认第一个图片添加样式
    function defaultSpan(obj) {
        for (var i = 0; i < obj.length; i++) {
            obj[0].style.border = "2px solid #d6d6d6";
            obj[0].children[0].style.backgroundColor = "black";
        }
        return obj;
    }
})();

// 8 、精选周边区域的tab切换
(function () {
    var uls = $("#uls");
    var lis = $("#uls").children();
    var spans = $("#pp_topR").children();
    for (var i = 0; i < spans.length; i++) {
        spans[i].setAttribute("index", i);
        //spans[i].index = i;
        spans[i].onmouseover = function () {
            var index = this.getAttribute("index");
            for (var i = 0; i < spans.length; i++) {
                lis[i].style.display = "none";
            }
            lis[index].style.display = "block";
        }
    }
})();

//  9、锤子应用的图片小icon
(function () {
    var use = my$("use");
    var icons = use.getElementsByClassName("icon");
    var imgss = use.getElementsByClassName("imgss");
    for (var i = 0; i < icons.length; i++) {
        icons[i].style.backgroundPosition = "" + i * -50 + "px 0px";
        imgss[i].style.backgroundPosition = "" + i * -90 + "px 0px"
    }
})();

// 10、底部中英文切换按钮
(function () {
    var sp_btn = $("#sp_btn");
    var English = $(".English");
    var China = $(".China");

    sp_btn.click(function () {
        console.log($(this).css("webkitTransform"))
        if ($(this).css("webkitTransform") == "matrix(1, 0, 0, 1, 0, 0)") {

            $(this).css({
                "webkitTransform": "rotate(180deg)",
                top: 6
            })

        } else if ($(this).css("webkitTransform") == "matrix(-1, 1.22465e-16, -1.22465e-16, -1, 0, 0)") {
            $(this).css({
                "webkitTransform": "rotate(0)",
                top: -1
            })

        }

        China.css({
                "background-image": "url('../images/china.png') no-repeat 25px 15px",
            }
        );

        if (English.css("opacity") == 1) {
            English.css({
                opacity: 0
            });
        } else {
            English.css({
                opacity: 1
            });
        }
    });
})();

//10、 回到顶部 页面卷动事件
(function () {
    window.onscroll = function () {
        if (scroll().top >= 90) {
            animate(my$("top"), {
                opacity: 100
            }, 20)
        } else {
            animate(my$("top"), {
                opacity: 0
            }, 20)
        }
        // 这里赋值才可以
        // 这个地方是个坑 如果上面定义就不行
        leader = scroll().top;

    }
    var leader = 0, target = 0, timer = null;
    my$("top").onclick = function () {
        clearInterval(timer);
        timer = setInterval(function () {
            if (leader == target) {
                clearInterval(timer);
            }
            leader = leader + (target - leader) / 10;
            window.scrollTo(0, leader);
        }, 30);
    };

})();

// 获取cookie
var username = getCookie("username");
console.log(username);
if(username != null){
    alert(username + " 您好 欢迎回来");
}else {
    alert("什么玩意");
}

