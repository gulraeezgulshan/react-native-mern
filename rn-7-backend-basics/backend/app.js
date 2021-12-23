const express = require('express');
const app = express();
const morgan = require('morgan');
const productRouter = require('./routers/products')
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv/config');

const api = process.env.API_URL;
const port = process.env.PORT;
const connection_uri = process.env.CONNECTION_STRING;

//middleware
app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(morgan('tiny'));
app.use(`${api}/products`, productRouter);



//http://localhost:3000/api/v1/products

mongoose.connect(connection_uri).then(()=> {console.log('Database Connected')}).catch((err)=> {console.log(err)});

app.listen(port, ()=> {
    //console.log(api);
    console.log(`Server is running on ${port}`);
})