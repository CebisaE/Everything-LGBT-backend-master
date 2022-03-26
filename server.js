require("dotenv").config();
const express = require('express')
const app = express()
const db = require("./app/models");
const Role = db.role;
const cors = require('cors')
const mongoose = require('mongoose')

const productsRouter = require('./app/routes/products.routes')
const customerRouter = require('./app/routes/customer.routes')
const contactRouter = require('./app/routes/contact.routes')
const authRouter = require('./app/routes/auth.routes')
const cartRouter = require("./app/routes/cart.routes")

app.set('port',process.env.PORT || 3000);

mongoose.connect(process.env.DATABASE_URL,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Everything LGBT+ Database'))
.catch(err => {
    console.error("Connection error", err);
    process.exit();
})

function initial() {
    Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
        new Role({
          name: "customer"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'customer' to roles collection");
        });
        new Role({
            name: "admin"
          }).save(err => {
            if (err) {
              console.log("error", err);
            }
            console.log("added 'admin' to roles collection");
          });
        }
      });
    }
app.use(express.json())
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to EverthingLGBT+ clothing shop! -Enjoy your Stay although there`s nothing to do here it`s just a bunch of code')
})


app.use('/products', productsRouter)
app.use('/contact',contactRouter)
app.use('/customer', customerRouter)
app.use("/cart", cartRouter)


app.listen(app.get("port"), () => {
    console.log(`Server started`)
});

module.exports = app;