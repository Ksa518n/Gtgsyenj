document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('product-list');
    const products = JSON.parse(localStorage.getItem('products')) || [];

    productList.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>الوزن: ${product.weight} كجم</p>
            <p>العمر: ${product.age}</p>
            <p>السعر: ${product.price} ريال</p>
        `;
        productList.appendChild(productDiv);
    });
});
