document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('register-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            alert('密码和确认密码不一致！');
            return;
        }

        alert('注册成功！');

        // 注册成功后跳转到主页面
        window.location.href = './index.html';
    });
});
