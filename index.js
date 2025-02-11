document.addEventListener('DOMContentLoaded', function() {
    const productContainer = document.getElementById('product-container');
    const products = JSON.parse(localStorage.getItem('products')) || [];

    productContainer.innerHTML = '';  // تأكد من تفريغ الحاوية أولاً

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-card');

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>الوزن: ${product.weight} كجم</p>
            <p>العمر: ${product.age}</p>
            <p>السعر: ${product.price} ريال</p>
            <button onclick="addToCart('${product.name}')">إضافة للسلة</button>
        `;
        productContainer.appendChild(productDiv);
    });
});

function addToCart(productName) {
    alert(`${productName} تمت إضافته للسلة!`);
}
