const express = require('express');
require('dotenv').config()
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const productRouter = require('./routers/products');


const port = process.env.PORT;
const api_uri = process.env.API_URI;

//middlewares
app.use(express.json());
app.use(morgan('tiny'));
app.use(`${api_uri}/products`, productRouter);

app.get('/', (req, res)=> {
    res.send('<h1>Hello World</h1>')
})



mongoose.connect(process.env.MONGOOSE_URI)
.then(()=> {console.log('Database Connected');})
.catch((err)=> {console.log(err);})

app.listen(port, ()=> {console.log(`Server is listening on port: ${port}`)})

