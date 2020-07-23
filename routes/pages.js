const express = require('express');
const router = express.Router();
const User = require('../model/users');
// const { body,validationResult } = require('express-validator/check');
// const { sanitizeBody } = require('express-validator/filter');

router.get('/', (req, res)=> {
    res.render('dashboard');
});

router.get('/create-user', (req, res)=>{
    res.render('createUser');
});

router.get('/vetinary', (req, res)=>{
    res.render('vetinary');
});
router.get('/feedstocking', (req, res)=>{
    res.render('feedsstocking');
});

router.post('/save-user', (req, res)=>{
    console.log(req);
    console.log(req.query.firstName)
    //saveUser(req, res, (err)=>{
    //     if(err) {
    //         console.log(err);
    //         res.render('createUser', {msg: err})
    //     } else
        if(req.body.firstName === '' && req.body.firstName.length <= 2 && req.body.firstName.length >= 20) {
            res.redirect('/create-user?msg=Oops, first name cannot be blank or less than 2 characters.');
        } else if(req.body.lastName === '' && req.body.lastName.length <= 2 && req.body.lastName.length >= 20){
            res.redirect('/create-user?msg=Oops, last name cannot be blank or less than 2 characters.');
        } else if(req.body.username === '' && req.body.username.length <= 3 && req.body.username.length >= 20){
            res.redirect('/create-user?msg=Oops, username cannot be blank or less than 3 characters.');
        } else if(req.body.email === '' && req.body.email.length <= 5 && req.body.email.length >= 50){
            res.redirect('/create-user?msg=Oops, email cannot be blank or less than 5 characters.');
        } else if(req.body.password === '' && req.body.password.length <= 8 && req.body.password.length >= 50){
            res.redirect('/create-user?msg=Oops, password cannot be blank or less than 8 characters.');
        } else if(req.body.cpassword === '' && req.body.cpassword.length <= 8 && req.body.cpassword.length >= 50){
            res.redirect('/create-user?msg=Oops, confirm password cannot be blank or less than 8 characters.');
        } else {
            if(req.body.password === req.body.cpassword) {
                let newUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    role: req.body.role
                });
                newUser.save();
                res.redirect('/create-user?msg=User Saved Successfully.');
            } else {
                res.redirect('/create-user?msg=Oops, please retry again.');
            }
        }
    //});
});

module.exports = router;