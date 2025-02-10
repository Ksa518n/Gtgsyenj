let cart = [];

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    alert(`${productName} تمت إضافته إلى السلة!`);
    localStorage.setItem('cart', JSON.stringify(cart));
}
// تحميل السلة من localStorage عند فتح صفحة سلة المشتريات
window.onload = function() {
    if (window.location.pathname.includes('cart.html')) {
        displayCartItems();
    }
};

function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsDiv = document.getElementById('cart-items');
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>السلة فارغة.</p>";
        return;
    }

    cart.forEach(item => {
        cartItemsDiv.innerHTML += `
            <div class="cart-item">
                <p>${item.name} - ${item.price} ريال</p>
            </div>
        `;
        totalPrice += item.price;
    });

    document.getElementById('total-price').innerText = `الإجمالي: ${totalPrice} ريال`;
}
