const express = require('express')
const router = express.Router()
const User =require('../models/users')
const multer = require('multer')

//image upload 
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./uploads')
    }
})

router.get('/', (req, res) =>{
    res.render('index', {title: "Home"})
})

router.get('/add', (req, res) =>{
    res.render('add_users', {title: "Add Users"})
})

module.exports = router