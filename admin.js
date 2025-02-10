document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('admin-login-form');
    const productList = document.getElementById('product-list');
    const addProductForm = document.getElementById('add-product-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username === 'Admin' && password === 'Admin518n518') {
                localStorage.setItem('isAdminLoggedIn', 'true');
                window.location.href = 'https://ksa518n.github.io/Gtgsyenj/admin-dashboard.html';
            } else {
                document.getElementById('login-message').innerText = 'اسم المستخدم أو كلمة المرور غير صحيحة.';
            }
        });
    }

    if (productList && addProductForm) {
        if (!localStorage.getItem('isAdminLoggedIn')) {
            window.location.href = 'https://ksa518n.github.io/Gtgsyenj/admin-login.html';
        }

        loadProducts();

        addProductForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('product-name').value;
            const weight = document.getElementById('product-weight').value;
            const age = document.getElementById('product-age').value;
            const price = document.getElementById('product-price').value;
            const image = document.getElementById('product-image').value;

            const newProduct = { name, weight, age, price, image };
            const products = JSON.parse(localStorage.getItem('products')) || [];
            products.push(newProduct);

            localStorage.setItem('products', JSON.stringify(products));
            loadProducts();
            addProductForm.reset();
        });

        window.deleteProduct = function(index) {
            const products = JSON.parse(localStorage.getItem('products')) || [];
            products.splice(index, 1);
            localStorage.setItem('products', JSON.stringify(products));
            loadProducts();
        };
    }

    window.logout = function() {
        localStorage.removeItem('isAdminLoggedIn');
        window.location.href = 'https://ksa518n.github.io/Gtgsyenj/admin-login.html';
    };

    function loadProducts() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        productList.innerHTML = '';

        products.forEach((product, index) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-item');

            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>الوزن: ${product.weight} كجم</p>
                <p>العمر: ${product.age} شهور</p>
                <p>السعر: ${product.price} ريال</p>
                <button onclick="deleteProduct(${index})">حذف المنتج</button>
            `;

            productList.appendChild(productDiv);
        });
    }
});
