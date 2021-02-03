const express = require('express')
const app = express()  // initialize express
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')


const productRoutes = require('./api/routes/product')
const orderRoutes = require('./api/routes/order')
const userRoutes = require('./api/routes/user')
app.use(fileUpload({useTempFiles : true,tempFileDir : '/tmp/'}));

const { MONGOURI, mongoOption, PORT } = require('./config')

//for mongoose
mongoose.connect(MONGOURI, mongoOption);
const db = mongoose.connection;
db.once('open',()=>console.log('mongo connected'));
db.on('error', err => console.log(err));

// Morgan & body-Parser
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

//MiddleWare for Headers 
app.use(require('cors')());

// routes which should handle requests
app.use('/products',productRoutes)
app.use('/orders',orderRoutes)
app.use('/user',userRoutes)

// app.use((req,res,next)=>{
//     const error = new Error('Not found');
//     error.status = 404;
//     next (error)
// })

// app.use((error,req,res,next)=>{
//     res.status(error.status || 500);
//     res.json({
//         error:{
//             message: error.message
//         }
//     })
// })

app.listen(PORT, ()=>console.log(`server is running at http://localhost:${PORT}`))