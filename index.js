const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const {establishConnection} = require('./Db/connect')


const app = express();
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
establishConnection();


//import Router
const UserRoute = require('./routes/User');
// const ProductRoute = require('./routes/Product');
// const OrderRoute = require('./routes/Order');
// const CartRoute = require('./routes/Cart');
const AuthRoute = require('./routes/Auth');

//router
app.use('/api/auth', AuthRoute);
app.use('/api/users', UserRoute)

// middelware

app.use(cors());



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})