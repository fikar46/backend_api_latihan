const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var port = 1997;
var app = express({defaultErrorHandler:false});
app.use(cors())

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static('public'))

const mysql = require('mysql')

const conn = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'fikar123',
    database:'max-corner',
    port:3306 
});
app.get('/', (req,res)=>{
    res.send("<h1>jalan</h1>")
})

//user

//ambil data array user
app.get('/users' , (req,res) => {
    var sql = 'select * from users;'
    conn.query(sql ,(err,result)=>{
        res.send(result)
    })
})
//menambahkan akun baru
app.post('/register' , (req,res) => {
    var newUsers = req.body
    var sql =`insert into users set ?`
    conn.query(sql ,newUsers,(err,result)=>{
        console.log(result)
        res.send(result)
    })
})
//edit user
app.post('/edit-profile/:id', (req,res)=>{
    var editUser = req.body
    var sql = `update users set ? where id = ${req.params.id}`
    conn.query(sql, editUser,(err,result)=>{
        res.send(result)
    })
})
//delete user
app.post('/delete-user/:id', (req,res)=>{
    var sql = `delete from users where id = ${req.params.id}`
    conn.query(sql, (err,result)=>{
        res.send(result)
    })
})
//akhir user



//ambil data produk
app.get('/produk' , (req,res) => {
    var sql = 'select * from products;'
    conn.query(sql ,(err,result)=>{
        console.log(result)
        res.send(result)
    })
})

//menambahkan produk baru
app.post('/produk-insert' , (req,res) => {
    var newProduct = req.body
    var sql =`insert into products set ?`
    conn.query(sql ,newProduct,(err,result)=>{
        console.log(result)
        res.send(result)
    })
})

//edit produk
app.post('/produk-edit/:id',(req,res)=>{
    var editProduk =req.body
    var sql = `update products set ? where id_products=${req.params.id}`
    conn.query(sql, editProduk,(err,result)=>{
        res.send(result)
    })
})
//delete produk
app.post('/produk-delete/:id',(req,res)=>{
    var sql = `delete from products where id_products = ${req.params.id}`
    conn.query(sql, (err,result)=>{
        res.send(result)
    })
})

//menambahkan data cart
app.post('/cart-insert' , (req,res) => {
    var newCart = req.body
    var sql =`insert into cart set ?`
    conn.query(sql ,newCart,(err,result)=>{
        console.log(result)
        res.send(result)
    })
})
//update atau edit cart
app.post('/cart-edit/:id' ,(req,res)=>{
    var newChart =req.body
    var sql = `update cart set ? where id_cart= ${req.params.id}`
    conn.query(sql, newChart ,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})
// delete cart
app.post('/cart-delete/:id' ,(req,res)=>{
    var sql = `delete from cart where id_cart = ${req.params.id}`
    conn.query(sql, (err,result)=>{
        res.send(result)
        console.log(result)
    })
})
//ambil data many to many untuk cart
app.get('/cart' , (req,res) => {
    var sql = 'select us.username as username, pr.nama as nama, pr.harga as harga from cart ch join users us on ch.id_user = us.id join products pr on ch.id_products = pr.id_products '
    conn.query(sql ,(err,result)=>{
        console.log(result)
        res.send(result)
    })
})


app.listen(port, () => console.log('API Aktif di port ' + port))
