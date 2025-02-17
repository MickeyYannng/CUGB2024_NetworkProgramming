let isLoggedIn = false; // 初始化登录状态为未登录


//轮播图切换
// 获取轮播图容器和图片元素
var container = document.getElementById('carousel-container');
var images = container.getElementsByTagName('img');
var dotsContainer = document.getElementById('dots-container');
var currentIndex = 0;// 定义索引变量
// 创建圆点元素
for (let i = 0; i < images.length; i++) {
    var dot = document.createElement('div');
    dot.classList.add('dot');
    dot.setAttribute('data-index', i);
    dotsContainer.appendChild(dot);
}
var dots = dotsContainer.getElementsByClassName('dot');
// 切换图片的函数
function showImage(index) {
    // 隐藏所有图片
    for (var i = 0; i < images.length; i++) {
        images[i].style.opacity = 0;
        dots[i].classList.remove('active');
    }
    // 显示指定索引的图片
    images[index].style.opacity = 1;
    dots[index].classList.add('active');
}
// 自动切换图片的函数
function autoSlide() {
    // 切换到下一张图片
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    // 显示当前图片
    showImage(currentIndex);
}
// 手动切换到下一张图片
function nextImage() {
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    showImage(currentIndex);
}
// 手动切换到上一张图片
function prevImage() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }
    showImage(currentIndex);
}
// 为每个圆点添加点击事件监听器
for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener('click', function () {
        var index = parseInt(this.getAttribute('data-index'));
        currentIndex = index;
        showImage(currentIndex);
    });
}
// 获取按钮元素并添加事件监听器
var nextButton = document.querySelector('.next-button');
var prevButton = document.querySelector('.prev-button');
nextButton.addEventListener('click', nextImage);
prevButton.addEventListener('click', prevImage);
// 定时触发自动切换
setInterval(autoSlide, 1800);


//分类实现
// 获取商品列表和类别容器
let categories = document.querySelectorAll(".category");
var prodTag = [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4];
var prodName = ["香奈儿炫亮魅力水润系列口红", "迪奥全新烈焰蓝金唇膏", "YSL[粉管]润唇膏", "[恒久]粉底液", "雅诗兰黛沁水粉底液",
    "兰蔻奇迹薄纱粉底液", "Dior花漾甜心淡香水 50ml", "LV路易威登全新IMAGINATION思扬男士香水",
    "Chanel邂逅香水100ml(礼盒装)", "雅诗兰黛七代小棕瓶精华", "LOREAL欧莱雅复颜玻尿酸水光充盈乳液", "OLAY玉兰油大红瓶4件套化妆品礼盒"];
var prodsrc = ["口红1.jpg", "口红2.jpg", "口红3.webp", "粉底液1.jpg", "粉底液2.jpg", "粉底液3.jpg", "香水1.jpg", "香水2.jpg",
    "香水3.jpg", "护肤1.jpg", "护肤2.jpg", "护肤3.jpg"];
function addItem() {// 定义一个函数，根据类别编号加载商品
    categories.forEach(category => {
        let categoryId = parseInt(category.id.split('-')[1]);
        let productList = category.querySelector('.product-list');
        for (let i = 0; i < prodTag.length; i++) {
            if (prodTag[i] === categoryId) {
                let pli = document.createElement("li");
                pli.className = "product-item";
                let pa = document.createElement("a");
                pa.href = "./detail.html";
                let imgblock = document.createElement("div");
                imgblock.className = "imgblock";
                let pimg = document.createElement("img");
                pimg.src = "./image/" + prodsrc[i];
                let pp = document.createElement("p");
                pp.innerHTML = prodName[i];
                let ph1 = document.createElement("h1");
                ph1.innerHTML = "¥ 199.99";
                productList.appendChild(pli);
                pli.appendChild(pa);
                pa.appendChild(imgblock);
                imgblock.appendChild(pimg);
                pa.appendChild(pp);
                pa.appendChild(ph1);
                pa.onclick = function () {
                    localStorage.setItem("imgSrc", pimg.src);
                    localStorage.setItem("name", pp.innerHTML);
                    localStorage.setItem("price", ph1.innerHTML);
                }
            }
        }
    });
}
addItem();// 调用函数加载商品





