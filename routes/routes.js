const express = require('express')
const router = express.Router()
const User =require('../models/users')
const multer = require('multer')
const session = require('express-session')
const users = require('../models/users')

//image upload 
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname)
    }
})

const upload = multer({
    storage: storage,
}).single('image')

//insert a user into database
router.post('/add', upload, (req, res) => {
    const user = new User({
       name: req.body.name, 
       email: req.body.email, 
       phone: req.body.phone,
       image: req.file.filename, 
    })
   
    user.save((err) =>{
       if(err){
        res.json({message: err.message, type : 'danger'})
       }else {
        req.session.message ={
        type: "success",
        message: "user added successfully!"
       }
        res.redirect("/");
    }  
    })
});
   
//get all users route
   
router.get('/', (req, res) =>{
 User.find().exec((err, users) =>{
   if(err){
    res.json({message: err.message})
   } else {
    res.render('index',{
        title: 'Home Page',
        users:users
    })
   }
   })
   })
 


router.get('/add', (req, res) =>{
    res.render('add_users', {title: "Add Users"})
})

module.exports = router