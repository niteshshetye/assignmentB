require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {establishConnection} = require('./Db/connect')

const app = express();
app.use(express.json());
// middelware
app.use(cors());
// connect with database
establishConnection();


//import Router
const AuthRoute = require('./routes/Auth');
const UserRoute = require('./routes/User');
const ProductRoute = require('./routes/Product');
const CartRoute = require('./routes/Cart');
const OrderRoute = require('./routes/Order');
const StripeRoute = require('./routes/Stripe');

//router
app.use('/api/auth', AuthRoute);
app.use('/api/users', UserRoute);
app.use('/api/products', ProductRoute);
app.use('/api/cart', CartRoute);
app.use('/api/order', OrderRoute);
app.use('/api/checkout', StripeRoute);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})