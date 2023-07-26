const express = require('express')
const app = express()

app.set('view engine','hbs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { connectToDatabase } = require('./db');
const { getProducts,createProduct } = require('./product');

connectToDatabase();

app.get('/',async (req,res)=>{
    const items = await getProducts();
    res.render('home',{products:items})
})

app.post('/add', async (req, res) => {
    const { name, price } = req.body;
    try {
      const newItem = await createProduct({ 'name':name, 'price': parseFloat(price) });
      res.redirect('/')
    } catch (err) {
      res.status(400).json({ message: err.message });
    }   
  });

app.get('/new',(req,res)=>{
    res.render('new')
})

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server is running on :${PORT}`)
})