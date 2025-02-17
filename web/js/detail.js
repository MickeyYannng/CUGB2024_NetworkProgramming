document.addEventListener('DOMContentLoaded', function () {
    const fixedPurchaseBar = document.querySelector('.fixed-purchase-bar');
    const reviewsSection = document.querySelector('.reviews-section');
    const mainImage = document.querySelector('.main-image');
    const zoomLens = document.querySelector('#zoom-lens');

    window.addEventListener('scroll', function () {
        const reviewsSectionTop = reviewsSection.getBoundingClientRect().top;
        if (reviewsSectionTop <= window.innerHeight) {
            fixedPurchaseBar.style.display = 'flex';
        } else {
            fixedPurchaseBar.style.display = 'none';
        }
    });

    // 增加数量
    document.querySelector('.increase').addEventListener('click', function () {
        let quantity = parseInt(document.querySelector('.quantity input').value);
        document.querySelector('.quantity input').value = quantity + 1;
    });

    document.querySelector('.increase-bar').addEventListener('click', function () {
        let quantity = parseInt(document.querySelector('.quantity-bar input').value);
        document.querySelector('.quantity-bar input').value = quantity + 1;
    });

    // 减少数量
    document.querySelector('.decrease').addEventListener('click', function () {
        let quantity = parseInt(document.querySelector('.quantity input').value);
        if (quantity > 1) {
            document.querySelector('.quantity input').value = quantity - 1;
        }
    });

    document.querySelector('.decrease-bar').addEventListener('click', function () {
        let quantity = parseInt(document.querySelector('.quantity-bar input').value);
        if (quantity > 1) {
            document.querySelector('.quantity-bar input').value = quantity - 1;
        }
    });

    // 放大镜效果
    mainImage.addEventListener('mousemove', function (e) {
        const { left, top, width, height } = mainImage.getBoundingClientRect();
        const lensSize = zoomLens.offsetWidth;
        const mouseX = e.clientX - left;
        const mouseY = e.clientY - top;
        const lensX = mouseX - lensSize / 2;
        const lensY = mouseY - lensSize / 2;

        // 限制放大镜在图片内部移动
        if (lensX > 0 && lensX < width - lensSize && lensY > 0 && lensY < height - lensSize) {
            zoomLens.style.display = 'block';
            zoomLens.style.left = `${lensX}px`;
            zoomLens.style.top = `${lensY}px`;
            mainImage.style.transformOrigin = `${(mouseX / width) * 100}% ${(mouseY / height) * 100}%`;
            mainImage.style.transform = 'scale(2)';
        } else {
            zoomLens.style.display = 'none';
            mainImage.style.transform = 'none';
        }
    });

    mainImage.addEventListener('mouseleave', function () {
        zoomLens.style.display = 'none';
        mainImage.style.transform = 'none';
    });
});


// 加载商品详细页的主图、标题和价格
document.addEventListener('DOMContentLoaded', function () {
    const mainImage = document.getElementById('main-image');
    const imgSrc = localStorage.getItem('imgSrc');
    if (imgSrc) {
        mainImage.src = imgSrc;
    }

    const productName = localStorage.getItem('name');
    if (productName) {
        document.querySelector('.product-details h1').innerText = productName;
    }

    const productPrice = localStorage.getItem('price');
    if (productPrice) {
        document.querySelector('.product-details .price').innerText = productPrice;
    }
});




// 配送地址下拉菜单
document.addEventListener('DOMContentLoaded', function () {
    const provinces = {
        beijing: ['北京市'],
        hebei: ['石家庄市', '唐山市'],
        hubei: ['武汉市', '宜昌市']
    };

    const districts = {
        '北京市': ['海淀区', '朝阳区', '西城区'],
        '石家庄市': ['长安区', '桥西区'],
        '武汉市': ['武昌区', '汉阳区']
    };

    const provinceSelect = document.getElementById('province');
    const citySelect = document.getElementById('city');
    const districtSelect = document.getElementById('district');

    provinceSelect.addEventListener('change', function () {
        const selectedProvince = provinceSelect.value;
        const cities = provinces[selectedProvince] || [];

        citySelect.innerHTML = '<option value="">请选择市</option>' + cities.map(city => `<option value="${city}">${city}</option>`).join('');
        citySelect.dispatchEvent(new Event('change'));
    });

    citySelect.addEventListener('change', function () {
        const selectedCity = citySelect.value;
        const districtOptions = districts[selectedCity] || [];

        districtSelect.innerHTML = '<option value="">请选择区</option>' + districtOptions.map(district => `<option value="${district}">${district}</option>`).join('');
    });

    // Initialize with default "请选择" options
    citySelect.innerHTML = '<option value="">请选择市</option>';
    districtSelect.innerHTML = '<option value="">请选择区</option>';
});


// 登录后加购物车部分
isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // 读取本地存储的登录状态
function addToCart() {
    if (!isLoggedIn) { // 如果用户未登录
        alert('未登录账号'); // 提示未登录
    } else { // 如果用户已登录
        let quantity = parseInt(document.querySelector('.quantity input').value); // 获取商品数量
        let cartCount = isLoggedIn ? parseInt(localStorage.getItem('cartItemCount')) : 0;
        cartCount += quantity; // 更新购物车数量
        // 更新本地存储的购物车商品数量
        localStorage.setItem('cartItemCount', cartCount);
        alert('添加成功');
    }
}
