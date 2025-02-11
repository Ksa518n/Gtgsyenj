document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('product-list');
    const form = document.getElementById('add-product-form');

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
                <p>العمر: ${product.age}</p>
                <p>السعر: ${product.price} ريال</p>
                <button onclick="deleteProduct(${index})">حذف المنتج</button>
            `;
            productList.appendChild(productDiv);
        });
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('product-name').value;
        const weight = document.getElementById('product-weight').value;
        const age = document.getElementById('product-age').value;
        const price = document.getElementById('product-price').value;
        const imageFile = document.getElementById('product-image').files[0];

        const reader = new FileReader();
        reader.onload = function() {
            const image = reader.result;
            const newProduct = { name, weight, age, price, image };
            const products = JSON.parse(localStorage.getItem('products')) || [];
            products.push(newProduct);
            localStorage.setItem('products', JSON.stringify(products));
            loadProducts();
            form.reset();
        };
        reader.readAsDataURL(imageFile);
    });

    window.deleteProduct = function(index) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        loadProducts();
    };

    window.logout = function() {
        localStorage.removeItem('isAdminLoggedIn');
        window.location.href = 'admin-login.html';
    };

    loadProducts();
});
