const express = require('express');
const app = express();
const database = require('./src/database/db_url')
const server = require('http').createServer(app);

const authRouter = require('./src/routers/authRouter')
const productRouter = require('./src/routers/productRouter')
const orderRouter = require('./src/routers/orderRouter')
const cartRouter = require('./src/routers/cartRouter')
//initializing mongoose database
database();

//mongoose and mongo sandbox routes
app.use('/app', authRouter);
// app.use('/app', productRouter );
// app.use('/app', orderRouter );
app.use('/app', cartRouter);

//starting server
server.listen(3000, () => console.log('Server is Running'));





