// إعداد Stripe بمفتاحك الخاص
const stripe = Stripe('YOUR_PUBLISHABLE_KEY');  // استبدل YOUR_PUBLISHABLE_KEY بمفتاحك من Stripe

// إنشاء عنصر الدفع
const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-element');

// التحكم في عملية الدفع
const form = document.getElementById('payment-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
    });

    if (error) {
        document.getElementById('payment-message').innerText = error.message;
    } else {
        document.getElementById('payment-message').innerText = "تم الدفع بنجاح!";
        // هنا تقدر تضيف كود إرسال تفاصيل الطلب إلى قاعدة البيانات أو البريد الإلكتروني
    }
});
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // حساب إجمالي السعر من السلة
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

    // إرسال الطلب إلى الخادم
    const response = await fetch('http://localhost:4242/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount })
    });

    const { clientSecret } = await response.json();

    // تأكيد عملية الدفع
    const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: cardElement
        }
    });

    if (error) {
        document.getElementById('payment-message').innerText = error.message;
    } else {
        document.getElementById('payment-message').innerText = "تم الدفع بنجاح!";
        localStorage.removeItem('cart');  // إفراغ السلة بعد الدفع
    }
});
