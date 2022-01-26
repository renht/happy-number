var timer; //存放计时器id
var number = 1; //当前的数字
var container = document.getElementById("container"); //数字容器
var colors = ["#f26395", "#62efab", "#ef7658", "#ffe868", "#80e3f7", "#d781f9"];
var divCenter = document.getElementById("divCenter"); //中间的div
/**
 * 开始生成数字
 */
function start() {
    timer = setInterval(createNumber, 100);
}

/**
 * 根据指定的最小值，和最大值，生成一个随机整数
 * @param {*} min 
 * @param {*} max 取不到最大值
 */
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * 生成一个数字
 */
function createNumber() {
    //生成数字
    var span = document.createElement("span");
    span.innerText = number;
    divCenter.innerText = number; //设置中间div的文本
    if (isPrime()) {
        //随机从颜色数组中取出一个颜色
        //生成随机下标 
        var index = getRandom(0, colors.length); // 0 ~ colors.length - 1
        var color = colors[index]; //取出随机颜色
        span.style.color = color;
        //添加阴影
        span.style.textShadow = "0 0 3px " + color;
        //在中间新建一个div，然后让它飘动
        var center = document.createElement("div");
        center.className = "center";
        center.innerText = number;
        center.style.color = color;
        document.body.appendChild(center);
        //为什么要等待：希望先将元素加入到页面，让浏览器把元素渲染出来，然后再更改样式，这样才能触发动画
        setTimeout(function () {
            //1. 设置transform: translate(?, ?)
            center.style.transform = "translate(" + getRandom(-300, 300) + "px, " + getRandom(-300, 300) + "px)";
            //2. 设置opacity：0
            center.style.opacity = 0;
        }, 30);

        //动画结束后，移除新增的div
        center.addEventListener("transitionend", function () {
            //动画结束后运行的事件
            center.remove(); //移除
        })
    }
    container.appendChild(span);
    span.scrollIntoView(); //让滚动条滚动到该元素可以被显示的位置
    //数字自增
    number = Math.ceil(Math.random() * 1000);
}

/**
 * 判断当前的数字number是不是满足条件（是不是一个素数）
 */
function isPrime() {
    //素数：只能被1和自身整数
    //小于2的数字，一定不是素数
    if (number < 2) {
        return false;
    }
    //说明：从 2 到 number-1 之间，如果找到有一个数能整数number，则number 不是素数
    for (var i = 2; i <= number - 1; i++) {
        if (number % i === 0) {
            //发现2到number-1之间，有一个数字能整除number，number不是素数
            return false;
        }
    }
    //循环结束了，此时还没有返回，说明，没有找到能整除number的数字
    return true;
}

function stop() {
    clearInterval(timer);
    timer = null;
}

window.onclick = function () {
    if (timer) { //已经开始了
        stop();
    }
    else {
        start();
    }
}