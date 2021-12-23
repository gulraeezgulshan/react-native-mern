const express = require('express');
const app = express();
const morgan = require('morgan');

const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const api = process.env.API_URL;
const port = process.env.PORT;
const connection_uri = process.env.CONNECTION_STRING;

//middleware
//cross origin resource sharing (CORS)
app.use(cors());

//http:localhost:3000 -> server
//http:localhost:5000 - Client
app.options('*', cors());

app.use(express.json());
app.use(morgan('tiny'));

const productRouter = require('./routers/products')
const categoryRouter = require('./routers/categories')
const orderRouter = require('./routers/orders')
const userRouter = require('./routers/users')

app.use(`${api}/products`, productRouter);
app.use(`${api}/categories`, categoryRouter);
app.use(`${api}/orders`, orderRouter);
app.use(`${api}/users`, userRouter);

//http://localhost:3000/api/v1/products

mongoose.connect(connection_uri).then(()=> {console.log('Database Connected')}).catch((err)=> {console.log(err)});

app.listen(port, ()=> {
    //console.log(api);
    console.log(`Server is running on ${port}`);
})