document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('isAdminLoggedIn') !== 'true') {
        window.location.href = 'admin-login.html';
        return;
    }

    const productList = document.getElementById('product-list');
    const addProductForm = document.getElementById('add-product-form');
    const addProductLink = document.getElementById('add-product-link');
    const manageProductsLink = document.getElementById('manage-products-link');

    // تحميل المنتجات
    function loadProducts() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        productList.innerHTML = '';

        products.forEach((product, index) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-item');

            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 200px;">
                <h3>${product.name}</h3>
                <p>الوزن: ${product.weight} كجم</p>
                <p>العمر: ${product.age} شهور</p>
                <p>السعر: ${product.price} ريال</p>
                <button onclick="deleteProduct(${index})">حذف المنتج</button>
            `;

            productList.appendChild(productDiv);
        });
    }

    // إضافة منتج
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

    // حذف منتج
    window.deleteProduct = function(index) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        loadProducts();
    };

    // عرض الصفحات
    addProductLink.addEventListener('click', () => {
        document.getElementById('add-product-section').classList.remove('hidden');
        document.getElementById('manage-products-section').classList.add('hidden');
    });

    manageProductsLink.addEventListener('click', () => {
        document.getElementById('manage-products-section').classList.remove('hidden');
        document.getElementById('add-product-section').classList.add('hidden');
        loadProducts();
    });

    // تسجيل الخروج
    window.logout = function() {
        localStorage.removeItem('isAdminLoggedIn');
        window.location.href = 'admin-login.html';
    };
});
