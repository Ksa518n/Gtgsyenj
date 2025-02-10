document.addEventListener('DOMContentLoaded', function() {
    const productContainer = document.getElementById('products');
    const products = JSON.parse(localStorage.getItem('products')) || [];

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>الوزن: ${product.weight} كجم</p>
            <p>العمر: ${product.age} شهور</p>
            <p>السعر: ${product.price} ريال</p>
        `;

        productContainer.appendChild(productDiv);
    });
});
