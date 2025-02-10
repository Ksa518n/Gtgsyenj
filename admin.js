document.getElementById('admin-login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'Admin' && password === 'Admin518n518') {
        localStorage.setItem('isAdminLoggedIn', 'true'); // تخزين حالة تسجيل الدخول
        window.location.href = 'admin-dashboard.html';   // توجيه إلى لوحة التحكم
    } else {
        document.getElementById('login-message').innerText = 'اسم المستخدم أو كلمة المرور غير صحيحة.';
    }
});
// التأكد من أن الأدمن مسجل دخوله
if (window.location.pathname.includes('admin-dashboard.html')) {
    if (localStorage.getItem('isAdminLoggedIn') !== 'true') {
        window.location.href = 'admin-login.html';
    } else {
        displayProducts(); // عرض المنتجات إذا الأدمن مسجل دخوله
    }
}

// تسجيل الخروج
function logout() {
    localStorage.removeItem('isAdminLoggedIn');
    window.location.href = 'admin-login.html';
}

// إضافة منتج جديد
document.getElementById('add-product-form')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('product-name').value;
    const weight = document.getElementById('product-weight').value;
    const age = document.getElementById('product-age').value;
    const price = document.getElementById('product-price').value;
    const image = document.getElementById('product-image').value;

    const newProduct = { name, weight, age, price, image };

    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));

    displayProducts();
    document.getElementById('add-product-form').reset();
});

// عرض المنتجات في لوحة الأدمن
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // تنظيف القائمة قبل العرض

    const products = JSON.parse(localStorage.getItem('products')) || [];

    products.forEach((product, index) => {
        productList.innerHTML += `
            <div class="product-admin">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>وزن: ${product.weight} كجم - العمر: ${product.age} شهور</p>
                <p>السعر: ${product.price} ريال</p>
                <button onclick="deleteProduct(${index})">حذف</button>
            </div>
        `;
    });
}

// حذف منتج
function deleteProduct(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
}