//点击登录后弹出登陆界面
document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('login-button');
    const modal = document.getElementById('login-modal');
    const closeModal = document.getElementById('close-modal');
    const username = document.getElementById('username');
    const pwdInput = document.getElementById('pwd');
    let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // 读取本地存储的登录状态
    let cartItemCount = isLoggedIn ? parseInt(localStorage.getItem('cartItemCount')) : 0; // 读取本地存储的购物车商品数量
    if (isLoggedIn) {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            username.textContent = storedUsername; // 设置用户名文本内容为本地存储的用户名
            loginButton.textContent = '退出登录'; // 将登录按钮文本设置为退出登录
        }
    }
    // 显示模态框
    loginButton.addEventListener('click', function () {
        if (isLoggedIn) {
            // 退出登录
            isLoggedIn = false; // 将登录状态更新为未登录
            localStorage.removeItem('isLoggedIn'); // 移除本地存储的登录状态
            localStorage.removeItem('username'); // 移除本地存储的用户名
            localStorage.removeItem('cartItemCount'); // 移除本地存储的购物车商品数量
            username.textContent = '请登录'; // 设置用户名文本内容为默认值
            loginButton.textContent = '登录'; // 将登录按钮文本设置为登录
            cartItemCount = 0; // 重置购物车商品数量
            alert('已退出登录');
        } else {
            modal.style.display = 'block';
        }
    });
    //关闭模态框
    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });
    const loginSubmitButton = document.getElementById('submit-login-button');
    // 登录逻辑
    loginSubmitButton.addEventListener('click', function () {
        const accountNum = document.getElementById('account').value;
        const pwd = pwdInput.value;
        if (!accountNum) {
            alert('请填写账号！');
            return;
        }
        if (!pwd) {
            alert('请填写密码！');
            return;
        }
        username.textContent = accountNum; // 替换用户名文本内容
        pwdInput.value = '*'.repeat(pwd.length); // 将密码输入框的内容显示为*
        alert('登录成功');
        isLoggedIn = true; // 登录后将登录状态更新为已登录
        localStorage.setItem('isLoggedIn', 'true'); // 将登录状态存储到本地存储
        localStorage.setItem('username', accountNum); // 将用户名存储到本地存储
        cartItemCount = 0; // 重置购物车商品数量
        localStorage.setItem('cartItemCount', cartItemCount); // 将购物车商品数量存储到本地存储
        modal.style.display = 'none';
        loginButton.textContent = '退出登录'; // 将登录按钮文本设置为退出登录
    });
    // 注册按钮逻辑
    const registerButton = document.getElementById('open-register-button');
    registerButton.addEventListener('click', function () {
        window.location.href = 'register.html'; // 跳转到注册页面
    });
});




// 初始化购物车商品数
cartItemCount = localStorage.getItem('cartItemCount') ? parseInt(localStorage.getItem('cartItemCount')) : 0;
// 更新购物车数量显示
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cartItemCount;
    localStorage.setItem('cartItemCount', cartItemCount);
}

// 页面加载时更新购物车数量显示
document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
    // 显示购物车
    function showCart() {
        const cartList = document.querySelector('.cart-list');
        if (cartItemCount === 0) {
            cartList.textContent = '购物车中空空如也...';
        } else {
            const totalPrice = cartItemCount * 199.99;
            cartList.textContent = `商品数量：${cartItemCount}个，总金额：¥${totalPrice.toFixed(2)}`;
        }

    }
    // 鼠标悬停在购物车按钮时显示购物车内容
    const cartButton = document.querySelector('.cart');
    cartButton.addEventListener('mouseenter', showCart);
});



// 时钟
function getD1() {
    var date = new Date();
    var d1 = date.toLocaleString();
    document.getElementById("datetime").innerHTML = d1;
}

setInterval("getD1();", 1000);

let cartbut = document.querySelector(".cw-icon");
let cartinfo = document.querySelector(".cartinfo")
cartbut.onmouseover = function () {
    cartinfo.style.display = "block";
}
cartbut.onmouseout = function () {
    cartinfo.style.display = "none";
}


