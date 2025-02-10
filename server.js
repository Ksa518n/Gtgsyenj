const express = require('express');
const Stripe = require('stripe');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const stripe = Stripe('YOUR_SECRET_KEY');  // استبدل YOUR_SECRET_KEY بمفتاحك السري من Stripe

app.use(cors());
app.use(bodyParser.json());

app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,  // Stripe يعتمد على السنتات
            currency: 'sar',
            payment_method_types: ['card'],
        });

        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.listen(4242, () => console.log('Server running on port 4242'));
