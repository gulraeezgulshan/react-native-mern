const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');


const api = process.env.API_URL;
const port = process.env.PORT;
const connection_uri = process.env.CONNECTION_STRING;

//middleware
app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'))
app.use(errorHandler);

//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

//http://localhost:3000/api/v1/products

mongoose.connect(connection_uri).then(()=> {console.log('Database Connected')}).catch((err)=> {console.log(err)});

app.listen(port, ()=> {
    //console.log(api);
    console.log(`Server is running on ${port}`);
})