document.getElementById('admin-login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'Admin' && password === 'Admin518n518') {
        localStorage.setItem('isAdminLoggedIn', 'true');
        window.location.href = 'admin-dashboard.html';
    } else {
        document.getElementById('login-message').innerText = 'اسم المستخدم أو كلمة المرور غير صحيحة.';
    }
});
