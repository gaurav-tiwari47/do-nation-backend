const router = require('express').Router(); 

const User = require('./../controllers/auth/user');
const Client = require('./../controllers/auth/client');
const Admin = require('./../controllers/auth/admin')
const NGO = require('./../controllers/ngo')
const Donations = require('../controllers/donation')

//All authentication routes
router.post('/user/register', User.register);
router.post('/client/register', Client.register);
router.post('/admin/register',Admin.register)
router.post('/admin/login',Admin.login)

//All Ngo routes
router.post('/ngo/add',NGO.addNgo)
router.put('/ngo/verify',NGO.verifyNgo)

//All Donation routes
router.post('/ngo/donation',Donations.createDonation)

module.exports = router;
